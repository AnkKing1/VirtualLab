import LabDetails from "./LabDetails";
import Interface from "./Interface";
import Input from "./Input";
import Output from "./Output";
import RunButton from "./RunButton";

const CodeEditor = () => {
  return (
    <div className="grid grid-cols-3 gap-6 p-6 h-screen bg-gray-50">
      {/* Left Section - Lab Details */}
      <div className="col-span-1 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <LabDetails/>
      </div>

      {/* Right Section - Code Editor, Input, Output */}
      <div className="col-span-2 flex flex-col space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex-1">
          <Interface />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <Input />
          </div>

          {/* Output Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
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
