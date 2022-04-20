/*
  Warnings:

  - You are about to drop the column `PaymentMethodID` on the `paymentmethodid` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[PaymentMethodId]` on the table `PaymentMethodID` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `PaymentMethodId` to the `PaymentMethodID` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `PaymentMethodID_PaymentMethodID_key` ON `paymentmethodid`;

-- AlterTable
ALTER TABLE `paymentmethodid` DROP COLUMN `PaymentMethodID`,
    ADD COLUMN `PaymentMethodId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `PaymentMethodID_PaymentMethodId_key` ON `PaymentMethodID`(`PaymentMethodId`);
