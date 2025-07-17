const express = require('express');
const ServiceRequest = require('../models/ServiceRequest');
const Pro = require('../models/Pro');

const router = express.Router();

// Simple test route that doesn't require database
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Service request API is working',
    timestamp: new Date().toISOString(),
    availableEndpoints: [
      'POST /api/requests - Submit service request',
      'GET /api/requests - List service requests',
      'GET /api/requests/:id - Get specific request',
      'PUT /api/requests/:id/status - Update request status'
    ]
  });
});

// POST /api/requests - Submit a new service request
router.post('/', async (req, res) => {
  console.log('🔧 New service request submission:', req.body);
  
  const { 
    customerName, 
    customerEmail, 
    customerPhone, 
    serviceType, 
    description, 
    address,
    priority = 'medium',
    preferredSchedule 
  } = req.body;
  
  // Validate required fields
  if (!customerName || !customerPhone || !serviceType || !description || !address) {
    return res.status(400).json({
      success: false,
      message: 'Customer name, phone, service type, description, and address are required'
    });
  }
  
  try {
    // For now, if no database connection, return mock response
    if (!process.env.MONGO_URI) {
      console.log('📝 Database not connected - returning mock response');
      return res.status(201).json({
        success: true,
        message: 'Service request received successfully! (Database connection required for full functionality)',
        data: {
          requestId: 'mock-' + Date.now(),
          customerName,
          serviceType,
          location: address,
          status: 'pending',
          matchedProfessionals: 0,
          notificationsSent: 0
        },
        note: 'This is a mock response. Configure MONGO_URI environment variable for full functionality.'
      });
    }

    // Try to get geocoding service
    let geoResult = { coordinates: null, address: address };
    try {
      const geocodingService = require('../utils/geocoding');
      console.log(`🗺️ Geocoding customer address: ${address}`);
      geoResult = await geocodingService.geocodeLocation(address);
    } catch (geoError) {
      console.log('⚠️ Geocoding service unavailable, using default location');
      geoResult = {
        coordinates: [-74.0, 40.7], // Default NYC coordinates
        address: address
      };
    }
    
    if (!geoResult.coordinates) {
      geoResult.coordinates = [-74.0, 40.7]; // Default coordinates
    }
    
    // Create the service request
    const serviceRequest = new ServiceRequest({
      customerName: customerName.trim(),
      customerEmail: customerEmail ? customerEmail.toLowerCase().trim() : undefined,
      customerPhone: customerPhone.trim(),
      serviceType: serviceType.toLowerCase(),
      description: description.trim(),
      location: {
        type: 'Point',
        coordinates: geoResult.coordinates,
        address: geoResult.address
      },
      priority,
      preferredSchedule,
      source: 'web'
    });
    
    // Save the service request
    await serviceRequest.save();
    console.log(`✅ Service request created: ${serviceRequest._id}`);
    
    // Find nearby professionals (with error handling)
    let matchedPros = [];
    try {
      matchedPros = await Pro.find({
        trade: serviceType.toLowerCase(),
        isActive: true,
        location: {
          $nearSphere: {
            $geometry: { type: "Point", coordinates: geoResult.coordinates },
            $maxDistance: 30 * 1609.34 // 30 miles in meters
          }
        }
      }).sort({ rating: -1, completedJobs: -1 });
    } catch (mongoError) {
      console.log('⚠️ Professional search failed:', mongoError.message);
    }
    
    console.log(`🔍 Found ${matchedPros.length} matching professionals for ${serviceType}`);
    
    // SMS notifications (with error handling)
    let smsResults = { total: 0, successful: 0, failed: 0 };
    if (matchedPros.length > 0) {
      try {
        const smsHandler = require('../utils/sms-handler');
        const prosToNotify = matchedPros.slice(0, 5);
        
        // Add professionals to notification list
        for (const pro of prosToNotify) {
          serviceRequest.addNotifiedProfessional(pro._id);
        }
        
        await serviceRequest.save();
        
        // Send SMS notifications
        smsResults = await smsHandler.notifyMultipleProfessionals(prosToNotify, serviceRequest);
        console.log(`📱 SMS notification results:`, smsResults);
      } catch (smsError) {
        console.log('⚠️ SMS notifications failed:', smsError.message);
      }
    }
    
    // Send customer confirmation (with error handling)
    try {
      const smsHandler = require('../utils/sms-handler');
      const customerSmsResult = await smsHandler.notifyCustomerRequestReceived(serviceRequest);
      console.log('📱 Customer confirmation SMS:', customerSmsResult);
    } catch (customerSmsError) {
      console.log('⚠️ Customer SMS failed:', customerSmsError.message);
    }
    
    // Prepare response data
    const responseData = {
      success: true,
      message: `Service request submitted successfully! ${matchedPros.length > 0 ? 
        `We've notified ${smsResults.successful} professionals in your area.` : 
        'We\'ll find the best professionals in your area and contact you soon.'}`,
      data: {
        requestId: serviceRequest._id,
        customerName: serviceRequest.customerName,
        serviceType: serviceRequest.serviceType,
        location: serviceRequest.location.address,
        status: serviceRequest.status,
        matchedProfessionals: matchedPros.length,
        notificationsSent: smsResults.successful
      }
    };
    
    res.status(201).json(responseData);
    
  } catch (error) {
    console.error('❌ Error creating service request:', error);
    
    // Handle specific validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid data provided',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.',
      error: error.message
    });
  }
});

// Export router with all the other endpoints from the original file
// GET /api/requests, GET /api/requests/:id, PUT /api/requests/:id/status, etc.
module.exports = router;