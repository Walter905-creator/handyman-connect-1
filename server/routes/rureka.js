const express = require('express');
const router = express.Router();
const Rureka = require('../models/Rureka');
const Pro = require('../models/Pro');
const JobRequest = require('../models/JobRequest');

// Get celebrations for a specific pro
router.get('/celebrations/:proId', async (req, res) => {
  try {
    const { proId } = req.params;
    const { limit = 10, unviewedOnly = false } = req.query;
    
    let celebrations;
    if (unviewedOnly === 'true') {
      celebrations = await Rureka.getUnviewedCelebrations(proId);
    } else {
      celebrations = await Rureka.getRecentCelebrations(proId, parseInt(limit));
    }
    
    res.json({
      success: true,
      celebrations,
      count: celebrations.length
    });
  } catch (error) {
    console.error('Error fetching celebrations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching celebrations',
      error: error.message
    });
  }
});

// Mark celebration as viewed
router.patch('/celebrations/:celebrationId/viewed', async (req, res) => {
  try {
    const { celebrationId } = req.params;
    
    const celebration = await Rureka.findById(celebrationId);
    if (!celebration) {
      return res.status(404).json({
        success: false,
        message: 'Celebration not found'
      });
    }
    
    await celebration.markAsViewed();
    
    res.json({
      success: true,
      message: 'Celebration marked as viewed',
      celebration
    });
  } catch (error) {
    console.error('Error marking celebration as viewed:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating celebration',
      error: error.message
    });
  }
});

// Trigger a manual celebration (for testing or admin purposes)
router.post('/celebrations/trigger', async (req, res) => {
  try {
    const { type, proId, jobRequestId, customMessage } = req.body;
    
    if (!type || !proId) {
      return res.status(400).json({
        success: false,
        message: 'Type and proId are required'
      });
    }
    
    const pro = await Pro.findById(proId);
    if (!pro) {
      return res.status(404).json({
        success: false,
        message: 'Professional not found'
      });
    }
    
    let celebration;
    
    switch (type) {
      case 'job_matched':
        if (!jobRequestId) {
          return res.status(400).json({
            success: false,
            message: 'jobRequestId is required for job_matched celebration'
          });
        }
        const jobRequest = await JobRequest.findById(jobRequestId);
        if (!jobRequest) {
          return res.status(404).json({
            success: false,
            message: 'Job request not found'
          });
        }
        celebration = await Rureka.createJobMatchCelebration(
          proId, 
          jobRequestId, 
          pro.name, 
          jobRequest.trade
        );
        break;
        
      case 'job_completed':
        celebration = await Rureka.createJobCompletionCelebration(
          proId, 
          pro.name, 
          pro.completedJobs + 1
        );
        break;
        
      case 'welcome_pro':
        celebration = await Rureka.createWelcomeCelebration(proId, pro.name);
        break;
        
      case 'rating_milestone':
        const newRating = pro.rating + 0.1; // Simulate rating increase
        celebration = await Rureka.createRatingMilestoneCelebration(
          proId, 
          pro.name, 
          newRating, 
          pro.rating
        );
        break;
        
      case 'custom':
        celebration = await Rureka.create({
          type: 'job_completed',
          proId,
          title: '🎉 Custom Celebration!',
          message: customMessage || `Great job ${pro.name}!`,
          celebration: {
            emoji: '🎉',
            color: '#FF6B6B',
            animation: 'confetti'
          },
          metadata: {
            source: 'manual_trigger'
          }
        });
        break;
        
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid celebration type'
        });
    }
    
    res.json({
      success: true,
      message: 'Celebration triggered successfully',
      celebration
    });
  } catch (error) {
    console.error('Error triggering celebration:', error);
    res.status(500).json({
      success: false,
      message: 'Error triggering celebration',
      error: error.message
    });
  }
});

// Get celebration statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Rureka.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          viewed: {
            $sum: {
              $cond: ['$isViewed', 1, 0]
            }
          },
          unviewed: {
            $sum: {
              $cond: ['$isViewed', 0, 1]
            }
          }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    
    const totalCelebrations = await Rureka.countDocuments();
    const recentCelebrations = await Rureka.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('proId', 'name trade')
      .populate('jobRequestId', 'trade description');
    
    res.json({
      success: true,
      stats: {
        total: totalCelebrations,
        byType: stats,
        recent: recentCelebrations
      }
    });
  } catch (error) {
    console.error('Error fetching celebration stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
});

// Helper function to trigger celebrations automatically (used internally)
const triggerCelebration = async (type, data) => {
  try {
    let celebration;
    
    switch (type) {
      case 'job_matched':
        celebration = await Rureka.createJobMatchCelebration(
          data.proId, 
          data.jobRequestId, 
          data.proName, 
          data.jobType
        );
        break;
        
      case 'job_completed':
        celebration = await Rureka.createJobCompletionCelebration(
          data.proId, 
          data.proName, 
          data.jobCount
        );
        
        // Also check for rating milestone after job completion
        if (data.newRating && data.previousRating) {
          const ratingCelebration = await Rureka.createRatingMilestoneCelebration(
            data.proId,
            data.proName,
            data.newRating,
            data.previousRating
          );
          
          if (ratingCelebration) {
            console.log(`🌟 Rating milestone celebration created for ${data.proName}`);
          }
        }
        break;
        
      case 'welcome_pro':
        celebration = await Rureka.createWelcomeCelebration(data.proId, data.proName);
        break;
        
      default:
        console.warn(`Unknown celebration type: ${type}`);
        return null;
    }
    
    if (celebration) {
      console.log(`🎉 Rureka celebration created: ${celebration.title} for ${data.proName || 'Pro'}`);
    }
    
    return celebration;
  } catch (error) {
    console.error('Error triggering celebration:', error);
    return null;
  }
};

// Export the router and helper function
module.exports = { router, triggerCelebration };