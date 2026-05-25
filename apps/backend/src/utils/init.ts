import { prisma } from "db";
import { logger } from "./logger";

async function clearDb() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "User", "Order", "Position"
    RESTART IDENTITY CASCADE;
  `);
  logger.info("DB cleared!");
}

export async function onInit() {
  clearDb();
}
