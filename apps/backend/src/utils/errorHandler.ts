import type { NextFunction, Request, Response } from "express";
import { logger } from "./logger";
import { TimeoutError } from "../errors/TimeoutError";

export function globalErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof Error) {
    logger.trace(err.stack);
  }

  if (err instanceof TimeoutError) {
    logger.error("A timeout error has occured");
    res.status(408).json({
      success: false,
      message: "Request timed out",
    });
  } else if (err instanceof Error) {
    logger.error("An unknown error has occured");
    logger.error(err.name);
    logger.error(err.message);
    logger.trace(err);
    res.status(500).json({
      success: false,
      message: "An unkown error occured.",
    });
  }
}
