import React from "react";
import { Link, useNavigate } from "react-router-dom";

const StudentNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions (clear session, etc.)
    navigate("/"); // Navigate to the home/landing page
  };

  return (
    <nav className="bg-blue-700 text-white py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Lab Logo */}
        <Link to="/student-dashboard" className="flex items-center space-x-2">
          <img src="/lab-logo.png" alt="Lab Logo" className="h-10 w-10 rounded-full" />
          <span className="text-xl font-semibold">Virtual Lab</span>
        </Link>

        {/* Student Dashboard Title */}
        <h1 className="text-2xl font-bold">Student Dashboard</h1>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {/* Practice Section */}
          <Link
            to="/practice"
            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md font-medium transition"
          >
            Practice
          </Link>

          {/* Profile */}
          <Link to="/student-profile" className="flex items-center space-x-2">
            <img
              src="/student-profile.jpg"
              alt="Profile"
              className="h-10 w-10 rounded-full border-2 border-white"
            />
            <span className="hidden md:inline text-lg font-medium">Profile</span>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
