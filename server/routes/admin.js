const express = require("express");
const router = express.Router();
const Pro = require("../models/Pro");
const JobRequest = require("../models/JobRequest");


// ✅ Get all Pros
router.get("/pros", adminAuth, async (req, res) => {
  try {
    const pros = await Pro.find();
    res.json(pros);
  } catch (err) {
    console.error("❌ Error fetching pros:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Add a new Pro
router.post("/pros", adminAuth, async (req, res) => {
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

// ✅ Toggle SMS notifications for a Pro (Enable/Disable)
router.put("/pros/:id/toggle", adminAuth, async (req, res) => {
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
router.delete("/pros/:id", adminAuth, async (req, res) => {
  try {
    await Pro.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleting pro:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get all Job Requests
router.get("/job-requests", adminAuth, async (req, res) => {
  try {
    const requests = await JobRequest.find();
    res.json(requests);
  } catch (err) {
    console.error("❌ Error fetching job requests:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Older: Toggle Notifications (Optional legacy endpoint for compatibility)
router.post("/toggle-notifications", adminAuth, async (req, res) => {
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
