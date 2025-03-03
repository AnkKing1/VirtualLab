import React, { useContext } from "react";
import { LabScheduleContext } from "../../context/LabScheduleContext";
import LabCard from "../Cards/LabCard";
import StudentLabCard from "../Cards/StudentLabCard"; // Import StudentLabCard

const CompletedLabSection = ({ isFaculty }) => {
  const { scheduledLabs } = useContext(LabScheduleContext);

  // Get today's date
  const today = new Date();

  // Filter completed labs
  const completedLabs = scheduledLabs.filter((lab) => new Date(lab.date) < today);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Completed Labs</h2>

        {completedLabs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedLabs.map((lab) =>
              isFaculty ? (
                <LabCard key={lab.id} {...lab} />
              ) : (
                <StudentLabCard key={lab.id} {...lab} />
              )
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No completed labs available.</p>
        )}
      </div>
    </div>
  );
};

export default CompletedLabSection;
