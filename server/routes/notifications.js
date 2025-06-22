// server/routes/notifications.js
const express = require("express");
const router = express.Router();
const twilio = require("twilio");

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Replace with your actual trade-to-phone mapping
const proContacts = {
  Plumbing: "+12345678901",
  Electrical: "+12345678902",
  Carpentry: "+12345678903"
};

router.post("/text", async (req, res) => {
  const { trade, name, email, phone, address, description } = req.body;

  const proPhone = proContacts[trade];
  if (!proPhone) return res.status(400).json({ error: "No pro phone found for trade" });

  try {
    await client.messages.create({
      body: `🛠️ New ${trade} Request from ${name}\n📍 ${address}\n📞 ${phone}\n📧 ${email}\n📝 ${description}`,
      from: process.env.TWILIO_PHONE,
      to: proPhone
    });

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Twilio SMS error:", err.message);
    res.status(500).json({ error: "Failed to send SMS" });
  }
});

module.exports = router;
