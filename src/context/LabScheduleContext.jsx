import { createContext, useState, useEffect } from "react";

const LabScheduleContext = createContext();

const LabScheduleProvider = ({ children }) => {
  const [scheduledLabs, setScheduledLabs] = useState(() => {
    // Fetch labs from localStorage at the start
    return JSON.parse(localStorage.getItem("scheduledLabs")) || [];
  });

  useEffect(() => {
    // Save to localStorage only if the labs actually change
    const savedLabs = JSON.parse(localStorage.getItem("scheduledLabs")) || [];
    if (JSON.stringify(savedLabs) !== JSON.stringify(scheduledLabs)) {
      localStorage.setItem("scheduledLabs", JSON.stringify(scheduledLabs));
    }
  }, [scheduledLabs]);

  const addLab = (lab) => {
    setScheduledLabs((prevLabs) => [...prevLabs, { ...lab, id: Date.now() }]);
  };

  const removeLab = (labId) => {
    setScheduledLabs((prevLabs) => prevLabs.filter((lab) => lab.id !== labId));
  };

  const updateLab = (updatedLab) => {
    setScheduledLabs((prevLabs) =>
      prevLabs.map((lab) => (lab.id === updatedLab.id ? updatedLab : lab))
    );
  };

  return (
    <LabScheduleContext.Provider value={{ scheduledLabs, addLab, removeLab, updateLab }}>
      {children}
    </LabScheduleContext.Provider>
  );
};

export { LabScheduleContext, LabScheduleProvider };
