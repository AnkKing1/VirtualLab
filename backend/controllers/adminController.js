import Student from '../models/studentModel.js';
import Faculty from '../models/facultyModel.js';
import Admin from '../models/adminModel.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const createToken = (id) => {
  return jwt.sign({ id }, "ankit123", {
    expiresIn: "1d",
  });
};

// To Approve Students
 export const approveStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    const student = await Student.findByIdAndUpdate(
      studentId,
      { isApproved: true },
      { new: true, runValidators: true }
    ).select('-password -confirmPassword');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
      message: 'Student approved successfully',
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error approving Student',
      error: error.message,
    });
  }
};


// To Approve Faculties
export const approveFaculty = async (req, res) => {
    try {
      const facultyId = req.params.id;
  
      const faculty = await Faculty.findByIdAndUpdate(
        facultyId,
        { isApproved: true },
        { new: true, runValidators: true }
      ).select('-password -confirmPassword');
  
      if (!faculty) {
        return res.status(404).json({ message: 'Faculty not found' });
      }
  
      res.status(200).json({
        message: 'Faculty approved successfully',
        faculty,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error approving faculty',
        error: error.message,
      });
    }
  };

// Register Admin 
export const registerAdmin = async (req, res) => {
  const { name, email, password} = req.body;

  try {
    // 1. Validate required fields
    if (!name || !email || !password ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 2. Check if user already exists
    const existingAdmin = await Faculty.findOne({ email });
    if (existingAdmin) {
      return res
        .status(409)
        .json({ message: "Faculty already exists with this email." });
    }

    // 3. Check password match
    // if (password !== confirmPassword) {
    //   return res.status(400).json({ message: "Passwords do not match." });
    // }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Save admin
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
     
    });

    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login Admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find admin
    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(401).json({ message: "Invalid email or password" });

    if (!admin.isApproved) {
      return res
        .status(403)
        .json({ message: "Your account is not approved yet " });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = createToken(admin._id);
    console.log(token);

    // 3. Respond with admin info (you can add JWT token here)
    res.status(200).json({
      message: "Login successful",
      admin: {
        success:true,
        id: admin._id,
        name: admin.name,
        email: admin.email,
        token:token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//forgot password
export const forgotPassword = async (req, res) => {
  const { email, newPassword, confirmNewPassword } = req.body;

  try {
    // 1. Check if admin exists
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin  not found with this email." });
    }

    // 2. Check if passwords match
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match." });
    }

    // 3. Check password strength (basic length check, you can improve)
    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters." });
    }

    // 4. Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 5. Update password
    admin.password = hashedPassword;
    await admin.save();

    res.status(200).json({ success: true, message: "Password updated successfully." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error. Try again later." });
  }
};