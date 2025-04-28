import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // <-- Import axios
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

const StudentSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    registrationNumber: "",
    department: "",
    semester: ""
  });

  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(formData.email)) {
      setError("❌ Invalid email format.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("❌ Passwords do not match.");
      return;
    }

    if (passwordStrength !== "Strong") {
      setError("⚠️ Password must be strong.");
      return;
    }

    try {
      // Send form data to backend API
      const response = await axios.post("/api/v1/student/signup", {
        ...formData,
        userType: "student"
      });

      if (response.data.success) {
        navigate("/student-login");
      } else {
        setError(response.data.message || "Signup failed.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error. Try again later.");
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <div className="md:w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-bold mb-4">Student Signup</h1>
        <p className="text-lg">Create an account to access virtual labs.</p>
      </div>

      <div className="md:w-1/2 bg-white flex flex-col justify-center items-center p-8">
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input 
              type="text" 
              name="name" 
              className="w-full px-4 py-2 border rounded" 
              onChange={handleChange} 
              required 
            />
          </div>
          
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              name="email" 
              className="w-full px-4 py-2 border rounded" 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Registration Number */}
          <div className="mb-4">
            <label className="block text-gray-700">Registration Number</label>
            <input 
              type="text" 
              name="registrationNumber" 
              className="w-full px-4 py-2 border rounded" 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Department */}
          <div className="mb-4">
            <label className="block text-gray-700">Department</label>
            <input 
              type="text" 
              name="department" 
              className="w-full px-4 py-2 border rounded" 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Semester */}
          <div className="mb-4">
            <label className="block text-gray-700">Semester</label>
            <select 
              name="semester"
              className="w-full px-4 py-2 border rounded" 
              onChange={handleChange} 
              required
              value={formData.semester}
            >
              <option value="">Select Semester</option>
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
              <option value="3">3rd Semester</option>
              <option value="4">4th Semester</option>
              <option value="5">5th Semester</option>
              <option value="6">6th Semester</option>
              <option value="7">7th Semester</option>
              <option value="8">8th Semester</option>
            </select>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              name="password" 
              className="w-full px-4 py-2 border rounded" 
              onChange={handleChange} 
              required 
            />
            <PasswordStrengthIndicator password={formData.password} setStrength={setPasswordStrength} />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              className="w-full px-4 py-2 border rounded" 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        <Link to="/student-login" className="mt-4 text-blue-600">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default StudentSignup;
