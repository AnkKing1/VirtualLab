import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthIndicator from "../PasswordStrengthIndicator";
import { useFacultyAuth } from "../../../context/FacultyAuthProvider";
import { motion } from "framer-motion";
import axios from "axios";

const FacultySignup = () => {
  const { register } = useFacultyAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
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
      const response = await axios.post("http://localhost:5000/api/v1/faculty/signup", {
        ...formData,
      });
      console.log(response);
      if (response.data.success) {
        navigate("/faculty-login");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-2xl rounded-xl overflow-hidden"
      >
        {/* Left Section */}
        <div className="md:w-1/2 bg-gradient-to-br from-purple-600 to-purple-500 text-white flex flex-col justify-center items-center p-10">
          <h1 className="text-4xl font-extrabold mb-4">Faculty Signup</h1>
          <p className="text-lg text-center">Create an account to manage classes.</p>
        </div>

        {/* Right Section - Signup Form */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          {error && (
            <p className="text-red-600 text-center mb-4">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                name="name" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" 
                onChange={handleChange} 
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                name="email" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" 
                onChange={handleChange} 
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Department</label>
              <input 
                type="text" 
                name="department" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" 
                onChange={handleChange} 
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                name="password" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" 
                onChange={handleChange} 
                required 
              />
              <PasswordStrengthIndicator password={formData.password} setStrength={setPasswordStrength} />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" 
                onChange={handleChange} 
                required 
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center text-purple-600 space-y-2">
            <Link to="/faculty-login" className="hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FacultySignup;
