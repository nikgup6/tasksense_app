const express = require("express");
const router = express.Router();

// Middleware to authenticate token
const authenticateToken = require("../middleware/authMiddleware"); // Ensure you have this middleware

// Route to get user profile
router.get("/api/users/profile", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; // Extracted from token
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            fullName: user.fullName,
            email: user.email,
            studentId: user.studentId,
            age: user.age,
            course: user.course,
            address: user.address,
            role: user.role,
            school: user.school
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Route to update user profile
router.put("/api/users/profile", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { fullName, age, course, address } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name: fullName, age, course, address },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
