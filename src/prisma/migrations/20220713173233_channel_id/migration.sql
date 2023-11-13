/*
  Warnings:

  - A unique constraint covering the columns `[channelId]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `channelId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "channelId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Orders_channelId_key" ON "Orders"("channelId");
