const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// ✅ Admin login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Check against environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminEmail || !adminPassword) {
      console.error("❌ Admin credentials not configured in environment variables");
      return res.status(500).json({ error: "Admin system not configured" });
    }

    if (email !== adminEmail) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // For simplicity, compare password directly (in production, use bcrypt)
    if (password !== adminPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: adminEmail, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      token,
      admin: {
        email: adminEmail,
        role: "admin"
      }
    });

  } catch (error) {
    console.error("❌ Admin login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post('/register', (req, res) => {
  res.json({ message: 'Auth register endpoint - coming soon', success: false });
});

module.exports = router;
