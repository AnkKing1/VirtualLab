import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const LabCard = ({ id, labName, statement, date, time, semester, duration, }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedLab, setUpdatedLab] = useState({ labName,  statement, date, time, semester, duration });

  const navigate = useNavigate();

  const handleUpdate = async () => {
    try {
      const { labName, statement, date, time, semester, duration } = updatedLab;
  
      // Validation (optional)
      if (!labName || !statement || !date || !time || !semester || !duration) {
        alert("All fields are required!");
        return;
      }
  
      const schedule = new Date(`${date}T${time}`);
      const updateData = {
        title: labName,
        description: statement,
        semester,
        schedule,
        duration: Number(duration),
      };

      console.log(updateData);
  
      const res = await axios.put(`/api/v1/labs/${id}`, updateData);
      console.log("Update response:", res.data);
  
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating lab:", err.response?.data || err.message);
    }
  };
  
  

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/v1/labs/${id}`);
      refreshLabs(); // Optional: to reload lab list after deletion
    } catch (err) {
      console.error("Error deleting lab:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.02, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 cursor-pointer relative"
      onClick={() => !isEditing && navigate(`/faculty/EnrolledStudentList/${id}`)}
    >
      {isEditing ? (
        <div className="space-y-2">
          <input type="text" value={updatedLab.labName} onChange={(e) => setUpdatedLab({ ...updatedLab, labName: e.target.value })} className="w-full p-2 border rounded" />
          <input type="text" value={updatedLab.semester} onChange={(e) => setUpdatedLab({ ...updatedLab, semester: e.target.value })} className="w-full p-2 border rounded" />
          <textarea value={updatedLab.statement} onChange={(e) => setUpdatedLab({ ...updatedLab, statement: e.target.value })} className="w-full p-2 border rounded" />
          <input type="date" value={updatedLab.date} onChange={(e) => setUpdatedLab({ ...updatedLab, date: e.target.value })} className="w-full p-2 border rounded" />
          <input type="time" value={updatedLab.time} onChange={(e) => setUpdatedLab({ ...updatedLab, time: e.target.value })} className="w-full p-2 border rounded" />
          <input type="number" value={updatedLab.duration} onChange={(e) => setUpdatedLab({ ...updatedLab, duration: e.target.value })} className="w-full p-2 border rounded" />
          <div className="flex justify-end gap-3 mt-2">
            <button onClick={(e) => { e.stopPropagation(); setIsEditing(false); }} className="px-3 py-1 bg-gray-300 rounded text-gray-700">
              Cancel
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleUpdate(); }} className="px-4 py-1 bg-blue-600 text-white rounded">
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{labName} ({semester} Semester)</h3>
          <p className="text-sm text-gray-600 mb-1">Statement: <span className="font-medium">{statement}</span></p>
          <p className="text-sm text-gray-600 mb-1">Duration: <span className="font-medium">{duration} mins</span></p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <p>{date}</p>
            <p>{time}</p>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
              className="px-3 py-1 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleDelete(); }}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default LabCard;
