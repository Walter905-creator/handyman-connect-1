const mongoose = require("mongoose");

const proSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    maxLength: [100, 'Name cannot exceed 100 characters']
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'],
    match: [/^\+?[\d\s\-\(\)]+$/, 'Please provide a valid phone number'],
    unique: true
  },
  trade: { 
    type: String, 
    required: [true, 'Trade is required'],
    enum: {
      values: ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'HVAC', 'Roofing'],
      message: 'Trade must be one of: Plumbing, Electrical, Carpentry, Painting, HVAC, Roofing'
    }
  },
  wantsNotifications: { 
    type: Boolean, 
    default: true 
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt fields
});

// Create indexes for better performance
proSchema.index({ trade: 1, wantsNotifications: 1 });
proSchema.index({ phone: 1 });

module.exports = mongoose.model("Pro", proSchema);
