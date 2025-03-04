// backend/routes/user.js
const express = require('express');
const router = express.Router();
const { updateUserProfile, uploadProfilePicture, upload } = require('../controllers/userController');

// Update user profile
router.put('/update', updateUserProfile);

// Upload profile picture
router.post('/upload-picture', upload.single('profilePicture'), uploadProfilePicture);

module.exports = router;

