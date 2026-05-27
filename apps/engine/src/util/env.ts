function readRequiredEnv(variable: string): string {
  const value = process.env[variable];

  if (!value) {
    throw new Error(`${variable} is missing in env!`);
  }

  return value;
}

export const env = {
  redisWriterStream: readRequiredEnv("REDIS_WRITER_STREAM"),
  redisReaderStream: readRequiredEnv("REDIS_READER_STREAM"),
  snapshotFrequency: Number(readRequiredEnv("SNAPSHOT_FREQUENCY")),
  env: readRequiredEnv("ENV"),
};
