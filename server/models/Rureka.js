const mongoose = require('mongoose');

// Rureka Celebration Schema - tracks celebration events and achievements
const rurekaSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      'job_matched',        // When a job is successfully matched to a pro
      'job_completed',      // When a job is marked as completed
      'milestone_reached',  // When a pro reaches certain milestones
      'first_job',         // Pro's first completed job
      'rating_milestone',  // When rating reaches certain levels (4.5+, 5.0)
      'jobs_milestone',    // Multiple of 10 jobs completed
      'welcome_pro'        // When a new pro joins and gets verified
    ]
  },
  
  // Who is celebrating
  proId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pro'
  },
  
  // Optional - if related to a specific job request
  jobRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobRequest'
  },
  
  // Celebration details
  title: {
    type: String,
    required: true
  },
  
  message: {
    type: String,
    required: true
  },
  
  // Achievement details for milestones
  achievement: {
    milestone: String,  // e.g., "10_jobs", "5_star_rating", "first_match"
    value: Number,      // The actual value achieved (rating, job count, etc.)
    previousValue: Number  // Previous value before achievement
  },
  
  // Visual celebration details
  celebration: {
    emoji: {
      type: String,
      default: '🎉'
    },
    color: {
      type: String,
      default: '#FF6B6B'
    },
    duration: {
      type: Number,
      default: 3000  // milliseconds
    },
    animation: {
      type: String,
      enum: ['confetti', 'bounce', 'pulse', 'sparkle'],
      default: 'confetti'
    }
  },
  
  // Notification settings
  shouldNotify: {
    type: Boolean,
    default: true
  },
  
  // Status tracking
  isViewed: {
    type: Boolean,
    default: false
  },
  
  viewedAt: Date,
  
  // Metadata
  metadata: {
    source: String,  // Where the celebration was triggered from
    additionalData: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
rurekaSchema.index({ proId: 1, createdAt: -1 });
rurekaSchema.index({ type: 1, createdAt: -1 });
rurekaSchema.index({ isViewed: 1, proId: 1 });

// Static methods
rurekaSchema.statics.createJobMatchCelebration = function(proId, jobRequestId, proName, jobType) {
  return this.create({
    type: 'job_matched',
    proId,
    jobRequestId,
    title: `🎯 Job Match Success!`,
    message: `Congratulations ${proName}! You've been matched with a new ${jobType} job!`,
    celebration: {
      emoji: '🎯',
      color: '#4ECDC4',
      animation: 'sparkle'
    },
    metadata: {
      source: 'job_matching_system',
      additionalData: { jobType }
    }
  });
};

rurekaSchema.statics.createJobCompletionCelebration = function(proId, proName, jobCount) {
  const isFirstJob = jobCount === 1;
  const isMilestone = jobCount % 10 === 0;
  
  let type = 'job_completed';
  let title = '🏆 Job Completed!';
  let message = `Great work ${proName}! Another job completed successfully!`;
  let emoji = '🏆';
  let color = '#45B7D1';
  
  if (isFirstJob) {
    type = 'first_job';
    title = '🌟 First Job Completed!';
    message = `Amazing ${proName}! You've completed your first job on Fixlo!`;
    emoji = '🌟';
    color = '#96CEB4';
  } else if (isMilestone) {
    type = 'jobs_milestone';
    title = `🚀 ${jobCount} Jobs Milestone!`;
    message = `Incredible ${proName}! You've completed ${jobCount} jobs!`;
    emoji = '🚀';
    color = '#FFEAA7';
  }
  
  return this.create({
    type,
    proId,
    title,
    message,
    achievement: {
      milestone: isFirstJob ? 'first_job' : isMilestone ? `${jobCount}_jobs` : null,
      value: jobCount,
      previousValue: jobCount - 1
    },
    celebration: {
      emoji,
      color,
      animation: isFirstJob || isMilestone ? 'confetti' : 'bounce'
    },
    metadata: {
      source: 'job_completion_system',
      additionalData: { jobCount, isFirstJob, isMilestone }
    }
  });
};

rurekaSchema.statics.createRatingMilestoneCelebration = function(proId, proName, newRating, previousRating) {
  const reached45 = newRating >= 4.5 && previousRating < 4.5;
  const reached50 = newRating >= 5.0 && previousRating < 5.0;
  
  if (!reached45 && !reached50) return null;
  
  const is50 = reached50;
  const milestone = is50 ? '5_star_rating' : '4_5_star_rating';
  
  return this.create({
    type: 'rating_milestone',
    proId,
    title: `⭐ ${is50 ? '5-Star' : '4.5-Star'} Rating Achieved!`,
    message: `Outstanding ${proName}! You've achieved a ${is50 ? '5.0' : '4.5+'} star rating!`,
    achievement: {
      milestone,
      value: newRating,
      previousValue: previousRating
    },
    celebration: {
      emoji: '⭐',
      color: '#FFD93D',
      animation: 'sparkle',
      duration: 4000
    },
    metadata: {
      source: 'rating_system',
      additionalData: { newRating, previousRating, milestone }
    }
  });
};

rurekaSchema.statics.createWelcomeCelebration = function(proId, proName) {
  return this.create({
    type: 'welcome_pro',
    proId,
    title: '🎊 Welcome to Fixlo!',
    message: `Welcome ${proName}! You're now verified and ready to receive job notifications!`,
    celebration: {
      emoji: '🎊',
      color: '#A8E6CF',
      animation: 'confetti',
      duration: 5000
    },
    metadata: {
      source: 'verification_system'
    }
  });
};

rurekaSchema.statics.getRecentCelebrations = function(proId, limit = 10) {
  return this.find({ proId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('proId', 'name')
    .populate('jobRequestId', 'trade description');
};

rurekaSchema.statics.getUnviewedCelebrations = function(proId) {
  return this.find({ proId, isViewed: false })
    .sort({ createdAt: -1 })
    .populate('proId', 'name')
    .populate('jobRequestId', 'trade description');
};

// Instance methods
rurekaSchema.methods.markAsViewed = function() {
  this.isViewed = true;
  this.viewedAt = new Date();
  return this.save();
};

module.exports = mongoose.model('Rureka', rurekaSchema);