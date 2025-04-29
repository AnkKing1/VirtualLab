import React, { useState, useEffect } from "react";
import FacultyNavbar from "../components/FacultyComponent/FacultyNavbar";
import LabSchedule from "../components/FacultyComponent/LabSchedule";
import ScheduledLab from "../components/FacultyComponent/ScheduledLab";
import Footer from "./LandingPages/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";

const FacultyDashboard = () => {
  
  const [faculty, setFaculty] = useState({});
  const {facultyId} = useParams();
  const [error, setError] = useState("");

  console.log(facultyId);
  useEffect(() => {
    const fetchFaculty = async () => {
      try {

        const token = localStorage.getItem("token");

      const res = await axios.get(
        `/api/v1/faculty/${facultyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
        
        if (res.data?.success && res.data.faculty) {
          setFaculty(res.data.faculty);
          setError(""); // Clear any previous errors
        } else {
          setError("Faculty not found.");
          console.error("Faculty not found or error occurred.");
        }
      } catch (err) {
        setError("Failed to fetch faculty.");
        console.error("API error:", err);
      }
    };
    if (facultyId) {
      fetchFaculty();
    }
  }, [facultyId]);

  console.log(faculty);

  const [showLabSchedule, setShowLabSchedule] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Faculty Navbar */}
      <FacultyNavbar />

      {/* Welcome Section */}
      <div className="max-w-6xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md flex items-center space-x-6">
        <img
          src={faculty.profileImage || "../../public/Faculty.jpeg"}
          alt="Faculty"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {faculty.name}</h1>
          <p className="text-gray-600">{faculty.designation}</p>
          <p className="text-gray-500">{faculty.department}</p>
          <p className="text-gray-500">{faculty.email}</p>
        </div>
      </div>

      {/* Lab Schedule Card */}
      <div className="max-w-6xl mx-auto mt-6">
        <div
          className="bg-blue-600 text-white p-4 rounded-lg shadow-md cursor-pointer flex justify-between items-center"
          onClick={() => setShowLabSchedule(!showLabSchedule)}
        >
          <h2 className="text-xl font-semibold">📅 Lab Scheduling</h2>
          <span className="text-2xl">{showLabSchedule ? "▲" : "▼"}</span>
        </div>
        {showLabSchedule && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <LabSchedule />
          </div>
        )}
      </div>

      {/* Scheduled Labs Section */}
      <div className="max-w-6xl mx-auto mt-6">
        <ScheduledLab />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FacultyDashboard;
