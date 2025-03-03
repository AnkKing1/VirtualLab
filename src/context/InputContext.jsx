import { createContext, useContext, useState, useEffect } from "react";

// Create Context
const InputContext = createContext();

// Provider Component
export const InputProvider = ({ children }) => {
  // Load from localStorage or set default
  const getLocalStorage = (key, defaultValue) =>
    localStorage.getItem(key) || defaultValue;

  const [inputValue, setInputValue] = useState(getLocalStorage("input", ""));

  // Update localStorage when input changes
  useEffect(() => {
    localStorage.setItem("input", inputValue);
  }, [inputValue]);

  // Function to update input
  const updateInput = (newInput) => setInputValue(newInput);

  return (
    <InputContext.Provider value={{ inputValue, updateInput }}>
      {children}
    </InputContext.Provider>
  );
};

// Custom Hook for easy access
export const useInput = () => useContext(InputContext);
