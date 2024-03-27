/*
  Warnings:

  - You are about to drop the column `JobType` on the `PdfJob` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PdfJob" DROP COLUMN "JobType",
ADD COLUMN     "type" "JobType" NOT NULL DEFAULT 'NO_REPORT_EMAIL';
