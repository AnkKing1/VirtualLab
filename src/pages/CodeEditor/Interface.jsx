import { useEditor } from "../../context/EditorContext";
import { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";

const Interface = () => {
  const { code, updateCode, language, changeLanguage, theme, changeTheme } = useEditor();

  // Language mode mapping
  const getMode = (lang) => {
    const modes = {
      javascript: "javascript",
      python: "python",
      c: "text/x-csrc",
      cpp: "text/x-c++src",
      java: "text/x-java",
    };
    return modes[lang] || "javascript";
  };

  return (
    <div>
      {/* Language & Theme Selection */}
      <div className="flex justify-between mb-2">
        <select value={language} onChange={(e) => changeLanguage(e.target.value)} className="p-2 border rounded">
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>

        <select value={theme} onChange={(e) => changeTheme(e.target.value)} className="p-2 border rounded">
          <option value="light">Light</option>
          <option value="material">Dark (Material)</option>
        </select>
      </div>

      {/* Code Editor */}
      <CodeMirror
        value={code}
        onBeforeChange={(editor, data, value) => updateCode(value)}
        options={{
          mode: getMode(language),
          theme: theme === "light" ? "default" : "material",
          lineNumbers: true,
        }}
      />
    </div>
  );
};

export default Interface;
