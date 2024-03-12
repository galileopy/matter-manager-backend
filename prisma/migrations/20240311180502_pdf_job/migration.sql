-- CreateTable
CREATE TABLE "PdfJob" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "distributionListId" UUID NOT NULL,
    "generatedAt" TIMESTAMP(3),
    "generationError" TEXT,

    CONSTRAINT "PdfJob_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PdfJob" ADD CONSTRAINT "PdfJob_distributionListId_fkey" FOREIGN KEY ("distributionListId") REFERENCES "DistributionList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
