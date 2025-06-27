// server/routes/notifications.js
const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const Pro = require("../models/Pro");
const JobRequest = require("../models/JobRequest");

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

router.post("/text", async (req, res) => {
  const { trade, name, email, phone, address, description } = req.body;

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

    // Send SMS to all available pros
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
      message: `Job request sent to ${pros.length} ${trade} professional(s)` 
    });
  } catch (err) {
    console.error("❌ Notification error:", err.message);
    res.status(500).json({ error: "Failed to send notifications" });
  }
});

module.exports = router;
