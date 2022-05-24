/*
  Warnings:

  - You are about to drop the column `activityId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the `activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sharedpost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_activityId_fkey`;

-- DropForeignKey
ALTER TABLE `sharedpost` DROP FOREIGN KEY `SharedPost_activityId_fkey`;

-- DropForeignKey
ALTER TABLE `sharedpost` DROP FOREIGN KEY `SharedPost_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `sharedpost` DROP FOREIGN KEY `SharedPost_postId_fkey`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `activityId`;

-- DropTable
DROP TABLE `activity`;

-- DropTable
DROP TABLE `sharedpost`;
