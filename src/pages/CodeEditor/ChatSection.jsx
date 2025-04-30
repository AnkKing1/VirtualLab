import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); // Adjust URL as needed

export default function ChatSection() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => socket.off("receive_message");
  }, []);

  const sendMessage = () => {
    if (input.trim() === "") return;
    const message = { sender: "Student", text: input };
    socket.emit("send_message", message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setInput("");
  };

  return (
    <Card className="bg-gray-800 p-4 text-white rounded-lg shadow-lg flex flex-col h-full">
      <h3 className="text-lg font-semibold"> ankit Chat</h3>
      <ScrollArea className="flex-1 bg-black p-2 rounded-lg mt-2 text-gray-300 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`mt-2 p-2 rounded-lg ${msg.sender === "Student" ? "bg-blue-500" : "bg-green-500"}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </ScrollArea>
      <div className="mt-2 flex">
        <Input
          className="flex-1 bg-black text-white p-2"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
      </div>
    </Card>
  );
}
