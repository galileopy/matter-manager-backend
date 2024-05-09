/*
  Warnings:

  - Made the column `userId` on table `PdfJob` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PdfJob" DROP CONSTRAINT "PdfJob_userId_fkey";

-- AlterTable
ALTER TABLE "PdfJob" ALTER COLUMN "userId" SET NOT NULL;

-- CreateTable
CREATE TABLE "EmailSend" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "error" TEXT,
    "pdfJobId" UUID NOT NULL,
    "clientId" UUID NOT NULL,

    CONSTRAINT "EmailSend_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PdfJob" ADD CONSTRAINT "PdfJob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailSend" ADD CONSTRAINT "EmailSend_pdfJobId_fkey" FOREIGN KEY ("pdfJobId") REFERENCES "PdfJob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailSend" ADD CONSTRAINT "EmailSend_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
