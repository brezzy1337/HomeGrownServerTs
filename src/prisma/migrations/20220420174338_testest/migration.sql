/*
  Warnings:

  - You are about to drop the column `PaymentMethodId` on the `paymentmethodid` table. All the data in the column will be lost.
  - You are about to drop the column `paypal` on the `paymentmethods` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[PaymentMethodID]` on the table `PaymentMethodID` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `PaymentMethodID` to the `PaymentMethodID` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `PaymentMethodID_PaymentMethodId_key` ON `paymentmethodid`;

-- AlterTable
ALTER TABLE `paymentmethodid` DROP COLUMN `PaymentMethodId`,
    ADD COLUMN `PaymentMethodID` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `paymentmethods` DROP COLUMN `paypal`;

-- CreateIndex
CREATE UNIQUE INDEX `PaymentMethodID_PaymentMethodID_key` ON `PaymentMethodID`(`PaymentMethodID`);

-- AddForeignKey
ALTER TABLE `CustomerID` ADD CONSTRAINT `CustomerID_userPaymentMethodKey_fkey` FOREIGN KEY (`userPaymentMethodKey`) REFERENCES `PaymentMethods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
