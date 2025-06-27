const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const stripeRoutes = require("./routes/stripe");
const aiRoutes = require("./routes/ai");

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

// ✅ Handle preflight requests for all routes
app.options('*', cors());

// ✅ Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/auth', require('./routes/auth'));
app.use("/api/notify", require("./routes/notifications"));
app.use("/api/stripe", stripeRoutes); // Stripe subscription
app.use("/api/ai", aiRoutes);         // OpenAI assistant

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
    cors: "enabled"
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
  process.exit(1);
}

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
  process.exit(1);
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
