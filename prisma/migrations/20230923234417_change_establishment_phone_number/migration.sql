-- DropForeignKey
ALTER TABLE "dishes" DROP CONSTRAINT "dishes_establishmentId_fkey";

-- DropForeignKey
ALTER TABLE "drinks" DROP CONSTRAINT "drinks_establishmentId_fkey";

-- AlterTable
ALTER TABLE "establishments" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(13);

-- AddForeignKey
ALTER TABLE "dishes" ADD CONSTRAINT "dishes_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "establishments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drinks" ADD CONSTRAINT "drinks_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "establishments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
