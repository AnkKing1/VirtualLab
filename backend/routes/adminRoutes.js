import express from 'express';
import { approveUser } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.patch('/approve-user/:id', approveUser);

export default adminRouter