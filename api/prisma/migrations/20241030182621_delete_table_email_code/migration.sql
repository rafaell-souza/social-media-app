/*
  Warnings:

  - You are about to drop the `EmailCode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RefreshToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmailCode" DROP CONSTRAINT "EmailCode_userId_fkey";

-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- DropTable
DROP TABLE "EmailCode";

-- DropTable
DROP TABLE "RefreshToken";

-- CreateTable
CREATE TABLE "Tokens" (
    "id" SERIAL NOT NULL,
    "refreshtoken" TEXT NOT NULL,
    "confirmationToken" TEXT NOT NULL,
    "resetPasswordToken" TEXT NOT NULL,
    "userId" VARCHAR(36) NOT NULL,

    CONSTRAINT "Tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tokens_refreshtoken_key" ON "Tokens"("refreshtoken");

-- CreateIndex
CREATE UNIQUE INDEX "Tokens_confirmationToken_key" ON "Tokens"("confirmationToken");

-- CreateIndex
CREATE UNIQUE INDEX "Tokens_resetPasswordToken_key" ON "Tokens"("resetPasswordToken");

-- CreateIndex
CREATE UNIQUE INDEX "Tokens_userId_key" ON "Tokens"("userId");

-- AddForeignKey
ALTER TABLE "Tokens" ADD CONSTRAINT "Tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
