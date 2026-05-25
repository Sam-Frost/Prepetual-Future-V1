import type { Request, Response, NextFunction } from "express";
import { createOrderSchema } from "../types/order-schema";
import { ValidationError } from "../errors/ValidationError";
import { prisma } from "db";
import { sendOrderToEngine } from "../redis/sendToEngine";

export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const parsedParams = createOrderSchema.safeParse(req.body);

  if (!parsedParams.success) {
    throw new ValidationError("Order schema isn't valid!");
  }

  const reqData = parsedParams.data;
  const userId: number = Number(req.userId!);

  const order = await prisma.order.create({
    data: {
      userId: userId,
      margin: reqData.margin,
      quantity: reqData.quantity,
      price: reqData.price,
      totalValue: reqData.totalValue,
      tradeType: reqData.tradeType,
      orderType: reqData.orderType,
      isPostOnly: reqData.isPostOnly,
      isReduceOnly: reqData.isReduceOnly,
      isIoc: reqData.isIoc,
    },
  });

  const response = await sendOrderToEngine(order);
}

export async function deleteOrder(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {}

export async function getOrders(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {}

export async function getOpenOrders(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {}
