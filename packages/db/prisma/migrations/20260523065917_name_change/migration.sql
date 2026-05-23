/*
  Warnings:

  - Added the required column `marketId` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Position` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PositionStatus" AS ENUM ('OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "Position" ADD COLUMN     "marketId" INTEGER NOT NULL,
ADD COLUMN     "status" "PositionStatus" NOT NULL;
