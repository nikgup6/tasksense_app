const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Your User model

router.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check if the password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Login successful: Return user info
        res.status(200).json({
            message: 'Login successful',
            FullName: user.name, // Include the user's name
        });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

module.exports = router;
