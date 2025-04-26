import express from 'express';
import { approveUser, approveFaculty } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.patch('/approve-user/:id', approveUser);
adminRouter.patch('/approve-faculty/:id', approveFaculty);


export default adminRouter