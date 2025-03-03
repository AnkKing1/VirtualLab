import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Landing_Navbar from "./components/LandingComponent/Landing_Navbar";
import Footer from "./pages/LandingPages/Footer";
import Home from "./pages/LandingPages/Home";
import About from "./pages/LandingPages/About";
import Resources from "./pages/LandingPages/Resources";
import StudentLogin from "./components/Auth/StudentLogin";
import FacultyLogin from "./components/Auth/FacultyLogin";
import FacultySignup from "./components/Auth/FacultySignup";
import StudentSignup from "./components/Auth/StudentSignup";
import ForgotPassword from "./components/Auth/ForgetPassword";
import FacultyDashboard from "./pages/FacultyPages/FacultyDashboard";
import StudentDashboard from "./pages/StudentPages/StudentDashboard";
import ScheduleLab from "./components/FacultyComponent/ScheduledLab";
import LabSchedule from "./components/FacultyComponent/LabSchedule";
import LabDetails from "./components/FacultyComponent/LabDetails";
import CodeEditor from "./pages/CodeEditor/CodeEditor"; // Added CodeEditor

// Context Providers
import { AuthProvider } from "./context/AuthProvider";
import { LabScheduleProvider } from "./context/LabScheduleContext";
import { EditorProvider } from "./context/EditorContext";
import { InputProvider } from "./context/InputContext";
import { OutputProvider } from "./context/OutputContext";
import { ExecutionProvider } from "./context/ExecutionContext";

// Layout for landing pages (with Navbar & Footer)
const LandingLayout = () => (
  <div>
    <Landing_Navbar />
    <Outlet />
    <Footer />
  </div>
);

// Layout for faculty-related routes
const FacultyLayout = () => (
  <div>
    <Outlet />
  </div>
);

// Layout for student-related routes
const StudentLayout = () => (
  <div>
    <Outlet />
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <LabScheduleProvider>
        <EditorProvider>
          <InputProvider>
            <OutputProvider>
              <ExecutionProvider>
                    <Routes>
                      {/* Landing Pages */}
                      <Route element={<LandingLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/student-login" element={<StudentLogin />} />
                        <Route path="/faculty-login" element={<FacultyLogin />} />
                        <Route path="/faculty-signup" element={<FacultySignup />} />
                        <Route path="/student-signup" element={<StudentSignup />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                      </Route>

                      {/* Faculty Dashboard & Related Pages */}
                      <Route path="/faculty" element={<FacultyLayout />}>
                        <Route path="dashboard" element={<FacultyDashboard />} />
                        <Route path="labschedule" element={<LabSchedule />} />
                        <Route path="schedule-lab" element={<ScheduleLab />} />
                        <Route path="labs/:id" element={<LabDetails />} />
                      </Route>

                      {/* Student Dashboard & Related Pages */}
                      <Route path="/student" element={<StudentLayout />}>
                        <Route path="dashboard" element={<StudentDashboard />} />
                      </Route>

                      {/* Code Editor Route */}
                      <Route path="/code-editor/:labId" element={<CodeEditor />} />
                      
                    </Routes>
              </ExecutionProvider>
            </OutputProvider>
          </InputProvider>
        </EditorProvider>
      </LabScheduleProvider>
    </AuthProvider>
  );
};

export default App;
