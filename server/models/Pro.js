const mongoose = require("mongoose");

const proSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  trade: { type: String, required: true },  // Example: Plumbing, Electrical, etc.
  wantsNotifications: { type: Boolean, default: true }  // ✅ This controls SMS opt-in/out
});

module.exports = mongoose.model("Pro", proSchema);
