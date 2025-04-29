import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthIndicator from "../PasswordStrengthIndicator";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const FacultyLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {storeTokenInLS } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/v1/faculty/login",{... formData});
      console.log(response);

      setTimeout(() => {
        setLoading(false);
        if (response.data.faculty.success) {
          storeTokenInLS(response.data.faculty.token);
          navigate("/faculty/dashboard");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-white p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        {/* Left Section */}
        <div className="md:w-1/2 bg-gradient-to-br from-purple-600 to-purple-400 text-white flex flex-col justify-center items-center p-10">
          <h1 className="text-4xl font-extrabold mb-4">Faculty Login</h1>
          <p className="text-center text-lg font-light">Sign in to manage your classes and resources.</p>
        </div>

        {/* Right Section - Login Form */}
        <div className="md:w-1/2 flex flex-col justify-center p-8 md:p-12">
          {error && (
            <motion.p 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-red-500 text-center mb-4"
            >
              {error}
            </motion.p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
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
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <PasswordStrengthIndicator password={formData.password} />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className={`w-full bg-purple-600 text-white py-2 rounded-lg font-semibold transition-all ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          <div className="flex flex-col items-center mt-6 space-y-2">
            <Link 
              to="/forgot-password" 
              className="text-sm text-purple-600 hover:underline"
            >
              Forgot Password?
            </Link>
            <Link 
              to="/faculty-signup" 
              className="text-sm text-purple-600 hover:underline"
            >
              Sign up as a faculty
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FacultyLogin;
