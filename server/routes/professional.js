const express = require('express');
const router = express.Router();
const ServiceRequest = require('../models/ServiceRequest');
const Pro = require('../models/Pro');

// GET /api/pro/dashboard/:professionalId - Get professional dashboard data
router.get('/dashboard/:professionalId', async (req, res) => {
  const { professionalId } = req.params;
  
  try {
    // Verify professional exists and is active
    const professional = await Pro.findById(professionalId);
    
    if (!professional) {
      return res.status(404).json({
        success: false,
        message: 'Professional not found'
      });
    }
    
    if (!professional.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Professional account is not active. Please ensure your subscription is current.'
      });
    }
    
    // Get service requests relevant to this professional
    const [
      pendingRequests,
      assignedRequests,
      completedRequests,
      allNotifications
    ] = await Promise.all([
      // Pending requests where professional was notified but hasn't responded
      ServiceRequest.find({
        'notifiedProfessionals.professionalId': professionalId,
        'notifiedProfessionals.response': 'pending',
        status: 'pending'
      })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('customerName customerPhone serviceType description location priority createdAt'),
      
      // Requests assigned to this professional
      ServiceRequest.find({
        assignedProfessional: professionalId,
        status: { $in: ['assigned', 'in_progress'] }
      })
      .sort({ createdAt: -1 })
      .select('customerName customerPhone serviceType description location scheduledDate status createdAt'),
      
      // Completed requests by this professional (last 10)
      ServiceRequest.find({
        assignedProfessional: professionalId,
        status: 'completed'
      })
      .sort({ completedAt: -1 })
      .limit(10)
      .select('customerName serviceType location customerRating customerFeedback completedAt finalCost'),
      
      // All notifications sent to this professional (for history)
      ServiceRequest.find({
        'notifiedProfessionals.professionalId': professionalId
      })
      .sort({ createdAt: -1 })
      .limit(20)
      .select('serviceType location.address notifiedProfessionals.$ status createdAt')
    ]);
    
    // Calculate statistics
    const stats = {
      pendingOpportunities: pendingRequests.length,
      activeJobs: assignedRequests.length,
      completedJobs: completedRequests.length,
      totalEarnings: completedRequests.reduce((sum, req) => sum + (req.finalCost || 0), 0),
      averageRating: completedRequests.length > 0 
        ? (completedRequests.reduce((sum, req) => sum + (req.customerRating || 0), 0) / completedRequests.length).toFixed(1)
        : 0,
      responseRate: allNotifications.length > 0 
        ? ((allNotifications.filter(req => 
            req.notifiedProfessionals[0].response !== 'pending'
          ).length / allNotifications.length) * 100).toFixed(1)
        : 0
    };
    
    res.json({
      success: true,
      data: {
        professional: {
          id: professional._id,
          name: professional.name,
          email: professional.email,
          phone: professional.phone,
          trade: professional.trade,
          location: professional.location.address,
          rating: professional.rating,
          completedJobs: professional.completedJobs,
          isVerified: professional.isVerified,
          joinedDate: professional.joinedDate
        },
        stats,
        pendingRequests,
        assignedRequests,
        completedRequests,
        recentNotifications: allNotifications
      }
    });
    
  } catch (error) {
    console.error('❌ Error fetching professional dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data'
    });
  }
});

// POST /api/pro/respond/:professionalId - Respond to a service request (accept/decline)
router.post('/respond/:professionalId', async (req, res) => {
  const { professionalId } = req.params;
  const { requestId, response } = req.body; // response: 'accepted' or 'declined'
  
  if (!requestId || !response || !['accepted', 'declined'].includes(response)) {
    return res.status(400).json({
      success: false,
      message: 'Request ID and valid response (accepted/declined) are required'
    });
  }
  
  try {
    // Verify professional exists and is active
    const professional = await Pro.findById(professionalId);
    
    if (!professional || !professional.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Professional not found or not active'
      });
    }
    
    // Find the service request
    const serviceRequest = await ServiceRequest.findById(requestId);
    
    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found'
      });
    }
    
    // Check if professional was notified about this request
    const notification = serviceRequest.notifiedProfessionals.find(
      np => np.professionalId.toString() === professionalId
    );
    
    if (!notification) {
      return res.status(403).json({
        success: false,
        message: 'You were not notified about this service request'
      });
    }
    
    // Check if already responded
    if (notification.response !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'You have already responded to this request'
      });
    }
    
    // Check if job is still available (not already assigned)
    if (response === 'accepted' && serviceRequest.assignedProfessional) {
      return res.status(400).json({
        success: false,
        message: 'This job has already been assigned to another professional'
      });
    }
    
    // Update the response
    serviceRequest.updateProfessionalResponse(professionalId, response);
    await serviceRequest.save();
    
    // If accepted, send notifications
    if (response === 'accepted') {
      const smsHandler = require('../utils/sms-handler');
      
      // Notify customer
      const customerNotification = await smsHandler.notifyCustomerProfessionalAssigned(
        serviceRequest, 
        professional
      );
      
      // Notify professional with job details  
      const proNotification = await smsHandler.notifyJobAssigned(professional, serviceRequest);
      
      console.log('📱 Assignment notifications:', { customerNotification, proNotification });
    }
    
    res.json({
      success: true,
      message: response === 'accepted' 
        ? 'Job accepted! Customer has been notified and you will receive job details.'
        : 'Job declined. Thank you for your response.',
      data: {
        requestId: serviceRequest._id,
        response: response,
        status: serviceRequest.status,
        assigned: response === 'accepted'
      }
    });
    
  } catch (error) {
    console.error('❌ Error responding to service request:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing your response'
    });
  }
});

// PUT /api/pro/job/:professionalId/:requestId/status - Update job status
router.put('/job/:professionalId/:requestId/status', async (req, res) => {
  const { professionalId, requestId } = req.params;
  const { status, scheduledDate, finalCost, notes } = req.body;
  
  const validStatuses = ['assigned', 'in_progress', 'completed'];
  
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Valid status is required (assigned, in_progress, completed)'
    });
  }
  
  try {
    // Verify professional and job assignment
    const serviceRequest = await ServiceRequest.findOne({
      _id: requestId,
      assignedProfessional: professionalId
    });
    
    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: 'Job not found or not assigned to you'
      });
    }
    
    // Update status and related fields
    serviceRequest.status = status;
    
    if (scheduledDate) {
      serviceRequest.scheduledDate = new Date(scheduledDate);
    }
    
    if (status === 'completed') {
      serviceRequest.completedAt = new Date();
      
      if (finalCost) {
        serviceRequest.finalCost = parseFloat(finalCost);
      }
      
      // Update professional's completed jobs count
      await Pro.findByIdAndUpdate(professionalId, {
        $inc: { completedJobs: 1 }
      });
    }
    
    if (notes) {
      // Add notes to the service request (you might want to create a notes field)
      serviceRequest.professionalNotes = notes;
    }
    
    await serviceRequest.save();
    
    res.json({
      success: true,
      message: `Job status updated to ${status}`,
      data: {
        requestId: serviceRequest._id,
        status: serviceRequest.status,
        scheduledDate: serviceRequest.scheduledDate,
        completedAt: serviceRequest.completedAt,
        finalCost: serviceRequest.finalCost
      }
    });
    
  } catch (error) {
    console.error('❌ Error updating job status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating job status'
    });
  }
});

// GET /api/pro/jobs/:professionalId - Get jobs for a professional with filters
router.get('/jobs/:professionalId', async (req, res) => {
  const { professionalId } = req.params;
  const { status, page = 1, limit = 20 } = req.query;
  
  try {
    const professional = await Pro.findById(professionalId);
    
    if (!professional) {
      return res.status(404).json({
        success: false,
        message: 'Professional not found'
      });
    }
    
    let filter = {};
    
    if (status === 'available') {
      // Available jobs - where professional was notified but hasn't responded
      filter = {
        'notifiedProfessionals.professionalId': professionalId,
        'notifiedProfessionals.response': 'pending',
        status: 'pending'
      };
    } else if (status === 'assigned') {
      // Jobs assigned to this professional
      filter = {
        assignedProfessional: professionalId,
        status: { $in: ['assigned', 'in_progress'] }
      };
    } else if (status === 'completed') {
      // Completed jobs
      filter = {
        assignedProfessional: professionalId,
        status: 'completed'
      };
    } else {
      // All jobs related to this professional
      filter = {
        $or: [
          { 'notifiedProfessionals.professionalId': professionalId },
          { assignedProfessional: professionalId }
        ]
      };
    }
    
    const skip = (page - 1) * limit;
    
    const [jobs, total] = await Promise.all([
      ServiceRequest.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .select('customerName customerPhone serviceType description location status priority createdAt scheduledDate completedAt customerRating finalCost'),
      ServiceRequest.countDocuments(filter)
    ]);
    
    res.json({
      success: true,
      data: jobs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('❌ Error fetching professional jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs'
    });
  }
});

module.exports = router;