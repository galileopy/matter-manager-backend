/*
  Warnings:

  - You are about to drop the column `confirmedAt` on the `Matter` table. All the data in the column will be lost.
  - You are about to drop the column `needsWrittenConfirmation` on the `Matter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Matter" DROP COLUMN "confirmedAt",
DROP COLUMN "needsWrittenConfirmation";
