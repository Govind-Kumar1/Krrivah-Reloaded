/*
  Warnings:

  - You are about to drop the column `title` on the `AchievementStat` table. All the data in the column will be lost.
  - You are about to drop the `Stats` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[unit,description]` on the table `AchievementStat` will be added. If there are existing duplicate values, this will fail.
  - Made the column `unit` on table `AchievementStat` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AchievementStat" DROP COLUMN "title",
ALTER COLUMN "unit" SET NOT NULL;

-- DropTable
DROP TABLE "Stats";

-- CreateIndex
CREATE UNIQUE INDEX "AchievementStat_unit_description_key" ON "AchievementStat"("unit", "description");
