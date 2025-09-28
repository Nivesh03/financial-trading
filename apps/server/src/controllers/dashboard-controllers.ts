import type { Response } from "express";
import * as dashboardService from "../services/dashboard-services";
import { handleError, handleSuccess } from "../utils/response";
import type { AuthenticatedRequest } from "../middlewares/auth-middlewares";
import { watchlistSchema } from "../types/dashboard-schema";
import { validateBody } from "../utils/validation";

export const getPortfolio = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  if (!req.user)
    return handleError(res, { success: false }, "Unauthenticated", 403);
  const userId = req.user.id;
  const portfolio = await dashboardService.getPortfolio(userId);
  handleSuccess(res, portfolio, "User portfolio");
};

export const getWatchlist = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  if (!req.user)
    return handleError(res, { success: false }, "Unauthenticated", 403);
  const userId = req.user.id;
  const watchlist = await dashboardService.getWatchlist(userId);
  handleSuccess(res, watchlist, "user watchlist");
};

export const addToWatchlist = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  if (!req.user)
    return handleError(res, { success: false }, "Unauthenticated", 403);
  const userId = req.user.id;
  const data = validateBody(watchlistSchema, req.params);
  const { productId } = data;
  await dashboardService.addToWatchlist(userId, productId);
  handleSuccess(res, { success: true }, "Added to watchlist", 201);
};

export const removeFromWatchlist = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  if (!req.user)
    return handleError(res, { success: false }, "Unauthenticated", 403);
  const userId = req.user.id;
  const data = validateBody(watchlistSchema, req.params);
  const { productId } = data;
  await dashboardService.removeFromWatchlist(userId, productId);
  handleSuccess(res, { success: true }, "Removed from watchlist");
};
