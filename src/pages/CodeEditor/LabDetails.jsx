import { useState, useEffect } from "react";

const LabDetails = () => {
  const [lab, setLab] = useState(null);

  useEffect(() => {
    // Fetch lab details from localStorage
    const storedLab = JSON.parse(localStorage.getItem("selectedLab"));
    if (storedLab) {
      setLab(storedLab);
    }
  }, []);

  return (
    <div className="p-4">
      {lab ? (
        <div>
          <h2 className="text-xl font-bold">{lab.name}</h2>
          <p className="text-gray-600">{lab.description}</p>
          <div className="mt-2 p-2 bg-gray-200 rounded">
            <strong>Problem Statement:</strong>
            <p>{lab.question}</p>
          </div>
        </div>
      ) : (
        <p className="text-red-500">No lab details found.</p>
      )}
    </div>
  );
};

export default LabDetails;
