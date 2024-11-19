/*
  Warnings:

  - You are about to drop the column `reaction` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `reaction` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "reaction";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "reaction";

-- CreateTable
CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post_Id" INTEGER,
    "comment_id" INTEGER,
    "user_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_user_id_comment_id_key" ON "Reaction"("user_id", "comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_user_id_post_Id_key" ON "Reaction"("user_id", "post_Id");

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_post_Id_fkey" FOREIGN KEY ("post_Id") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
