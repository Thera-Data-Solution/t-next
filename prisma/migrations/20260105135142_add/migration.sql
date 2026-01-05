/*
  Warnings:

  - You are about to drop the `DzikirGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DzikirReading` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DzikirGroup" DROP CONSTRAINT "DzikirGroup_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "DzikirReading" DROP CONSTRAINT "DzikirReading_groupId_fkey";

-- DropTable
DROP TABLE "DzikirGroup";

-- DropTable
DROP TABLE "DzikirReading";

-- CreateTable
CREATE TABLE "Dzikir" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dzikir_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DzikirItem" (
    "id" TEXT NOT NULL,
    "arabic" TEXT NOT NULL,
    "transliteration" TEXT,
    "translation" TEXT,
    "count" INTEGER NOT NULL DEFAULT 1,
    "order" INTEGER NOT NULL,
    "dzikirId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DzikirItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dzikir" ADD CONSTRAINT "Dzikir_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "DzikirCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DzikirItem" ADD CONSTRAINT "DzikirItem_dzikirId_fkey" FOREIGN KEY ("dzikirId") REFERENCES "Dzikir"("id") ON DELETE CASCADE ON UPDATE CASCADE;
