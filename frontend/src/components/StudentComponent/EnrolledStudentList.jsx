import { useState, useEffect } from "react";

const EnrolledStudentList = ({ labId }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const enrolledData = JSON.parse(localStorage.getItem("enrolledStudents")) || {};
    setStudents(enrolledData[labId] || []);
  }, [labId]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Enrolled Students</h2>
      {students.length > 0 ? (
        <div className="space-y-2">
          {students.map((student, index) => (
            <div
              key={index}
              className="p-3 border rounded-md bg-gray-50 flex flex-col sm:flex-row sm:justify-between"
            >
              <p className="text-gray-700">
                <span className="font-medium">{student.name}</span>
              </p>
              <p className="text-gray-500 text-sm">{student.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No students enrolled in this lab yet.</p>
      )}
    </div>
  );
};

export default EnrolledStudentList;
