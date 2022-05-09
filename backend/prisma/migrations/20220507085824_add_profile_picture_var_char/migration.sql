/*
  Warnings:

  - You are about to alter the column `firstName` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `lastName` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - Added the required column `profilePicture` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `profilePicture` VARCHAR(191),
    MODIFY `firstName` VARCHAR(50) NOT NULL,
    MODIFY `lastName` VARCHAR(50) NOT NULL,
    MODIFY `email` VARCHAR(100) NOT NULL;
