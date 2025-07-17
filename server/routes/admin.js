const express = require("express");
const router = express.Router();
const Pro = require("../models/Pro");
const adminAuth = require("../middleware/adminAuth");

// ✅ Test endpoint for debugging - kept public for troubleshooting
router.get("/test", async (req, res) => {
  try {
    console.log("🧪 Running admin test...");
    
    // Test database connection
    const mongoose = require('mongoose');
    const dbState = mongoose.connection.readyState;
    
    // Test Pro model
    const prosCount = await Pro.countDocuments();
    
    res.json({
      message: "Admin routes working!",
      database: dbState === 1 ? 'connected' : 'not connected',
      collections: {
        pros: prosCount
      },
      models: {
        Pro: !!Pro
      }
    });
  } catch (err) {
    console.error("❌ Admin test error:", err);
    res.status(500).json({ 
      error: "Test failed", 
      message: err.message 
    });
  }
});

// ✅ Get all Pros
router.get("/pros", adminAuth, async (req, res) => {
  try {
    // Check if database is connected
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        error: "Database not connected", 
        message: "MongoDB connection is not available. Please check MONGO_URI environment variable.",
        readyState: mongoose.connection.readyState
      });
    }

    console.log("🔍 Attempting to fetch pros from database...");
    const pros = await Pro.find().sort({ createdAt: -1 });
    console.log(`✅ Found ${pros.length} pros in database`);
    res.json(pros);
  } catch (err) {
    console.error("❌ Error fetching pros:", err.message);
    console.error("❌ Stack trace:", err.stack);
    res.status(500).json({ 
      error: "Database error", 
      message: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// ✅ Add a new Pro
router.post("/pros", adminAuth, async (req, res) => {
  const { name, email, phone, trade, location } = req.body;
  try {
    const newPro = new Pro({ 
      name, 
      email: email.toLowerCase(), 
      phone, 
      trade: trade.toLowerCase(),
      location: typeof location === 'string' ? { address: location } : location,
      isActive: false,
      paymentStatus: 'pending'
    });
    await newPro.save();
    res.json({ success: true, pro: newPro });
  } catch (err) {
    console.error("❌ Error creating pro:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Toggle active status for a Pro
router.put("/pros/:id/toggle", adminAuth, async (req, res) => {
  try {
    const pro = await Pro.findById(req.params.id);
    if (!pro) return res.status(404).json({ error: "Pro not found" });

    pro.isActive = !pro.isActive;
    await pro.save();
    res.json({ success: true, pro });
  } catch (err) {
    console.error("❌ Error toggling pro status:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Delete a Pro
router.delete("/pros/:id", adminAuth, async (req, res) => {
  try {
    await Pro.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleting pro:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get dashboard stats
router.get("/stats", adminAuth, async (req, res) => {
  try {
    const totalPros = await Pro.countDocuments();
    const activePros = await Pro.countDocuments({ isActive: true });
    const pendingPros = await Pro.countDocuments({ paymentStatus: 'pending' });
    
    const tradeStats = await Pro.aggregate([
      { $group: { _id: "$trade", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      stats: {
        totalPros,
        activePros,
        pendingPros,
        tradeStats
      }
    });
  } catch (err) {
    console.error("❌ Error fetching stats:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Complete a job and trigger Rureka celebration
router.post("/complete-job", adminAuth, async (req, res) => {
  try {
    const { proId, jobRequestId, customerRating, customerFeedback } = req.body;
    
    if (!proId) {
      return res.status(400).json({ error: "Professional ID is required" });
    }
    
    const pro = await Pro.findById(proId);
    if (!pro) {
      return res.status(404).json({ error: "Professional not found" });
    }
    
    // Update pro rating and job count
    const ratingData = pro.updateRating(customerRating || 5);
    await pro.save();
    
    // Import and trigger Rureka celebration
    const { triggerCelebration } = require('./rureka');
    
    // Trigger job completion celebration
    await triggerCelebration('job_completed', {
      proId: pro._id,
      proName: pro.name,
      jobCount: pro.completedJobs,
      newRating: ratingData.newRating,
      previousRating: ratingData.previousRating
    });
    
    // If there's a job request, mark it as completed
    if (jobRequestId) {
      const JobRequest = require('../models/JobRequest');
      const jobRequest = await JobRequest.findById(jobRequestId);
      if (jobRequest) {
        await jobRequest.markAsCompleted(customerRating, customerFeedback);
      }
    }
    
    res.json({
      success: true,
      message: "Job completed successfully! Rureka celebration triggered! 🎉",
      pro: {
        id: pro._id,
        name: pro.name,
        completedJobs: pro.completedJobs,
        rating: pro.rating
      }
    });
  } catch (err) {
    console.error("❌ Error completing job:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Match a job to a pro and trigger Rureka celebration
router.post("/match-job", adminAuth, async (req, res) => {
  try {
    const { proId, jobRequestId } = req.body;
    
    if (!proId || !jobRequestId) {
      return res.status(400).json({ error: "Professional ID and Job Request ID are required" });
    }
    
    const pro = await Pro.findById(proId);
    const JobRequest = require('../models/JobRequest');
    const jobRequest = await JobRequest.findById(jobRequestId);
    
    if (!pro) {
      return res.status(404).json({ error: "Professional not found" });
    }
    
    if (!jobRequest) {
      return res.status(404).json({ error: "Job request not found" });
    }
    
    // Assign job to pro
    await jobRequest.assignToPro(proId);
    
    // Import and trigger Rureka celebration
    const { triggerCelebration } = require('./rureka');
    
    // Trigger job match celebration
    await triggerCelebration('job_matched', {
      proId: pro._id,
      jobRequestId: jobRequest._id,
      proName: pro.name,
      jobType: jobRequest.trade
    });
    
    res.json({
      success: true,
      message: "Job matched successfully! Rureka celebration triggered! 🎯",
      match: {
        pro: {
          id: pro._id,
          name: pro.name,
          trade: pro.trade
        },
        job: {
          id: jobRequest._id,
          trade: jobRequest.trade,
          description: jobRequest.description
        }
      }
    });
  } catch (err) {
    console.error("❌ Error matching job:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
