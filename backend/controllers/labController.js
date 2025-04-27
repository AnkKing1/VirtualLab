import Lab from "../models/labModel.js";
// Create a new Lab
export const createLab = async (req, res) => {
  try {
    const { title, facultyName, department, semester, schedule, description } =
      req.body;

    // Validate input fields
    if (!title || !facultyName || !department || !semester || !schedule) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields!" });
    }

    const newLab = new Lab({
      title,
      facultyName,
      department,
      semester,
      schedule,
      description,
      // createdBy: "4567890", // assuming you're using an authentication middleware setting req.user
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

// Get all Labs
export const getLabBySem = async (req, res) => {
  try {
    const { semester } = req.body;

    const lab = await Lab.find({ semester });
    console.log("lab", lab);
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
export const getAllLabs = async (req, res) => {
  try {
    // const labs = await Lab.find().populate("createdBy", "name email");
    const labs = await Lab.find();

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

    const lab = await Lab.findById(labId).populate("createdBy", "name email");

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

// Update a Lab
export const updateLab = async (req, res) => {
  try {
    const labId = req.params.id;
    const updateData = req.body;

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
