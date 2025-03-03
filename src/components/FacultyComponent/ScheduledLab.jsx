import React from "react";
import ActiveLabSection from "../Common/ActiveLabSection";
import CompletedLabSection from "../Common/CompletedLabsSection";

const ScheduledLab = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Scheduled Labs</h2>

        {/* Grid Layout for Active & Completed Labs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Active Labs Section */}
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Active & Upcoming Labs</h3>
            <ActiveLabSection isFaculty={true} />
          </div>

          {/* Completed Labs Section */}
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Completed Labs</h3>
            <CompletedLabSection isFaculty={true}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduledLab;
