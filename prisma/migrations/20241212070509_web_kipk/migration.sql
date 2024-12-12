-- AlterTable
ALTER TABLE `alternatif` ADD COLUMN `preferensi` DOUBLE NOT NULL DEFAULT 1,
    MODIFY `jarakNegatif` DOUBLE NOT NULL DEFAULT 1,
    MODIFY `jarakPositif` DOUBLE NOT NULL DEFAULT 1;
