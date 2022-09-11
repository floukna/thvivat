-- CreateEnum
CREATE TYPE "carSizeType" AS ENUM ('small', 'medium', 'large');

-- CreateTable
CREATE TABLE "ParkingLot" (
    "id" SERIAL NOT NULL,
    "isSlotAvailable" BOOLEAN,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "free" INTEGER NOT NULL,
    "pricePerHour" INTEGER NOT NULL,

    CONSTRAINT "ParkingLot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Floors" (
    "id" SERIAL NOT NULL,
    "floorNumber" INTEGER NOT NULL,
    "parkingLotId" INTEGER,

    CONSTRAINT "Floors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingSlots" (
    "id" SERIAL NOT NULL,
    "slotNumber" TEXT NOT NULL,
    "isPark" BOOLEAN NOT NULL,
    "floorsId" INTEGER,

    CONSTRAINT "ParkingSlots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tickets" (
    "id" SERIAL NOT NULL,
    "entryTime" TIMESTAMP(3) NOT NULL,
    "exitTime" TIMESTAMP(3),
    "plateNumber" TEXT NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "carSize" "carSizeType" NOT NULL,
    "parkingSlotsId" INTEGER,
    "parkingLotId" INTEGER,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Floors" ADD CONSTRAINT "Floors_parkingLotId_fkey" FOREIGN KEY ("parkingLotId") REFERENCES "ParkingLot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingSlots" ADD CONSTRAINT "ParkingSlots_floorsId_fkey" FOREIGN KEY ("floorsId") REFERENCES "Floors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_parkingSlotsId_fkey" FOREIGN KEY ("parkingSlotsId") REFERENCES "ParkingSlots"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_parkingLotId_fkey" FOREIGN KEY ("parkingLotId") REFERENCES "ParkingLot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
