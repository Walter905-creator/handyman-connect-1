const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !JWT_SECRET) {
    console.error("❌ Missing admin credentials in environment variables");
    return res.status(500).json({ error: "Server configuration error" });
  }

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    try {
      const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1h" });
      return res.json({ token });
    } catch (err) {
      console.error("❌ JWT signing error:", err);
      return res.status(500).json({ error: "Authentication error" });
    }
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;
