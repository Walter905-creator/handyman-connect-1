// Vercel Serverless Function for Fixlo Backend
const express = require("express");
const cors = require("cors");

const app = express();

// CORS configuration for Fixlo
const allowedOrigins = ['https://www.fixloapp.com', 'https://fixloapp.com'];

app.use(cors({
  origin: function (origin, callback) {
    console.log(`🔗 CORS check for origin: ${origin}`);
    if (!origin || allowedOrigins.includes(origin)) {
      console.log(`✅ CORS: Allowing origin: ${origin}`);
      callback(null, true);
    } else {
      console.log(`❌ CORS: Blocking origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use(express.json());

// Professional Signup Endpoint
app.post("/api/pro-signup", (req, res) => {
  console.log("🔧 Professional signup request:", req.body);
  
  const { name, email, phone, role } = req.body;
  
  if (!name || !email || !phone) {
    return res.status(400).json({ 
      success: false, 
      message: "Name, email, and phone are required" 
    });
  }
  
  console.log(`📝 New professional signup: ${name} (${email}) - ${phone}`);
  
  res.json({ 
    success: true, 
    message: "Professional signup received successfully!",
    data: { name, email, phone, role }
  });
});

// Homeowner Lead Endpoint
app.post("/api/homeowner-lead", (req, res) => {
  console.log("🏠 Homeowner lead request:", req.body);
  
  const { name, phone, address, service, description } = req.body;
  
  if (!name || !phone || !service) {
    return res.status(400).json({ 
      success: false, 
      message: "Name, phone, and service are required" 
    });
  }
  
  console.log(`📞 New homeowner lead: ${name} (${phone}) needs ${service} at ${address}`);
  
  res.json({ 
    success: true, 
    message: "Service request received successfully!",
    data: { name, phone, address, service, description }
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: 'healthy',
    message: 'Fixlo API is running on Vercel',
    timestamp: new Date().toISOString(),
    version: '2.3.0'
  });
});

// Root route
app.get("/", (req, res) => {
  res.json({ 
    message: "Fixlo Backend is running on Vercel!", 
    status: "healthy",
    timestamp: new Date().toISOString(),
    cors: "enabled for www.fixloapp.com"
  });
});

module.exports = app;
