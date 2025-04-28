// controllers/executionController.js
// import fetch from 'node-fetch'; // Ensure 'node-fetch' is installed
import CodeEditor from '../models/codeEditorModel.js';

const API_URL = "https://judge0-ce.p.rapidapi.com/submissions";
const API_HEADERS = {
  "X-RapidAPI-Key": "c7cac4fe44msha257983c8102a57p1b7f88jsn18b252e02f1e", // Replace with your API key
  "Content-Type": "application/json",
  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
};

// Map language name to Judge0 IDs
const getLanguageId = (lang) => {
  const languages = {
    javascript: 63,
    python: 71,
    c: 50,
    cpp: 54,
    java: 62,
    go: 60,
    ruby: 72,
    php: 68,
  };
  return languages[lang.toLowerCase()] || 63;
};

// Execute Code Controller
export const executeCode = async (req, res) => {
  const { code, language, input } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required." });
  }

  try {
    // const submissionRes = await fetch(`${API_URL}?base64_encoded=false&wait=false`, {
    //   method: "POST",
    //   headers: API_HEADERS,
    //   body: JSON.stringify({
    //     source_code: code,
    //     language_id: getLanguageId(language),
    //     stdin: input || "",
    //   }),
    // });

    const submissionData = await submissionRes.json();
    console.log("📨 Submission Data:", submissionData);

    if (!submissionData.token) {
      return res.status(500).json({ error: "No token received from Judge0." });
    }

    const token = submissionData.token;

    // Wait and Check the Status
    let attempts = 10;
    let delay = 1500;

    for (let i = 0; i < attempts; i++) {
      await new Promise((resolve) => setTimeout(resolve, delay));

      const statusRes = await fetch(`${API_URL}/${token}?base64_encoded=false`, {
        headers: API_HEADERS,
      });

      const resultData = await statusRes.json();
      console.log("📡 Status Data:", resultData);

      if (resultData.status && resultData.status.id >= 3) {
        // Process Result
        if (resultData.compile_output) {
          return res.status(400).json({ error: resultData.compile_output });
        } else if (resultData.stderr) {
          return res.status(400).json({ error: resultData.stderr });
        } else if (resultData.stdout) {
          return res.status(200).json({ output: resultData.stdout });
        } else {
          return res.status(500).json({ error: "Unknown error occurred." });
        }
      }
    }

    return res.status(504).json({ error: "Execution timed out." });

  } catch (error) {
    console.error("❌ Execution Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
