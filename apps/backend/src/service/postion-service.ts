import { PositionStatus, prisma } from "db";
import { PAGE_SIZE } from "../utils/constants";

export async function getPosition(marketId: number, userId: number, p: number) {
  const positions = await prisma.position.findMany({
    where: {
      userId: Number(userId),
      marketId: Number(marketId),
      status: PositionStatus.CLOSED,
    },
    skip: PAGE_SIZE * Number(p),
    take: PAGE_SIZE,
  });

  return positions;
}
