const express = require('express');
const router = express.Router();
const ServiceRequest = require('../models/ServiceRequest');
const Pro = require('../models/Pro');
const geocodingService = require('../utils/geocoding');
const smsHandler = require('../utils/sms-handler');

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
    // Geocode the customer address
    console.log(`🗺️ Geocoding customer address: ${address}`);
    const geoResult = await geocodingService.geocodeLocation(address);
    
    if (!geoResult.coordinates || !geocodingService.validateCoordinates(geoResult.coordinates)) {
      return res.status(400).json({
        success: false,
        message: 'Could not determine location. Please provide a valid address or ZIP code.'
      });
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
    
    // Find nearby professionals (within 30 miles) - ONLY ACTIVE PROFESSIONALS
    const matchedPros = await Pro.find({
      trade: serviceType.toLowerCase(),
      isActive: true,
      location: {
        $nearSphere: {
          $geometry: { type: "Point", coordinates: geoResult.coordinates },
          $maxDistance: 30 * 1609.34 // 30 miles in meters
        }
      }
    }).sort({ rating: -1, completedJobs: -1 });
    
    console.log(`🔍 Found ${matchedPros.length} matching professionals for ${serviceType}`);
    
    // Send SMS notifications to matched professionals
    let smsResults = { total: 0, successful: 0, failed: 0 };
    if (matchedPros.length > 0) {
      // Limit to top 5 professionals to avoid spam
      const prosToNotify = matchedPros.slice(0, 5);
      
      // Add professionals to notification list
      for (const pro of prosToNotify) {
        serviceRequest.addNotifiedProfessional(pro._id);
      }
      
      // Save updated service request
      await serviceRequest.save();
      
      // Send SMS notifications
      smsResults = await smsHandler.notifyMultipleProfessionals(prosToNotify, serviceRequest);
      console.log(`📱 SMS notification results:`, smsResults);
    }
    
    // Send confirmation SMS to customer
    const customerSmsResult = await smsHandler.notifyCustomerRequestReceived(serviceRequest);
    console.log('📱 Customer confirmation SMS:', customerSmsResult);
    
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
      message: 'Internal server error. Please try again later.'
    });
  }
});

// GET /api/requests - Get service requests (with optional filters)
router.get('/', async (req, res) => {
  const { status, serviceType, page = 1, limit = 20 } = req.query;
  
  try {
    const filter = {};
    if (status) filter.status = status;
    if (serviceType) filter.serviceType = serviceType.toLowerCase();
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      populate: [
        { path: 'assignedProfessional', select: 'name phone email trade rating' },
        { path: 'notifiedProfessionals.professionalId', select: 'name phone email trade' }
      ]
    };
    
    const result = await ServiceRequest.paginate(filter, options);
    
    res.json({
      success: true,
      data: result.docs,
      pagination: {
        page: result.page,
        pages: result.totalPages,
        total: result.totalDocs,
        limit: result.limit
      }
    });
    
  } catch (error) {
    console.error('❌ Error fetching service requests:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching service requests'
    });
  }
});

// GET /api/requests/:id - Get specific service request
router.get('/:id', async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findById(req.params.id)
      .populate('assignedProfessional', 'name phone email trade rating completedJobs')
      .populate('notifiedProfessionals.professionalId', 'name phone email trade rating');
    
    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found'
      });
    }
    
    res.json({
      success: true,
      data: serviceRequest
    });
    
  } catch (error) {
    console.error('❌ Error fetching service request:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching service request'
    });
  }
});

// PUT /api/requests/:id/status - Update service request status
router.put('/:id/status', async (req, res) => {
  const { status, professionalResponse, professionalId } = req.body;
  
  try {
    const serviceRequest = await ServiceRequest.findById(req.params.id);
    
    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found'
      });
    }
    
    // Handle professional response (accept/decline)
    if (professionalResponse && professionalId) {
      serviceRequest.updateProfessionalResponse(professionalId, professionalResponse);
      
      if (professionalResponse === 'accepted') {
        // Notify customer that professional was assigned
        const professional = await Pro.findById(professionalId);
        if (professional) {
          const customerNotificationResult = await smsHandler.notifyCustomerProfessionalAssigned(
            serviceRequest, 
            professional
          );
          console.log('📱 Customer assignment notification:', customerNotificationResult);
          
          // Notify the professional with job details
          const proNotificationResult = await smsHandler.notifyJobAssigned(professional, serviceRequest);
          console.log('📱 Professional assignment notification:', proNotificationResult);
        }
      }
    }
    
    // Update general status if provided
    if (status) {
      serviceRequest.status = status;
      
      if (status === 'completed') {
        serviceRequest.completedAt = new Date();
      }
    }
    
    await serviceRequest.save();
    
    // Populate the response
    await serviceRequest.populate('assignedProfessional', 'name phone email trade');
    
    res.json({
      success: true,
      message: 'Service request updated successfully',
      data: serviceRequest
    });
    
  } catch (error) {
    console.error('❌ Error updating service request:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating service request'
    });
  }
});

// GET /api/requests/stats/overview - Get overview statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const [
      totalRequests,
      pendingRequests,
      assignedRequests,
      completedRequests,
      recentRequests
    ] = await Promise.all([
      ServiceRequest.countDocuments(),
      ServiceRequest.countDocuments({ status: 'pending' }),
      ServiceRequest.countDocuments({ status: 'assigned' }),
      ServiceRequest.countDocuments({ status: 'completed' }),
      ServiceRequest.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('customerName serviceType location.address status createdAt')
    ]);
    
    const serviceTypeStats = await ServiceRequest.aggregate([
      { $group: { _id: '$serviceType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      success: true,
      data: {
        overview: {
          total: totalRequests,
          pending: pendingRequests,
          assigned: assignedRequests,
          completed: completedRequests,
          completionRate: totalRequests > 0 ? ((completedRequests / totalRequests) * 100).toFixed(1) : 0
        },
        serviceTypes: serviceTypeStats,
        recentRequests: recentRequests
      }
    });
    
  } catch (error) {
    console.error('❌ Error fetching request statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics'
    });
  }
});

module.exports = router;