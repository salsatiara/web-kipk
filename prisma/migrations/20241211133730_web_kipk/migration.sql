/*
  Warnings:

  - Added the required column `bobot` to the `Kriteria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipe` to the `Kriteria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kriteria` ADD COLUMN `bobot` DOUBLE NOT NULL,
    ADD COLUMN `tipe` VARCHAR(191) NOT NULL;
