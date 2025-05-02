import express from "express";
import connectDB from "./config/connect.js";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from 'socket.io'; // Correct import
import http from 'http'; // Import http module

import facultyRouter from "./routes/facultyRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import labRouter from "./routes/labRoutes.js";
import studentRouter from "./routes/studentRoutes.js";
import router from "./routes/codeExecutionRoutes.js";

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, PATCH ,HEAD",
  credentials: true,
};

dotenv.config();
const app = express();
app.use(cors(corsOptions));
connectDB();

const server = http.createServer(app);
const io = new Server(server); // Using Server class to create io instance

app.use(express.json());
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/faculty", facultyRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/labs", labRouter);
app.use('/api/code', router);

// WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Handle real-time code execution requests
  socket.on('execute-code', async (data) => {
    try {
      const { code, input, language, labId, userId } = data;
      
      // Execute the code in Docker
      const output = await executeCode({ code, input, language, labId, userId });

      // Emit the output to the frontend
      socket.emit('code-executed', { output });
    } catch (error) {
      socket.emit('execution-error', { error: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
