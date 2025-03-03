import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userType = searchParams.get("userType");

  const getUsers = () => {
    const users = JSON.parse(localStorage.getItem(userType === "student" ? "students" : "faculties")) || [];
    return users;
  };

  const updatePassword = (email, newPassword) => {
    const users = getUsers();
    const userIndex = users.findIndex((user) => user.email === email);

    if (userIndex === -1) return false;

    users[userIndex].password = newPassword;
    localStorage.setItem(userType === "student" ? "students" : "faculties", JSON.stringify(users));
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (passwordStrength !== "Strong") {
      setMessage("Password must be strong.");
      return;
    }

    const success = updatePassword(email, newPassword);

    if (success) {
      setMessage("✅ Password updated successfully. Redirecting to login...");
      setTimeout(() => navigate(userType === "student" ? "/student-login" : "/faculty-login"), 2000);
    } else {
      setMessage("❌ User not found. Please check your email.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <h2 className="text-2xl font-bold mb-6">Reset Your Password</h2>
      {message && <p className={`mb-4 text-sm ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>{message}</p>}

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <PasswordStrengthIndicator password={newPassword} setStrength={setPasswordStrength} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Confirm New Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
