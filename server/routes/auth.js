const express = require('express');
const router = express.Router();

// Authentication routes for Fixlo backend
router.post('/login', (req, res) => {
  res.json({ message: 'Auth login endpoint - coming soon', success: false });
});

router.post('/register', (req, res) => {
  res.json({ message: 'Auth register endpoint - coming soon', success: false });
});

module.exports = router;
