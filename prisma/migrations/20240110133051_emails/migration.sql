/*
  Warnings:

  - You are about to drop the column `email` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "email";

-- CreateTable
CREATE TABLE "EmailAddress" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientId" UUID NOT NULL,
    "memberName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "shouldSendReport" BOOLEAN NOT NULL,

    CONSTRAINT "EmailAddress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmailAddress" ADD CONSTRAINT "EmailAddress_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
