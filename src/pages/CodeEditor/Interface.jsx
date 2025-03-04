import { useEditor } from "../../context/EditorContext";
import { useExecution } from "../../context/ExecutionContext";
import { useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";

// Default code snippets for each language
const defaultCode = {
  javascript: `// JavaScript Example
function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("World"));`,

  python: `# Python Example
def greet(name):
    return "Hello, " + name + "!"
print(greet("World"))`,

  c: `// C Example
#include <stdio.h>
int main() {
    printf("Hello, World!");
    return 0;
}`,

  cpp: `// C++ Example
#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,

  java: `// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
};

const Interface = () => {
  const { code, updateCode, language, changeLanguage, theme, changeTheme } = useEditor();
  const { isRunning, executeCode } = useExecution();

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

  // Set default code when language changes
  useEffect(() => {
    updateCode(defaultCode[language] || "");
  }, [language]);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Code Editor</h2>
        <div className="flex gap-3">
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="px-3 py-2 bg-gray-700 text-white rounded"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>

          <select
            value={theme}
            onChange={(e) => changeTheme(e.target.value)}
            className="px-3 py-2 bg-gray-700 text-white rounded"
          >
            <option value="light">Light</option>
            <option value="material">Material Dark</option>
            <option value="dracula">Dracula</option>
          </select>
        </div>
      </div>

      {/* Code Editor */}
      <CodeMirror
        value={code}
        onBeforeChange={(editor, data, value) => updateCode(value)}
        options={{
          mode: getMode(language),
          theme: theme === "light" ? "default" : theme,
          lineNumbers: true,
        }}
        className="border border-gray-700 rounded"
      />

      {/* Execute & Reset Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={executeCode}
          className={`px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition ${
            isRunning ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isRunning}
        >
          {isRunning ? "Running..." : "Run Code"}
        </button>

        <button
          onClick={() => updateCode(defaultCode[language] || "")}
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition"
        >
          Reset Code
        </button>
      </div>
    </div>
  );
};

export default Interface;
