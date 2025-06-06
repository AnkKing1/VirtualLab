import Student from "../models/studentModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Lab from "../models/labModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, "ankit123", {
    expiresIn: "1d",
  });
};
// College Admin Register Student
export const registerStudent = async (req, res) => {
  const {
    name,
    email,
    password,
    registrationNumber,
    department,
    semester,
  } = req.body;

  try {
    // 1. Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !registrationNumber ||
      !department ||
      !semester
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 2. Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res
        .status(409)
        .json({ message: "Student already exists with this email." });
    }

    // 3. Check password match
    // if (password !== confirmPassword) {
    //   return res.status(400).json({ message: "Passwords do not match." });
    // }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Save student
    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
      // confirmPassword: hashedPassword, // optional: can remove in model later if you want
      registrationNumber,
      department,
      semester,
    });

    res.status(201).json({
      message: "Student registered successfully",
      student: {
        success: true,
        id: student._id,
        name: student.name,
        email: student.email,
        registrationNumber: student.registrationNumber,
        department: student.department,
        semester: student.semester,
      },
    });
  } catch (error) {
    console.error("Error during student registration:", error);  // ADD THIS
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Student Login
export const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find student
    const student = await Student.findOne({ email });
    if (!student)
      return res.status(401).json({ message: "Invalid email or password" });

    if (!student.isApproved) {
      return res
        .status(403)
        .json({ message: "Your account is not approved yet." });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = createToken(student._id);
    console.log(token);

    // 3. Respond with student info (JWT token can be added here later)
    res.status(200).json({
      message: "Login successful",
      student: {
        success: true,
        id: student._id,
        name: student.name,
        email: student.email,
        registrationNumber: student.registrationNumber,
        department: student.department,
        semester: student.semester,
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select("-password -confirmPassword"); // Hide sensitive data
    res.status(200).json({ count: students.length, students });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch students", error: error.message });
  }
}; 

//Get a single student
export const getSingleStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id).select("-password"); // Hide password

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email, newPassword} = req.body;
  try {
    // 1. Check if student exists
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found with this email." });
    }

    // 2. Check if passwords match
    // if (newPassword !== confirmNewPassword) {
    //   return res.status(400).json({ success: false, message: "Passwords do not match." });
    // }

    // 3. Check password strength (basic length check, you can improve)
    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters." });
    }

    // 4. Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 5. Update password
    student.password = hashedPassword;
    await student.save();

    res.status(200).json({ success: true, message: "Password updated successfully." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error. Try again later." });
  }
};

// Enroll a student in a lab
export const enrollStudent = async (req, res) => {
  try {
    const { labId } = req.params;
    const { studentId } = req.body;

    const lab = await Lab.findById(labId);

    if (!lab) {
      return res.status(404).json({ success: false, message: "Lab not found" });
    }

    // Check if student already enrolled
    if (lab.studentsEnrolled.includes(studentId)) {
      return res.status(400).json({ success: false, message: "Student already enrolled" });
    }

    lab.studentsEnrolled.push(studentId);
    await lab.save();

    res.status(200).json({
      success: true,
      message: "Student enrolled successfully",
      lab,
    });
  } catch (error) {
    console.error("Error enrolling student:", error);
    res.status(500).json({
      success: false,
      message: "Failed to enroll student",
      error: error.message,
    });
  }
};
