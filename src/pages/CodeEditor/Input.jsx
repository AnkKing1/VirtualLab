import { useInput } from "../../context/InputContext";

const Input = () => {
  const { inputValue, updateInput } = useInput();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Input</h3>
      <textarea
        className="w-full p-2 border rounded h-24"
        value={inputValue}
        onChange={(e) => updateInput(e.target.value)}
        placeholder="Enter input for the program..."
      />
    </div>
  );
};

export default Input;
