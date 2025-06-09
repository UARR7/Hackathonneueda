const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
  income: Number,
  expenses: Number,
  debt: Number,
  savings: Number,
  creditUtilization: Number,
  riskScore: Number,
  suggestions: [String]
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);
