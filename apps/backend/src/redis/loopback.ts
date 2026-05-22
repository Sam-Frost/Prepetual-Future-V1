import { env } from "../utils/env";
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
    const success = Boolean(message.success);
    const data = JSON.parse(message.data);

    const eventType: string = data.type;
    const eventData = data.data;
    const eventError: string = message.error;

    const correlationId: string = eventData.correlationId;

    if (pendingRequest[correlationId]) {
      if (success) {
        pendingRequest[correlationId].resolve(eventData);
      } else {
        pendingRequest[correlationId].reject(eventData);
      }
    }
  }
}

loopback();
