import { useOutput } from "../../context/OutputContext";

const Output = () => {
  const { output, error, updateOutput, updateError } = useOutput();

  // Function to clear output and errors
  const clearOutput = () => {
    updateOutput("");
    updateError("");
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-300">Output</h3>
        <button
          onClick={clearOutput}
          className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition"
        >
          Clear
        </button>
      </div>

      <div className="h-40 overflow-auto border border-gray-700 rounded p-3 bg-black text-sm">
        {error ? (
          <pre className="text-red-500">{error}</pre>
        ) : output ? (
          <pre className="text-green-400">{output}</pre>
        ) : (
          <p className="text-gray-500">Run the code to see the output...</p>
        )}
      </div>
    </div>
  );
};

export default Output;
