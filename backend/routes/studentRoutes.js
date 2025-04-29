import express from 'express';
import { registerStudent, loginStudent, getAllStudents, forgotPassword, enrollStudent } from '../controllers/studentController.js';

const studentRouter = express.Router();

// Student signup
studentRouter.post('/signup', registerStudent);

// Student login
studentRouter.post('/login', loginStudent);

// Get all students
studentRouter.get('/get-students', getAllStudents);

//forgot password
studentRouter.patch('/forgot-password',forgotPassword);

//enroll student
studentRouter.patch('/enroll-student/:labId',enrollStudent)

export default studentRouter;
