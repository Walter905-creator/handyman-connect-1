// server/routes/notifications.js
const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const Pro = require("../models/Pro");
const JobRequest = require("../models/JobRequest");

// Initialize Twilio with validation
let client = null;
if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
  console.warn('⚠️ Twilio credentials not found - SMS features will be disabled');
} else {
  try {
    client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    console.log('✅ Twilio client initialized');
  } catch (err) {
    console.error('❌ Failed to initialize Twilio:', err.message);
  }
}

router.post("/text", async (req, res) => {
  const { trade, name, email, phone, address, description } = req.body;

  // Input validation
  if (!trade || !name || !email || !phone || !address || !description) {
    return res.status(400).json({ 
      error: "Missing required fields", 
      required: ["trade", "name", "email", "phone", "address", "description"]
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    // Save job request to database
    const jobRequest = new JobRequest({
      trade,
      name,
      email,
      phone,
      address,
      description
    });
    await jobRequest.save();

    // Find pros who handle this trade and want notifications
    const pros = await Pro.find({ 
      trade: trade,
      wantsNotifications: true 
    });

    if (pros.length === 0) {
      return res.status(400).json({ error: "No available pros found for this trade" });
    }

    // Check if SMS is available
    if (!client) {
      console.log('📧 SMS unavailable, but job request saved to database');
      return res.json({ 
        success: true, 
        message: `Job request saved. SMS notifications not configured.`,
        jobRequestId: jobRequest._id
      });
    }

    if (!process.env.TWILIO_PHONE) {
      return res.status(500).json({ 
        error: "SMS configuration incomplete", 
        message: "Twilio phone number not configured" 
      });
    }

    // Send SMS to all available pros
    try {
      const smsPromises = pros.map(pro => {
        return client.messages.create({
          body: `🛠️ New ${trade} Request from ${name}\n📍 ${address}\n📞 ${phone}\n📧 ${email}\n📝 ${description}`,
          from: process.env.TWILIO_PHONE,
          to: pro.phone
        });
      });

      await Promise.all(smsPromises);
      
      res.json({ 
        success: true, 
        message: `Job request sent to ${pros.length} ${trade} professional(s)`,
        jobRequestId: jobRequest._id
      });
    } catch (smsError) {
      console.error("❌ SMS sending failed:", smsError.message);
      // Job request was saved, but SMS failed
      res.json({ 
        success: true, 
        message: `Job request saved but SMS notifications failed. Pros: ${pros.length}`,
        jobRequestId: jobRequest._id,
        warning: "SMS delivery failed"
      });
    }
  } catch (err) {
    console.error("❌ Notification error:", err.message);
    res.status(500).json({ error: "Failed to send notifications" });
  }
});

module.exports = router;
