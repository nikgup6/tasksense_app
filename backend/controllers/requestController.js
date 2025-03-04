// backend/controllers/requestController.js
const Request = require('../models/Request');

// Create a new request
exports.createRequest = async (req, res) => {
    const { studentId, facultyName, description, meetingDate } = req.body;
    try {
        const newRequest = new Request({
            studentId,
            facultyName,
            description,
            meetingDate,
        });
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ error: 'Error creating request' });
    }
};

// Get requests for a student
exports.getRequestsByStudent = async (req, res) => {
    const { studentId, status } = req.query;
    try {
        const requests = await Request.find({ studentId, status });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching requests' });
    }
};

// Update request status
exports.updateRequestStatus = async (req, res) => {
    const { requestId, status } = req.body;
    try {
        const request = await Request.findByIdAndUpdate(requestId, { status }, { new: true });
        if (!request) return res.status(404).json({ error: 'Request not found' });
        res.json(request);
    } catch (error) {
        res.status(500).json({ error: 'Errorr updating request status' });
    }
};
