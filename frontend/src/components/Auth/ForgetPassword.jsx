import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // <-- Import Framer Motion
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userType = searchParams.get("userType");

  const getUsers = () => {
    const storageKey = userType === "student" ? "students" : userType === "faculty" ? "faculties" : "admin";
    const users = JSON.parse(localStorage.getItem(storageKey)) || [];
    return users;
  };

  const updatePassword = (email, newPassword) => {
    const users = getUsers();
    const userIndex = users.findIndex((user) => user.email === email);

    if (userIndex === -1) return false;

    users[userIndex].password = newPassword;
    const storageKey = userType === "student" ? "students" : userType === "faculty" ? "faculties" : "admin";
    localStorage.setItem(storageKey, JSON.stringify(users));
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !newPassword || !confirmPassword) {
      setMessage("⚠️ All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    if (passwordStrength !== "Strong") {
      setMessage("⚠️ Password must be strong.");
      return;
    }

    setIsSubmitting(true);

    const success = updatePassword(email, newPassword);

    if (success) {
      setMessage("✅ Password updated successfully. Redirecting...");
      setTimeout(() => {
        const redirectPath = userType === "student" ? "/student-login" : userType === "faculty" ? "/faculty-login" : "/admin-login";
        navigate(redirectPath);
      }, 2000);
    } else {
      setMessage("❌ User not found. Please check your email.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      {/* Title Animation */}
      <motion.h2
        className="text-3xl font-bold text-blue-700 mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Reset Your Password
      </motion.h2>

      {/* Message */}
      {message && (
        <motion.p
          className={`mb-4 text-center text-sm font-semibold ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {message}
        </motion.p>
      )}

      {/* Form Animation */}
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Email */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Email Address</label>
          <motion.input
            type="email"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            whileHover={{ scale: 1.05 }}
            whileFocus={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">New Password</label>
          <motion.input
            type="password"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            whileHover={{ scale: 1.05 }}
            whileFocus={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          <PasswordStrengthIndicator password={newPassword} setStrength={setPasswordStrength} />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Confirm New Password</label>
          <motion.input
            type="password"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            whileHover={{ scale: 1.05 }}
            whileFocus={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* Submit button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-all duration-300 disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default ForgotPassword;
