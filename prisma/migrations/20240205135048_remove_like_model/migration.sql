/*
  Warnings:

  - You are about to drop the column `likeCount` on the `Post` table. All the data in the column will be lost.
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
ALTER TABLE "Post" DROP COLUMN "likeCount";

-- DropTable
DROP TABLE "Like";

-- DropTable
DROP TABLE "_PostLikes";
