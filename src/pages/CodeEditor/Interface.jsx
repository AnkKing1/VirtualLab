import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000");

const languages = {
  javascript: "console.log('Hello, World!');",
  python: "print('Hello, World!')",
};

export default function Interface() {
  const [code, setCode] = useState("// Start coding here");
  const [language, setLanguage] = useState("javascript");
  const [submitted, setSubmitted] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:4000/get-code").then((res) => {
      setCode(res.data.code);
      setLanguage(res.data.language);
      setSubmitted(res.data.submitted);
    });

    socket.on("code_update", (data) => {
      setCode(data.code);
      setLanguage(data.language);
    });

    return () => socket.off("code_update");
  }, []);

  const handleSave = () => {
    axios.post("http://localhost:4000/save-code", { language, code, submitted: true })
      .then(() => setSubmitted(true));
  };

  const handleRun = () => {
    axios.post("http://localhost:4000/run-code", { language, code })
      .then((res) => alert(`Output: ${res.data.output}`));
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(languages[newLang]);
    socket.emit("update_code", { language: newLang, code: languages[newLang] });
  };

  return (
    <Card className={`p-4 rounded-lg shadow-lg ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Lab Interface</h2>
        <Switch checked={darkMode} onCheckedChange={setDarkMode} label="Dark Mode" />
      </div>
      <Select value={language} onChange={handleLanguageChange} disabled={submitted}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
      </Select>
      <Textarea
        className="w-full h-64 mt-2 p-2"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
          socket.emit("update_code", { language, code: e.target.value });
        }}
        disabled={submitted}
      />
      <div className="flex justify-between mt-4">
        <Button onClick={handleRun} disabled={submitted}>Run</Button>
        <Button onClick={handleSave} disabled={submitted}>Submit</Button>
      </div>
    </Card>
  );
}
