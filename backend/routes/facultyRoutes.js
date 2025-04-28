import express from 'express';
import { registerFaculty, loginFaculty, getAllFaculties } from '../controllers/facultyController.js';

const facultyRouter = express.Router();

facultyRouter.post('/signup', registerFaculty);

facultyRouter.post('/login', loginFaculty);
facultyRouter.get('/get-faculties', getAllFaculties);

export default facultyRouter;