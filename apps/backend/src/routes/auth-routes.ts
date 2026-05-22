import { Router } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { signin, signup } from "../controllers/auth-controller";

export const authRouter = Router();

authRouter.post("/signup", asyncHandler(signup));
authRouter.post("/signin", asyncHandler(signin));
