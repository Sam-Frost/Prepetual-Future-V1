import { Router } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { authMiddleware } from "../utils/jwt";
import {
  createOrder,
  deleteOrder,
  getOpenOrders,
  getOrders,
} from "../controllers/order-controller";

export const orderRouter = Router();

orderRouter.use(authMiddleware);

orderRouter.post("/order", asyncHandler(createOrder));
orderRouter.delete("/order", asyncHandler(deleteOrder));
orderRouter.get("/orders/open/:marketId", asyncHandler(getOpenOrders));
orderRouter.get("/orders/:marketId", asyncHandler(getOrders));
