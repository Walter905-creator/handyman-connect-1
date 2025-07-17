const mongoose = require('mongoose');

// Job Request Schema
const jobRequestSchema = new mongoose.Schema({
  // Customer information
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  
  // Job details
  trade: {
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
  
  // Location information
  address: {
    type: String,
    required: true,
    trim: true
  },
  
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: false // Will be populated via geocoding
    }
  },
  
  // Job preferences
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'emergency'],
    default: 'medium'
  },
  
  preferredStartDate: {
    type: Date
  },
  
  budget: {
    min: {
      type: Number,
      min: 0
    },
    max: {
      type: Number,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  
  // Job status
  status: {
    type: String,
    enum: ['pending', 'matched', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  // Matched professional
  assignedPro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pro'
  },
  
  matchedAt: Date,
  startedAt: Date,
  completedAt: Date,
  
  // Rating and feedback
  customerRating: {
    type: Number,
    min: 1,
    max: 5
  },
  
  customerFeedback: {
    type: String,
    trim: true
  },
  
  proRating: {
    type: Number,
    min: 1,
    max: 5
  },
  
  proFeedback: {
    type: String,
    trim: true
  },
  
  // Communication
  messages: [{
    sender: {
      type: String,
      enum: ['customer', 'pro', 'system'],
      required: true
    },
    message: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Notification tracking
  notificationsSent: [{
    type: {
      type: String,
      enum: ['sms', 'email', 'push']
    },
    recipient: String,
    sentAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['sent', 'delivered', 'failed'],
      default: 'sent'
    }
  }],
  
  // Metadata
  source: {
    type: String,
    enum: ['website', 'mobile_app', 'api', 'admin'],
    default: 'website'
  },
  
  ipAddress: String,
  userAgent: String
}, {
  timestamps: true
});

// Indexes
jobRequestSchema.index({ location: '2dsphere' });
jobRequestSchema.index({ trade: 1, status: 1 });
jobRequestSchema.index({ status: 1, createdAt: -1 });
jobRequestSchema.index({ assignedPro: 1, status: 1 });
jobRequestSchema.index({ email: 1 });

// Instance methods
jobRequestSchema.methods.assignToPro = function(proId) {
  this.assignedPro = proId;
  this.status = 'matched';
  this.matchedAt = new Date();
  return this.save();
};

jobRequestSchema.methods.markAsStarted = function() {
  this.status = 'in_progress';
  this.startedAt = new Date();
  return this.save();
};

jobRequestSchema.methods.markAsCompleted = function(customerRating, customerFeedback) {
  this.status = 'completed';
  this.completedAt = new Date();
  if (customerRating) this.customerRating = customerRating;
  if (customerFeedback) this.customerFeedback = customerFeedback;
  return this.save();
};

jobRequestSchema.methods.addMessage = function(sender, message) {
  this.messages.push({
    sender,
    message,
    timestamp: new Date()
  });
  return this.save();
};

// Static methods
jobRequestSchema.statics.findPendingJobs = function(trade, coordinates, maxDistance = 30) {
  const maxDistanceInMeters = maxDistance * 1609.34; // Convert miles to meters
  
  return this.find({
    trade: trade,
    status: 'pending',
    location: {
      $nearSphere: {
        $geometry: {
          type: 'Point',
          coordinates: coordinates
        },
        $maxDistance: maxDistanceInMeters
      }
    }
  }).sort({ urgency: -1, createdAt: 1 });
};

jobRequestSchema.statics.getJobStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
};

jobRequestSchema.statics.getTradeStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$trade',
        total: { $sum: 1 },
        completed: {
          $sum: {
            $cond: [{ $eq: ['$status', 'completed'] }, 1, 0]
          }
        },
        averageRating: {
          $avg: '$customerRating'
        }
      }
    },
    { $sort: { total: -1 } }
  ]);
};

module.exports = mongoose.model('JobRequest', jobRequestSchema);