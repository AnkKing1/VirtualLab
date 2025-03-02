import { useState, useEffect } from "react";
import Interface from "./Interface";
import Input from "./Input";
import Output from "./Output";
import ChatSection from "./ChatSection";
import { Card } from "@/components/ui/card";
import axios from "axios";

export default function CodeEditor() {
  const [labDetails, setLabDetails] = useState({ question: "", timer: 0 });

  useEffect(() => {
    axios.get("http://localhost:4000/get-lab-details").then((res) => {
      setLabDetails(res.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 p-4 h-screen">
      {/* Lab Details */}
      <Card className="col-span-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">Lab Question</h2>
        <p className="bg-yellow-500 text-black p-2 rounded-lg mt-2">{labDetails.question || "Loading..."}</p>
        <p className="text-sm text-gray-400">Time Remaining: {labDetails.timer} mins</p>
      </Card>
      
      {/* Main Interface (3/4th part) */}
      <div className="col-span-3 grid grid-rows-6 gap-4">
        <Interface className="row-span-4" />
        
        {/* Input & Output Section */}
        <div className="row-span-2 grid grid-cols-2 gap-4">
          <Input />
          <Output />
        </div>
      </div>
      
      {/* Chat Section (1/4th part) */}
      <ChatSection className="col-span-1" />
    </div>
  );
}

