import { useExecution } from "../../context/ExecutionContext";

const RunButton = () => {
  const { isRunning, executeCode } = useExecution();

  return (
    <button
      className={`px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300 ${
        isRunning
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
      }`}
      onClick={executeCode}
      disabled={isRunning}
    >
      {isRunning ? "Running..." : "Run Code"}
    </button>
  );
};

export default RunButton;
