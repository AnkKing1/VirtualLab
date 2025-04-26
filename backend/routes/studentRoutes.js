import express from 'express';
import { registerStudent, loginStudent, getAllStudents } from '../controllers/studentController.js';

const studentRouter = express.Router();

// Student signup
studentRouter.post('/signup', registerStudent);

// Student login
studentRouter.post('/login', loginStudent);

// Get all students
studentRouter.get('/get-students', getAllStudents);

export default studentRouter;
