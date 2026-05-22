import { prisma } from "db";

async function clearDb() {
  prisma.users.deleteMany({});
  prisma.fills.deleteMany({});
}

export async function onInit() {
  clearDb();
}
