import React from "react";
import { useNavigate } from "react-router-dom";

const StudentLabCard = ({ id, labName, statement, date, time, duration }) => {
  const navigate = useNavigate();

  const handleEnroll = () => {
    // Prompt for student name and email (temporary solution)
    const name = prompt("Enter your name:");
    const email = prompt("Enter your email:");

    if (!name || !email) return alert("Enrollment cancelled. Name and Email are required.");

    // Fetch current data
    const enrolledData = JSON.parse(localStorage.getItem("enrolledStudents")) || {};

    // If no student list for this lab, initialize with empty array
    if (!enrolledData[id]) enrolledData[id] = [];

    // Avoid duplicate entries
    const alreadyEnrolled = enrolledData[id].some(
      (student) => student.email === email
    );
    if (!alreadyEnrolled) {
      enrolledData[id].push({ name, email });
      localStorage.setItem("enrolledStudents", JSON.stringify(enrolledData));
    }

    // Navigate to the code editor
    navigate(`/code-editor/${id}`);
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
