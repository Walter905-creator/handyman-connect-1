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

// ✅ Allow cross-origin requests from Fixlo frontend and mobile app
const allowedOrigins = [
  "https://www.fixloapp.com", // main production domain
  "https://fixloapp.com", // production domain without www
  "https://api.fixloapp.com", // API subdomain
  "https://fixloapp-git-main-walters-projects-b292b340.vercel.app", // Vercel deployment
  "https://fixloapp-dkx54608c-walters-projects-b292b340.vercel.app", // Alternative Vercel URL
  "https://fixlo-backend.onrender.com", // Fixlo backend
  "http://localhost:3000",             // development
  "http://localhost:10000",            // local server
  "exp://localhost:8081",              // Expo development server
  "exp://localhost:19000",             // Expo development server (alternative port)
  "exp://localhost:19001",             // Expo development server (alternative port)
  "exp://localhost:19002"              // Expo development server (alternative port)
];

// ✅ Apply CORS middleware BEFORE routes
app.use(cors({
  origin: function (origin, callback) {
    console.log(`🔗 CORS check for origin: ${origin}`);
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('✅ CORS: Allowing request with no origin');
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log(`✅ CORS: Allowing origin: ${origin}`);
      callback(null, true);
    } else {
      console.log(`❌ CORS: Blocking origin: ${origin}`);
      console.log(`📋 Allowed origins: ${allowedOrigins.join(', ')}`);
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

// ✅ Handle preflight requests for all routes
app.options('*', cors());

// ✅ Routes with specific rate limiting
app.use('/api/admin', adminRateLimit, require('./routes/admin'));
app.use('/api/auth', authRateLimit, require('./routes/auth'));
app.use("/api/notify", require("./routes/notify"));
app.use("/api/stripe", require("./routes/stripe")); // Stripe subscription

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

// ✅ Global error handler (must be last middleware)
app.use(errorHandler);

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
  console.log(`✅ Fixlo Backend v2.2.0 - Professional architecture ready`);
});
