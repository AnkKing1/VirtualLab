import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentCard from "./StudentCard";

const EnrolledStudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/students.json")
      .then((response) => response.json())
      .then((data) => {
        const enrolledStudents = data.filter(student => student.isEnrolled);
        setStudents(enrolledStudents);
      })
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  const handleNavigate = (registrationNumber) => {
    navigate(`/coding-interface/${registrationNumber}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Enrolled Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students.length > 0 ? (
            students.map((student, index) => (
              <div key={index} onClick={() => handleNavigate(student.registrationNumber)}>
                <StudentCard {...student} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No students enrolled yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrolledStudentList;
