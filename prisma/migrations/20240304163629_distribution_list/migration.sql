-- CreateTable
CREATE TABLE "DistributionList" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "DistributionList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DistributionList_name_key" ON "DistributionList"("name");
