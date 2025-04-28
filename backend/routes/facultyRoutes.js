import express from "express";
import {
  registerFaculty,
  loginFaculty,
  getAllFaculties,
} from "../controllers/facultyController.js";

const facultyRouter = express.Router();

<<<<<<< HEAD
facultyRouter.post('/signup', registerFaculty);

facultyRouter.post('/login', loginFaculty);
facultyRouter.get('/get-faculties', getAllFaculties);
=======
facultyRouter.post("/signup", registerFaculty);

facultyRouter.post("/login", loginFaculty);
facultyRouter.get("/get-faculties", getAllFaculties);
>>>>>>> 7f406780e7b5cf164860ad447b41bd4d9957a2f5

export default facultyRouter;
