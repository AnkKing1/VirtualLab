import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }} 
      className="bg-white shadow-md fixed w-full z-50"
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        
        {/* Logo */}
        <div className="flex">
        <div className="text-2xl font-bold">
          <Link to="/"> <img src="/ClabX.jpg" alt="Lab Logo" className="h-10 ml-10 w-10 rounded-full" /></Link>
        </div>

        <Link to="/" className="text-3xl ml-3  font-bold text-purple-600 tracking-wide">
          CLabX
        </Link>
        </div>

        {/* Links */}
        <ul className="flex items-center space-x-8 text-gray-700 text-lg font-medium">
          <li>
            <Link
              to="/about"
              className="hover:text-purple-600 transition-colors duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/resources"
              className="hover:text-purple-600 transition-colors duration-300"
            >
              Resources
            </Link>
          </li>
           <li>
            <Link
              to="/developers"
              className="hover:text-purple-600 transition-colors duration-300"
            >
              Developers
            </Link>
          </li>
          <li>
            <Link
              to="/admin-login"
              className="hover:text-purple-600 transition-colors duration-300"
            >
              Admin Login
            </Link>
          </li>
          {/* <li>
            <Link
              to="/faculty-login"
              className="hover:text-purple-600 transition-colors duration-300"
            >
              Faculty Login
            </Link>
          </li> */}
        </ul>

      </div>
    </motion.nav>
  );
};

export default Navbar;
