/*
  Warnings:

  - You are about to drop the column `interaction` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `interaction` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "interaction";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "interaction";
