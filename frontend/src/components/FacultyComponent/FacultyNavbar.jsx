import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Logout from "../Auth/Logout";

const FacultyNavbar = () => {
  const { facultyId } = useParams();
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   // Perform any logout actions (clear session, etc.)
  //   const confirmLogout = window.confirm("Are you sure you want to log out?");
  //   if (confirmLogout) {
  //     // Redirect to login page
  //     navigate("/");
  //   } // Navigate to the home/landing page 
  // };

  return (
    <nav className="bg-blue-700 text-white py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Lab Logo */}
        <Link to="/faculty-dashboard" className="flex items-center space-x-2">
          <img src="/ClabX.jpg" alt="Lab Logo" className="h-10 w-10 rounded-full" />
          <span className="text-xl font-semibold">CLabX</span>
        </Link>

        {/* Faculty Dashboard Title */}
        <h1 className="text-2xl font-bold">Faculty Dashboard</h1>

        {/* Profile & Logout */}
        <div className="flex items-center space-x-6">
          {/* Profile */}
          <div
      className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 rounded-xl transition duration-300 ease-in-out"
      onClick={() => navigate(`profile/${facultyId}`)}
    >
      <img
        src="/Faculty.jpeg"
        alt="Profile"
        className="h-10 w-10 rounded-full border-2 border-blue-500 shadow-sm"
      />
      <span className="hidden md:inline text-lg font-semibold text-gray-800">
        Profile
      </span>
    </div>

          {/* Logout Button */}
          {/* <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md font-medium transition"
          >
            Logout
          </button> */}
          <Logout userType="faculty" />

        </div>
      </div>
    </nav>
  );
};

export default FacultyNavbar;
