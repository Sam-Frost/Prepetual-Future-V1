import { logger } from "./logger";

export class EngineError extends Error {
  constructor(message: string) {
    logger.error(message);
    super(message);
  }
}
