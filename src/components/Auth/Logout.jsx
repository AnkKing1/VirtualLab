import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Confirmation prompt
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Clear user session data
      localStorage.removeItem("userType");
      localStorage.removeItem("userData");

      // Redirect to login page
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="fixed top-4 right-4 bg-red-600 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-red-700 transition duration-300 shadow-lg"
    >
      Logout
    </button>
  );
};

export default Logout;
