/*
  Warnings:

  - You are about to drop the column `generatedAt` on the `PdfJob` table. All the data in the column will be lost.
  - You are about to drop the column `generationError` on the `PdfJob` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PdfJob" DROP COLUMN "generatedAt",
DROP COLUMN "generationError",
ADD COLUMN     "date" TEXT NOT NULL DEFAULT 'hello world',
ADD COLUMN     "statusIds" TEXT[];
