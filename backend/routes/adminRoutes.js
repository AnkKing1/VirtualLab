import express from 'express';
import { approveStudent , approveFaculty, registerAdmin, loginAdmin } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post("/signup", registerAdmin
);

adminRouter.post("/login", loginAdmin);
adminRouter.patch('/approve-student/:id', approveStudent);
adminRouter.patch('/approve-faculty/:id', approveFaculty);


export default adminRouter