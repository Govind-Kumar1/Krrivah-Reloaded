-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "isActive" SET DEFAULT true;

-- CreateTable
CREATE TABLE "Stats" (
    "id" SERIAL NOT NULL,
    "area" TEXT NOT NULL,
    "years" TEXT NOT NULL,
    "amenities" TEXT NOT NULL,
    "commitments" TEXT NOT NULL,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);
