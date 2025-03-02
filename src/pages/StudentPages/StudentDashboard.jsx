import React, { useState, useEffect } from "react";
import StudentNavbar from "../../components/StudentComponent/StudentNavbar"
import CompletedLabSection from "../../components/Common/CompletedLabsSection";
import ActiveLabSection from "../../components/Common/ActiveLabSection";
import Footer from "../LandingPages/Footer";

const StudentDashboard = () => {
  const [student, setStudent] = useState({});

  useEffect(() => {
    fetch("/students.json")
      .then((response) => response.json())
      .then((data) => setStudent(data))
      .catch((error) => console.error("Error fetching student data:", error));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Student Navbar */}
      <StudentNavbar/>

      {/* Welcome Section */}
      <div className="max-w-6xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md flex items-center space-x-6">
        <img
          src={student.profileImage || "/default-profile.png"}
          alt="Student"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {student.name}</h1>
          <p className="text-gray-600">Reg No: {student.registrationNumber}</p>
          <p className="text-gray-500">{student.department}</p>
          <p className="text-gray-500">{student.email}</p>
        </div>
      </div>

      {/* Active Lab Section */}
      <div className="max-w-6xl mx-auto mt-6">
        <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">🟢 Active Labs</h2>
        </div>
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
          <ActiveLabSection />
        </div>
      </div>

      {/* Completed Lab Section */}
      <div className="max-w-6xl mx-auto mt-6">
        <div className="bg-green-600 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">✅ Completed Labs</h2>
        </div>
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
          <CompletedLabSection />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StudentDashboard;
