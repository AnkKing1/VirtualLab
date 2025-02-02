import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  updateStudentPassword,
  updateFacultyPassword,
} from "../../utils/localStorage";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userType = searchParams.get("userType");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success =
      userType === "student"
        ? updateStudentPassword(email, newPassword)
        : updateFacultyPassword(email, newPassword);

    if (success) {
      setMessage("Password updated successfully. Redirecting to login...");
      setTimeout(
        () =>
          navigate(
            userType === "student" ? "/student-login" : "/faculty-login"
          ),
        1500
      );
    } else {
      setMessage("User not found.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
      {message && <p>{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-md shadow-md"
      >
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
        </div>
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
