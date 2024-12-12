/*
  Warnings:

  - You are about to drop the `matriksbobotternormalisasi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `matriksbobotternormalisasi`;

-- CreateTable
CREATE TABLE `Matriks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nisn` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `penghasilan` DOUBLE NOT NULL,
    `jmlTanggungan` DOUBLE NOT NULL,
    `nilai` DOUBLE NOT NULL,
    `rumah` DOUBLE NOT NULL,
    `listrik` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
