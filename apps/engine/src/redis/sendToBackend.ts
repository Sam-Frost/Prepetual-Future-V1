import {
  ADD_BALANCE,
  engineToStreamRecord,
  NEW_ORDER,
  REGISTER_USER,
  type AddBalanceResponse,
  type CreateOrder,
  type CreateOrderResponse,
  type EngineResponse,
  type RegisterUserResponse,
  type StreamEvent,
} from "types";
import { env } from "../util/env";
import { streamWriter } from "./redis";
import { logger } from "../util/logger";

export async function sendRegisterUserAck(
  correlationId: string,
  userId: string,
) {
  const event: EngineResponse<RegisterUserResponse> = {
    success: true,
    type: REGISTER_USER,
    data: {
      correlationId,
      userId,
    },
  };

  console.log(`Sending register user ACK ${JSON.stringify(event)}`);
  sendToRedis(event);
}

export async function sendAddBalanceAck(
  correlationId: string,
  userId: string,
  totalBalance: string,
) {
  logger.info(
    `Sending add balace ack to server for correlation id ${correlationId}`,
  );
  const event: EngineResponse<AddBalanceResponse> = {
    success: true,
    type: ADD_BALANCE,
    data: {
      correlationId,
      userId,
      totalBalance,
    },
  };
  sendToRedis(event);
}

export async function sendOrderCreatedAck(order: CreateOrder) {
  logger.info(
    `Sending create order ACK for correlation id : ${order.correlationId}`,
  );
  const event: EngineResponse<CreateOrderResponse> = {
    success: true,
    type: NEW_ORDER,
    data: {
      correlationId: order.correlationId,
      orderId: order.orderId,
    },
  };
  await sendToRedis(event);
}

export async function sendErrorResponse() {}

async function sendToRedis<T>(event: EngineResponse<T>) {
  try {
    await streamWriter.XADD(
      env.redisWriterStream,
      "*",
      engineToStreamRecord(event),
    );
  } catch (e) {
    console.error("Error occured while trying to send register user event");
  }
}
