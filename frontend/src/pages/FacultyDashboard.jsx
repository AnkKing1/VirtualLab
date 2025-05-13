import React, { useState, useEffect } from "react";
import LabSchedule from "../components/FacultyComponent/LabSchedule";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import LabCard from "../components/Cards/LabCard";  // Import LabCard

const FacultyDashboard = () => {
  const { facultyId } = useParams();
  const [faculty, setFaculty] = useState({});
  const [labs, setLabs] = useState([]);
  const [filteredLabs, setFilteredLabs] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");

useEffect(() => {
  const fetchFaculty = async () => {
    try {
      const token = localStorage.getItem("facultyToken");

      // Fetch faculty profile
      const facultyRes = await axios.get(`/api/v1/faculty/${facultyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (facultyRes.data?.success && facultyRes.data.faculty) {
        setFaculty(facultyRes.data.faculty);
      }

      // Fetch labs created by faculty
      const labsRes = await axios.get(`/api/v1/labs/get-labs-byFaculty`, {
        params: { facultyId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (labsRes.data?.success && labsRes.data.labs) {
        setLabs(labsRes.data.labs); // Don't call filterLabs here
      }
    } catch (err) {
      console.error("Error loading faculty or labs:", err);
    }
  };

  if (facultyId) fetchFaculty();
}, [facultyId , labs]);

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

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">

      {/* Main Content */}
      <div className="flex flex-grow">
        {/* Left Section */}
        <div className="w-2/3 p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-md mb-6 flex items-center space-x-6"
          >
            <img
              src={faculty.profileImage || "/Faculty.jpeg"}
              alt="Faculty"
              className="w-24 h-24 rounded-full border-4 border-blue-500"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome, {faculty.name}
              </h1>
              <p className="text-gray-600">{faculty.designation}</p>
              <p className="text-gray-500">{faculty.department}</p>
              <p className="text-gray-500">{faculty.email}</p>
            </div>
          </motion.div>

          {/* Tab Buttons */}
          <motion.div
            className="flex justify-end space-x-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => (setActiveTab("upcoming"),filterLabs("upcoming"))}
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
              onClick={() =>  (setActiveTab("completed") ,filterLabs("completed"))}
              className={`px-4 py-2 font-medium rounded-lg transition-all duration-300 ${
                activeTab === "completed"
                  ? "bg-green-600 text-white shadow"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Completed Labs
            </motion.button>
          </motion.div>

          {/* Labs Grid (with LabCard component) */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filteredLabs.map((lab, idx) => (
              <motion.div
                layout
                key={lab._id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all"
              >
                <LabCard
                  id={lab._id}
                  labName={lab.title}
                  statement={lab.description}
                  semester= {lab.semester}
                  date={new Date(lab.schedule).toISOString().split("T")[0]}
                  time={new Date(lab.schedule).toTimeString().slice(0, 5)}
                  duration={lab.duration}
                  updateLab={() => {}}
                  removeLab={() => {}}
                />
              </motion.div>
            ))}
            {filteredLabs.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-600 col-span-full text-center"
              >
                No labs to display.
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Right Section - Lab Schedule Form */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-1/3 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-y-auto h-fit"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Schedule Lab</h2>
          <LabSchedule />
        </motion.div>
      </div>

    </div>
  );
};

export default FacultyDashboard;
