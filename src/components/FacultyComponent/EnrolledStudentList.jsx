import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const EnrolledStudentList = () => {
  const { labId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [labTitle, setLabTitle] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        const res = await axios.get(`/api/v1/labs/${labId}/enrolled-students`);
        console.log(res);
        setStudents(res.data.students);
        setLabTitle(res.data.labTitle);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      } finally {
        setLoading(false);
      }
    };
  
    if (labId) {
      fetchEnrolledStudents();
    }
  }, [labId]);
  

  const handleCardClick = (studentId) => {
    // Navigate to student profile or performance page (customize this route)
    navigate(`/code-editor/${labId}/${studentId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-xl font-semibold">
        Loading students...
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-700">
          Enrolled Students in <span className="text-gray-800">{labTitle}</span>
        </h2>
        <div className="mt-2 inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full shadow-sm">
          Total Enrolled: {students.length}
        </div>
      </div>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {students.map((student, index) => (
          <motion.div
            key={student._id}
            className="bg-white shadow-xl rounded-2xl p-5 border cursor-pointer hover:scale-[1.03] transition-transform"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleCardClick(student._id)}
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {student.name}
            </h3>
            <p className="text-gray-500">Reg No: {student.registrationNumber}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
  
}

export default EnrolledStudentList;
