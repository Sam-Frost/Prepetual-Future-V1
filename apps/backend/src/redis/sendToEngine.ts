import {
  ADD_BALANCE,
  REGISTER_USER,
  backendToStreamRecord,
  type AddBalance,
  type RegisterUser,
  type StreamEvent,
} from "types";
import { streamWriter } from "./redis";
import { env } from "../utils/env";
import { pendingRequest } from "./loopback";
import { TimeoutError } from "../errors/TimeoutError";

async function createPendingRequest(correlationId: string): Promise<any> {
  console.log("Creating pending request");
  return new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      delete pendingRequest[correlationId];
      reject(new TimeoutError("Engine response timed out."));
    }, env.requestTimeoutDuration);

    pendingRequest[correlationId] = {
      resolve: (data) => {
        delete pendingRequest[correlationId];
        resolve(data);
      },
      reject,
      timeout,
    };
  });
}

export async function addFundToUserBalance(userId: number, amount: number) {
  const event: StreamEvent<AddBalance> = {
    type: ADD_BALANCE,
    data: {
      correlationId: crypto.randomUUID(),
      userId,
      amount,
    },
  };

  const promise = createPendingRequest(event.data.correlationId);
  console.log("Penidng request creatd");
  await streamWriter.XADD(
    env.redisWriterStream,
    "*",
    backendToStreamRecord(event),
  );
  console.log("Event has been streame to add fuund");
  return promise;
}

export async function registerUserInEngine(userId: number) {
  const event: StreamEvent<RegisterUser> = {
    type: REGISTER_USER,
    data: {
      correlationId: crypto.randomUUID(),
      userId,
    },
  };

  const promise = createPendingRequest(event.data.correlationId);
  console.log("Pending Request");
  console.log(pendingRequest);
  console.log("Senidn to stream");
  await streamWriter.XADD(
    env.redisWriterStream,
    "*",
    backendToStreamRecord(event),
  );

  return promise;
}
