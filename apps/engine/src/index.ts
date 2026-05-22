import {
  ADD_BALANCE,
  CANCEL_ORDER,
  INDEX_PRICE,
  MARKET_PRICE_UPDATE,
  NEW_ORDER,
  REGISTER_USER,
  type AddBalance,
  type RegisterUser,
} from "types";
import { streamReader } from "./redis/redis";
import { env } from "./util/env";
import { addUserBalance, createUserBalance } from "./engine/balance";
import { logger } from "./util/logger";

async function engineStart() {
  logger.info("Matching engine has started!");
  while (true) {
    const response: any = await streamReader.XREAD(
      [{ key: env.redisReaderStream, id: "$" }],
      {
        BLOCK: 500,
        COUNT: 1,
      },
    );

    if (!response) {
      continue;
    }

    const eventType = response[0].messages[0].message.type;
    const eventData = response[0].messages[0].message.data;
    logger.info("======== Event Received ========");
    logger.info(`Event Type : ${eventType}`);
    logger.info(`Event Data : ${eventData}`);

    if (eventType === REGISTER_USER) {
      const data: RegisterUser = JSON.parse(eventData);
      createUserBalance(data);
    } else if (eventType === ADD_BALANCE) {
      const data: AddBalance = JSON.parse(eventData);
      addUserBalance(data);
    } else if (eventType === NEW_ORDER) {
    } else if (eventType === CANCEL_ORDER) {
    } else if (eventType === INDEX_PRICE) {
    } else if (eventType === MARKET_PRICE_UPDATE) {
    } else {
      throw new Error("Invalid/Unhandled event");
    }
  }
}

engineStart();
