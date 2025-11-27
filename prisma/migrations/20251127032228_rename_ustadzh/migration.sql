/*
  Warnings:

  - You are about to drop the column `ustadzId` on the `JadwalKajian` table. All the data in the column will be lost.
  - You are about to drop the `Ustadz` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ustadzhId` to the `JadwalKajian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JadwalKajian" DROP COLUMN "ustadzId",
ADD COLUMN     "ustadzhId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Ustadz";

-- CreateTable
CREATE TABLE "Ustadzh" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "fotoUstadz" TEXT,
    "bio" TEXT,

    CONSTRAINT "Ustadzh_pkey" PRIMARY KEY ("id")
);
