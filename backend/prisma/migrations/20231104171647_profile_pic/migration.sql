-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "isAccepted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileImage" TEXT NOT NULL DEFAULT 'https://i.shgcdn.com/acf85e2d-e3ed-4175-8cee-bb49bb8aca13/-/format/auto/-/preview/3000x3000/-/quality/lighter/';
