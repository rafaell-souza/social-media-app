/*
  Warnings:

  - You are about to drop the column `partner` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `relationship` on the `Profile` table. All the data in the column will be lost.
  - You are about to alter the column `from` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - You are about to alter the column `site` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(40)`.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "partner",
DROP COLUMN "relationship",
ALTER COLUMN "from" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "site" SET DATA TYPE VARCHAR(40);
