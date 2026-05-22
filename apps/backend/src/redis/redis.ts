import { createClient } from "redis";

export const streamWriter = createClient().on("error", (err) =>
  console.log("Redis streamWriter Error", err),
);

export const streamReader = createClient().on("error", (err) =>
  console.log("Redis Subscriber Error", err),
);

await Promise.all([streamWriter.connect(), streamReader.connect()]);
