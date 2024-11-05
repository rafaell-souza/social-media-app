-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "interaction" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "interaction" INTEGER DEFAULT 0;
