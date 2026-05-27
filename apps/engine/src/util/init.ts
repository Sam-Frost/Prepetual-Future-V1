import { inMemoryDb } from "../db/db";
import { logger } from "./logger";

export function init() {
  logger.info("Initializing engine");
  inMemoryDb.orderBook.createNewMarketOrderBook("1");
}
