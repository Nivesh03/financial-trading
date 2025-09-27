import type { NextFunction, Request, Response } from "express";
import { getUser } from "../services/auth-services";
import { handleError } from "../utils/response";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  if (!user.success) {
    return handleError(
      res,
      "User not found for given token",
      "Invalid credentials",
      401
    );
  }
  next();
};