import type { Request, Response, NextFunction } from "express";
import { getPositionSchema, onrampSchema } from "../types/exchange-schema";
import { addFundToUserBalance } from "../redis/sendToEngine";
import { prisma, PositionStatus } from "db";
import { PAGE_SIZE } from "../utils/constants";
import { ApiResponse } from "../utils/apiResponse";
import { PaginatedApiResponse } from "../utils/paginatedResponse";

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
): Promise<void> {
  const userId = Number(req.userId);

  const userBalance = await prisma.users.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });
  try {
    res.status(200).json(
      new ApiResponse(
        true,
        {
          userId,
          availableBalance: userBalance.availableBalance,
          lockedBalance: userBalance.lockedBalance,
        },
        `User balance for userId : ${userId}`,
      ),
    );
  } catch (err) {
    throw new Error(`User not found userId ${userId}`);
  }
}

export async function getOpenPositions(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { marketId } = req.params;
  const userId = req.userId;
  const p = req.query.p;

  const parsedScehma = getPositionSchema.parse({
    marketId: Number(marketId),
    userId: Number(userId),
    p: Number(p),
  });

  const positions = await prisma.position.findMany({
    where: {
      userId: parsedScehma.userId,
      marketId: parsedScehma.marketId,
      status: PositionStatus.OPEN,
    },
    skip: PAGE_SIZE * parsedScehma.p,
    take: PAGE_SIZE,
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        true,
        new PaginatedApiResponse(positions, Number(p), PAGE_SIZE),
        `Users open position for marketId ${marketId}`,
      ),
    );
}

export async function getClosedPositions(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { marketId } = req.params;
  const userId = req.userId;
  const p = req.query.p;

  const parsedScehma = getPositionSchema.parse({
    marketId: Number(marketId),
    userId: Number(userId),
    p: Number(p),
  });

  const positions = await prisma.position.findMany({
    where: {
      userId: parsedScehma.userId,
      marketId: parsedScehma.marketId,
      status: PositionStatus.CLOSED,
    },
    skip: PAGE_SIZE * parsedScehma.p,
    take: PAGE_SIZE,
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        true,
        new PaginatedApiResponse(positions, Number(p), PAGE_SIZE),
        `Users closed position for marketId ${marketId}`,
      ),
    );
}

export async function getFills(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {}
