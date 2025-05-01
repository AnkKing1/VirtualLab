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

const languageExtensions = {
  cpp: cpp(),
  java: java(),
  python: python(),
  javascript: javascript(),
};

const CodeEditor = () => {
  const { labId } = useParams();
  const [labDetails, setLabDetails] = useState(null);
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('light');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    const fetchLab = async () => {
      try {
        const res = await fetch(`/api/labs/${labId}`);
        const data = await res.json();
        setLabDetails(data);
      } catch (err) {
        console.error('Error fetching lab:', err);
      }
    };
    if (labId) fetchLab();
  }, [labId]);

  const runCode = async () => {
    try {
      const res = await fetch('/api/code/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, input, language }),
      });
      const data = await res.json();
      setOutput(data.output || data.error || 'No output');
    } catch (err) {
      setOutput('Error executing code.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 text-gray-900 dark:text-white">
      {/* Lab Info */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-6"
      >
        <h2 className="text-3xl font-bold mb-2">Lab Details</h2>
        {labDetails ? (
          <div className="space-y-1 text-gray-700 dark:text-gray-300">
            <p><strong>Title:</strong> {labDetails.title}</p>
            <p><strong>Description:</strong> {labDetails.description}</p>
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
