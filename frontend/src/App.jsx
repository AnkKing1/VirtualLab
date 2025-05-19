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
import ForgotPassword from "./components/Auth/ForgotPassword";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import EnrolledStudentList from "./components/FacultyComponent/EnrolledStudentList"
import CodeEditor from "./pages/CodeEditor/CodeEditor"; // Added CodeEditor
import AdminLogin from "./components/Auth/AdminAuth/AdminLogin";
import AdminSignup from "./components/Auth/AdminAuth/AdminSignup";
import StudentProfile from "./pages/Profiles/StudentProfile";
import FacultyProfile from "./pages/Profiles/FacultyProfile";
import CheckCodeEditor from "./components/FacultyComponent/CheckCodeEditor"

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import StudentNavbar from "./components/StudentComponent/StudentNavbar";
import FacultyNavbar from "./components/FacultyComponent/FacultyNavbar";
import AdminNavbar from "./pages/AdminDashboard/AdminNavbar";
import Admin from "./pages/AdminDashboard/Admin"
import Developers from "./pages/LandingPages/Developers";

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
    <FacultyNavbar/>
    <Outlet />
    <Footer/>
  </div>
);

// Layout for student-related routes
const StudentLayout = () => (
  <div>
    <StudentNavbar/>
    <Outlet />
    <Footer/>
  </div>
);

// Layout for admin-related routes
const AdminLayout = () => (
  <div>
    <AdminNavbar/>
    <Outlet/>
    <Footer/>
  </div>
);

const App = () => {
  return (
    <AuthProvider>
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
                          path="/admin-login"
                          element={<AdminLogin />}
                        />
                        <Route
                          path="/admin-signup"
                          element={<AdminSignup />}
                        />
                        <Route
                          path="/forgot-password"
                          element={<ForgotPassword />}
                        />

                        <Route
                          path="/developers"
                          element={<Developers />}
                        />
                      </Route>

                      {/* Faculty Dashboard & Related Pages */}
                      <Route path="/faculty" element={<FacultyLayout />}>
                        <Route
                          path="dashboard/:facultyId"
                          element={<FacultyDashboard />}
                        />
                         <Route
                          path="code-editor/:labId/:studentId"
                          element={<CheckCodeEditor />}
                        />
                        <Route
                        path ="EnrolledStudentList/:labId"
                        element={<EnrolledStudentList/>}
                        />
                        <Route path="profile/:facultyId" element={<FacultyProfile />} />
                      </Route>

                      {/* Student Dashboard & Related Pages */}
                      <Route path="/student" element={<StudentLayout />}>

                        <Route
                          path="dashboard/:studentId"
                          element={<StudentDashboard />}
                        />

                        <Route path="profile/:studentId" element={<StudentProfile />} />


                      </Route>

                      
                        <Route
                          path="/code-editor/:labId/:studentId"
                          element={<CodeEditor />}
                        />

                        {/* Admin Dashboard & Related Pages */}
                        <Route path="/admin" element={<AdminLayout/>}>

                          <Route path="dashboard/:adminId" 
                                element={<Admin/>}
                                
                                />

                          <Route path=":adminId/student/profile/:studentId" element={<StudentProfile />} />

                          <Route path=":adminId/faculty/profile/:facultyId" element={<FacultyProfile />} />

                        </Route>

                    </Routes>
    </AuthProvider>
  );
};

export default App;
