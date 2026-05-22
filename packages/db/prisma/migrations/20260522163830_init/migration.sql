-- CreateTable
CREATE TABLE "Market" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Market_pkey" PRIMARY KEY ("id")
);
