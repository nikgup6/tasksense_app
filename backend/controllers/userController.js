// backend/controllers/userController.js
const User = require('../models/User');
const multer = require('multer');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Update user profile
exports.updateUserProfile = async (req, res) => {
    const { userId, fullName, age, address, course } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { fullName, age, address, course },
            { new: true }
        );
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error updating profile' });
    }
};

// Upload profile picture
exports.uploadProfilePicture = (req, res) => {
    const userId = req.body.userId;
    const filePath = req.file.path;
    User.findByIdAndUpdate(userId, { profilePicture: filePath }, { new: true })
        .then((user) => res.json({ message: 'Profile picture updated', user }))
        .catch((error) => res.status(500).json({ error: 'Error uploading picture' }));
};

module.exports = { upload, updateUserProfile, uploadProfilePicture };
