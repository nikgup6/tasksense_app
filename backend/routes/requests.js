const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const protect = require('../middleware/authMiddleware');

// Create Request
router.post('/', protect, async (req, res) => {
    const { professor, description, date } = req.body;
    try {
        const request = new Request({
            studentId: req.user.id,
            professor,
            description,
            date,
            status: 'pending',
        });

        await request.save();
        res.status(201).json({ message: 'Request created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create request' });
    }
});
// Get Requests (for logged-in user)
router.get('/', protect, async (req, res) => {
    try {
        const requests = await Request.find({ studentId: req.user.id });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch requests' });
    }
});
// Update Request Status (Faculty action)
router.put('/:id', protect, async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }

        if (req.user.role !== 'faculty') {
            return res.status(403).json({ error: 'Not authorized to approve requests' });
        }

        request.status = req.body.status;
        await request.save();
        res.json({ message: 'Request status updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update request' });
    }
});


module.exports = router;
