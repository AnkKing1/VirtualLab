import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

// Animation configs
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, when: "beforeChildren", staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userType = searchParams.get("userType"); // "student" | "faculty" | "admin"

  console.log(userType);

  const handleSubmit = async (e) => {
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

    try {
      const endpoint = `/api/v1/${userType}/forgot-password`;

      const response = await axios.patch(endpoint, {
        email,
        newPassword,
      });

      setMessage("✅ Password updated successfully. Redirecting...");
      setTimeout(() => {
        const redirectPath =
          userType === "student"
            ? "/student-login"
            : userType === "faculty"
            ? "/faculty-login"
            : "/admin-login";
        navigate(redirectPath);
      }, 2000);
    } catch (error) {
      setMessage(
        "❌ " +
          (error.response?.data?.message || "Failed to update password. Please try again.")
      );
    }

    setIsSubmitting(false);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Title */}
      <motion.h2
        className="text-4xl font-bold text-indigo-700 mb-6 tracking-wide"
        variants={itemVariants}
      >
        🔒 Reset Your Password
      </motion.h2>

      {/* Message */}
      {message && (
        <motion.p
          className={`mb-4 text-center text-sm font-semibold ${
            message.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
          variants={itemVariants}
        >
          {message}
        </motion.p>
      )}

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6"
        variants={itemVariants}
      >
        {/* Email */}
        <motion.div variants={itemVariants}>
          <label className="block mb-1 text-gray-700 font-medium">
            Email Address
          </label>
          <input
            type="email"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </motion.div>

        {/* New Password */}
        <motion.div variants={itemVariants}>
          <label className="block mb-1 text-gray-700 font-medium">
            New Password
          </label>
          <input
            type="password"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <PasswordStrengthIndicator
            password={newPassword}
            setStrength={setPasswordStrength}
          />
        </motion.div>

        {/* Confirm Password */}
        <motion.div variants={itemVariants}>
          <label className="block mb-1 text-gray-700 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </motion.div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition-all duration-300 disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          variants={itemVariants}
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default ForgotPassword;
