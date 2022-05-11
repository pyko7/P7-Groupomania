/*
  Warnings:

  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `profilePicture` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` TINYINT NOT NULL,
    MODIFY `profilePicture` VARCHAR(191) NOT NULL;
