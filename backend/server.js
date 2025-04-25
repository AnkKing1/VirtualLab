import express from "express"
import connectDB from "./config/connect.js";
import cors from "cors"
import dotenv from 'dotenv';
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/v1/user",userRouter)
app.use("/api/v1/admin",adminRouter)
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

