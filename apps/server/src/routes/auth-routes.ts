import { Router } from "express";
import {
  getUserController,
  signInController,
  signOutContoller,
  signUpContoller,
} from "../controllers/auth-controllers";

const authRouter = Router();

authRouter.post("/sign-up", signUpContoller);
authRouter.post("/sign-in", signInController);
authRouter.post("/sign-out", signOutContoller);
authRouter.get("/get-user", getUserController);

export { authRouter };
