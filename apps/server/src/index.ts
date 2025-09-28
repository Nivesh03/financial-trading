import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth-routes";
import { productRouter } from "./routes/product-routes";
import { transactionRouter } from "./routes/transaction-router";
import dashboardRouter from "./routes/dashboard-routes";
const PORT = process.env.PORT || 3000;
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) =>
  res.json({
    PORT,
  })
);

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/transactions", transactionRouter);
app.use("/dashboard", dashboardRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
