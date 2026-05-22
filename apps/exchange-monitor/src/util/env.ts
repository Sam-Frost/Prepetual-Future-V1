function readRequiredEnv(field: string) {
  {
    const value = process.env[field];

    if (!value) throw new Error(`${field} missing from env variables!`);

    return value;
  }
}

export const env = {
  binanceUrl: readRequiredEnv("BINANCE_WS_URL"),
  redisUrl: readRequiredEnv("REDIS_URL"),
  redisWriteStream: readRequiredEnv("REDIS_WRITE_STREAM"),
};
