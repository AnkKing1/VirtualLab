import React, { useState } from "react";

const ActiveLabsSection = () => {
  const [activeLabs, setActiveLabs] = useState([
    {
      id: 1,
      title: "React Basics",
      date: "2024-12-01",
      startTime: "2024-12-01T10:00:00",
      endTime: "2024-12-01T12:00:00",
      mentor: "John Doe",
      isEnrollable: false,
      isSubmitted: true,
      editorLink: "/editor/react-basics",
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      date: "2024-12-02",
      startTime: "2024-12-02T14:00:00",
      endTime: "2024-12-02T16:00:00",
      mentor: "Jane Smith",
      isEnrollable: false,
      isSubmitted: false,
      editorLink: "/editor/javascript-fundamentals",
    },
    {
      id: 3,
      title: "CSS Design Principles",
      date: "2024-12-05",
      startTime: "2024-12-05T10:00:00",
      endTime: "2024-12-05T12:00:00",
      mentor: "Alice Green",
      isEnrollable: true,
      isSubmitted: false,
      editorLink: "/editor/css-design",
    },
  ]);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg h-full">
      <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-6">
        Active Labs
      </h2>
      <div className="space-y-6 overflow-y-auto max-h-[300px]">
        {activeLabs.map((lab) => (
          <div
            key={lab.id}
            className={`p-4 rounded-lg shadow-md border-l-4 ${
              lab.isEnrollable
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-gray-100"
            }`}
          >
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{lab.title}</h3>
              <p className="text-sm">
                <span className="font-bold">Date:</span>{" "}
                {new Date(lab.date).toDateString()}
              </p>
              <p className="text-sm">
                <span className="font-bold">Scheduled:</span>{" "}
                {new Date(lab.startTime).toLocaleTimeString()} -{" "}
                {new Date(lab.endTime).toLocaleTimeString()}
              </p>
              <p className="text-sm">
                <span className="font-bold">Mentor:</span> {lab.mentor}
              </p>
              <p
                className={`text-sm font-bold ${
                  lab.isSubmitted ? "text-green-600" : "text-red-600"
                }`}
              >
                {lab.isSubmitted ? "Submission Successful" : "Pending"}
              </p>
            </div>
            <div className="mt-4">
              <button
                className={`px-5 py-2 text-sm font-semibold rounded shadow-md ${
                  lab.isEnrollable
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
                onClick={() =>
                  lab.isEnrollable
                    ? (window.location.href = lab.editorLink)
                    : null
                }
                disabled={!lab.isEnrollable}
              >
                {lab.isEnrollable ? "Enroll" : "Not Enrollable"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveLabsSection;
