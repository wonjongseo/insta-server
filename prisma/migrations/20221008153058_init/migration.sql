-- CreateTable
CREATE TABLE "Moive" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "genre" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Moive_pkey" PRIMARY KEY ("id")
);
