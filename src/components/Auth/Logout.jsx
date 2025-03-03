import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider"; 

const Logout = () => {
  const { logout } = useAuth(); // Using AuthProvider's logout function
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      setLoading(true);

      setTimeout(() => {
        logout(); // Calls the AuthProvider logout function
        navigate("/");
      }, 1000);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`fixed top-4 right-4 py-2 px-4 rounded-md text-sm font-semibold transition duration-300 shadow-lg ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-red-600 text-white hover:bg-red-700"
      }`}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default Logout;
