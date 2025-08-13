-- DropIndex
DROP INDEX "Blog_slug_url_key";

-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "slug_keywords" DROP NOT NULL,
ALTER COLUMN "slug_url" DROP NOT NULL;
