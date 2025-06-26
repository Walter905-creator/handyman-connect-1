const express = require("express");
const router = express.Router();
const Pro = require("../models/Pro");
const JobRequest = require("../models/JobRequest");

// ✅ Get all Pros
router.get("/pros", async (req, res) => {
  try {
    const pros = await Pro.find();
    res.json(pros);
  } catch (err) {
    console.error("❌ Error fetching pros:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Add a new Pro
router.post("/pros", async (req, res) => {
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

// ✅ Toggle SMS notifications for a Pro (from frontend or admin)
router.put("/pros/:id/toggle", async (req, res) => {
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
router.delete("/pros/:id", async (req, res) => {
  try {
    await Pro.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleting pro:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get all Job Requests
router.get("/job-requests", async (req, res) => {
  try {
    const requests = await JobRequest.find();
    res.json(requests);
  } catch (err) {
    console.error("❌ Error fetching job requests:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Toggle Notifications (older version - keep for compatibility if needed)
router.post("/toggle-notifications", async (req, res) => {
  const { proId, enable } = req.body;
  try {
    const pro = await Pro.findById(proId);
    if (!pro) return res.status(404).json({ error: "Pro not found" });

    pro.notificationsEnabled = enable;
    await pro.save();
    res.json({ success: true, status: pro.notificationsEnabled });
  } catch (err) {
    console.error("❌ Error toggling pro notifications:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
