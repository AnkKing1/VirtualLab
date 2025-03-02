import React, { useState, useEffect } from "react";
import LabCard from "../Cards/LabCard";

const CompletedLabSection = () => {
  const [completedLabs, setCompletedLabs] = useState([]);

  useEffect(() => {
    fetch("/labSchedule.json")
      .then((response) => response.json())
      .then((data) => {
        const today = new Date();
        const pastLabs = data.filter((lab) => new Date(lab.date) < today);
        setCompletedLabs(pastLabs);
      })
      .catch((error) => console.error("Error fetching completed labs:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Completed Labs</h2>

        {completedLabs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedLabs.map((lab, index) => (
              <LabCard key={index} {...lab} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No completed labs available.</p>
        )}
      </div>
    </div>
  );
};

export default CompletedLabSection;
