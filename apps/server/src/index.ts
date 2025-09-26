import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth-routes";
const PORT = process.env.PORT || 3000;
const app = express();
app.use(
  cors({
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
