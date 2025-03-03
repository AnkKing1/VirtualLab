import { useOutput } from "../../context/OutputContext";

const Output = () => {
  const { output, error } = useOutput();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Output</h3>

      {output && (
        <pre className="w-full p-2 bg-gray-100 border rounded text-green-700">
          {output}
        </pre>
      )}

      {error && (
        <pre className="w-full p-2 bg-red-100 border rounded text-red-700">
          {error}
        </pre>
      )}

      {!output && !error && (
        <p className="text-gray-500">Run the code to see the output...</p>
      )}
    </div>
  );
};

export default Output;
