import { createClient } from "redis";
import { logger } from "../util/logger";
import { env } from "../util/env";
import { markPriceEventSchema } from "../../types/markPriceEventSchema";
import {
  backendToStreamRecord,
  MARKET_PRICE_UPDATE,
  type MarketPriceUpdate,
  type StreamEvent,
} from "types";

export const streamWriter = createClient({
  url: env.redisUrl,
});

streamWriter.on("error", (err) => {
  logger.error("Error connecting to redis write stream");
});

export async function sendToRedis(data: unknown) {
  const parsedEvent = markPriceEventSchema.safeParse(data);

  if (!parsedEvent.success) {
    logger.error("Invaid mark price event, failed parsing");
    return;
  }

  const event: StreamEvent<MarketPriceUpdate> = {
    type: MARKET_PRICE_UPDATE,
    data: {
      symbol: parsedEvent.data.s,
      marketPrice: parsedEvent.data.p,
    },
  };

  await streamWriter.XADD(
    env.redisWriteStream,
    "*",
    backendToStreamRecord<MarketPriceUpdate>(event),
  );
}

export async function connectRedis() {
  await streamWriter.connect();

  logger.info("Redis streamWriter connected successfully!");
}
