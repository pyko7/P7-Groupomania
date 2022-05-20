/*
  Warnings:

  - You are about to drop the column `postId` on the `activity` table. All the data in the column will be lost.
  - You are about to drop the column `sharedPostId` on the `activity` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `activity` DROP FOREIGN KEY `Activity_postId_fkey`;

-- DropForeignKey
ALTER TABLE `activity` DROP FOREIGN KEY `Activity_sharedPostId_fkey`;

-- AlterTable
ALTER TABLE `activity` DROP COLUMN `postId`,
    DROP COLUMN `sharedPostId`;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `activityId` INTEGER NULL;

-- AlterTable
ALTER TABLE `sharedpost` ADD COLUMN `activityId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SharedPost` ADD CONSTRAINT `SharedPost_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
