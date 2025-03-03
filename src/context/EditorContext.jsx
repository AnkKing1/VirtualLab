import { createContext, useContext, useState, useEffect } from "react";

// Create Context
const EditorContext = createContext();

// Provider Component
export const EditorProvider = ({ children }) => {
  // Load from localStorage or set defaults
  const getLocalStorage = (key, defaultValue) =>
    localStorage.getItem(key) || defaultValue;

  const [code, setCode] = useState(getLocalStorage("code", ""));
  const [language, setLanguage] = useState(getLocalStorage("language", "javascript"));
  const [theme, setTheme] = useState(getLocalStorage("theme", "light"));

  // Update localStorage when values change
  useEffect(() => {
    localStorage.setItem("code", code);
  }, [code]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Functions to update states
  const updateCode = (newCode) => setCode(newCode);
  const changeLanguage = (newLang) => setLanguage(newLang);
  const changeTheme = (newTheme) => setTheme(newTheme);

  return (
    <EditorContext.Provider value={{ code, updateCode, language, changeLanguage, theme, changeTheme }}>
      {children}
    </EditorContext.Provider>
  );
};

// Custom Hook for easy access
export const useEditor = () => useContext(EditorContext);
