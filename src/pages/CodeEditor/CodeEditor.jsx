import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { githubLight } from '@uiw/codemirror-theme-github';
import axios from 'axios';
import io from 'socket.io-client';

const languageExtensions = {
  cpp: cpp(), 
  java: java(),
  python: python(), 
  javascript: javascript(),
};

const CodeEditor = () => {
  const { labId, studentId } = useParams();
  const [labDetails, setLabDetails] = useState(null);
  const [language, setLanguage] = useState('javascript');
  const [student, setStudent] = useState(null);
  const [theme, setTheme] = useState('light');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0);

  // Socket.IO client connection
  const socket = io('http://localhost:5000');  // Update the URL to your backend WebSocket server

  useEffect(() => {
    if (labDetails?.duration) {
      const start = Date.now();
      const end = start + labDetails.duration * 60 * 1000;
      const interval = setInterval(() => {
        const now = Date.now();
        const diff = Math.max(Math.floor((end - now) / 1000), 0);
        setRemainingTime(diff);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [labDetails]);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No auth token found");
          return;
        }
  
        const res = await axios.get(`/api/v1/student/${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (res.data?.success && res.data.student) {
          setStudent(res.data.student);
        } else {
          console.error("Student data not found");
        }
      } catch (err) {
        console.error("Error loading student:", err);
      }
    };
  
    if (studentId) fetchStudent();
  }, [studentId]);

  useEffect(() => {
    const fetchLabDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/labs/${labId}`);
        setLabDetails(res.data.lab);
      } catch (err) {
        console.error("Error fetching lab:", err);
      } finally {
        setLoading(false);
      }
    };

    if (labId) fetchLabDetails();
  }, [labId]);

  useEffect(() => {
    // Listen for code execution results from the backend
    socket.on('code-executed', (data) => {
      setOutput(data.output || 'No output');
    });

    socket.on('execution-error', (data) => {
      setOutput(data.error || 'Error executing code.');
    });

    return () => {
      socket.off('code-executed');
      socket.off('execution-error');
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  const runCode = () => {
    // Emit the execute-code event to the backend
    socket.emit('execute-code', {
      code,
      input,
      language,
      labId,
      studentId, // Use the actual studentId
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 text-gray-900 dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-6 relative"
      >
        {/* Student Info at top-right */}
        {student && (
          <div className="absolute top-4 right-6 text-right">
            <p className="text-3xl mb-3 font-bold">{student.name}</p>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Reg No: {student.registrationNumber}
            </p>
          </div>
        )}

        {/* Timer below student info */}
        {remainingTime >= 0 && (
          <div className="absolute top-14 right-6 text-sm text-white bg-blue-600 px-3 py-1 mt-20 rounded-full shadow">
            ⏳ {remainingTime > 0 ? `${Math.floor(remainingTime / 60)}m ${remainingTime % 60}s` : "Ended"}
          </div>
        )}

        {/* Lab Title & Meta Info */}
        {labDetails ? (
          <div>
            <h2 className="text-3xl font-bold mb-4 text-blue-700">{labDetails.title}</h2>
            <div className="space-y-1 text-gray-700 dark:text-gray-300">
              <p><strong>Faculty:</strong> {labDetails.createdBy?.name || "N/A"}</p>
              <p><strong>Semester:</strong> {labDetails.semester}</p>
              <p><strong>Scheduled:</strong> {new Date(labDetails.schedule).toLocaleString()}</p>
            </div>

            {/* Description Block */}
            <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow-inner">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Description</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{labDetails.description}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 animate-pulse">Loading lab details...</p>
        )}
      </motion.div>

      {/* Controls */}
      <motion.div
        className="flex flex-wrap items-center gap-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border dark:border-gray-700 rounded-xl px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow"
        >
          {Object.keys(languageExtensions).map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>

        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="border dark:border-gray-700 rounded-xl px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <motion.button
          onClick={runCode}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow"
        >
          Run Code
        </motion.button>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Code Editor - 2/3 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="xl:col-span-2 rounded-2xl shadow-lg overflow-hidden border dark:border-gray-700"
        >
          <CodeMirror
            value={code}
            height="400px"
            extensions={[languageExtensions[language]]}
            theme={theme === 'dark' ? dracula : githubLight}
            onChange={(val) => setCode(val)}
          />
        </motion.div>

        {/* Input + Output - 1/3 */}
        <div className="flex flex-col gap-4">
          {/* Input */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow"
          >
            <h3 className="text-lg font-semibold mb-2">Input</h3>
            <textarea
              className="w-full bg-gray-100 dark:bg-gray-900 dark:text-white p-3 rounded-xl resize-y"
              rows="7"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input for your program..."
            />
          </motion.div>

          {/* Output */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow"
          >
            <h3 className="text-lg font-semibold mb-2">Output</h3>
            <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-xl text-sm text-gray-800 dark:text-white whitespace-pre-wrap max-h-64 overflow-auto">
              {output}
            </pre>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
