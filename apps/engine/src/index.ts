import {
  ADD_BALANCE,
  CANCEL_ORDER,
  NEW_ORDER,
  REGISTER_USER,
  type AddBalance,
  type CreateOrder,
  type RegisterUser,
} from "types";
import { streamReader } from "./redis/redis";
import { env } from "./util/env";
import { addUserBalance, createUserBalance } from "./engine/balance";
import { logger } from "./util/logger";
import { cancelOrder, createOrder } from "./engine/order";
import { EngineError } from "./util/engine-error";

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

    logger.info(
      `New Event Received :\nEvent Type : ${eventType}\nEvent Data : ${eventData}`,
    );

    if (eventType === REGISTER_USER) {
      const data: RegisterUser = JSON.parse(eventData);
      createUserBalance(data);
    } else if (eventType === ADD_BALANCE) {
      const data: AddBalance = JSON.parse(eventData);
      addUserBalance(data);
    } else if (eventType === NEW_ORDER) {
      const data: CreateOrder = JSON.parse(eventData);
      createOrder(data);
    } else if (eventType === CANCEL_ORDER) {
      cancelOrder();
    } else {
      throw new EngineError("Invalid/Unhandled event");
    }
  }
}

engineStart();
