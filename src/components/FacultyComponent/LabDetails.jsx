import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LabScheduleContext } from "../../context/LabScheduleContext";

const LabDetails = () => {
  const { id } = useParams(); // Get lab ID from URL
  const { scheduledLabs } = useContext(LabScheduleContext); // Fetch labs from context
  const [labDetails, setLabDetails] = useState(null);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Find the enrolled lab using ID
    const enrolledLab = scheduledLabs.find((lab) => lab.id === id);
    setLabDetails(enrolledLab);

    // Fetch student details from localStorage
    const storedStudent = JSON.parse(localStorage.getItem("studentData"));
    setStudent(storedStudent);
  }, [id, scheduledLabs]);

  if (!labDetails || !student) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-10 border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-600">{labDetails.labName}</h2>
      <p className="mt-2 text-gray-700">{labDetails.statement}</p>

      <div className="mt-4">
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Date:</span> {labDetails.date}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Time:</span> {labDetails.time}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Duration:</span> {labDetails.duration} mins
        </p>
      </div>

      {/* Student Information */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold text-gray-800">Student Information</h3>
        <p className="text-lg text-gray-700">
          <span className="font-bold text-blue-500">Name:</span> {student.name}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-bold text-blue-500">Email:</span> {student.email}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-bold text-blue-500">Roll Number:</span> {student.rollNumber}
        </p>
      </div>
    </div>
  );
};

export default LabDetails;
