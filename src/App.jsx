import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing_Navbar from "./components/Landing_Navbar"; // Adjust the path as necessary
import Home from "./pages/Home";
import About from "./pages/About";
import Resources from "./pages/Resources";
import StudentLogin from "./components/Auth/StudentLogin";
import FacultyLogin from "./components/Auth/FacultyLogin";
import Signup from "./components/Auth/Signup";
import FacultyDashboard from "./pages/FacultyDashboard";
import Footer from "./components/Footer";
import ForgotPassword from "./components/Auth/ForgetPassword";
import StudentDashboard from "./pages/StudentDashboard";
import ScheduleLab from "./components/Dashboard/ScheduleLab";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Landing_Navbar />
              <Home />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div>
              <Landing_Navbar />
              <About />
            </div>
          }
        />
        <Route
          path="/resources"
          element={
            <div>
              <Landing_Navbar />
              <Resources />
            </div>
          }
        />
        <Route
          path="/student-login"
          element={
            <div>
              <Landing_Navbar />
              <StudentLogin />
            </div>
          }
        />
        <Route
          path="/faculty-login"
          element={
            <div>
              <Landing_Navbar />
              <FacultyLogin />
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div>
              <Landing_Navbar />
              <Signup />
            </div>
          }
        />
        <Route path="/facultydashboard" element={<FacultyDashboard />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route
          path="/forgot-password"
          element={
            <div>
              <Landing_Navbar />
              <ForgotPassword />
            </div>
          }
        />
        <Route path="/schedule-lab" element={<ScheduleLab />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
