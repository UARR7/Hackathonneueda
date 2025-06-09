const express = require('express');
const { createProfile } = require('../controllers/riskController');
const router = express.Router();

router.post('/profile', createProfile);

router.get('/profile/:id', async (req, res) => {
    const profile = await UserProfile.findOne({ id: req.params.id });
    if (!profile) return res.status(404).json({ error: 'Not found' });
    res.json(profile);
  });
  

module.exports = router;
