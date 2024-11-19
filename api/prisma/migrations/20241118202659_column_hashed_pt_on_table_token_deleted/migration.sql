/*
  Warnings:

  - You are about to drop the column `hashedPt` on the `Token` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Token_hashedPt_key";

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "hashedPt";
