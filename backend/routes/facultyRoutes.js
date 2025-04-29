import express from "express";
import {
  registerFaculty,
  loginFaculty,
  getAllFaculties,
  forgotPassword,
  getSingleFaculty,
} from "../controllers/facultyController.js";
import { authenticateFaculty } from "../Middlewares/authMiddleware.js";

const facultyRouter = express.Router();

facultyRouter.post("/signup", registerFaculty);

facultyRouter.post("/login", loginFaculty);

facultyRouter.get("/get-faculties", getAllFaculties);

//get a single faculty data
facultyRouter.get("/:id" , authenticateFaculty, getSingleFaculty);

facultyRouter.patch("/forgot-password",forgotPassword);

export default facultyRouter;
