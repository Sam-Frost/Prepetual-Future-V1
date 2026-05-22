import {
  ADD_BALANCE,
  engineToStreamRecord,
  REGISTER_USER,
  type AddBalanceResponse,
  type RegisterUserResponse,
  type StreamEvent,
} from "types";
import { env } from "../util/env";
import { streamWriter } from "./redis";
import { logger } from "../util/logger";

export async function sendRegisterUserAck(
  correlationId: string,
  userId: number,
) {
  const event: StreamEvent<RegisterUserResponse> = {
    type: REGISTER_USER,
    data: {
      correlationId,
      userId,
    },
  };

  console.log(`Sending register user ACK ${JSON.stringify(event)}`);
  try {
    await streamWriter.XADD(
      env.redisWriterStream,
      "*",
      engineToStreamRecord(true, event),
    );
  } catch (e) {
    console.error("Error occured while trying to send register user event");
  }
}

export async function sendAddBalanceAck(
  correlationId: string,
  userId: number,
  totalBalance: number,
) {
  logger.info(
    `Sending add balace ack to server for correlation id ${correlationId}`,
  );
  const event: StreamEvent<AddBalanceResponse> = {
    type: ADD_BALANCE,
    data: {
      correlationId,
      userId,
      totalBalance,
    },
  };
  try {
    await streamWriter.XADD(
      env.redisWriterStream,
      "*",
      engineToStreamRecord(true, event),
    );
  } catch (e) {
    logger.error("Error occured while trying to send add balance event");
  }
}
