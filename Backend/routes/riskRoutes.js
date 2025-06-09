

// const express = require('express');
// const router = express.Router();

// const UserProfile = require('../models/UserProfile');
// const { createProfile,getProfileById } = require('../controllers/riskController');

// router.post('/profile', createProfile);

// router.get('/profile/:id', getProfileById);


// router.get('/test', (req, res) => {
//     res.json({ message: 'API route is working!' });
//   });
  

// module.exports = router;


const express = require('express');
const router = express.Router();

const {
  createProfile,
  getProfileById,
  getAllProfiles,
  deleteProfileById
} = require('../controllers/riskController');

router.post('/profile', createProfile);
router.get('/profile', getAllProfiles);
router.get('/profile/:id', getProfileById);
router.delete('/profile/:id', deleteProfileById);

router.get('/test', (req, res) => {
  res.json({ message: 'API route is working!' });
});

module.exports = router;
