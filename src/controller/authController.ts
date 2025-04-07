import { Request, Response } from "express";
import { authService } from "../services/authService";

const signup = async (req: Request, res: Response) => {
  try {
    const { login, password, firstname, lastname, role } = req.body;
    const user = await authService.registerUser(
      login,
      password,
      firstname,
      lastname,
      role
    );
    const token = authService.generateToken(user._id.toString());
    res.status(201).json({ token });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;
    const user = await authService.loginUser(login, password);
    const token = authService.generateToken(user._id.toString());
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const authController = {
  signup,
  login,
};
