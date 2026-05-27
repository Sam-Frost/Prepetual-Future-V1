/*
  Warnings:

  - You are about to drop the column `status` on the `Position` table. All the data in the column will be lost.
  - Added the required column `marketId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "marketId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Position" DROP COLUMN "status";

-- DropEnum
DROP TYPE "PositionStatus";
