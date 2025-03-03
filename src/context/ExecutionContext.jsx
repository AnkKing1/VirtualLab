import { createContext, useContext, useState } from "react";
import { useEditor } from "./EditorContext";
import { useInput } from "./InputContext";
import { useOutput } from "./OutputContext";

// Create Context
const ExecutionContext = createContext();

// Provider Component
export const ExecutionProvider = ({ children }) => {
  const { code, language } = useEditor();
  const { inputValue } = useInput();
  const { updateOutput, updateError } = useOutput();

  const [isRunning, setIsRunning] = useState(false);

  // API URL (Example: Judge0)
  const API_URL = "https://judge0-ce.p.rapidapi.com/submissions";
  const API_HEADERS = {
    "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY", // Replace with your API key
    "Content-Type": "application/json",
  };

  // Function to execute code
  const executeCode = async () => {
    setIsRunning(true);
    updateOutput(""); // Clear previous output
    updateError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify({
          source_code: code,
          language_id: getLanguageId(language), // Convert language to ID
          stdin: inputValue,
        }),
      });

      const data = await response.json();
      if (data.token) {
        await checkStatus(data.token);
      }
    } catch (error) {
      updateError("Execution error: " + error.message);
    } finally {
      setIsRunning(false);
    }
  };

  // Function to check execution status
  const checkStatus = async (token) => {
    try {
      const response = await fetch(`${API_URL}/${token}`, { headers: API_HEADERS });
      const result = await response.json();

      if (result.status && result.status.id < 3) {
        setTimeout(() => checkStatus(token), 1000); // Retry until execution completes
      } else if (result.stdout) {
        updateOutput(result.stdout);
      } else if (result.stderr) {
        updateError(result.stderr);
      } else {
        updateError("Unknown execution error.");
      }
    } catch (error) {
      updateError("Error fetching execution result.");
    }
  };

  // Function to map language name to Judge0 language ID
  const getLanguageId = (lang) => {
    const languages = {
      javascript: 63,
      python: 71,
      c: 50,
      cpp: 54,
      java: 62,
    };
    return languages[lang] || 63; // Default to JavaScript
  };

  return (
    <ExecutionContext.Provider value={{ isRunning, executeCode }}>
      {children}
    </ExecutionContext.Provider>
  );
};

// Custom Hook for easy access
export const useExecution = () => useContext(ExecutionContext);
