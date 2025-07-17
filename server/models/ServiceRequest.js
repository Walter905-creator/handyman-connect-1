const mongoose = require('mongoose');

// Service Request Schema for tracking customer job requests
const serviceRequestSchema = new mongoose.Schema({
  // Customer Information
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  customerPhone: {
    type: String,
    required: true,
    trim: true
  },
  
  // Service Details
  serviceType: {
    type: String,
    required: true,
    enum: [
      'plumbing',
      'electrical', 
      'landscaping',
      'cleaning',
      'junk_removal',
      'handyman',
      'hvac',
      'painting',
      'roofing',
      'flooring',
      'carpentry',
      'appliance_repair'
    ]
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  
  // Location Information
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  
  // Request Status
  status: {
    type: String,
    enum: ['pending', 'matched', 'assigned', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  // Priority and Urgency
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Professionals notified/matched
  notifiedProfessionals: [{
    professionalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pro'
    },
    notifiedAt: {
      type: Date,
      default: Date.now
    },
    response: {
      type: String,
      enum: ['pending', 'accepted', 'declined'],
      default: 'pending'
    },
    responseAt: Date
  }],
  
  // Assignment information
  assignedProfessional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pro'
  },
  assignedAt: Date,
  
  // Scheduling
  preferredSchedule: {
    date: Date,
    timeSlot: String // e.g., "morning", "afternoon", "evening"
  },
  scheduledDate: Date,
  
  // Completion and feedback
  completedAt: Date,
  customerRating: {
    type: Number,
    min: 1,
    max: 5
  },
  customerFeedback: String,
  
  // Pricing
  estimatedCost: Number,
  finalCost: Number,
  
  // Additional metadata
  source: {
    type: String,
    enum: ['web', 'mobile', 'phone', 'referral'],
    default: 'web'
  },
  
  // SMS and notification tracking
  smsNotificationsSent: {
    type: Number,
    default: 0
  },
  lastNotificationSent: Date

}, {
  timestamps: true
});

// Create indexes for efficient queries
serviceRequestSchema.index({ location: '2dsphere' });
serviceRequestSchema.index({ serviceType: 1, status: 1 });
serviceRequestSchema.index({ status: 1, createdAt: -1 });
serviceRequestSchema.index({ customerPhone: 1 });
serviceRequestSchema.index({ 'notifiedProfessionals.professionalId': 1 });

// Instance methods
serviceRequestSchema.methods.addNotifiedProfessional = function(professionalId) {
  // Avoid duplicate notifications
  const existing = this.notifiedProfessionals.find(
    np => np.professionalId.toString() === professionalId.toString()
  );
  
  if (!existing) {
    this.notifiedProfessionals.push({
      professionalId: professionalId,
      notifiedAt: new Date(),
      response: 'pending'
    });
    this.smsNotificationsSent += 1;
    this.lastNotificationSent = new Date();
  }
  
  return this;
};

serviceRequestSchema.methods.updateProfessionalResponse = function(professionalId, response) {
  const notification = this.notifiedProfessionals.find(
    np => np.professionalId.toString() === professionalId.toString()
  );
  
  if (notification) {
    notification.response = response;
    notification.responseAt = new Date();
    
    if (response === 'accepted' && !this.assignedProfessional) {
      this.assignedProfessional = professionalId;
      this.assignedAt = new Date();
      this.status = 'assigned';
    }
  }
  
  return this;
};

// Static methods
serviceRequestSchema.statics.findPendingRequests = function() {
  return this.find({ status: 'pending' })
    .sort({ createdAt: -1 })
    .populate('notifiedProfessionals.professionalId', 'name phone email trade');
};

serviceRequestSchema.statics.findRequestsForProfessional = function(professionalId) {
  return this.find({
    'notifiedProfessionals.professionalId': professionalId
  })
  .sort({ createdAt: -1 })
  .populate('assignedProfessional', 'name phone email');
};

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);