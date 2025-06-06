import Lab from "../models/labModel.js";
import mongoose from 'mongoose'

console

// Create a new Lab
export const createLab = async (req, res) => {
  try {
    const { title, semester, schedule, duration, description, createdBy } =
      req.body;

      const objectId = new mongoose.Types.ObjectId(createdBy);
    // Validate input fields
    if (!title || !semester || !schedule || ! duration || ! createdBy) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields!" });
    }

    const newLab = new Lab({
      title,
      semester,
      schedule: new Date(schedule),
      duration,
      description,
      createdBy:objectId,
    });

    await newLab.save();

    return res.status(201).json({
      success: true,
      message: "Lab created successfully!",
      lab: newLab,
    });
  } catch (error) {
    console.error("Error in createLab:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};




export const getLabBySem = async (req, res) => {
  try {
    const { semester } = req.query;

    const lab = await Lab.find({ semester }).populate("createdBy", "name email") ;
    // console.log("lab", lab);
    if (!lab) {
      return res.json({
        success: false,
        message: "No lab scheduled yet",
      }); 
    }

    return res.json({
      success: true,
      lab,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all labas
export const getAllLabs = async (req, res) => {
  try {
    const labs = await Lab.find().populate("createdBy", "name email");
    // const labs = await Lab.find();

    res.status(200).json({
      success: true,
      labs,
    });
  } catch (error) {
    console.error("Error in getAllLabs:", error);
    return res.status(500).json({ message: "Internal Server hello Error" });
  }
};

// Get a Lab by ID 
export const getLabById = async (req, res) => {
  try {
    const labId = req.params.id;
    const Id = new mongoose.Types.ObjectId(labId);
    console.log(Id);
    const lab = await Lab.findById({_id : Id}).populate("createdBy", "name email");

    if (!lab) {
      return res.status(404).json({ message: "Lab not found" });
    }

    return res.status(200).json({
      success: true,
      lab,
    });
  } catch (error) {
    console.error("Error in getLabById:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// all labs created by 
export const getLabsByFacultyId = async (req, res) => {
  try {
    const { facultyId } = req.query;
    const Id = new mongoose.Types.ObjectId(facultyId);
    // console.log("Received facultyId:", facultyId); // ✅ log it

    if (!facultyId) {
      return res.status(400).json({ message: "facultyId is required" });
    }

    const labs = await Lab.find({ createdBy: Id }).populate(
      "createdBy",
      "name email"
    );

    return res.status(200).json({
      success: true,
      labs,
    });
  } catch (error) {
    console.error("Error in getLabsByFacultyId:", error); // ✅ more descriptive
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// Update a Lab
export const updateLab = async (req, res) => {
  try {
    const labId = req.params.id;
    const updateData = req.body;
    
    // console.log(updateData);
    const updatedLab = await Lab.findByIdAndUpdate(labId, updateData, {
      new: true,
      runValidators: true,
    });


    if (!updatedLab) {
      return res.status(404).json({ message: "Lab not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Lab updated successfully!",
      lab: updatedLab,
    });
  } catch (error) {
    console.error("Error in updateLab:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a Lab
export const deleteLab = async (req, res) => {
  try {
    const labId = req.params.id;

    const deletedLab = await Lab.findByIdAndDelete(labId);

    if (!deletedLab) {
      return res.status(404).json({ message: "Lab not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Lab deleted successfully!",
    });
  } catch (error) {
    console.error("Error in deleteLab:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// to get list of all students
export const getEnrolledStudentsByLab = async (req, res) => {
  try {
    const { labId } = req.params;


    const lab = await Lab.findById(labId).populate("studentsEnrolled");

    if (!lab) {
      return res.status(404).json({ message: "Lab not found" });
    }

     return res.status(200).json({
      labTitle: lab.title,
      totalEnrolled: lab.studentsEnrolled.length,
      students: lab.studentsEnrolled,
    });
  } catch (error) {
    console.error("Error fetching enrolled students:", error);
    res.status(500).json({ message: "Server error" });
  }
};
