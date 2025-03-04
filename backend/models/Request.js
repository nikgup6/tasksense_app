// backend/models/Request.js
const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    facultyName: { type: String, required: true },
    description: { type: String, required: true },
    meetingDate: { type: Date, required: true },
    status: { type: String, enum: ['upcoming', 'pending', 'completed'], default: 'pending' },
});

module.exports = mongoose.model('Request', RequestSchema);
