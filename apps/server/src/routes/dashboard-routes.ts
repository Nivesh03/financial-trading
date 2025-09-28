import { Router } from "express";
import { protect } from "../middlewares/auth-middlewares";
import { getPortfolio, getWatchlist, addToWatchlist, removeFromWatchlist } from "../controllers/dashboard-controllers";

const router = Router();

router.use(protect);

router.get("/portfolio", getPortfolio);
router.get("/watchlist", getWatchlist);
router.post("/watchlist/:productId", addToWatchlist);
router.delete("/watchlist/:productId", removeFromWatchlist);

export default router;
