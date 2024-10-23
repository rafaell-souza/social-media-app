/*
  Warnings:

  - You are about to drop the column `status` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `Token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[refreshtoken]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `refreshtoken` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Token_token_key";

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "status",
DROP COLUMN "token",
ADD COLUMN     "refreshtoken" TEXT NOT NULL,
ADD COLUMN     "userId" VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Token_refreshtoken_key" ON "Token"("refreshtoken");

-- CreateIndex
CREATE UNIQUE INDEX "Token_userId_key" ON "Token"("userId");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
