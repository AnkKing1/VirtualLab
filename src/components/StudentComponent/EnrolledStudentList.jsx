import { useState, useEffect } from "react";

const EnrolledStudentList = ({ labId }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch enrolled students from localStorage
    const enrolledData = JSON.parse(localStorage.getItem("enrolledStudents")) || {};
    setStudents(enrolledData[labId] || []);
  }, [labId]);

  return (
    <div>
      {students.length > 0 ? (
        <ul className="list-disc pl-5 text-gray-700">
          {students.map((student, index) => (
            <li key={index} className="py-1">{student.name} - {student.email}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No students enrolled in this lab yet.</p>
      )}
    </div>
  );
};

export default EnrolledStudentList;
