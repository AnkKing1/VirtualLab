import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/LandingPages/Home";
import About from "./pages/LandingPages/About";
import Landing_Navbar from "./components/LandingComponent/Landing_Navbar"
import Resources from "./pages/LandingPages/Resources";
import StudentLogin from "./components/Auth/StudentLogin";
import FacultyLogin from "./components/Auth/FacultyLogin";
import FacultyDashboard from "./pages/FacultyPages/FacultyDashboard";
import Footer from "./pages/LandingPages/Footer";
import ForgotPassword from "./components/Auth/ForgetPassword";
import StudentDashboard from "./pages/StudentPages/StudentDashboard";
import ScheduleLab from "./components/FacultyComponent/ScheduledLab";
import LabSchedule from "./components/FacultyComponent/LabSchedule";
import FacultySignup from "./components/Auth/FacultySignup";
import StudentSignup from "./components/Auth/StudentSignup";

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
          path="/FacultySignup"
          element={
            <div>
              <Landing_Navbar />
              <FacultySignup />
            </div>
          }
        />
        <Route
          path="/StudentSignup"
          element={
            <div>
              <Landing_Navbar />
              <StudentSignup />
            </div>
          }
        />
        <Route path="/labschedule" element={<LabSchedule />} />
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
