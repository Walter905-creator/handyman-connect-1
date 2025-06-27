const express = require("express");
const router = express.Router();
const Pro = require("../models/Pro");
const JobRequest = require("../models/JobRequest");
// const adminAuth = require("../middleware/adminAuth"); // ✅ Commented out for now

// ✅ Test endpoint for debugging
router.get("/test", async (req, res) => {
  try {
    console.log("🧪 Running admin test...");
    
    // Test database connection
    const mongoose = require('mongoose');
    const dbState = mongoose.connection.readyState;
    
    // Test Pro model
    const prosCount = await Pro.countDocuments();
    
    // Test JobRequest model  
    const requestsCount = await JobRequest.countDocuments();
    
    res.json({
      message: "Admin routes working!",
      database: dbState === 1 ? 'connected' : 'not connected',
      collections: {
        pros: prosCount,
        jobRequests: requestsCount
      },
      models: {
        Pro: !!Pro,
        JobRequest: !!JobRequest
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
router.get("/pros", /*adminAuth,*/ async (req, res) => {
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
    const pros = await Pro.find();
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
router.post("/pros", /*adminAuth,*/ async (req, res) => {
  const { name, phone, trade } = req.body;
  try {
    const newPro = new Pro({ name, phone, trade });
    await newPro.save();
    res.json({ success: true, pro: newPro });
  } catch (err) {
    console.error("❌ Error creating pro:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Toggle SMS notifications for a Pro
router.put("/pros/:id/toggle", /*adminAuth,*/ async (req, res) => {
  try {
    const pro = await Pro.findById(req.params.id);
    if (!pro) return res.status(404).json({ error: "Pro not found" });

    pro.wantsNotifications = !pro.wantsNotifications;
    await pro.save();
    res.json({ success: true, pro });
  } catch (err) {
    console.error("❌ Error toggling notifications:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Delete a Pro
router.delete("/pros/:id", /*adminAuth,*/ async (req, res) => {
  try {
    await Pro.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleting pro:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get all Job Requests
router.get("/job-requests", /*adminAuth,*/ async (req, res) => {
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

    console.log("🔍 Attempting to fetch job requests from database...");
    const requests = await JobRequest.find();
    console.log(`✅ Found ${requests.length} job requests in database`);
    res.json(requests);
  } catch (err) {
    console.error("❌ Error fetching job requests:", err.message);
    console.error("❌ Stack trace:", err.stack);
    res.status(500).json({ 
      error: "Database error", 
      message: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// ✅ Legacy toggle endpoint (optional)
router.post("/toggle-notifications", /*adminAuth,*/ async (req, res) => {
  const { proId, enable } = req.body;
  try {
    const pro = await Pro.findById(proId);
    if (!pro) return res.status(404).json({ error: "Pro not found" });

    pro.notificationsEnabled = enable;
    await pro.save();
    res.json({ success: true, status: pro.notificationsEnabled });
  } catch (err) {
    console.error("❌ Error toggling pro notifications (legacy):", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
