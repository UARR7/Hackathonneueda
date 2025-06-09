const UserProfile = require("../models/UserProfile");
const { analyzeRisk } = require("../services/geminiService");

const createProfile = async (req, res) => {
  try {
    const profile = req.body;

    // Check if id already exists
    const exists = await UserProfile.findOne({ id: profile.id });
    console.log("Profile ID:", profile.id);
    if (exists) {
      return res
        .status(400)
        .json({ error: "User with this ID already exists" });
    }
    // console.log("Profile data:", profile);
    const { riskScore, suggestions } = await analyzeRisk(profile);

    const saved = await UserProfile.create({
      ...profile,
      riskScore,
      suggestions,
    });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProfileById = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ id: req.params.id });
    if (!profile) return res.status(404).json({ error: "Not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all profiles
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await UserProfile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a profile by ID
const deleteProfileById = async (req, res) => {
  try {
    const deleted = await UserProfile.findOneAndDelete({ id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json({ message: "Profile deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createProfile,
  getProfileById,
  getAllProfiles,
  deleteProfileById,
};
