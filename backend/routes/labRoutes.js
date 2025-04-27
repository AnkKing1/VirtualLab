// routes/labRoutes.js
import express from "express";
const labRouter = express.Router();
import {
  createLab,
  deleteLab,
  getAllLabs,
  getLabById,
  getLabBySem,
  updateLab,
} from "../controllers/labController.js";
// (Optional) Middleware to protect routes (like checking if user is logged in)

// Create a new lab
labRouter.post("/create", createLab);

// Get all labs
labRouter.get("/get-all-labs", getAllLabs);
labRouter.get("/get-lab-sem", getLabBySem);

// Get a single lab by ID
labRouter.get("/:id", getLabById);

// Update a lab
labRouter.put("/:id", /* protect, */ updateLab);

// Delete a lab
labRouter.delete("/:id", /* protect, */ deleteLab);

export default labRouter;
