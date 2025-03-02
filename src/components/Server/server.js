const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const fs = require("fs");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());

const CODE_FILE = "saved_code.json";

// Load existing code or create default
const loadCode = () => {
  if (fs.existsSync(CODE_FILE)) {
    return JSON.parse(fs.readFileSync(CODE_FILE, "utf8"));
  } else {
    return { language: "javascript", code: "// Start coding here" };
  }
};

// Save code to JSON
const saveCode = (data) => {
  fs.writeFileSync(CODE_FILE, JSON.stringify(data, null, 2), "utf8");
};

// Endpoint to fetch saved code
app.get("/get-code", (req, res) => {
  res.json(loadCode());
});

// Endpoint to save code (restrict modification after submission)
app.post("/save-code", (req, res) => {
  const { language, code, submitted } = req.body;
  const savedData = { language, code, submitted };
  saveCode(savedData);
  io.emit("code_update", savedData);
  res.json({ message: "Code saved successfully!", submitted });
});

// Endpoint to execute code
app.post("/run-code", (req, res) => {
  const { language, code, input } = req.body;

  // Create a temporary file for execution
  const tempFile = `temp.${language === "python" ? "py" : "js"}`;
  fs.writeFileSync(tempFile, code, "utf8");

  // Command to execute the code
  const command = language === "python" ? `python ${tempFile}` : `node ${tempFile}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      res.json({ output: stderr || error.message });
    } else {
      res.json({ output: stdout });
    }
  });
});

// WebSocket for real-time updates
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("update_code", (data) => {
    io.emit("code_update", data); // Broadcast updates
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(4000, () => console.log("Server running on port 4000"));
