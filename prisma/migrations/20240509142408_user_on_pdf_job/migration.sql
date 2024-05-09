DELETE from "PdfJob";

-- AlterTable
ALTER TABLE "PdfJob" ADD COLUMN     "userId" UUID;

-- AddForeignKey
ALTER TABLE "PdfJob" ADD CONSTRAINT "PdfJob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
