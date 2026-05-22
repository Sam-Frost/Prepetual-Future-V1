import type { AddBalance, RegisterUser } from "types";
import { InMemoryDb } from "../db/db";
import { UserBalance } from "../db/userbalance";
import { sendAddBalanceAck, sendRegisterUserAck } from "../redis/sendToBackend";
import { logger } from "../util/logger";

export async function createUserBalance(data: RegisterUser) {
  InMemoryDb.userBalance.push(new UserBalance(data.userId));

  console.log(data);
  console.log(typeof data);
  await sendRegisterUserAck(data.correlationId, data.userId);
}

export async function addUserBalance(data: AddBalance) {
  for (const user of InMemoryDb.userBalance) {
    if (user.userId === data.userId) {
      logger.info(
        `Updating balance by ${data.amount} for user id ${data.userId}`,
      );
      logger.info;
      user.balance += data.amount;
      await sendAddBalanceAck(data.correlationId, data.userId, user.balance);
      return;
    }
  }
  logger.info(`Unable to add balance for user id ${data.userId}`);
}
