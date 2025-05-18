import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const StudentProfile = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`/api/v1/student/profile/${studentId}`);

        if (res.data?.success && res.data.student) {
          setStudent(res.data.student);
          setError("");
        } else {
          setError("Student not found.");
        }
      } catch (err) {
        setError("Failed to fetch student.");
        console.error("Error fetching student:", err);
      }
    };

    fetchStudent();
  }, [studentId]);

  if (error) {
    return (
      <div className="text-red-600 font-semibold text-center mt-8">
        {error}
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center mt-8 text-gray-600">Loading...</div>
    );
  }

  return (
  <motion.div
    className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-2xl rounded-2xl border border-gray-300"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 100 }}
  >
    <motion.h1
      className="text-4xl font-extrabold text-center text-blue-700 mb-8 underline"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      Student Profile
    </motion.h1>

    <div className="space-y-5">
      {Object.entries(student).map(([key, value], index) => {
        // Hide password field and __v if needed
        if (key === "password" || key === "__v") return null;
        if (key === "_id" || key === "__v") return null;
        if (key === "createdAt" || key === "__v") return null;
        if (key === "updatedAt" || key === "__v") return null;

        return (
          <motion.div
            key={key}
            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl px-5 py-4 shadow-md hover:shadow-lg transition-all"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <p className="text-gray-600 font-semibold text-xs uppercase tracking-wide mb-1">
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </p>
            <p className="text-lg font-bold text-blue-900 break-words">
              {String(value)}
            </p>
          </motion.div>
        );
      })}
    </div>
  </motion.div>
);

};

export default StudentProfile;
