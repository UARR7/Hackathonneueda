
const express = require('express');
const router = express.Router();

const UserProfile = require('../models/UserProfile');
const { createProfile } = require('../controllers/riskController');

router.post('/profile', createProfile);

router.get('/profile/:id', async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ id: req.params.id });
    if (!profile) return res.status(404).json({ error: 'Not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/test', (req, res) => {
    res.json({ message: 'API route is working!' });
  });
  

module.exports = router;
