import type { AddBalance, RegisterUser } from "types";
import { sendAddBalanceAck, sendRegisterUserAck } from "../redis/sendToBackend";
import { inMemoryDb } from "../db/db";

export async function createUserBalance(data: RegisterUser) {
  inMemoryDb.user.createUserBalance(data.userId);
  await sendRegisterUserAck(data.correlationId, data.userId);
}

export async function addUserBalance(data: AddBalance) {
  const updatedBalance = inMemoryDb.user.increaseUserBalance(
    data.userId,
    data.amount,
  );
  await sendAddBalanceAck(data.correlationId, data.userId, updatedBalance);
}
