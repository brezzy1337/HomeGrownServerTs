-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethods" (
    "id" SERIAL NOT NULL,
    "card" BOOLEAN NOT NULL DEFAULT false,
    "cash" BOOLEAN NOT NULL DEFAULT true,
    "Crypto" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PaymentMethods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerID" (
    "id" SERIAL NOT NULL,
    "CustomerId" TEXT NOT NULL,
    "paymentMethodkey" INTEGER NOT NULL,

    CONSTRAINT "CustomerID_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethodID" (
    "id" SERIAL NOT NULL,
    "PaymentMethodId" TEXT NOT NULL,
    "customerKey" INTEGER NOT NULL,

    CONSTRAINT "PaymentMethodID_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostedVegetables" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "PostedVegetables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostedFruit" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "PostedFruit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostedHerbs" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "dried" BOOLEAN NOT NULL,

    CONSTRAINT "PostedHerbs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Location_userId_key" ON "Location"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethods_userId_key" ON "PaymentMethods"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerID_CustomerId_key" ON "CustomerID"("CustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerID_paymentMethodkey_key" ON "CustomerID"("paymentMethodkey");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethodID_PaymentMethodId_key" ON "PaymentMethodID"("PaymentMethodId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethodID_customerKey_key" ON "PaymentMethodID"("customerKey");

-- CreateIndex
CREATE UNIQUE INDEX "Store_userId_key" ON "Store"("userId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethods" ADD CONSTRAINT "PaymentMethods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerID" ADD CONSTRAINT "CustomerID_paymentMethodkey_fkey" FOREIGN KEY ("paymentMethodkey") REFERENCES "PaymentMethods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethodID" ADD CONSTRAINT "PaymentMethodID_customerKey_fkey" FOREIGN KEY ("customerKey") REFERENCES "CustomerID"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostedVegetables" ADD CONSTRAINT "PostedVegetables_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostedFruit" ADD CONSTRAINT "PostedFruit_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostedHerbs" ADD CONSTRAINT "PostedHerbs_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
