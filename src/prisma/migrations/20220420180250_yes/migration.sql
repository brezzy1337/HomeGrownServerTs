/*
  Warnings:

  - You are about to drop the column `userPaymentMethodKey` on the `customerid` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paymentMethodkey]` on the table `CustomerID` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentMethodkey` to the `CustomerID` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `customerid` DROP FOREIGN KEY `CustomerID_userPaymentMethodKey_fkey`;

-- AlterTable
ALTER TABLE `customerid` DROP COLUMN `userPaymentMethodKey`,
    ADD COLUMN `paymentMethodkey` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CustomerID_paymentMethodkey_key` ON `CustomerID`(`paymentMethodkey`);

-- AddForeignKey
ALTER TABLE `CustomerID` ADD CONSTRAINT `CustomerID_paymentMethodkey_fkey` FOREIGN KEY (`paymentMethodkey`) REFERENCES `PaymentMethods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
