const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  dosage: {
    type: String,
    required: true   // Example: "500mg"
  },
  frequency: {
    type: String,
    required: true   // Example: "Daily", "Weekly"
  },
  times: {
    type: [String],
    required: true   // Example: ["08:00", "20:00"]
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  isTaken: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);