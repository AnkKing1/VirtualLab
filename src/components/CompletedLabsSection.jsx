import React from "react";

const CompletedLabsSection = () => {
  const completedLabs = [
    {
      id: 1,
      title: "React Basics",
      date: "2024-11-28",
      status: "Enrolled",
      isTimedOut: false,
      practiceLink: "/practice/react-basics",
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      date: "2024-11-25",
      status: "Timed Out",
      isTimedOut: true,
    },
    {
      id: 3,
      title: "CSS Mastery",
      date: "2024-11-20",
      status: "Enrolled",
      isTimedOut: false,
      practiceLink: "/practice/css-mastery",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg h-full">
      <h2 className="text-3xl text-center font-extrabold text-gray-800 mb-6">Completed Labs</h2>
      <div className="space-y-6 overflow-y-auto max-h-[300px]">
        {completedLabs.map((lab) => (
          <div
            key={lab.id}
            className={`p-4 border-l-4 rounded-lg shadow-md ${
              lab.isTimedOut
                ? "border-red-500 bg-red-50"
                : "border-green-500 bg-green-50"
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">{lab.title}</h3>
            <p className="text-sm">
              <span className="font-bold">Date:</span> {new Date(lab.date).toDateString()}
            </p>
            <p
              className={`text-sm font-bold ${
                lab.isTimedOut ? "text-red-600" : "text-green-600"
              }`}
            >
              Status: {lab.status}
            </p>
            {!lab.isTimedOut && (
              <button
                className="mt-4 px-5 py-2 bg-blue-600 text-white text-sm rounded shadow hover:bg-blue-700"
                onClick={() => (window.location.href = lab.practiceLink)}
              >
                Practice Again
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedLabsSection;
