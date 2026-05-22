import type { Request, Response, NextFunction } from "express";

export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {}

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
