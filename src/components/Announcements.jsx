import React from "react";

const Announcements = () => {
  const announcements = [
    {
      id: 1,
      type: "Lab Info",
      message: "Next lab 'React Basics' will start at 10:00 AM on 2024-12-01.",
      date: "2024-12-01",
    },
    {
      id: 2,
      type: "General",
      message: "Don't forget to submit your assignments by 6:00 PM today!",
      date: "2024-11-30",
    },
    {
      id: 3,
      type: "Lab Info",
      message: "Upcoming lab 'JavaScript Fundamentals' is scheduled for 2:00 PM on 2024-12-02.",
      date: "2024-12-02",
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Announcements</h2>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={`p-4 rounded-lg shadow-sm border-l-4 ${
              announcement.type === "Lab Info"
                ? "border-blue-500 bg-blue-50"
                : "border-yellow-500 bg-yellow-50"
            }`}
          >
            <p className="text-sm font-semibold text-gray-700">
              {announcement.type}:{" "}
              <span className="font-normal">{announcement.message}</span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Date: {new Date(announcement.date).toDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
