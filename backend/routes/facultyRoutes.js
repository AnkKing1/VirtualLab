import express from "express";
import {
  registerFaculty,
  loginFaculty,
  getAllFaculties,
  forgotPassword,
} from "../controllers/facultyController.js";

const facultyRouter = express.Router();

facultyRouter.post("/signup", registerFaculty);

facultyRouter.post("/login", loginFaculty);

facultyRouter.get("/get-faculties", getAllFaculties);
<<<<<<< HEAD
=======

facultyRouter.patch("/forgot-password",forgotPassword);
>>>>>>> fa34cbade8afbcfb0f77b82b60b1ef7fe7af134e

export default facultyRouter;
