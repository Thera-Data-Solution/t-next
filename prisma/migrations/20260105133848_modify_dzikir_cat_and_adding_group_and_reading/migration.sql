/*
  Warnings:

  - You are about to drop the `CatDzikir` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CatDzikir";

-- CreateTable
CREATE TABLE "DzikirCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DzikirCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DzikirGroup" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DzikirGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DzikirReading" (
    "id" TEXT NOT NULL,
    "arabic" TEXT NOT NULL,
    "transliteration" TEXT,
    "translation" TEXT,
    "count" INTEGER NOT NULL DEFAULT 1,
    "order" INTEGER NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DzikirReading_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DzikirCategory_slug_key" ON "DzikirCategory"("slug");

-- AddForeignKey
ALTER TABLE "DzikirGroup" ADD CONSTRAINT "DzikirGroup_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "DzikirCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DzikirReading" ADD CONSTRAINT "DzikirReading_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "DzikirGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
