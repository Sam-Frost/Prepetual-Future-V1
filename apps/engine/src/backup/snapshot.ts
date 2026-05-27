import fs from "fs";
import { inMemoryDb } from "../db/db";
import { env } from "../util/env";

export function snapshot() {
  const fileDir = `${process.cwd()}/snapshot-log`;

  fs.mkdirSync(fileDir, {
    recursive: true,
  });

  const fileName = env.env == "dev" ? "dev" : Date.now().toString();

  fs.writeFileSync(
    `${fileDir}/${fileName}.log`,
    JSON.stringify(inMemoryDb, (_, value) => {
      if (value instanceof Map) {
        return Object.fromEntries(value);
      }

      return value;
    }),
  );
}
