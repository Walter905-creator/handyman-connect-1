const express = require('express');
const router = express.Router();

// Admin routes for Fixlo backend
router.get('/pros', (req, res) => {
  res.json({ message: 'Admin pros endpoint - coming soon', pros: [] });
});

router.get('/job-requests', (req, res) => {
  res.json({ message: 'Admin job requests endpoint - coming soon', requests: [] });
});

module.exports = router;
