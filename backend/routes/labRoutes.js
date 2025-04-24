// const express = require('express');
// const router = express.Router();
// const Lab = require('../models/Lab');
// const User = require('../models/User');

// // Faculty creates lab
// router.post('/create', async (req, res) => {
//   const { title, description, facultyId, schedule, questions } = req.body;
//   const lab = new Lab({ title, description, faculty: facultyId, schedule, questions });
//   await lab.save();
//   res.json(lab);
// });

// // Get all labs (for students)
// router.get('/', async (req, res) => {
//   const labs = await Lab.find().populate('faculty', 'username');
//   res.json(labs);
// });

// // Enroll student
// router.post('/enroll', async (req, res) => {
//   const { userId, labId } = req.body;
//   const user = await User.findById(userId);
//   if (user && user.role === "student") {
//     if (!user.enrolledLabs.includes(labId)) {
//       user.enrolledLabs.push(labId);
//       await user.save();
//     }
//     res.json(user);
//   } else {
//     res.status(404).json({ error: 'User not found or not a student' });
//   }
// });

// module.exports = router;
