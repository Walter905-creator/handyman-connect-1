// checkrWebhook.js or inside your main express file
const express = require('express');
const router = express.Router();

router.post('/webhook/checkr', express.json(), (req, res) => {
  console.log('✅ Webhook received from Checkr:', req.body);

  // You can handle different event types here
  // For example:
  if (req.body.type === 'report.completed') {
    const reportId = req.body.data.id;
    // Save to DB or trigger an action
  }

  res.status(200).send('Webhook received');
});

module.exports = router;
