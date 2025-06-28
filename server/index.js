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
      "https://www.handyman-connect.com",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST"]
  }
});

// ✅ Allow cross-origin requests from frontend (production & dev)
const allowedOrigins = [
  "https://www.handyman-connect.com", // production domain
  "https://handyman-connect-1-1.onrender.com", // your render backend URL
  "http://localhost:3000",             // development
  "http://localhost:10000"             // local server
];

// ✅ Apply CORS middleware BEFORE routes
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(express.json());

// ✅ Serve static files from React build (production)
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../client/build');
  app.use(express.static(buildPath));
  console.log(`📁 Serving static files from: ${buildPath}`);
  console.log(`🌍 NODE_ENV = ${process.env.NODE_ENV}`);
  console.log(`📦 Build directory exists: ${require('fs').existsSync(buildPath)}`);
}

// ✅ Request logging
app.use(requestLogger);

// ✅ Apply security headers
app.use(securityHeaders);

// ✅ Apply input sanitization
app.use(sanitizeInput);

// ✅ Apply rate limiting
app.use(generalRateLimit);

// ✅ Handle preflight requests for all routes
app.options('*', cors());

// ✅ Routes with specific rate limiting
app.use('/api/admin', adminRateLimit, require('./routes/admin'));
app.use('/api/auth', authRateLimit, require('./routes/auth'));
app.use("/api/notify", require("./routes/notifications"));
app.use("/api/stripe", require("./routes/stripe")); // Stripe subscription

// ✅ Webhook for Checkr
app.post("/webhook/checkr", (req, res) => {
  console.log("🔔 Checkr webhook received:", req.body);
  res.status(200).send("Webhook received");
});

// ✅ Basic health check
app.get("/api", (req, res) => {
  res.json({ 
    message: "Backend is live!", 
    timestamp: new Date().toISOString(),
    cors: "enabled",
    version: "2.0.0-with-ai-improvements"
  });
});

// ✅ CORS test endpoint
app.get("/api/cors-test", (req, res) => {
  res.json({ 
    message: "CORS is working!", 
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
    CLIENT_URL: process.env.CLIENT_URL || 'not set',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ? 'set ✅' : 'missing ❌',
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID ? 'set ✅' : 'missing ❌',
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN ? 'set ✅' : 'missing ❌',
    TWILIO_PHONE: process.env.TWILIO_PHONE || 'not set',
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? 'set ✅' : 'missing ❌',
    STRIPE_FIRST_MONTH_PRICE_ID: process.env.STRIPE_FIRST_MONTH_PRICE_ID ? 'set ✅' : 'missing ❌',
    STRIPE_MONTHLY_PRICE_ID: process.env.STRIPE_MONTHLY_PRICE_ID ? 'set ✅' : 'missing ❌'
  };

  res.json({
    message: "Environment Variables Status",
    environment: envStatus,
    timestamp: new Date().toISOString()
  });
});

// ✅ Database health check
app.get("/api/health", async (req, res) => {
  try {
    // Check database connection
    const dbState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    // Try to perform a simple database operation
    const prosCount = await mongoose.model('Pro').countDocuments();
    const requestsCount = await mongoose.model('JobRequest').countDocuments();
    
    res.json({
      status: 'healthy',
      database: states[dbState],
      collections: {
        pros: prosCount,
        jobRequests: requestsCount
      },
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({
      status: 'unhealthy',
      error: err.message,
      database: 'error',
      timestamp: new Date().toISOString()
    });
  }
});

// ✅ MongoDB connection
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI environment variable is not set!");
  console.log("🔧 Running in demo mode without database...");
} else {
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
    console.error("❌ MongoDB connection error:", err.message);
    console.error("❌ Make sure MONGO_URI is set correctly");
    console.log("🔧 Continuing without database connection...");
  });

  // Monitor MongoDB connection
  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('✅ MongoDB reconnected');
  });
}

// ✅ Serve React app for non-API routes (production)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    console.log(`🔍 Serving frontend for path: ${req.path}`);
    // Don't serve React app for API routes
    if (req.path.startsWith('/api') || req.path.startsWith('/webhook')) {
      return res.status(404).json({
        error: 'API endpoint not found',
        message: `Cannot ${req.method} ${req.originalUrl}`,
      });
    }
    
    const buildPath = path.join(__dirname, '../client/build');
    const indexPath = path.join(buildPath, 'index.html');
    console.log(`📄 Serving index.html from: ${indexPath}`);
    res.sendFile(indexPath);
  });
} else {
  console.log(`⚠️  Not in production mode. NODE_ENV = ${process.env.NODE_ENV}`);
}

// ✅ 404 handler for unmatched non-GET routes
app.use((req, res) => {
  // Only handle non-GET requests that weren't caught above
  if (req.method !== 'GET') {
    res.status(404).json({
      error: 'Route not found',
      message: `Cannot ${req.method} ${req.originalUrl}`,
      availableEndpoints: [
        'GET /api - Health check',
        'GET /api/health - Database health',
        'GET /api/env-check - Environment variables status',
        'POST /api/auth/login - Admin login',
        'GET /api/admin/pros - Get professionals (auth required)',
        'POST /api/notify/text - Submit job request',
        'POST /api/ai/ask - AI assistant',
        'POST /api/stripe/create-checkout-session - Create payment session'
      ]
    });
  }
});

// ✅ Global error handler (must be last middleware)
app.use(errorHandler);

// ✅ Socket.io connection handling
io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

// ✅ Start server
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📅 Started at: ${new Date().toISOString()}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 CORS enabled for: ${JSON.stringify(allowedOrigins)}`);
});
