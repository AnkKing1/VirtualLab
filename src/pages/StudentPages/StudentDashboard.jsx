import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StudentNavbar from "../../components/StudentComponent/StudentNavbar"
import CompletedLabSection from "../../components/Common/CompletedLabsSection";
import ActiveLabSection from "../../components/Common/ActiveLabSection";
import Footer from "../LandingPages/Footer";
import { useContext } from "react";
import { LabScheduleContext } from "../../context/LabScheduleContext";
const StudentDashboard = () => {
  const [student, setStudent] = useState({});
  const { scheduledLabs } = useContext(LabScheduleContext);
  const today = new Date();
  const activeLabs = scheduledLabs.filter((lab) => new Date(lab.date) >= today);
  console.log("activelab:",activeLabs.length)
  const [stats, setStats] = useState({
    completedLabs: 0,
    performance: 0
  });

  useEffect(() => {
    // Fetch student data
    fetch("/students")
      .then((response) => response.json())
      .then((data) => setStudent(data))
      .catch((error) => console.error("Error fetching student data:", error));

    // Fetch student stats
    fetch("/student/stats")
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((error) => console.error("Error fetching student stats:", error));
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50">
      {/* Student Navbar */}
      <StudentNavbar/>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          {...fadeInUp}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full animate-pulse"></div>
                <img
                  src={student.profileImage || "/default-profile.png"}
                  alt="Student"
                  className="relative w-24 h-24 rounded-full border-4 border-white shadow-md"
                />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-white">Welcome, {student.name}</h1>
                <div className="mt-2 space-y-1 text-blue-100">
                  <p className="flex items-center justify-center md:justify-start">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                    </svg>
                    Reg No: {student.registrationNumber}
                  </p>
                  <p className="flex items-center justify-center md:justify-start">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                    {student.department}
                  </p>
                  <p className="flex items-center justify-center md:justify-start">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    {student.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Active Labs</h3>
                <p className="text-2xl font-semibold text-gray-800">{activeLabs.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Completed Labs</h3>
                <p className="text-2xl font-semibold text-gray-800">{stats.completedLabs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm">Performance</h3>
                <p className="text-2xl font-semibold text-gray-800">{stats.performance}%</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Active Lab Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-xl p-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              Active Labs
            </h2>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-b-xl shadow-lg p-6">
            <ActiveLabSection />
          </div>
        </motion.div>

        {/* Completed Lab Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-t-xl p-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Completed Labs
            </h2>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-b-xl shadow-lg p-6">
            <CompletedLabSection />
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StudentDashboard;
