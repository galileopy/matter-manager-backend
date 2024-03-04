-- CreateTable
CREATE TABLE "DistributionListClient" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "clientId" UUID NOT NULL,
    "distributionListId" UUID NOT NULL,

    CONSTRAINT "DistributionListClient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DistributionListClient" ADD CONSTRAINT "DistributionListClient_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistributionListClient" ADD CONSTRAINT "DistributionListClient_distributionListId_fkey" FOREIGN KEY ("distributionListId") REFERENCES "DistributionList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE UNIQUE INDEX idx_unique_columns
ON "DistributionListClient" ("clientId", "distributionListId")
WHERE "deletedAt" IS NULL;
