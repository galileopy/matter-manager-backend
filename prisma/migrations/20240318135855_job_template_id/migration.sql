-- AlterTable
ALTER TABLE "PdfJob" ADD COLUMN     "emailTemplateId" UUID;

-- AddForeignKey
ALTER TABLE "PdfJob" ADD CONSTRAINT "PdfJob_emailTemplateId_fkey" FOREIGN KEY ("emailTemplateId") REFERENCES "EmailTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
