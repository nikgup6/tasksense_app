const express = require("express");
const router = express.Router();
const appointment = require("../models/appointment");
const authMiddleware = require("../middleware/authMiddleware");

// 📌 POST: Request an Appointment
router.post("/", async (req, res) => {
  const { studentName, studentEmail, facultyName, facultyEmail, title,description, date, time } = req.body;

  const newappointment = new appointment({
    studentName,
    studentEmail,
    facultyName,
    facultyEmail,
    title,
    description,
    date,
    time,
  });

  try {
    const savedappointment = await newappointment.save();
    res.status(201).json(savedappointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/appointments", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from token
    const appointments = await appointment.find({ userId }).sort({ date: 1 });

    res.json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 📌 GET: Fetch Student’s Appointments by Email
router.get("/student/:email", async (req, res) => {
  try {
    const appointments = await appointment.find({ studentEmail: req.params.email });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/faculty/:email', async (req, res) => {
  try {
      const { email } = req.params;
      const appointments = await appointment.find({ facultyEmail: email });
      res.json(appointments);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// 📌 PATCH: Faculty Updates Appointment Status
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedappointment = await appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedappointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
