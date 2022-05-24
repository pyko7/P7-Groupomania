/*
  Warnings:

  - A unique constraint covering the columns `[sharedById]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `sharedById` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Post_sharedById_key` ON `Post`(`sharedById`);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_sharedById_fkey` FOREIGN KEY (`sharedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
