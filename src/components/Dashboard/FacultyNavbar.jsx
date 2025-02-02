import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";

const FacultyNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Confirmation prompt
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
    

      // Redirect to login page
      navigate("/");
    }
  }
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <div className="text-lg font-bold">Virtual Computer Lab</div>
      <ul className="flex space-x-4">
        <li><Link to="/facultydashboard" className="hover:underline">Dashboard</Link></li>
        <li><Link to="/classes" className="hover:underline">Manage Classes</Link></li>
        <li><Link to="/labs" className="hover:underline">Lab Sessions</Link></li>
        <li><Link to="/reports" className="hover:underline">Reports</Link></li>
        <li><Link to="/settings" className="hover:underline">Settings</Link></li>
        
      </ul>
      {/* <div className="flex items-center space-x-2">
        <div className="bg-gray-200 p-2 rounded-full">👤</div>
        <span>Faculty Name</span>
      </div> */}
      <button
      onClick={handleLogout}
      className=" top-4 right-4 bg-red-600 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-red-700 transition duration-300 shadow-lg"
    >
      Logout
    </button>
    </nav>
  );
};

export default FacultyNavbar;
