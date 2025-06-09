const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true // enforce uniqueness
  },
  name: {
    type: String,
    required: true
  },
  income: Number,
  expenses: Number,
  debt: Number,
  savings: Number,
  creditUtilization: Number,
  riskScore: Number,
  suggestions: [String]
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);
