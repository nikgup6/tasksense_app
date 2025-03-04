const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const facultySchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    facultyId: { type: String, required: true, unique: true }
});

// Hash password before saving
facultySchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Method to compare passwords
facultySchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Faculty', facultySchema);