import WebSocket from "ws";
import { env } from "./util/env";
import { logger } from "./util/logger";
import {
  connectRedis,
  sendToRedis as sendMarkPriceToRedis,
} from "./redis/redis";
import { prisma } from "db";

const markets: string[] = [];

async function getMarkets() {
  const marketsInDb = await prisma.market.findMany({
    select: {
      symbol: true,
    },
  });

  marketsInDb.forEach((market) => {
    markets.push(market.symbol);
  });
}

function priceTracker(symbol: string) {
  if (!symbol) {
    logger.error("Symbol is missing!");
    throw new Error();
  }

  const ws = new WebSocket(
    `${env.binanceUrl}/market/ws/${symbol}@markPrice@1s`,
  );

  ws.on("open", () => {
    logger.info(`Web socket is connected for : ${symbol}`);
  });

  ws.on("message", (data) => {
    logger.info(`Incomming data :  ${data}`);
    const dataObj = JSON.parse(data.toString());
    sendMarkPriceToRedis(dataObj);
  });

  ws.on("ping", (data) => {
    logger.info("Received ping from ws, sending pong!");
    ws.pong(data);
  });

  ws.on("close", () => {
    logger.info(`Web socket is closed for : ${symbol}`);
  });

  ws.on("error", (err) => {
    logger.error(
      `Web socket err occured for for : ${symbol} \n Error : ${err}`,
    );
  });
}

priceTracker("btcusdt");

async function init() {
  await Promise.all([connectRedis(), getMarkets()]);

  for (const market in markets) {
    priceTracker(market);
  }
}

init();
