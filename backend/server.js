import express from "express";
import connectDB from "./config/connect.js";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from 'socket.io';
import http from 'http';

import facultyRouter from "./routes/facultyRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import labRouter from "./routes/labRoutes.js";
import studentRouter from "./routes/studentRoutes.js";
import router from "./routes/codeExecutionRoutes.js";
import { executeCode } from "./controllers/codeExecutionController.js"

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // ← Create HTTP server

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
}); // ← Attach Socket.IO to that server

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// REST routes
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/faculty", facultyRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/labs", labRouter);
app.use("/api/code", router);

// WebSocket connection
io.on("connection", (socket) => {
  console.log("🟢 A user connected:", socket.id);

  socket.on("execute-code", async (data) => {
    try {
      const { code, input, language, labId, studentId } = data;
      const output = await executeCode({ code, input, language, labId, studentId });
      socket.emit("code-executed", { output });
    } catch (error) {
      socket.emit("execution-error", { error: error.message });
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 A user disconnected:", socket.id);
  });
});

// ✅ Start the HTTP server (with WebSocket support)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server with WebSocket running on port ${PORT}`);
});
