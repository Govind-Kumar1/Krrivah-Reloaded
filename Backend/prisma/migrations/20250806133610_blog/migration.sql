/*
  Warnings:

  - A unique constraint covering the columns `[slug_url]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_url_key" ON "Blog"("slug_url");
