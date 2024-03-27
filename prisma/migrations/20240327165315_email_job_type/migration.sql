/*
  Warnings:

  - You are about to drop the column `shouldSendReport` on the `PdfJob` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('REPORT_EMAIL', 'NO_REPORT_EMAIL');

-- AlterTable
ALTER TABLE "PdfJob" DROP COLUMN "shouldSendReport",
ADD COLUMN     "JobType" "JobType" NOT NULL DEFAULT 'NO_REPORT_EMAIL',
ALTER COLUMN "date" DROP NOT NULL;
