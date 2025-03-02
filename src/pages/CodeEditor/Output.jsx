import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000");

export default function Output() {
  const [output, setOutput] = useState("");

  useEffect(() => {
    socket.on("output_update", (data) => {
      setOutput(data);
    });
    return () => socket.off("output_update");
  }, []);

  const fetchOutput = () => {
    axios.post("http://localhost:4000/run-code", { language: "javascript", code: "console.log('Test');" })
      .then((res) => {
        setOutput(res.data.output);
        socket.emit("output_update", res.data.output);
      });
  };

  return (
    <Card className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold">Output</h3>
      <ScrollArea className="bg-black p-2 rounded-lg mt-2 h-32 text-gray-300 overflow-y-auto">
        {output || "No output yet..."}
      </ScrollArea>
      <Button onClick={fetchOutput} className="mt-2">Refresh Output</Button>
    </Card>
  );
}
