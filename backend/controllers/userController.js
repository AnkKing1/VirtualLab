import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

// this api for college admin
export const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword, rollNo, department } = req.body;

  try {
    // 1. Validate required fields
    if (!name || !email || !password || !confirmPassword || !rollNo || !department) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    // 3. Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Save user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword, // optional: can remove this field from schema
      rollNo,
      department,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        rollNo: user.rollNo,
        department: user.department,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });
    
    if (!user.isApproved) {
      return res.status(403).json({ message: 'Your account is not approved yet ' });
    }
    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    // 3. Respond with user info (you can add JWT token here)
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        rollNo: user.rollNo,
        department: user.department,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -confirmPassword'); // hide passwords
    res.status(200).json({ count: users.length, users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};


