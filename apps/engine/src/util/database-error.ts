import { logger } from "./logger";

export class DatabaseError extends Error {
  constructor(message: string) {
    logger.error(message);
    super(message);
  }
}
