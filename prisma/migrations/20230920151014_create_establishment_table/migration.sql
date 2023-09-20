-- CreateTable
CREATE TABLE "establishments" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(11) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "opening" TIMESTAMP(3) NOT NULL,
    "closing" TIMESTAMP(3) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "minTicket" INTEGER NOT NULL,
    "minServiceTime" INTEGER NOT NULL,
    "maxServiceTime" INTEGER NOT NULL,
    "avatarUrl" VARCHAR(255) NOT NULL,
    "bannerUrl" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "establishments_pkey" PRIMARY KEY ("id")
);
