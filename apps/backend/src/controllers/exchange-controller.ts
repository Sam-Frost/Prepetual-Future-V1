import type { Request, Response, NextFunction } from "express";
import { onrampSchema } from "../types/exchange-schema";
import { addFundToUserBalance } from "../redis/sendToEngine";

export async function onRamp(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const parsedParams = onrampSchema.safeParse(req.body);

  const userId: number = Number(req.userId!);

  if (!parsedParams.success) {
    res.status(400).json({
      error: parsedParams.error,
    });
    return;
  }

  const { amount } = parsedParams.data;

  const engineResponse = await addFundToUserBalance(userId, amount);
  console.log(engineResponse);
  if (engineResponse.totalBalance) {
    res.status(200).json({
      updatedBalance: engineResponse.totalBalance,
    });
  }

  res.status(500).json({
    error: "something went wrong",
  });
}

export async function getAvailableEquity(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {}

export async function getOpenPositions(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {}

export async function getClosedPositions(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {}

export async function getFills(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {}
