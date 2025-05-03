import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { exec } from 'child_process';
import CodeEditor from '../models/codeEditorModel.js';

const TEMP_DIR = path.join(process.cwd(), 'temp-code');
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);

export const executeCode = ({ code, input = '', language, labId, studentId }) => {
  return new Promise((resolve, reject) => {
    const sessionId = uuid();

    const codeFile = path.join(TEMP_DIR, `${sessionId}.${language === 'cpp' ? 'cpp' : language}`);
    const inputFile = path.join(TEMP_DIR, `${sessionId}.txt`);

    fs.writeFileSync(codeFile, code);
    fs.writeFileSync(inputFile, input);

    const dockerCmd = `docker run --rm -v "${TEMP_DIR}:/app/code" code-execution-env bash /app/run.sh ${language} /app/code/${path.basename(codeFile)} /app/code/${path.basename(inputFile)}`;

    exec(dockerCmd, async (error, stdout, stderr) => {
      const finalOutput = error ? (stderr || error.message) : stdout;

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
        console.error('Error saving to DB:', dbErr.message);
      }

      resolve(finalOutput); // ✅ This allows 'await executeCode(...)' to receive the output
    });
  });
};
