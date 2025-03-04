import { createContext, useContext, useState } from "react";
import { useEditor } from "./EditorContext";
import { useInput } from "./InputContext";
import { useOutput } from "./OutputContext";

// Create Execution Context
const ExecutionContext = createContext();

// Provider Component
export const ExecutionProvider = ({ children }) => {
  const { code, language } = useEditor();
  const { inputValue } = useInput();
  const { updateOutput, updateError } = useOutput();

  const [isRunning, setIsRunning] = useState(false);

  // API Configuration
  const API_URL = "https://judge0-ce.p.rapidapi.com/submissions";
  const API_HEADERS = {
    "X-RapidAPI-Key": "c7cac4fe44msha257983c8102a57p1b7f88jsn18b252e02f1e", // Replace with your API key
    "Content-Type": "application/json",
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
  };

  // Function to execute code
  const executeCode = async () => {
    if (!code.trim()) {
      updateError("⚠️ Code cannot be empty.");
      return;
    }

    setIsRunning(true);
    updateOutput(""); // Clear previous output
    updateError("");

    console.log("🚀 Sending code to Judge0...");

    try {
      const response = await fetch(`${API_URL}?base64_encoded=false&wait=false`, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify({
          source_code: code,
          language_id: getLanguageId(language), // Convert language to ID
          stdin: inputValue,
        }),
      });

      const data = await response.json();
      console.log("📨 Judge0 API Response:", data);

      if (!data.token) {
        updateError("❌ No token received from Judge0.");
        return;
      }

      console.log("🔄 Fetching execution result...");
      await checkStatus(data.token);
    } catch (error) {
      updateError("Execution error: " + error.message);
      console.error("❌ Execution error:", error);
    } finally {
      setIsRunning(false);
    }
  };

  // Function to check execution status
  const checkStatus = async (token) => {
    console.log(`🕒 Checking status for token: ${token}`);

    try {
      let attempts = 10; // Max attempts to check execution status
      let delay = 1500; // 1.5s delay between each check

      for (let i = 0; i < attempts; i++) {
        await new Promise((res) => setTimeout(res, delay)); // Wait before checking again

        const statusResponse = await fetch(`${API_URL}/${token}?base64_encoded=false`, {
          headers: API_HEADERS,
        });

        const result = await statusResponse.json();
        console.log("📡 Execution Status:", result);

        if (result.status && result.status.id >= 3) {
          processResult(result);
          return;
        }
      }

      updateError("⏳ Execution timed out.");
    } catch (error) {
      updateError("Error fetching execution result.");
      console.error("❌ Error fetching result:", error);
    }
  };

  // Function to process API results
  const processResult = (result) => {
    if (result.compile_output) {
      updateError("❌ Compilation Error:\n" + result.compile_output);
      console.error("❌ Compilation Error:", result.compile_output);
    } else if (result.stderr) {
      updateError("⚠️ Runtime Error:\n" + result.stderr);
      console.error("⚠️ Execution Error:", result.stderr);
    } else if (result.stdout) {
      updateOutput(result.stdout);
      console.log("✅ Execution Output:", result.stdout);
    } else {
      updateError("Unknown execution error.");
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
    return languages[lang.toLowerCase()] || 63; // Default to JavaScript
  };

  return (
    <ExecutionContext.Provider value={{ isRunning, executeCode }}>
      {children}
    </ExecutionContext.Provider>
  );
};

// Custom Hook for easy access
export const useExecution = () => useContext(ExecutionContext);
