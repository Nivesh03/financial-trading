import type { NextFunction, Request, Response } from "express";
import { getUser } from "../services/auth-services";
import { handleError } from "../utils/response";
import type { User } from "../db/schema";

export interface AuthenticatedRequest extends Request {
  user?: Omit<User, "password">;
}

export const protect = async (
  req: AuthenticatedRequest,
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
  if (!user.success || !user.data) {
    return handleError(
      res,
      "User not found for given token",
      "Invalid credentials",
      401
    );
  }
  req.user = user.data;
  next();
};