import express from 'express';
import { approveStudent , approveFaculty } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.patch('/approve-student/:id', approveStudent);
adminRouter.patch('/approve-faculty/:id', approveFaculty);


export default adminRouter