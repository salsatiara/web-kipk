-- CreateTable
CREATE TABLE `Alternatif` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nisn` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `penghasilan` INTEGER NOT NULL,
    `jmlTanggungan` INTEGER NOT NULL,
    `nilai` INTEGER NOT NULL,
    `rumah` INTEGER NOT NULL,
    `listrik` INTEGER NOT NULL,
    `jarakPositif` DOUBLE NOT NULL DEFAULT 1,
    `jarakNegatif` DOUBLE NOT NULL DEFAULT 1,
    `preferensi` DOUBLE NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kriteria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(191) NOT NULL,
    `kriteria` VARCHAR(191) NOT NULL,
    `tipe` VARCHAR(191) NOT NULL,
    `bobot` DOUBLE NOT NULL,
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

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` TEXT NOT NULL,
    `nisn` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL,
    `refreshToken` TEXT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_nisn_key`(`nisn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `Aktivitas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pesan` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
