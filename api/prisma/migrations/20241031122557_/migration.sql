-- AlterTable
ALTER TABLE "Tokens" ALTER COLUMN "refreshtoken" DROP NOT NULL,
ALTER COLUMN "confirmationToken" DROP NOT NULL,
ALTER COLUMN "resetPasswordToken" DROP NOT NULL;
