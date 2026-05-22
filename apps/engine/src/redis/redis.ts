import { createClient } from "redis";

export const streamWriter = createClient().on("error", (err) => {
  console.log(`Redis streamWriter error : ${err}`);
});

export const streamReader = createClient().on("error", (err) => {
  console.log(`Redis streamReader error : ${err}`);
});

await Promise.all([streamReader.connect(), streamWriter.connect()]);
