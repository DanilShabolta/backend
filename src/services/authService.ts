import { userModel } from "../model/userModel";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "sikret";

const registerUser = async (
  login: string,
  password: string,
  firstname: string,
  lastname: string,
  role: string
) => {
  const existingUser = await userModel.findOne({ login });
  if (existingUser) {
    throw new Error("User already exist");
  }
  const user = new userModel({ login, password, role, firstname, lastname });
  await user.save();
  return user;
};

const loginUser = async (login: string, password: string) => {
  const user = await userModel.findOne({ login });
  if (!user) {
    throw new Error("User not found!");
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error("Invalid password!");
  }
  return user;
};

const generateToken = (Id: string) => {
  return jwt.sign({ Id }, JWT_SECRET, { expiresIn: "1h" });
};

export const authService = {
  registerUser,
  generateToken,
  loginUser,
};
