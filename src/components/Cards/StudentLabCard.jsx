import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const StudentLabCard = ({
  studentId,
  id,
  labName,
  statement,
  duration,
  date,
  time,
  semester,
  facultyName,
}) => {
  const navigate = useNavigate();

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem("token");
      // const sId = studentId // Add this
  
      if (!token || !studentId) return alert("You must be logged in to enroll.");
  
      const res = await axios.patch(
        `/api/v1/student/enroll-student/${id}`,
        { studentId }, // Send studentId in request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (res.data.success) {
        alert("Successfully enrolled in lab!");
        navigate(`/code-editor/${id}`);
      } else {
        alert("Enrollment failed. Try again.");
      }
    } catch (err) {
      console.error("Enrollment error:", err);
      alert("Something went wrong. Please try again.");
    }
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition-all"
    >
      <h2 className="text-xl font-bold text-blue-700 mb-1">{labName}</h2>
      <p className="text-sm text-gray-700 mb-2">
        <span className="font-semibold">Created by:</span> {facultyName}
      </p>

      <p className="text-gray-600 mb-2">
        <span className="font-medium">Statement:</span> {statement}
      </p>

      <p className="text-gray-600 mb-1">
        <span className="font-medium">Semester:</span> {semester}
      </p>

      <p className="text-gray-600 mb-1">
        <span className="font-medium">Duration:</span> {duration} minutes
      </p>

      <div className="flex justify-between items-center text-gray-600 mb-4">
        <span>{date}</span>
        <span>{time}</span>
      </div>

      <button
        onClick={handleEnroll}
        className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition"
      >
        Enroll
      </button>
    </motion.div>
  );
};

export default StudentLabCard;
