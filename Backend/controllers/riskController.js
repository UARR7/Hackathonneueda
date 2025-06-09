const UserProfile = require('../models/UserProfile');
const { analyzeRisk } = require('../services/geminiService');

const createProfile = async (req, res) => {
    try {
      const profile = req.body;
  
      // Check if id already exists
      const exists = await UserProfile.findOne({ id: profile.id });
      if (exists) {
        return res.status(400).json({ error: "User with this ID already exists" });
      }
  
      const { riskScore, suggestions } = await analyzeRisk(profile);
      const saved = await UserProfile.create({ ...profile, riskScore, suggestions });
      res.json(saved);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

module.exports = { createProfile };
