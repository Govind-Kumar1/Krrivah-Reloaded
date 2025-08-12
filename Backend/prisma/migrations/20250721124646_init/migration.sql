/*
  Warnings:

  - Added the required column `brand` to the `HeroBrand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HeroBrand" ADD COLUMN     "brand" TEXT NOT NULL;
