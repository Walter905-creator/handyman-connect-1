const mongoose = require('mongoose');

// Professional Schema with geolocation support
const proSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
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
  dob: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false // Changed to false until payment is confirmed
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'active', 'cancelled', 'failed'],
    default: 'pending'
  },
  stripeSessionId: {
    type: String
  },
  stripeCustomerId: {
    type: String
  },
  stripeSubscriptionId: {
    type: String
  },
  subscriptionStartDate: {
    type: Date
  },
  subscriptionEndDate: {
    type: Date
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  
  // Additional professional info
  experience: {
    type: Number, // years of experience
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  completedJobs: {
    type: Number,
    default: 0
  },
  
  // Verification status
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationDate: Date,
  
  // Contact preferences
  notificationSettings: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: true },
    push: { type: Boolean, default: true }
  }
}, {
  timestamps: true
});

// Create 2dsphere index for geospatial queries
proSchema.index({ location: '2dsphere' });

// Create compound index for efficient trade + location queries
proSchema.index({ trade: 1, location: '2dsphere' });

// Create index for email lookups
proSchema.index({ email: 1 });

// Instance methods
proSchema.methods.getAge = function() {
  return Math.floor((Date.now() - this.dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
};

proSchema.methods.updateRating = function(newRating) {
  const previousRating = this.rating;
  const previousJobs = this.completedJobs;
  
  // Simple average rating calculation
  this.rating = ((this.rating * this.completedJobs) + newRating) / (this.completedJobs + 1);
  this.completedJobs += 1;
  
  // Return data for celebration triggering
  return {
    previousRating,
    newRating: this.rating,
    previousJobs,
    newJobs: this.completedJobs
  };
};

// Static methods
proSchema.statics.findNearbyPros = function(trade, coordinates, maxDistance = 30) {
  const maxDistanceInMeters = maxDistance * 1609.34; // Convert miles to meters
  
  return this.find({
    trade: trade,
    isActive: true,
    location: {
      $nearSphere: {
        $geometry: {
          type: 'Point',
          coordinates: coordinates // [longitude, latitude]
        },
        $maxDistance: maxDistanceInMeters
      }
    }
  }).sort({ rating: -1, completedJobs: -1 });
};

proSchema.statics.getTradeStats = function() {
  return this.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: '$trade', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
};

module.exports = mongoose.model('Pro', proSchema);
