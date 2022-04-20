-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `zip` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Location_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentMethods` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `card` BOOLEAN NOT NULL DEFAULT false,
    `cash` BOOLEAN NOT NULL DEFAULT true,
    `Crypto` BOOLEAN NOT NULL DEFAULT false,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `PaymentMethods_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerID` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `CustomerId` VARCHAR(191) NOT NULL,
    `userPaymentMethodKey` INTEGER NOT NULL,

    UNIQUE INDEX `CustomerID_CustomerId_key`(`CustomerId`),
    UNIQUE INDEX `CustomerID_userPaymentMethodKey_key`(`userPaymentMethodKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentMethodID` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `PaymentMethodID` VARCHAR(191) NOT NULL,
    `customerKey` INTEGER NOT NULL,

    UNIQUE INDEX `PaymentMethodID_PaymentMethodID_key`(`PaymentMethodID`),
    UNIQUE INDEX `PaymentMethodID_customerKey_key`(`customerKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentMethods` ADD CONSTRAINT `PaymentMethods_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerID` ADD CONSTRAINT `CustomerID_userPaymentMethodKey_fkey` FOREIGN KEY (`userPaymentMethodKey`) REFERENCES `PaymentMethods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentMethodID` ADD CONSTRAINT `PaymentMethodID_customerKey_fkey` FOREIGN KEY (`customerKey`) REFERENCES `CustomerID`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
