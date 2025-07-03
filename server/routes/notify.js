const express = require('express');
const router = express.Router();

// Notification routes for Fixlo backend
router.post('/text', (req, res) => {
  res.json({ 
    message: 'Fixlo notification endpoint', 
    status: 'success',
    data: 'SMS functionality coming soon' 
  });
});

router.post('/email', (req, res) => {
  res.json({ 
    message: 'Fixlo email endpoint', 
    status: 'success',
    data: 'Email functionality coming soon' 
  });
});

module.exports = router;
