import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthIndicator from "../PasswordStrengthIndicator";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const StudentLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {storeTokenInLS} = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/v1/student/login",{... formData});
      console.log(response);
      setLoading(false);

      setTimeout(() => {
        if (response.data.student.success) {
          storeTokenInLS(response.data.student.token);
          navigate("/student/dashboard");
        } else {
          setError(response.data.message||"Invalid email or password.");
        }
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error. Try again later.");
      
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-2xl rounded-xl overflow-hidden"
      >
        {/* Left Section */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-500 text-white flex flex-col justify-center items-center p-10">
          <h1 className="text-4xl font-extrabold mb-4">Student Login</h1>
          <p className="text-lg text-center">Sign in to access your resources and courses.</p>
        </div>

        {/* Right Section - Login Form */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          {error && (
            <p className="text-red-600 text-center mb-4">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <PasswordStrengthIndicator password={formData.password} />
            </div>
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-2 rounded-lg font-semibold ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 transition-all"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center text-blue-600 space-y-2">
            <Link to="/forgot-password" className="hover:underline">
              Forgot Password?
            </Link>
            <Link to="/student-signup" className="hover:underline">
              Sign up as a student
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentLogin;
