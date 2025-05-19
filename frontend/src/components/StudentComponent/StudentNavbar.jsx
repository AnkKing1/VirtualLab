import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Logout from "../Auth/Logout";

const StudentNavbar = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   // Perform logout actions (clear session, etc.)
  //   navigate("/"); // Navigate to the home/landing page
  // };

  console.log(studentId);

  return (
    <nav className="bg-blue-700 text-white py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Lab Logo */}
        <Link to={`/student/dashboard/${studentId}`} className="flex items-center space-x-2">
          <img src="/ClabX.jpg" alt="Lab Logo" className="h-10 w-10 rounded-full" />
          <span className="text-xl font-semibold">CLabX</span>
        </Link>

        {/* Student Dashboard Title */}
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
 
        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {/* Practice Section */}
        
        <Link
          to={`/code-editor/${123}/${studentId}`}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md font-medium transition"
        >
          Practice
        </Link>


          {/* Profile */}
           <div
      className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 rounded-xl transition duration-300 ease-in-out"
      onClick={() => navigate(`profile/${studentId}`)}
    >
      <img
        src="/Student.jpeg"
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
          <Logout userType="student" />
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
