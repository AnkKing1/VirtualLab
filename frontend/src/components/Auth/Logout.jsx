import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Logout = ({ userType }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { logoutStudent, logoutFaculty, studentToken, facultyToken ,adminToken, logoutAdmin} = useAuth();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      setLoading(true);

      setTimeout(() => {
        if (userType === "student" && studentToken) {
          logoutStudent();  // Log out student if student token is available
        } else if (userType === "faculty" && facultyToken) {
          logoutFaculty();  // Log out faculty if faculty token is available
        }
        else if(userType === "admin" && adminToken){
          logoutAdmin();
        }

        setLoading(false);
        navigate("/");  // Navigate to home or login page after logout
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
