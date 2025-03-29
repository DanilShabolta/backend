import express from "express";
//import mongoose from "mongoose";
//import { Request, Response } from "express";
import { authController } from "./controller/authController";
import { connectDB } from "./config/db";
import { userRoutes } from "./routes/userRoutes";
import { authRoutes } from "./routes/authRoutes";

const app = express();
const port = 11112;

const start = async () => {
  try {
    connectDB();
    // await mongoose.connect(
    //   "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.8"
    // );
    app.use(express.json());
    app.use("/api/auth", authRoutes);
    app.use("/api/user", userRoutes);
    // app.get("/", (req: Request, res: Response) => {
    //   res.send("Hello, Express with TypeScript!");
    // });
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

app.use("/controller", authController.login);
