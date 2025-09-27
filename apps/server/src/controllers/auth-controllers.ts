import type { Request, Response } from "express";
import { validateBody } from "../utils/validation";
import {
  getUser,
  register,
  removeSession,
  signIn,
} from "../services/auth-services";
import { SignInSchema, SignUpSchema } from "../types/user-schema";
import { handleError, handleSuccess } from "../utils/response";

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
    handleSuccess(res, null, "Signup successful", 201);
  } catch (error) {
    handleError(res, error, "Signup failed", 400);
  }
};

export const signInController = async (req: Request, res: Response) => {
  try {
    const data = validateBody(SignInSchema, req.body);
    const token = await signIn(data);
    if (!token) {
      return handleError(
        res,
        "Invalid email or password",
        "Invalid credentials",
        401
      );
    }
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    handleSuccess(res, null, "Login successful");
  } catch (error) {
    handleError(res, error, "Validation failed", 400);
  }
};

export const signOutContoller = async (req: Request, res: Response) => {
  const { token } = req.cookies;
  if (token) {
    await removeSession(token);
  }
  res.clearCookie("token");
  handleSuccess(res, null, "Logged out");
};
export const getUserController = async (req: Request, res: Response) => {
  const { token } = req.cookies;
  if (!token) {
    return handleError(
      res,
      "Unauthorized: No token provided",
      "Invalid credentials",
      401
    );
  }
  const user = await getUser(token);
  if (!user) {
    return handleError(
      res,
      "User not found for given token",
      "Invalid credentials",
      401
    );
  }
  handleSuccess(res, user, "User retrieved successfully");
};

