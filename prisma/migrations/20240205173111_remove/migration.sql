/*
  Warnings:

  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostLikes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_postId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "_PostLikes" DROP CONSTRAINT "_PostLikes_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostLikes" DROP CONSTRAINT "_PostLikes_B_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "postId" TEXT;

-- DropTable
DROP TABLE "Like";

-- DropTable
DROP TABLE "_PostLikes";
