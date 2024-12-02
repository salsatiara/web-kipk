/*
  Warnings:

  - Added the required column `nisn` to the `Alternatif` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `alternatif` ADD COLUMN `nisn` VARCHAR(191) NOT NULL;
