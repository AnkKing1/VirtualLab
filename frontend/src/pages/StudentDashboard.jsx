import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams } from "react-router-dom";
import StudentLabCard from "../components/Cards/StudentLabCard";

const StudentDashboard = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState({});
  const [labs, setLabs] = useState([]);
  const [error, setError] = useState("");
  const [filteredLabs, setFilteredLabs] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
 
  // Fetch student data
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("studentToken");

        const res = await axios.get(`/api/v1/student/${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

    if (studentId) fetchStudent();
  }, [studentId]);

  // console.log(student);
  

  // Fetch labs based on semester
  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const token = localStorage.getItem("studentToken");

        if (!student?.semester) return;

        const labsRes = await axios.get("/api/v1/labs/get-lab-sem", {
          params: { semester: student.semester },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(labsRes);

        if (labsRes.data?.success && labsRes.data.lab) {
          setLabs(labsRes.data.lab);
        }
      } catch (err) {
        console.error("Error fetching labs:", err);
      }
    };

    fetchLabs();
  }, [student?.semester]);

  // Trigger filtering when either activeTab or labs change
  useEffect(() => {
    filterLabs(activeTab, labs);
  }, [activeTab, labs]);

  const filterLabs = (type, labsList = labs) => {
  const now = new Date();

  const filtered = labsList.filter((lab) => {
    const scheduledStart = new Date(lab.schedule); // lab.schedule must be ISO or parsable string
    const scheduledEnd = new Date(scheduledStart.getTime() + lab.duration * 60000);

    return type === "completed"
      ? now > scheduledEnd
      : now <= scheduledEnd;
  });

  setFilteredLabs(filtered);
  setActiveTab(type);
};


  // console.log(labs);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50 p-6">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 rounded-xl shadow-md mb-6 flex items-center space-x-6"
      >
        <img
          src={student.profileImage || "/Student.jpeg"}
          alt="Student"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {student.name}
          </h1>
          <p className="text-gray-600">{student.registrationNumber}</p>
          <p className="text-gray-500">{student.department}</p>
          <p className="text-gray-500">{student.email}</p>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="flex justify-end space-x-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => filterLabs("upcoming")}
          className={`px-4 py-2 font-medium rounded-lg transition-all duration-300 ${
            activeTab === "upcoming"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Active & Upcoming Labs
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => filterLabs("completed")}
          className={`px-4 py-2 font-medium rounded-lg transition-all duration-300 ${
            activeTab === "completed"
              ? "bg-green-600 text-white shadow"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Completed Labs
        </motion.button>
      </motion.div>

      {/* Labs Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {filteredLabs.length > 0 ? (
          filteredLabs.map((lab, idx) => (
            <motion.div
              layout
              key={lab._id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <StudentLabCard
                studentId={studentId}
                id={lab._id}
                labName={lab.title}
                statement={lab.description}
                duration={lab.duration}
                date={new Date(lab.schedule).toISOString().split("T")[0]}
                time={new Date(lab.schedule).toTimeString().slice(0, 5)}
                semester={student.semester}
                facultyName={lab.createdBy?.name || "Unknown Faculty"}
              />
            </motion.div>
          ))
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-600 col-span-full text-center mt-8"
          >
            No labs to display.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default StudentDashboard;
