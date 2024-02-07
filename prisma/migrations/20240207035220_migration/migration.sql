/*
  Warnings:

  - You are about to drop the column `likeCount` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `selfDescription` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_postId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "likeCount";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "selfDescription";

-- DropTable
DROP TABLE "Like";
