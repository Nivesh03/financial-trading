import { Router } from "express";
import { handleTransaction } from "../controllers/transaction-controllers";
const transactionRouter = Router();

// transactionRouter.get("/", )
transactionRouter.post("/buy", handleTransaction)

export { transactionRouter };
