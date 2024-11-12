/*
  Warnings:

  - Added the required column `type` to the `UserInteraction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('COMMENT', 'POST');

-- AlterTable
ALTER TABLE "UserInteraction" ADD COLUMN     "type" "Type" NOT NULL;
