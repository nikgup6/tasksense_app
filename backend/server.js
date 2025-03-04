const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');  // For password comparison
const jwt = require('jsonwebtoken'); // For token generation
const userRoutes = require("./routes/studentprofile"); // Import user routes
// Set up the app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRoutes); // Use the user routes
app.use("/api/appointments", require("./routes/appointment"));
// MongoDB connection URL (use your MongoDB Atlas URI here)
const dbURI = 'mongodb+srv://b8286006:WXUCsMiBpxKSdQNG@cluster1.btk0n.mongodb.net/tasksensee?retryWrites=true&w=majority&appName=cluster1';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => console.error("Error connecting to MongoDB Atlas:", err));
// Define your data model (for example, User)
const User = mongoose.model('User', new mongoose.Schema({
    FullName: String,
    email: String,
    password: String,
    studentId: String,
    role: String,
    school: String,
}));
const Faculty = mongoose.model('Faculty', new mongoose.Schema({
    FullName: String,
    email: String,
    password: String,
    facultyId: String, // Faculty-specific identifier
}));









// Handle POST request to register user
// Handle POST request to register user
app.post('/api/users/register', async (req, res) => {
    const { FullName, email, password, studentId, role, school } = req.body;
    console.log('Received request:', req.body);

    // Validation
    if (!FullName || !email || !password || !studentId || !role || !school) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if user with the same email already exists
        const existingEmailUser = await User.findOne({ email: email });
        if (existingEmailUser) {
            return res.status(409).json({ error: 'Email already exists' }); // Return and stop execution here
        }

        // Check if user with the same studentId already exists
        const existingStudentIdUser = await User.findOne({ studentId });
        if (existingStudentIdUser) {
            return res.status(409).json({ error: 'Student ID already exists' }); // Return and stop execution here
        }

        // Hash password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to MongoDB
        const newUser = new User({
            FullName,
            email,
            password: hashedPassword,  // Store the hashed password
            studentId,
            role,
            school
        });

        await newUser.save();
        console.log('User registered successfully:', newUser); // Log for debugging
        return res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Error registering user:', error); // Log for debugging
        return res.status(500).json({ error: 'Error registering user' });
    }
});

// Login Route
app.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, 'backend/.env', { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            FullName: user.FullName,
            studentId: user.studentId,
            email: user.email,
            role: user.role,
            token: token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
