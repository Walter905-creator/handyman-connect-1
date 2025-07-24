const express = require('express');
const router = express.Router();
const sendLeadNotification = require('../sendLeadNotification');

// Notification routes for Fixlo backend
router.post('/text', async (req, res) => {
  const { toPhone, service, location } = req.body;
  
  if (!toPhone || !service || !location) {
    return res.status(400).json({ 
      message: 'Missing required fields: toPhone, service, location',
      status: 'error'
    });
  }

  const result = await sendLeadNotification({ toPhone, service, location });
  
  if (result.success) {
    res.json({ 
      message: 'SMS notification sent successfully', 
      status: 'success'
    });
  } else {
    res.status(500).json({ 
      message: 'Failed to send SMS notification', 
      status: 'error',
      error: result.error
    });
  }
});

router.post('/email', (req, res) => {
  res.json({ 
    message: 'Fixlo email endpoint', 
    status: 'success',
    data: 'Email functionality coming soon' 
  });
});

module.exports = router;
