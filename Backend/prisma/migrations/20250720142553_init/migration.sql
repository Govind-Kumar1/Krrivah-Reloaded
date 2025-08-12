-- CreateTable
CREATE TABLE "AchievementStat" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "unit" TEXT,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AchievementStat_pkey" PRIMARY KEY ("id")
);
