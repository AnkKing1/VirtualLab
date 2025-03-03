import { createContext, useContext, useState, useEffect } from "react";

// Create Context
const OutputContext = createContext();

// Provider Component
export const OutputProvider = ({ children }) => {
  // Load from localStorage or set default
  const getLocalStorage = (key, defaultValue) =>
    localStorage.getItem(key) || defaultValue;

  const [output, setOutput] = useState(getLocalStorage("output", ""));
  const [error, setError] = useState(getLocalStorage("error", ""));

  // Update localStorage when values change
  useEffect(() => {
    localStorage.setItem("output", output);
  }, [output]);

  useEffect(() => {
    localStorage.setItem("error", error);
  }, [error]);

  // Functions to update output and error
  const updateOutput = (newOutput) => setOutput(newOutput);
  const updateError = (newError) => setError(newError);

  return (
    <OutputContext.Provider value={{ output, updateOutput, error, updateError }}>
      {children}
    </OutputContext.Provider>
  );
};

// Custom Hook for easy access
export const useOutput = () => useContext(OutputContext);
