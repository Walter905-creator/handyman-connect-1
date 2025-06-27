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
  "http://localhost:3000"             // development
];

app.use('/api/admin', require('./routes/admin'));
app.use('/api/auth', require('./routes/auth'));
app.use("/api/notify", require("./routes/notifications"));

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

// ✅ Routes
app.use("/api/stripe", stripeRoutes); // Stripe subscription
app.use("/api/ai", aiRoutes);         // OpenAI assistant

// ✅ Webhook for Checkr
app.post("/webhook/checkr", (req, res) => {
  console.log("🔔 Checkr webhook received:", req.body);
  res.status(200).send("Webhook received");
});

// ✅ Basic health check
app.get("/api", (req, res) => {
  res.json({ message: "Backend is live!" });
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));

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
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
