// routes/labRoutes.js

const express = require('express');
const labRouter = express.Router();
const labController = require('../controllers/labController');

// (Optional) Middleware to protect routes (like checking if user is logged in)
// const { protect } = require('../middlewares/authMiddleware');

// Create a new lab
labRouter.post('/create', /* protect, */ labController.createLab);

// Get all labs
labRouter.get('/', labController.getAllLabs);

// Get a single lab by ID
labRouter.get('/:id', labController.getLabById);

// Update a lab
labRouter.put('/:id', /* protect, */ labController.updateLab);

// Delete a lab
labRouter.delete('/:id', /* protect, */ labController.deleteLab);

export default labRouter;
