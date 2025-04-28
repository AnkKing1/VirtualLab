import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PasswordStrengthIndicator from "../PasswordStrengthIndicator";

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
      const response = await axios.post("http://localhost:5000/api/v1/student/signup", { ...formData });
      console.log(response);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl w-full">
        
        {/* Left Section */}
        <div className="md:w-1/2 bg-blue-600 flex flex-col items-center justify-center p-10 text-white">
          <h1 className="text-4xl font-bold mb-4">Student Signup</h1>
          <p className="text-lg text-center">Create an account to access virtual labs and resources.</p>
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          {error && (
            <div className="mb-4 text-red-600 font-semibold text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                required
              />
            </div>

            {/* Registration Number */}
            <div>
              <label className="block text-gray-700 mb-1">Registration Number</label>
              <input
                type="text"
                name="registrationNumber"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                required
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-gray-700 mb-1">Department</label>
              <input
                type="text"
                name="department"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                required
              />
            </div>

            {/* Semester */}
            <div>
              <label className="block text-gray-700 mb-1">Semester</label>
              <select
                name="semester"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                value={formData.semester}
                required
              >
                <option value="">Select Semester</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
                <option value="5th">5th</option>
                <option value="6th">6th</option>
                <option value="7th">7th</option>
                <option value="8th">8th</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                required
              />
              <PasswordStrengthIndicator password={formData.password} setStrength={setPasswordStrength} />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-all duration-300"
            >
              Sign Up
            </button>
          </form>

          {/* Bottom Link */}
          <div className="text-center mt-4">
            <Link to="/student-login" className="text-blue-600 hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentSignup;
