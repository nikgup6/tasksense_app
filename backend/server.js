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
app.use("/api/appointments", require("./routes/appointments"));
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


// Faculty Registration Route
app.post('/api/faculty/register', async (req, res) => {
    const { FullName, email, password, facultyId } = req.body;

    // Validation
    if (!FullName || !email || !password || !facultyId) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save faculty to MongoDB
    try {
        const newFaculty = new Faculty({
            FullName,
            email,
            password: hashedPassword,
            facultyId,
        });
        await newFaculty.save();
        res.status(201).json({ message: 'Faculty registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering faculty' });
    }
});

// Faculty Login Route
app.post('/api/faculty/login', async (req, res) => {
    const { email, password } = req.body;

    // Find faculty in the database
    try {
        const faculty = await Faculty.findOne({ email });
        if (!faculty) {
            return res.status(404).json({ error: 'Faculty not found' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, faculty.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // If using JWT (optional)
        const token = jwt.sign({ id: faculty._id, email: faculty.email }, 'backend/.env', { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            FullName: faculty.FullName,  // Include full name here
            token: token,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in faculty' });
    }
});





// Handle POST request to register user

// Handle POST request to register user
app.post('/api/users/register', async (req, res) => {
    const { FullName, email, password, studentId, role, school } = req.body;

    // Validation
    if (!FullName || !email || !password || !studentId || !role || !school) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
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
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Login Route
app.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
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
