const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty'); // Import Faculty model

// Faculty Registration Route
router.post('/api/faculty/register', async (req, res) => {
    const { name, email, password, facultyId } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password || !facultyId) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if faculty with the same email or facultyId already exists
    const facultyExists = await Faculty.findOne({ email });
    if (facultyExists) {
        return res.status(400).json({ error: 'Faculty already exists' });
    }

    try {
        const newFaculty = new Faculty({ name, email, password, facultyId });
        await newFaculty.save();
        res.status(201).json({ message: 'Faculty registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering faculty' });
    }
});

// Faculty Login Route
router.post('/api/faculty/login', async (req, res) => {
    const { email, password } = req.body;

    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await faculty.matchPassword(password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({
        message: 'Login successful',
        faculty: {
            name: faculty.name,
            email: faculty.email,
            facultyId: faculty.facultyId
        }
    });
});

module.exports = router;
