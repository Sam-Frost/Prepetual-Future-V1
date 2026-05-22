import jwt from "jsonwebtoken";
import { env } from "./env";
import type { Request, Response, NextFunction } from "express";

export interface jwtPayload {
  id: string;
}

export function generateJwtToken(payload: jwtPayload): string {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: "7d",
  });
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeaders = req.headers.authorization;

  const token =
    typeof authHeaders === "string" && authHeaders.startsWith("Bearer")
      ? authHeaders.slice(7)
      : undefined;

  if (token === undefined) {
    return res.status(401).json({
      error: "Unathorized, missing token!",
    });
  }

  try {
    const jwtPayload = jwt.verify(token, env.jwtSecret) as jwtPayload;
    req.userId = jwtPayload.id;
    next();
  } catch {
    res.status(401).json({
      error: "invalid token!",
    });
  }
}
