const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const stripeRoutes = require('./routes/stripe');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/ai', require('./routes/ai'));

// other imports

app.use('/api/stripe', stripeRoutes);

// ✅ Checkr webhook route
app.post('/webhook/checkr', (req, res) => {
  console.log('🔔 Checkr webhook received:', req.body);
  res.status(200).send('Webhook received');
});

app.get("/api", (req, res) => {
  res.json({ message: "Backend is live!" });
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
