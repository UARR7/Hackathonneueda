const express = require('express');
const { createProfile } = require('../controllers/riskController');
const router = express.Router();

router.post('/profile', createProfile);

module.exports = router;
