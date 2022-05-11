/*
  Warnings:

  - Made the column `imageUrl` on table `post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `imageUrl` VARCHAR(191) NOT NULL;
