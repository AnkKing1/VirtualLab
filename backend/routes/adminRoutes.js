import express from 'express';
import { approveStudent , approveFaculty, registerAdmin, loginAdmin, getAdmin, deleteFaculty, deleteStudent, forgotPassword } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post("/signup", registerAdmin
);

adminRouter.post("/login", loginAdmin);
adminRouter.get("/:id" , getAdmin);
adminRouter.patch('/approve-student/:id', approveStudent);
adminRouter.patch('/approve-faculty/:id', approveFaculty);
adminRouter.delete('/delete-faculty/:id', deleteFaculty);
adminRouter.delete('/delete-student/:id', deleteStudent);

//forgot password
adminRouter.patch('/forgot-password',forgotPassword);




export default adminRouter