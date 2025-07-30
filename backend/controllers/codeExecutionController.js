import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { exec } from "child_process";
import CodeEditor from "../models/codeEditorModel.js";

const TEMP_DIR = path.join(process.cwd(), "temp-code");
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);

export const executeCode = ({
  code,
  input = "",
  language,
  labId,
  studentId,
}) => {
  return new Promise((resolve, reject) => {
    const sessionId = uuid();

    const codeFile = path.join(
      TEMP_DIR,
      `${sessionId}.${language === "cpp" ? "cpp" : language}`
    );
    const inputFile = path.join(TEMP_DIR, `${sessionId}.txt`);

    fs.writeFileSync(codeFile, code);
    fs.writeFileSync(inputFile, input);

    // Execute code directly in the current container instead of using separate Docker image
    const runCmd = `bash /app/run.sh ${language} ${codeFile} ${inputFile}`;

    exec(runCmd, { timeout: 10000 }, async (error, stdout, stderr) => {
      const finalOutput = error ? stderr || error.message : stdout;

      try {
        await CodeEditor.create({
          studentId,
          labId,
          language,
          code,
          input,
          output: finalOutput,
        });
      } catch (dbErr) {
        console.error("Error saving to DB:", dbErr.message);
      }

      // Clean up temp files
      try {
        if (fs.existsSync(codeFile)) fs.unlinkSync(codeFile);
        if (fs.existsSync(inputFile)) fs.unlinkSync(inputFile);
      } catch (cleanupError) {
        console.error("Error cleaning up temp files:", cleanupError.message);
      }

      resolve(finalOutput); // ✅ This allows 'await executeCode(...)' to receive the output
    });
  });
};

// GET /api/v1/code/latest?studentId=...&labId=...&language=...
export const getLatestCode = async (req, res) => {
  const { studentId, labId, language } = req.query;

  try {
    const latestCode = await CodeEditor.findOne({
      studentId,
      labId,
      language,
    }).sort({ createdAt: -1 }); // Get the most recent one

    if (!latestCode) {
      return res.status(200).json({ success: true, code: null });
    }

    return res.status(200).json({ success: true, code: latestCode.code });
  } catch (err) {
    console.error("Error fetching latest code:", err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
