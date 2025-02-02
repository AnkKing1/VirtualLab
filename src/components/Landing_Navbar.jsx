import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">College Lab</Link>
        </div>

        {/* Links */}
        <ul className="flex space-x-6 text-lg">
          <li>
            <Link 
              to="/about" 
              className="hover:text-gray-300 transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/resources" 
              className="hover:text-gray-300 transition-colors"
            >
              Resources
            </Link>
          </li>
          <li>
            <Link 
              to="/student-login" 
              className="hover:text-gray-300 transition-colors"
            >
              Student Login
            </Link>
          </li>
          <li>
            <Link 
              to="/faculty-login" 
              className="hover:text-gray-300 transition-colors"
            >
              Faculty Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
