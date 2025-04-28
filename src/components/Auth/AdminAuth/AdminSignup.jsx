import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthIndicator from "../PasswordStrengthIndicator";

const AdminSignup = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
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


    if (result.success) {
      navigate("/admin-login");
    } else {
      setError(result.message);
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <div className="md:w-1/2 bg-purple-600 text-white flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-bold mb-4">Admin Signup</h1>
        <p className="text-lg">Create an account to manage Students and Faculties Access.</p>
      </div>


      //Admin Secret code field should be there otherwise anyone can register in admin field 

      <div className="md:w-1/2 bg-white flex flex-col justify-center items-center p-8">
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
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
          <button 
            type="submit" 
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Sign Up
          </button>
        </form>
        <Link to="/admin-login" className="mt-4 text-purple-600">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default AdminSignup;
