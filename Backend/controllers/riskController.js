const UserProfile = require('../models/UserProfile');
const { analyzeRisk } = require('../services/geminiService');

const createProfile = async (req, res) => {
  try {
    const profile = req.body;
    const { riskScore, suggestions } = await analyzeRisk(profile);
    const saved = await UserProfile.create({ ...profile, riskScore, suggestions });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createProfile };
