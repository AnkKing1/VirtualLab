import React from "react";

const UpcomingLabsSection = () => {
  const upcomingLabs = [
    {
      id: 1,
      title: "React Advanced",
      date: "2024-12-10",
      startTime: "2024-12-10T14:00:00",
      endTime: "2024-12-10T16:00:00",
      mentor: "Alice Brown",
    },
    {
      id: 2,
      title: "Node.js Fundamentals",
      date: "2024-12-15",
      startTime: "2024-12-15T10:00:00",
      endTime: "2024-12-15T12:00:00",
      mentor: "Bob Smith",
    },
    {
      id: 3,
      title: "Python for Data Science",
      date: "2024-12-20",
      startTime: "2024-12-20T09:00:00",
      endTime: "2024-12-20T11:00:00",
      mentor: "Clara Johnson",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg h-full">
      <h2 className="text-3xl text-center font-extrabold text-gray-800 mb-6">Upcoming Labs</h2>
      <div className="space-y-6 overflow-y-auto max-h-[300px]">
        {upcomingLabs.map((lab) => (
          <div
            key={lab.id}
            className="p-4 border-l-4 border-indigo-500 bg-indigo-50 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">{lab.title}</h3>
            <p className="text-sm">
              <span className="font-bold">Date:</span> {new Date(lab.date).toDateString()}
            </p>
            <p className="text-sm">
              <span className="font-bold">Time:</span>{" "}
              {new Date(lab.startTime).toLocaleTimeString()} -{" "}
              {new Date(lab.endTime).toLocaleTimeString()}
            </p>
            <p className="text-sm">
              <span className="font-bold">Mentor:</span> {lab.mentor}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingLabsSection;
