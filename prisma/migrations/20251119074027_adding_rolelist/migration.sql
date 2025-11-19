-- CreateEnum
CREATE TYPE "RoleList" AS ENUM ('Admin', 'User');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Role" "RoleList" NOT NULL DEFAULT 'User';
