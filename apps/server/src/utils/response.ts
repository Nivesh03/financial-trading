import type { Response } from "express";

export const handleError = (
  res: Response,
  error: unknown,
  message: string,
  statusCode: number = 500
) => {
  console.error(error);
  const details = error instanceof Error ? error.message : "Unknown error";
  res.status(statusCode).json({
    success: false,
    message,
    details,
  });
};

export const handleSuccess = (
  res: Response,
  data: any,
  message: string,
  statusCode: number = 200
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
