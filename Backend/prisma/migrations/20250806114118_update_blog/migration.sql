/*
  Warnings:

  - Added the required column `slug_keywords` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug_url` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "slug_keywords" TEXT NOT NULL,
ADD COLUMN     "slug_url" TEXT NOT NULL;
