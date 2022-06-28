/*
  Warnings:

  - You are about to drop the column `storeId` on the `PostedFruit` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `PostedHerbs` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `PostedVegetables` table. All the data in the column will be lost.
  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `PostedFruit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `PostedHerbs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `PostedVegetables` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostedFruit" DROP CONSTRAINT "PostedFruit_storeId_fkey";

-- DropForeignKey
ALTER TABLE "PostedHerbs" DROP CONSTRAINT "PostedHerbs_storeId_fkey";

-- DropForeignKey
ALTER TABLE "PostedVegetables" DROP CONSTRAINT "PostedVegetables_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_userId_fkey";

-- AlterTable
ALTER TABLE "PostedFruit" DROP COLUMN "storeId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PostedHerbs" DROP COLUMN "storeId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PostedVegetables" DROP COLUMN "storeId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Store";

-- AddForeignKey
ALTER TABLE "PostedVegetables" ADD CONSTRAINT "PostedVegetables_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostedFruit" ADD CONSTRAINT "PostedFruit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostedHerbs" ADD CONSTRAINT "PostedHerbs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
