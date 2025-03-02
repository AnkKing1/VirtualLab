import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function Input() {
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("input_update", (data) => {
      setInput(data);
    });
    return () => socket.off("input_update");
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    socket.emit("input_update", e.target.value);
  };

  return (
    <Card className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold">Input</h3>
      <Textarea
        className="w-full h-24 mt-2 p-2 bg-black text-white"
        placeholder="Enter input values..."
        value={input}
        onChange={handleInputChange}
      />
    </Card>
  );
}
