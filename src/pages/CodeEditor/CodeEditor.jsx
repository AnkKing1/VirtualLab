import LabDetails from "./LabDetails";
import Interface from "./Interface";
import Input from "./Input";
import Output from "./Output";
import RunButton from "./RunButton";

const CodeEditor = () => {
  return (
    <div className="grid grid-cols-4 gap-6 p-6 h-screen bg-gray-900 text-white">
      {/* Left Section - Lab Details */}
      <div className="col-span-1 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <LabDetails />
      </div>

      {/* Right Section - Code Editor, Input, Output */}
      <div className="col-span-3 flex flex-col space-y-6">
        {/* Code Editor Section */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 flex-1">
          <Interface />
        </div>

        {/* Input & Output Section */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <Input />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <Output />
          </div>
        </div>

        {/* Run Button */}
        <div className="flex justify-center">
          <RunButton />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
