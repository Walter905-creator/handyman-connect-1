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

// Import models and services
const Pro = require("./models/Pro");
const geocodingService = require("./utils/geocoding");

dotenv.config();

// ✅ Define allowed origins (for production and local dev)
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS 
  ? process.env.CORS_ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : [
    'https://www.fixloapp.com',
    'https://fixloapp.com',
    'http://localhost:3000'
  ];

console.log('🔍 CORS Configuration:');
console.log('📋 Allowed Origins:', allowedOrigins);
console.log('🌐 Environment CORS_ALLOWED_ORIGINS:', process.env.CORS_ALLOWED_ORIGINS || 'not set (using defaults)');

const app = express();
const server = http.createServer(app);

// ✅ EARLY OPTIONS HANDLER - Bypass ALL middleware to prevent redirects
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    const requestOrigin = req.headers.origin;
    console.log(`🔍 Early OPTIONS handler: ${req.path} from origin: "${requestOrigin || 'null'}"`);
    
    // Determine allowed origin
    let allowedOrigin;
    if (!requestOrigin) {
      // No origin - use default
      allowedOrigin = 'https://www.fixloapp.com';
      console.log('✅ No origin - using default: https://www.fixloapp.com');
    } else if (allowedOrigins.includes(requestOrigin)) {
      // Origin is allowed - use it
      allowedOrigin = requestOrigin;
      console.log(`✅ Origin "${requestOrigin}" is allowed`);
    } else {
      // Origin not allowed - deny
      console.log(`❌ Origin "${requestOrigin}" is not allowed`);
      console.log(`📋 Allowed origins: ${allowedOrigins.join(', ')}`);
      return res.status(403).json({ error: 'CORS policy violation' });
    }
    
    res
      .header('Access-Control-Allow-Origin', allowedOrigin)
      .header('Access-Control-Allow-Methods', 'POST, OPTIONS, GET, PUT, DELETE, HEAD')
      .header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin')
      .header('Access-Control-Allow-Credentials', 'true')
      .header('Access-Control-Max-Age', '86400')
      .sendStatus(204);
    return;
  }
  next();
});

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

// ✅ Enable CORS for regular requests (after OPTIONS bypass)
app.use(cors({
  origin: function (origin, callback) {
    console.log(`🔍 CORS Origin check: "${origin || 'null'}"`);
    console.log(`📋 Checking against allowed origins: ${JSON.stringify(allowedOrigins)}`);
    
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) {
      console.log('✅ No origin provided - allowing request (server-to-server)');
      return callback(null, true);
    }
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      console.log(`✅ Origin "${origin}" is allowed`);
      return callback(null, true);
    } else {
      console.log(`❌ Origin "${origin}" is NOT allowed`);
      console.log(`📋 Allowed origins: ${allowedOrigins.join(', ')}`);
      return callback(new Error(`CORS policy does not allow origin: ${origin}`));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Accept',
    'Accept-Language', 
    'Content-Language',
    'Content-Type',
    'Origin',
    'Authorization',
    'X-Requested-With',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
  ],
  exposedHeaders: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials']
}));

app.use(express.json());

// ✅ EXPLICIT OPTIONS HANDLERS - Before any other routes to prevent redirects
app.options('/api/pro-signup', (req, res) => {
  const requestOrigin = req.headers.origin;
  console.log(`🎯 Explicit OPTIONS /api/pro-signup from origin: "${requestOrigin || 'null'}"`);
  
  // Validate origin
  let allowedOrigin;
  if (!requestOrigin) {
    allowedOrigin = 'https://www.fixloapp.com';
  } else if (allowedOrigins.includes(requestOrigin)) {
    allowedOrigin = requestOrigin;
  } else {
    console.log(`❌ Origin "${requestOrigin}" not allowed for /api/pro-signup`);
    return res.status(403).json({ error: 'CORS policy violation' });
  }
  
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400');
  res.sendStatus(204);
});

app.options('/api/homeowner-lead', (req, res) => {
  const requestOrigin = req.headers.origin;
  console.log(`🎯 Explicit OPTIONS /api/homeowner-lead from origin: "${requestOrigin || 'null'}"`);
  
  // Validate origin
  let allowedOrigin;
  if (!requestOrigin) {
    allowedOrigin = 'https://www.fixloapp.com';
  } else if (allowedOrigins.includes(requestOrigin)) {
    allowedOrigin = requestOrigin;
  } else {
    console.log(`❌ Origin "${requestOrigin}" not allowed for /api/homeowner-lead`);
    return res.status(403).json({ error: 'CORS policy violation' });
  }
  
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400');
  res.sendStatus(204);
});

// ✅ Catch-all OPTIONS handler for any /api/* path
app.options('/api/*', (req, res) => {
  const requestOrigin = req.headers.origin;
  console.log(`🎯 Catch-all OPTIONS ${req.path} from origin: "${requestOrigin || 'null'}"`);
  
  // Validate origin
  let allowedOrigin;
  if (!requestOrigin) {
    allowedOrigin = 'https://www.fixloapp.com';
  } else if (allowedOrigins.includes(requestOrigin)) {
    allowedOrigin = requestOrigin;
  } else {
    console.log(`❌ Origin "${requestOrigin}" not allowed for ${req.path}`);
    return res.status(403).json({ error: 'CORS policy violation' });
  }
  
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS, GET, PUT, DELETE, HEAD');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400');
  res.sendStatus(204);
});

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

// ✅ Path normalization check - Prevent trailing slash redirects
app.use((req, res, next) => {
  // Log all API requests for debugging
  if (req.path.startsWith('/api/')) {
    console.log(`🔍 API Request: ${req.method} ${req.path} from ${req.headers.origin || 'unknown'}`);
    
    // Check for trailing slash issues that might cause redirects
    if (req.path.endsWith('/') && req.path !== '/api/') {
      console.log(`⚠️  Potential trailing slash issue: ${req.path}`);
    }
  }
  next();
});

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
app.post("/api/pro-signup", async (req, res) => {
  console.log("🔧 Professional signup request:", req.body);
  
  const { name, email, phone, trade, location, dob, role } = req.body;
  
  // Validate required fields
  if (!name || !email || !phone || !trade || !location || !dob) {
    return res.status(400).json({ 
      success: false, 
      message: "Name, email, phone, trade, location, and date of birth are required" 
    });
  }

  // Validate age (must be 18+)
  const birthDate = new Date(dob);
  const age = Math.floor((Date.now() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  
  if (age < 18) {
    return res.status(400).json({
      success: false,
      message: "You must be 18 or older to join Fixlo as a professional"
    });
  }

  try {
    // Check if professional already exists
    const existingPro = await Pro.findOne({ email: email.toLowerCase() });
    if (existingPro) {
      return res.status(409).json({
        success: false,
        message: "A professional with this email already exists"
      });
    }

    // Geocode the location
    console.log(`🗺️  Geocoding location: ${location}`);
    const geoResult = await geocodingService.geocodeLocation(location);
    
    if (!geoResult.coordinates || !geocodingService.validateCoordinates(geoResult.coordinates)) {
      console.error('❌ Invalid coordinates returned from geocoding');
      return res.status(400).json({
        success: false,
        message: "Could not determine location. Please provide a valid ZIP code or address."
      });
    }

    // Create new professional
    const newPro = new Pro({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      trade: trade,
      location: {
        type: 'Point',
        coordinates: geoResult.coordinates,
        address: geoResult.address
      },
      dob: birthDate
    });

    // Save to database
    await newPro.save();
    console.log(`✅ New professional saved: ${name} (${email}) - ${trade} in ${location}`);

    // TODO: Send welcome email and SMS notifications
    // TODO: Trigger background check process
    
    res.json({ 
      success: true, 
      message: "Professional signup received successfully! Welcome to Fixlo!",
      data: {
        id: newPro._id,
        name: newPro.name,
        email: newPro.email,
        phone: newPro.phone,
        trade: newPro.trade,
        location: newPro.location.address,
        joinedDate: newPro.joinedDate
      }
    });

  } catch (error) {
    console.error('❌ Error saving professional:', error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A professional with this email already exists"
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later."
    });
  }
});

// ✅ Lead Routing Endpoint - Find nearby professionals
app.post("/api/route-lead", async (req, res) => {
  console.log("🎯 Lead routing request:", req.body);
  
  const { trade, location, customerInfo } = req.body;
  
  // Validate required fields
  if (!trade || !location) {
    return res.status(400).json({
      success: false,
      message: "Trade and location are required"
    });
  }

  try {
    // Geocode the customer location
    console.log(`🗺️  Geocoding customer location: ${location}`);
    const geoResult = await geocodingService.geocodeLocation(location);
    
    if (!geoResult.coordinates || !geocodingService.validateCoordinates(geoResult.coordinates)) {
      return res.status(400).json({
        success: false,
        message: "Could not determine location. Please provide a valid ZIP code or address."
      });
    }

    // Find nearby professionals (within 30 miles)
    const matchedPros = await Pro.findNearbyPros(trade, geoResult.coordinates, 30);
    
    if (matchedPros.length === 0) {
      console.log(`❌ No ${trade} professionals found within 30 miles of ${location}`);
      return res.status(404).json({
        success: false,
        message: `No ${trade} professionals found in your area. We're working to expand our network!`
      });
    }

    console.log(`✅ Found ${matchedPros.length} ${trade} professionals within 30 miles`);

    // Calculate distances for each professional
    const prosWithDistance = matchedPros.map(pro => {
      const distance = geocodingService.calculateDistance(
        geoResult.coordinates,
        pro.location.coordinates
      );
      
      return {
        id: pro._id,
        name: pro.name,
        email: pro.email,
        phone: pro.phone,
        rating: pro.rating,
        completedJobs: pro.completedJobs,
        distance: Math.round(distance * 10) / 10, // Round to 1 decimal place
        experience: pro.experience,
        isVerified: pro.isVerified
      };
    });

    // Sort by rating first, then by distance
    prosWithDistance.sort((a, b) => {
      if (a.rating !== b.rating) {
        return b.rating - a.rating; // Higher rating first
      }
      return a.distance - b.distance; // Closer distance first
    });

    // TODO: Send notifications to matched professionals
    console.log(`📞 Would notify ${prosWithDistance.length} professionals:`);
    prosWithDistance.forEach(pro => {
      console.log(`  - ${pro.name} (${pro.distance} miles away, ${pro.rating}⭐)`);
    });

    // TODO: Create lead record in database
    // TODO: Send SMS/email notifications to professionals
    // TODO: Send confirmation to customer

    res.json({
      success: true,
      message: `Found ${prosWithDistance.length} ${trade} professionals in your area`,
      data: {
        trade: trade,
        location: geoResult.address,
        coordinates: geoResult.coordinates,
        matchedPros: prosWithDistance,
        searchRadius: 30 // miles
      }
    });

  } catch (error) {
    console.error('❌ Error routing lead:', error);
    res.status(500).json({
      success: false,
      message: "Error finding professionals. Please try again later."
    });
  }
});

// ✅ Get Trade Statistics
app.get("/api/trade-stats", async (req, res) => {
  try {
    const stats = await Pro.getTradeStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('❌ Error getting trade stats:', error);
    res.status(500).json({
      success: false,
      message: "Error retrieving trade statistics"
    });
  }
});

// ✅ Get Professionals in Area (for admin/debugging)
app.get("/api/pros-in-area", async (req, res) => {
  const { location, radius = 30 } = req.query;
  
  if (!location) {
    return res.status(400).json({
      success: false,
      message: "Location is required"
    });
  }

  try {
    const geoResult = await geocodingService.geocodeLocation(location);
    
    if (!geoResult.coordinates) {
      return res.status(400).json({
        success: false,
        message: "Could not geocode location"
      });
    }

    const pros = await Pro.find({
      isActive: true,
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: geoResult.coordinates
          },
          $maxDistance: radius * 1609.34 // Convert miles to meters
        }
      }
    }).select('name email trade location rating completedJobs isVerified');

    res.json({
      success: true,
      data: {
        location: geoResult.address,
        coordinates: geoResult.coordinates,
        radius: radius,
        count: pros.length,
        professionals: pros
      }
    });

  } catch (error) {
    console.error('❌ Error finding pros in area:', error);
    res.status(500).json({
      success: false,
      message: "Error finding professionals"
    });
  }
});
app.post("/api/pro-signup-proxy", (req, res) => {
  console.log("🔧 Proxy professional signup request:", req.body);
  
  const { name, email, phone, role } = req.body;
  
  if (!name || !email || !phone) {
    return res.status(400).json({ 
      success: false, 
      message: "Name, email, and phone are required" 
    });
  }
  
  // TODO: Save to database and send notifications
  console.log(`📝 New professional signup (proxy): ${name} (${email}) - ${phone}`);
  
  res.json({ 
    success: true, 
    message: "Professional signup received successfully! (via proxy)",
    data: { name, email, phone, role }
  });
});

// ✅ Homeowner Lead Endpoint (Enhanced with Professional Matching)
app.post("/api/homeowner-lead", async (req, res) => {
  console.log("🏠 Homeowner lead request:", req.body);
  
  const { name, phone, address, service, description } = req.body;
  
  if (!name || !phone || !service) {
    return res.status(400).json({ 
      success: false, 
      message: "Name, phone, and service are required" 
    });
  }

  try {
    // Route the lead to find matching professionals
    const routingResult = await findMatchingProfessionals(service, address || 'Unknown');
    
    // TODO: Create lead record in database
    // TODO: Send notifications to matched professionals
    // TODO: Send confirmation to customer
    
    console.log(`📞 New homeowner lead: ${name} (${phone}) needs ${service} at ${address}`);
    
    const responseData = {
      success: true,
      message: "Service request received successfully!",
      customerData: { name, phone, address, service, description },
      matchingInfo: routingResult
    };

    // If no professionals found, still accept the lead but inform customer
    if (!routingResult.success) {
      responseData.message = "Service request received! We're finding the best professionals in your area and will contact you soon.";
    }

    res.json(responseData);

  } catch (error) {
    console.error('❌ Error processing homeowner lead:', error);
    
    // Still accept the lead even if matching fails
    res.json({
      success: true,
      message: "Service request received! We will contact you soon with available professionals.",
      customerData: { name, phone, address, service, description },
      matchingInfo: { success: false, message: "Professional matching will be done manually" }
    });
  }
});

// Helper function to find matching professionals
async function findMatchingProfessionals(service, location) {
  try {
    // Map service names to trade types
    const serviceToTrade = {
      'plumbing': 'plumbing',
      'electrical': 'electrical',
      'landscaping': 'landscaping',
      'cleaning': 'cleaning',
      'house cleaning': 'cleaning',
      'junk removal': 'junk_removal',
      'handyman': 'handyman',
      'hvac': 'hvac',
      'heating': 'hvac',
      'air conditioning': 'hvac',
      'painting': 'painting',
      'roofing': 'roofing',
      'flooring': 'flooring',
      'carpentry': 'carpentry',
      'appliance repair': 'appliance_repair'
    };

    const trade = serviceToTrade[service.toLowerCase()] || 'handyman';
    
    // Geocode the location
    const geoResult = await geocodingService.geocodeLocation(location);
    
    if (!geoResult.coordinates) {
      return { success: false, message: "Could not determine location" };
    }

    // Find nearby professionals
    const matchedPros = await Pro.findNearbyPros(trade, geoResult.coordinates, 30);
    
    return {
      success: true,
      trade: trade,
      location: geoResult.address,
      matchedCount: matchedPros.length,
      professionals: matchedPros.slice(0, 5).map(pro => ({
        id: pro._id,
        name: pro.name,
        rating: pro.rating,
        completedJobs: pro.completedJobs,
        distance: Math.round(
          geocodingService.calculateDistance(geoResult.coordinates, pro.location.coordinates) * 10
        ) / 10
      }))
    };

  } catch (error) {
    console.error('❌ Error finding matching professionals:', error);
    return { success: false, message: "Error finding professionals" };
  }
}

// ✅ Backup Proxy Endpoint for Homeowner Leads
app.post("/api/homeowner-lead-proxy", (req, res) => {
  console.log("🏠 Proxy homeowner lead request:", req.body);
  
  const { name, phone, address, service, description } = req.body;
  
  if (!name || !phone || !service) {
    return res.status(400).json({ 
      success: false, 
      message: "Name, phone, and service are required" 
    });
  }
  
  // TODO: Save to database and notify professionals
  console.log(`📞 New homeowner lead (proxy): ${name} (${phone}) needs ${service} at ${address}`);
  
  res.json({ 
    success: true, 
    message: "Service request received successfully! (via proxy)",
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
  const requestOrigin = req.headers.origin;
  console.log(`🧪 CORS test request from origin: "${requestOrigin || 'null'}"`);
  
  res.json({ 
    message: "Fixlo CORS is working!", 
    requestOrigin: requestOrigin,
    allowedOrigins: allowedOrigins,
    corsEnabled: true,
    preflightSupported: true,
    originAllowed: !requestOrigin || allowedOrigins.includes(requestOrigin),
    timestamp: new Date().toISOString()
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
    cors: "enabled for fixloapp.com, www.fixloapp.com, localhost:3000",
    preflightSupported: true
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
  console.log(`\n🔗 CORS Configuration:`);
  console.log(`📋 Allowed Origins: ${allowedOrigins.join(', ')}`);
  console.log(`🌐 Environment Variable: ${process.env.CORS_ALLOWED_ORIGINS || 'not set (using defaults)'}`);
  console.log(`✅ Both www.fixloapp.com and fixloapp.com are allowed`);
  console.log(`✅ CORS preflight OPTIONS requests enabled for all routes`);
  console.log(`✅ Fixlo Backend v2.3.0 - API-only mode - No frontend serving`);
  console.log(`\n🧪 Test CORS with: curl -H "Origin: https://www.fixloapp.com" -X OPTIONS https://fixloapp.onrender.com/api/cors-test`);
});
