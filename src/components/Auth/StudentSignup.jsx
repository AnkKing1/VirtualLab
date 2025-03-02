import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { saveStudent } from "../../utils/localStorage";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    regNo: "",
    branch: "",
  });

  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(formData.email)) {
      setError("Invalid email format.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (passwordStrength !== "Strong") {
      setError("Password must be strong.");
      return;
    }

    saveStudent(formData);
    navigate("/studentdashboard");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <div className="md:w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-bold mb-4">Student Signup</h1>
        <p className="text-lg">Create an account to access resources.</p>
      </div>

      <div className="md:w-1/2 bg-white flex flex-col justify-center items-center p-8">
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input type="text" name="name" className="w-full px-4 py-2 border rounded" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" name="email" className="w-full px-4 py-2 border rounded" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Registration Number</label>
            <input type="text" name="regNo" className="w-full px-4 py-2 border rounded" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Branch</label>
            <input type="text" name="branch" className="w-full px-4 py-2 border rounded" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" name="password" className="w-full px-4 py-2 border rounded" onChange={handleChange} required />
            <PasswordStrengthIndicator password={formData.password} setStrength={setPasswordStrength} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input type="password" name="confirmPassword" className="w-full px-4 py-2 border rounded" onChange={handleChange} required />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Sign Up</button>
        </form>
        <Link to="/login" className="mt-4 text-blue-600">Already have an account? Login</Link>
      </div>
    </div>
  );
};

export default StudentSignup;
