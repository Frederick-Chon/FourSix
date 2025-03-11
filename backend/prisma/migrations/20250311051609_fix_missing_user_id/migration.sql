-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "displayName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrewHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "brewSize" TEXT NOT NULL,
    "balance" TEXT NOT NULL,
    "strength" TEXT NOT NULL,
    "coffeeAmount" INTEGER NOT NULL,
    "waterAmount" INTEGER NOT NULL,
    "pours" JSONB NOT NULL,
    "tasteRating" INTEGER,
    "coffeeBeanId" TEXT,
    "grindSize" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BrewHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoffeeInventory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roaster" TEXT NOT NULL,
    "process" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "roastDate" TIMESTAMP(3) NOT NULL,
    "totalWeight" INTEGER NOT NULL,
    "opened" BOOLEAN NOT NULL,
    "lastBrewDate" TIMESTAMP(3),
    "gramsRemaining" INTEGER NOT NULL,

    CONSTRAINT "CoffeeInventory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "BrewHistory" ADD CONSTRAINT "BrewHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrewHistory" ADD CONSTRAINT "BrewHistory_coffeeBeanId_fkey" FOREIGN KEY ("coffeeBeanId") REFERENCES "CoffeeInventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoffeeInventory" ADD CONSTRAINT "CoffeeInventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
