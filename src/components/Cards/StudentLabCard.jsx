import React from "react";
import { useNavigate } from "react-router-dom";

const StudentLabCard = ({ id, labName, statement, date, time, duration }) => {
  const navigate = useNavigate();

  const handleEnroll = () => {
    navigate(`/code-editor/${id}`); // Navigate to CodeEditor with lab ID
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800">{labName}</h3>
      <p className="text-sm text-gray-500">
        Statement: <span className="font-medium">{statement}</span>
      </p>
      <p className="text-sm text-gray-500">
        Duration: <span className="font-medium">{duration} mins</span>
      </p>
      <div className="flex justify-between items-center mt-2 text-gray-600 text-sm">
        <p>{date}</p>
        <p>{time}</p>
      </div>
      <div className="mt-4">
        <button
          onClick={handleEnroll}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Enroll
        </button>
      </div>
    </div>
  );
};

export default StudentLabCard;
