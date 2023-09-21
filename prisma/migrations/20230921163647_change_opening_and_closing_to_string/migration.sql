/*
  Warnings:

  - Changed the type of `opening` on the `establishments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `closing` on the `establishments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "establishments" DROP COLUMN "opening",
ADD COLUMN     "opening" VARCHAR(5) NOT NULL,
DROP COLUMN "closing",
ADD COLUMN     "closing" VARCHAR(5) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;
