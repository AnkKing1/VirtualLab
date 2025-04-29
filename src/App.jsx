import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Landing_Navbar from "./pages/LandingPages/Landing_Navbar"
import Footer from "./pages/LandingPages/Footer";
import Home from "./pages/LandingPages/Home";
import About from "./pages/LandingPages/About";
import Resources from "./pages/LandingPages/Resources";
import StudentLogin from "./components/Auth/StudentAuth/StudentLogin";
import FacultyLogin from "./components/Auth/FacultyAuth/FacultyLogin";
import FacultySignup from "./components/Auth/FacultyAuth/FacultySignup";
import StudentSignup from "./components/Auth/StudentAuth/StudentSignup";
import ForgotPassword from "./components/Auth/ForgetPassword";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ScheduleLab from "./components/FacultyComponent/ScheduledLab";
import LabSchedule from "./components/FacultyComponent/LabSchedule";
import CodeEditor from "./pages/CodeEditor/CodeEditor"; // Added CodeEditor

// Context Providers
import { LabScheduleProvider } from "./context/LabScheduleContext";
import { EditorProvider } from "./context/EditorContext";
import { InputProvider } from "./context/InputContext";
import { OutputProvider } from "./context/OutputContext";
import { ExecutionProvider } from "./context/ExecutionContext";
import { AuthProvider } from "./context/AuthContext";

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
                        <Route
                          path="/student-login"
                          element={<StudentLogin />}
                        />
                        <Route
                          path="/faculty-login"
                          element={<FacultyLogin />}
                        />
                        <Route
                          path="/faculty-signup"
                          element={<FacultySignup />}
                        />
                        <Route
                          path="student-signup"
                          element={<StudentSignup />}
                        />
                        <Route
                          path="/forgot-password"
                          element={<ForgotPassword />}
                        />
                      </Route>

                      {/* Faculty Dashboard & Related Pages */}
                      <Route path="/faculty" element={<FacultyLayout />}>
                        <Route
                          path="dashboard/:facultyId"
                          element={<FacultyDashboard />}
                        />
                        <Route path="labschedule" element={<LabSchedule />} />
                        <Route path="schedule-lab" element={<ScheduleLab />} />
                      </Route>

                      {/* Student Dashboard & Related Pages */}
                      <Route path="/student" element={<StudentLayout />}>
                        <Route
                          path="dashboard/:studentId"
                          element={<StudentDashboard />}
                        />
                      </Route>

                      {/* Code Editor Route */}
                      <Route
                        path="/code-editor/:labId"
                        element={<CodeEditor />}
                      />
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
