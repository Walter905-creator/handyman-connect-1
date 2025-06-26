const mongoose = require("mongoose");

const JobRequestSchema = new mongoose.Schema({
  trade: String,
  name: String,
  email: String,
  phone: String,
  address: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("JobRequest", JobRequestSchema);
