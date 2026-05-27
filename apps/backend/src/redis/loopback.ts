import type { EngineResponse } from "types";
import { env } from "../utils/env";
import { logger } from "../utils/logger";
import { streamReader } from "./redis";

type PedingRequest = {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  timeout: NodeJS.Timeout;
};

export const pendingRequest: Record<string, PedingRequest> = {};

async function loopback() {
  while (true) {
    const response: any = await streamReader.XREAD(
      [{ key: env.redisReaderStream, id: "$" }],
      {
        BLOCK: 500,
        COUNT: 1,
      },
    );

    if (!response) continue;

    const message = response[0].messages[0].message;

    if (!message) {
      throw new Error("Empty message recived from engine");
    }

    const typedMessage = message as EngineResponse<string>;
    const success = Boolean(typedMessage.success);
    const eventType = typedMessage.type;
    const parsedMessageData = JSON.parse(typedMessage.data);

    const correlationId: string = parsedMessageData.correlationId;

    if (pendingRequest[correlationId]) {
      const responseObj: EngineResponse<unknown> = {
        success,
        type: eventType,
        data: parsedMessageData,
      };
      if (success) {
        pendingRequest[correlationId].resolve(responseObj);
      } else {
        pendingRequest[correlationId].reject(responseObj);
      }
    }
  }
}

loopback();
