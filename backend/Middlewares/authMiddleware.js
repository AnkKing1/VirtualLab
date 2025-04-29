// middleware/authMiddleware.js

import jwt from "jsonwebtoken";
import Student from "../models/studentModel.js";
import Faculty from "../models/facultyModel.js"; // If you have a Faculty model

const JWT_SECRET = process.env.JWT_SECRET || "ankit123"; // Use env variable in real apps

export const authenticateStudent = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);

      req.user = await Student.findById(decoded.id).select("-password");


    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};


export const authenticateFaculty = async (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
  
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log(decoded);


        req.user = await Faculty.findById(decoded.id).select("-password");
   
      if (!req.user) {
        return res.status(401).json({ success: false, message: "User not found" });
      }
  
      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
  };
