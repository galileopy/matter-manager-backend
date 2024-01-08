-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('ASSOCIATION', 'NON_ASSOCIATION');

-- CreateTable
CREATE TABLE "Client" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "suffix" TEXT,
    "email" TEXT,
    "type" "ClientType" NOT NULL DEFAULT 'NON_ASSOCIATION',
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_name_key" ON "Client"("name");
