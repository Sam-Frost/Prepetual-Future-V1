function readRequiredEnv(env: string): string {
  const value = process.env[env];
  if (!value) {
    throw new Error("${env} value is missing!");
  }
  return value;
}

export const env = {
  port: Number(readRequiredEnv("PORT")),
  jwtSecret: readRequiredEnv("JWT_SECRET_KEY"),
  redisWriterStream: readRequiredEnv("REDIS_WRITER_STREAM"),
  redisReaderStream: readRequiredEnv("REDIS_READER_STREAM"),
  requestTimeoutDuration: Number(readRequiredEnv("REQUEST_TIMEOUT_DURATION")),
};
