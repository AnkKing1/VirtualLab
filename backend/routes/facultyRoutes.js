import express from 'express';
import { registerFaculty, loginFaculty, getAllFaculties } from '../controllers/facultyController.js';

const facultyRouter = express.Router();

facultyRouter.post('/faculty-signup', registerFaculty);

facultyRouter.post('/faculty-login', loginFaculty);
facultyRouter.get('/get-faculties', getAllFaculties);

export default facultyRouter;