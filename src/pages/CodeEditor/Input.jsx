import { useInput } from "../../context/InputContext";

const Input = () => {
  const { inputValue, updateInput } = useInput();

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg mt-4">
      <h3 className="text-lg font-semibold text-gray-300 mb-2">Input</h3>

      <textarea
        className="w-full p-3 border border-gray-700 rounded bg-black text-white 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        value={inputValue}
        onChange={(e) => updateInput(e.target.value)}
        placeholder="Enter input for the program..."
        rows="4"
      ></textarea>
    </div>
  );
};

export default Input;
