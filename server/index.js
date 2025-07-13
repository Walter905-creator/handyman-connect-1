// Fixlo Backend API - v2.3.0 - API-ONLY MODE (No frontend serving)
// Last updated: 2025-07-04 - Removed all client/build references
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const { generalRateLimit, authRateLimit, adminRateLimit } = require("./middleware/rateLimiter");
const securityHeaders = require("./middleware/security");
const sanitizeInput = require("./middleware/sanitization");
const errorHandler = require("./middleware/errorHandler");
const requestLogger = require("./middleware/logger");
const path = require("path");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "https://www.fixloapp.com",
      "https://fixloapp.com",
      "https://api.fixloapp.com",
      "https://fixloapp-git-main-walters-projects-b292b340.vercel.app",
      "https://fixloapp-dkx54608c-walters-projects-b292b340.vercel.app",
      "https://fixlo-backend.onrender.com",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST"]
  }
});

// === FIXLOAPP.COM CORS CONFIGURATION ===
// Add CORS to allow requests from https://www.fixloapp.com
// 1. Use the cors package already required at the top
// 2. Allow origin https://www.fixloapp.com only
// 3. Enable credentials and standard HTTP methods
// 4. Allow preflight OPTIONS requests

const allowedOrigins = ['https://www.fixloapp.com'];

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

app.options('*', cors()); // Handle preflight requests

app.use(express.json());

// ✅ Backend is API-only - Frontend served by Vercel
console.log(`🌍 NODE_ENV = ${process.env.NODE_ENV}`);
console.log(`� Fixlo backend running in API-only mode`);
console.log(`📱 Frontend served by Vercel at: https://fixloapp.com`);

// ✅ Request logging
try {
  app.use(requestLogger);
  console.log('✅ Request logger middleware loaded');
} catch (error) {
  console.error('❌ Request logger middleware failed:', error.message);
}

// ✅ Apply security headers
try {
  app.use(securityHeaders);
  console.log('✅ Security headers middleware loaded');
} catch (error) {
  console.error('❌ Security headers middleware failed:', error.message);
}

// ✅ Apply input sanitization
try {
  app.use(sanitizeInput);
  console.log('✅ Input sanitization middleware loaded');
} catch (error) {
  console.error('❌ Input sanitization middleware failed:', error.message);
}

// ✅ Apply rate limiting
try {
  app.use(generalRateLimit);
  console.log('✅ Rate limiting middleware loaded');
} catch (error) {
  console.error('❌ Rate limiting middleware failed:', error.message);
}

// ✅ Routes with specific rate limiting
app.use('/api/admin', adminRateLimit, require('./routes/admin'));
app.use('/api/auth', authRateLimit, require('./routes/auth'));
app.use("/api/notify", require("./routes/notify"));
app.use("/api/stripe", require("./routes/stripe")); // Stripe subscription

// ✅ Professional Signup Endpoint
app.post("/api/pro-signup", (req, res) => {
  console.log("🔧 Professional signup request:", req.body);
  
  const { name, email, phone, role } = req.body;
  
  if (!name || !email || !phone) {
    return res.status(400).json({ 
      success: false, 
      message: "Name, email, and phone are required" 
    });
  }
  
  // TODO: Save to database and send notifications
  console.log(`📝 New professional signup: ${name} (${email}) - ${phone}`);
  
  res.json({ 
    success: true, 
    message: "Professional signup received successfully!",
    data: { name, email, phone, role }
  });
});

// ✅ Homeowner Lead Endpoint
app.post("/api/homeowner-lead", (req, res) => {
  console.log("🏠 Homeowner lead request:", req.body);
  
  const { name, phone, address, service, description } = req.body;
  
  if (!name || !phone || !service) {
    return res.status(400).json({ 
      success: false, 
      message: "Name, phone, and service are required" 
    });
  }
  
  // TODO: Save to database and notify professionals
  console.log(`📞 New homeowner lead: ${name} (${phone}) needs ${service} at ${address}`);
  
  res.json({ 
    success: true, 
    message: "Service request received successfully!",
    data: { name, phone, address, service, description }
  });
});

// ✅ Webhook for Checkr (background checks for Fixlo professionals)
app.post("/webhook/checkr", (req, res) => {
  console.log("🔔 Fixlo Checkr webhook received:", req.body);
  res.status(200).send("Fixlo webhook received");
});

// ✅ Basic health check
app.get("/api", (req, res) => {
  res.json({ 
    message: "Fixlo Backend API is live!", 
    timestamp: new Date().toISOString(),
    cors: "enabled",
    version: "2.2.0-fixlo-professional-backend",
    architecture: "static-frontend-api-backend"
  });
});

// ✅ CORS test endpoint
app.get("/api/cors-test", (req, res) => {
  res.json({ 
    message: "Fixlo CORS is working!", 
    origin: req.headers.origin,
    allowedOrigins: allowedOrigins
  });
});

// ✅ Environment diagnostic endpoint
app.get("/api/env-check", (req, res) => {
  const envStatus = {
    NODE_ENV: process.env.NODE_ENV || 'not set',
    MONGO_URI: process.env.MONGO_URI ? 'set ✅' : 'missing ❌',
    JWT_SECRET: process.env.JWT_SECRET ? 'set ✅' : 'missing ❌',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL ? 'set ✅' : 'missing ❌',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? 'set ✅' : 'missing ❌',
    CLIENT_URL: process.env.CLIENT_URL || 'not set ❌ (required for Stripe)',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ? 'set ✅' : 'missing ❌',
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID ? 'set ✅' : 'missing ❌',
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN ? 'set ✅' : 'missing ❌',
    TWILIO_PHONE: process.env.TWILIO_PHONE || 'not set',
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? 'set ✅' : 'missing ❌ (required for payments)',
    STRIPE_FIRST_MONTH_PRICE_ID: process.env.STRIPE_FIRST_MONTH_PRICE_ID ? 'set ✅' : 'missing ❌',
    STRIPE_MONTHLY_PRICE_ID: process.env.STRIPE_MONTHLY_PRICE_ID ? 'set ✅' : 'missing ❌',
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET ? 'set ✅' : 'missing (optional)'
  };

  res.json({
    message: "Fixlo Environment Variables Status",
    environment: envStatus,
    timestamp: new Date().toISOString(),
    stripeStatus: process.env.STRIPE_SECRET_KEY ? 'configured' : 'not configured',
    paymentReady: process.env.STRIPE_SECRET_KEY && process.env.CLIENT_URL && 
                  (process.env.STRIPE_FIRST_MONTH_PRICE_ID || process.env.STRIPE_MONTHLY_PRICE_ID) ? 
                  'ready ✅' : 'not ready ❌'
  });
});

// ✅ Health check endpoint (works with or without database)
app.get("/api/health", async (req, res) => {
  try {
    // Check database connection if available
    const dbState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    let databaseInfo = {
      state: states[dbState],
      available: dbState === 1
    };
    
    // Only try database operations if connected
    if (dbState === 1) {
      try {
        // Check if models exist before using them
        if (mongoose.models.Pro) {
          databaseInfo.prosCount = await mongoose.model('Pro').countDocuments();
        }
        if (mongoose.models.JobRequest) {
          databaseInfo.requestsCount = await mongoose.model('JobRequest').countDocuments();
        }
      } catch (dbErr) {
        databaseInfo.error = `Database query failed: ${dbErr.message}`;
      }
    }
    
    res.json({
      status: 'healthy',
      message: 'Fixlo API is running',
      database: databaseInfo,
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      version: '2.3.0'
    });
  } catch (err) {
    res.status(200).json({
      status: 'partial',
      message: 'Fixlo API is running (database issues)',
      error: err.message,
      database: 'unavailable',
      timestamp: new Date().toISOString()
    });
  }
});

// ✅ MongoDB connection (optional - app works without it)
if (process.env.MONGO_URI) {
  console.log("🔍 Connecting to MongoDB...");
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    console.log(`📊 Database: ${mongoose.connection.name}`);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    console.log("🔧 Continuing without database (API still functional)...");
  });

  // Monitor MongoDB connection (non-fatal errors)
  mongoose.connection.on('error', (err) => {
    console.error('⚠️ MongoDB error (non-fatal):', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB disconnected (continuing without database)');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('✅ MongoDB reconnected');
  });
} else {
  console.log("📝 No MONGO_URI provided - running in database-free mode");
}

// ✅ API-only backend - No frontend serving needed
// Frontend is served by Vercel at https://fixloapp.com
console.log(`� Fixlo backend running in API-only mode`);

// ✅ Global error handler (must be last middleware)
app.use(errorHandler);

// ✅ Root route for Render health check
app.get("/", (req, res) => {
  res.json({ 
    message: "Fixlo Backend is running!", 
    status: "healthy",
    timestamp: new Date().toISOString(),
    cors: "enabled for www.fixloapp.com"
  });
});

// ✅ Socket.io connection handling
io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

// ✅ Start Fixlo server
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`🚀 Fixlo Backend running on port ${PORT}`);
  console.log(`📅 Started at: ${new Date().toISOString()}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 CORS enabled for Fixlo domains: ${JSON.stringify(allowedOrigins)}`);
  console.log(`✅ Fixlo Backend v2.3.0 - API-only mode - No frontend serving`);
});
