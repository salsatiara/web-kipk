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
