/*
  Warnings:

  - You are about to drop the column `ustadzhId` on the `JadwalKajian` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "JadwalKajian" DROP CONSTRAINT "JadwalKajian_ustadzhId_fkey";

-- AlterTable
ALTER TABLE "JadwalKajian" DROP COLUMN "ustadzhId";

-- CreateTable
CREATE TABLE "_UstadzhToKajian" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UstadzhToKajian_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UstadzhToKajian_B_index" ON "_UstadzhToKajian"("B");

-- AddForeignKey
ALTER TABLE "_UstadzhToKajian" ADD CONSTRAINT "_UstadzhToKajian_A_fkey" FOREIGN KEY ("A") REFERENCES "JadwalKajian"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UstadzhToKajian" ADD CONSTRAINT "_UstadzhToKajian_B_fkey" FOREIGN KEY ("B") REFERENCES "Ustadzh"("id") ON DELETE CASCADE ON UPDATE CASCADE;
