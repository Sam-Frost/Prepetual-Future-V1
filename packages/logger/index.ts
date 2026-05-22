import pino from "pino";
import fs from "fs";
import path from "path";

export function createLogger(service: string) {
  const logsDir = path.join(process.cwd(), "logs");

  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
  }

  const fileStream = fs.createWriteStream(
    path.join(logsDir, `${service}-log`),
    {
      flags: "a",
    },
  );

  return pino(
    {
      level: "info",

      base: {
        service,
      },

      timestamp: pino.stdTimeFunctions.isoTime,
    },
    pino.multistream([{ stream: process.stdout }, { stream: fileStream }]),
  );
}
