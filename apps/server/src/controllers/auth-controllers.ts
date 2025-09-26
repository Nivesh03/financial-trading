import type { Request, Response } from "express";
import { validateBody } from "../utils/validation";
import {
  getUser,
  register,
  removeSession,
  signIn,
} from "../services/auth-services";
import { SignInSchema, SignUpSchema } from "../types/user-schema";

export const signUpContoller = async (req: Request, res: Response) => {
  try {
    const data = validateBody(SignUpSchema, req.body);
    const passwordHash = await Bun.password.hash(data.password);
    const newData = {
      ...data,
      password: passwordHash,
    };
    const token = await register(newData);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ success: true, message: "Signup successsful" });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        details: error.message,
      });
    }
    res.status(400).json({
      success: false,
      message: "Validation failed",
      details: "Unknown",
    });
  }
};

export const signInController = async (req: Request, res: Response) => {
  try {
    const data = validateBody(SignInSchema, req.body);
    const token = await signIn(data);
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ success: true, message: "Login successsful" });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        details: error.message,
      });
    }
    res.status(400).json({
      success: false,
      message: "Validation failed",
      details: "Unknown",
    });
  }
};

export const signOutContoller = async (req: Request, res: Response) => {
  const { token } = req.cookies;
  if (!token) {
    res.json({ success: true, message: "Logged out" });
  }
  res.clearCookie("token");
  await removeSession(token);
  res.json({ success: true, message: "Logged out" });
};
export const getUserController = async (req: Request, res: Response) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }
  const user = await getUser(token);
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }
  res.json({ success: true, user });
};

