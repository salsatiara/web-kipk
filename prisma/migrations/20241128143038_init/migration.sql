-- CreateTable
CREATE TABLE `Alternatif` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `penghasilan` INTEGER NOT NULL,
    `jmlTanggungan` INTEGER NOT NULL,
    `nilai` INTEGER NOT NULL,
    `rumah` INTEGER NOT NULL,
    `listrik` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kriteria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(191) NOT NULL,
    `kriteria` VARCHAR(191) NOT NULL,
    `rentang1` VARCHAR(191) NOT NULL,
    `bobot1` INTEGER NOT NULL,
    `rentang2` VARCHAR(191) NOT NULL,
    `bobot2` INTEGER NOT NULL,
    `rentang3` VARCHAR(191) NOT NULL,
    `bobot3` INTEGER NOT NULL,
    `rentang4` VARCHAR(191) NOT NULL,
    `bobot4` INTEGER NOT NULL,
    `rentang5` VARCHAR(191) NOT NULL,
    `bobot5` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
