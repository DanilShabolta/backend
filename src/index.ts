import express from "express";
import { authController } from "./controller/authController";
import { connectDB } from "./config/db";
import { userRoutes } from "./routes/userRoutes";
import { authRoutes } from "./routes/authRoutes";

const app = express();
const port = 11113;

const start = async () => {
  try {
    connectDB();
    app.use(express.json());
    app.use("/auth", authRoutes);
    app.use("/user", userRoutes);
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
