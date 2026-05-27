import type { Request, Response, NextFunction } from "express";
import { createOrderSchema } from "../types/order-schema";
import { ValidationError } from "../errors/ValidationError";
import { prisma } from "db";
import { sendOrderToEngine } from "../redis/sendToEngine";
import type { CreateOrderResponse, EngineResponse } from "types";
import { ApiResponse } from "../utils/apiResponse";

export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const parsedParams = createOrderSchema.safeParse(req.body);

  if (!parsedParams.success) {
    console.log(parsedParams.error);
    throw new ValidationError("Order schema isn't valid!");
  }

  const reqData = parsedParams.data;
  const userId: number = Number(req.userId!);

  const order = await prisma.order.create({
    data: {
      userId: userId,
      marketId: reqData.marketId,
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

  const response = (await sendOrderToEngine(
    order,
  )) as EngineResponse<CreateOrderResponse>;
  console.log("CREATE ORDER RESPOSNE");
  console.log(response);

  if (response.success) {
    res.status(201).json(
      new ApiResponse(
        true,
        {
          orderId: response.data.orderId,
        },
        `Order has been created with order id ${response.data.orderId}`,
      ),
    );
  } else {
    res.status(500).json({
      message: "Something went wrong when trying to create order",
    });
  }
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
