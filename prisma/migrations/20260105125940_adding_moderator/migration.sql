-- AlterEnum
ALTER TYPE "RoleList" ADD VALUE 'Moderator';

-- CreateTable
CREATE TABLE "CatDzikir" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "CatDzikir_pkey" PRIMARY KEY ("id")
);
