import express from "express";
import connectDB from "./config/connect.js";
import cors from "cors";
import dotenv from "dotenv";

import facultyRouter from "./routes/facultyRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import labRouter from "./routes/labRoutes.js";
import studentRouter from "./routes/studentRoutes.js";
import executionRoutes from './routes/executionRoutes.js';



dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/faculty", facultyRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/labs", labRouter);
app.use('/api/execution', executionRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
