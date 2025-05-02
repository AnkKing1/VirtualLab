import express from "express";
import connectDB from "./config/connect.js";
import cors from "cors";
import dotenv from "dotenv";

import facultyRouter from "./routes/facultyRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import labRouter from "./routes/labRoutes.js";
import studentRouter from "./routes/studentRoutes.js";
import codeRoutes from "./routes/codeRoutes.js";

const corsOptions = {
  origin:"http://localhost:5173",
  methods:"GET, POST, PUT, PATCH ,HEAD",
  credentials:true,
};


dotenv.config();
const app = express();
app.use(cors(corsOptions)); 
connectDB();

app.use(express.json());
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/faculty", facultyRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/labs", labRouter);
app.use('/api/execution', codeRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
