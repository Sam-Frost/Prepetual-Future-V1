import { Router } from "express";
import { authMiddleware } from "../utils/jwt";
import { asyncHandler } from "../utils/AsyncHandler";
import {
  getAvailableEquity,
  getClosedPositions,
  getFills,
  getOpenPositions,
  onRamp,
} from "../controllers/exchange-controller";

export const exchangeRouter = Router();

exchangeRouter.post("/onramp", authMiddleware, asyncHandler(onRamp));
exchangeRouter.get(
  "/equity/available",
  authMiddleware,
  asyncHandler(getAvailableEquity),
);
exchangeRouter.get(
  "/positions/open/:marketId",
  authMiddleware,
  asyncHandler(getOpenPositions),
);
exchangeRouter.get(
  "/positions/closed/:marketId",
  authMiddleware,
  asyncHandler(getClosedPositions),
);
exchangeRouter.get("/fills", authMiddleware, asyncHandler(getFills));
