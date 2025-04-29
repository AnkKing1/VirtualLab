import express from 'express';
import { registerStudent, loginStudent, getAllStudents,getSingleStudent, forgotPassword, enrollStudent } from '../controllers/studentController.js';
import { authenticateStudent } from '../Middlewares/authMiddleware.js';

const studentRouter = express.Router();

// Student signup
studentRouter.post('/signup', registerStudent);

// Student login
studentRouter.post('/login', loginStudent);

// Get all students
studentRouter.get('/get-students', getAllStudents);

// Get student data
studentRouter.get('/:id',authenticateStudent, getSingleStudent
);

//forgot password
studentRouter.patch('/forgot-password',forgotPassword);

//enroll student
studentRouter.patch('/enroll-student/:labId',enrollStudent)

export default studentRouter;
