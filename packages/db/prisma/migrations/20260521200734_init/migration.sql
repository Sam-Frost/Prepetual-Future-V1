-- CreateEnum
CREATE TYPE "TradeType" AS ENUM ('SHORT', 'LONG');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fills" (
    "id" SERIAL NOT NULL,
    "maker" INTEGER NOT NULL,
    "taker" INTEGER NOT NULL,
    "market" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "long" INTEGER NOT NULL,
    "short" INTEGER NOT NULL,

    CONSTRAINT "Fills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
