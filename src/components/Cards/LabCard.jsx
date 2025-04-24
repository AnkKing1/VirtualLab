import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LabScheduleContext } from "../../context/LabScheduleContext";

const LabCard = ({ id, labName, statement, date, time, duration }) => {
  const { removeLab, updateLab } = useContext(LabScheduleContext);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedLab, setUpdatedLab] = useState({ labName, statement, date, time, duration });

  const navigate = useNavigate();

  const handleUpdate = () => {
    updateLab({ ...updatedLab, id });
    setIsEditing(false);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all border border-gray-200 cursor-pointer"
      onClick={() => navigate(`/faculty/EnrolledStudentList`)} // Navigate to enrolled students page
    >
      {isEditing ? (
        <div className="space-y-2">
          <input type="text" value={updatedLab.labName} onChange={(e) => setUpdatedLab({ ...updatedLab, labName: e.target.value })} className="w-full p-2 border rounded" />
          <textarea value={updatedLab.statement} onChange={(e) => setUpdatedLab({ ...updatedLab, statement: e.target.value })} className="w-full p-2 border rounded" />
          <input type="date" value={updatedLab.date} onChange={(e) => setUpdatedLab({ ...updatedLab, date: e.target.value })} className="w-full p-2 border rounded" />
          <input type="time" value={updatedLab.time} onChange={(e) => setUpdatedLab({ ...updatedLab, time: e.target.value })} className="w-full p-2 border rounded" />
          <input type="number" value={updatedLab.duration} onChange={(e) => setUpdatedLab({ ...updatedLab, duration: e.target.value })} className="w-full p-2 border rounded" />
          <button onClick={(e) => { e.stopPropagation(); handleUpdate(); }} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{labName}</h3>
          <p className="text-sm text-gray-500">Statement: <span className="font-medium">{statement}</span></p>
          <p className="text-sm text-gray-500">Duration: <span className="font-medium">{duration} mins</span></p>
          <div className="flex justify-between items-center mt-2 text-gray-600 text-sm">
            <p>{date}</p>
            <p>{time}</p>
          </div>
          <div className="mt-4 flex justify-between">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsEditing(true); }} 
              className="px-3 py-1 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); removeLab(id); }} 
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabCard;
