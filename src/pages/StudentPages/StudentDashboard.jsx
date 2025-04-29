import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import StudentNavbar from "../../components/StudentComponent/StudentNavbar";
import CompletedLabSection from "../../components/Common/CompletedLabsSection";
import ActiveLabSection from "../../components/Common/ActiveLabSection";
import Footer from "../LandingPages/Footer";
import { LabScheduleContext } from "../../context/LabScheduleContext";
import axios from "axios";
import { useParams } from "react-router-dom";


const StudentDashboard = () => {
  const {studentId} = useParams();
  const [student, setStudent] = useState({});
  const [error, setError] = useState("");
  const { scheduledLabs } = useContext(LabScheduleContext);
  const today = new Date();
  const activeLabs = scheduledLabs.filter((lab) => new Date(lab.date) >= today);

  const [stats, setStats] = useState({
    completedLabs: 0,
    performance: 0
  });

  
  
  
  useEffect(() => {
    const fetchStudent = async () => {
      try {

        const token = localStorage.getItem("token");

      const res = await axios.get(
        `/api/v1/student/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
        
        if (res.data?.success && res.data.student) {
          setStudent(res.data.student);
          setError(""); // Clear any previous errors
        } else {
          setError("Student not found.");
          console.error("Student not found or error occurred.");
        }
      } catch (err) {
        setError("Failed to fetch student.");
        console.error("API error:", err);
      }
    };
    if (studentId) {
      fetchStudent();
    }
  }, [studentId]);
  

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50">
      {/* Student Navbar */}
      <StudentNavbar />

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
                  src={"../../public/Student.jpeg"}
                  alt="Student"
                  className="relative w-24 h-24 rounded-full border-4 border-white shadow-md"
                />
                {/* student.profileImage ||  */}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Welcome, {student.name}
                </h1>
                <div className="mt-2 space-y-1 text-blue-100">
                  <p className="flex items-center justify-center md:justify-start">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                    Roll Number: {student.registrationNumber}
                  </p>
                  <p className="flex items-center justify-center md:justify-start">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {student.email}
                  </p>
                  <p className="flex items-center justify-center md:justify-start">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                    {student.department}
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
        

        {/* Active and Completed Labs in Grid Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
        >
          {/* Active Labs */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-xl p-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Active Labs
              </h2>
            </div>
            <div className="p-6">
              <ActiveLabSection />
            </div>
          </div>

          {/* Completed Labs */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-t-xl p-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Completed Labs
              </h2>
            </div>
            <div className="p-6">
              <CompletedLabSection />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StudentDashboard;