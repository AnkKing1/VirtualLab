import Faculty from '../models/facultyModel.js';
import bcrypt from 'bcryptjs';

// this api for college admin
export const registerFaculty = async (req, res) => {
  const { name, email, password, confirmPassword, department } = req.body;

  try {
    // 1. Validate required fields
    if (!name || !email || !password || !confirmPassword || !department) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // 2. Check if user already exists
    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      return res.status(409).json({ message: 'Faculty already exists with this email.' });
    }

    // 3. Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Save faculty
    const faculty = await Faculty.create({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword, // optional: can remove this field from schema
      department,
    });

    res.status(201).json({
      message: 'Faculty registered successfully',
      faculty: {
        id: faculty._id,
        name: faculty.name,
        email: faculty.email,
        department: faculty.department,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const loginFaculty = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find faculty
    const faculty = await Faculty.findOne({ email });
    if (!faculty) return res.status(401).json({ message: 'Invalid email or password' });
    
    if (!faculty.isApproved) {
      return res.status(403).json({ message: 'Your account is not approved yet ' });
    }
    // 2. Compare password
    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    // 3. Respond with faculty info (you can add JWT token here)
    res.status(200).json({
      message: 'Login successful',
      faculty: {
        id: faculty._id,
        name: faculty.name,
        email: faculty.email,
        department: faculty.department,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find().select('-password -confirmPassword'); // hide passwords
    res.status(200).json({ count: faculties.length, faculties });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};


