-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('All', 'Ikhwan', 'Akhwat');

-- CreateEnum
CREATE TYPE "Umur" AS ENUM ('All', 'Dewasa', 'Anak');

-- CreateTable
CREATE TABLE "Ustadz" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "fotoUstadz" TEXT,
    "bio" TEXT,

    CONSTRAINT "Ustadz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JadwalKajian" (
    "id" TEXT NOT NULL,
    "ustadzId" TEXT NOT NULL,
    "waktuMulai" TIMESTAMP(3) NOT NULL,
    "waktuSelesai" TIMESTAMP(3) NOT NULL,
    "kajianJudul" TEXT NOT NULL,
    "KajianGenre" "Genre" NOT NULL DEFAULT 'All',
    "KajianUmur" "Umur" NOT NULL DEFAULT 'All',
    "lokasiOffline" TEXT,
    "lokasiOnline" TEXT,
    "gambar" TEXT,
    "sumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,

    CONSTRAINT "JadwalKajian_pkey" PRIMARY KEY ("id")
);
