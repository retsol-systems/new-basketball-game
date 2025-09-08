/*
  Warnings:

  - You are about to drop the column `mobileNumber` on the `User` table. All the data in the column will be lost.
  - Added the required column `storexNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `mobileNumber`,
    ADD COLUMN `storexNumber` VARCHAR(191) NOT NULL;
