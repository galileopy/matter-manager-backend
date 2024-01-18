-- CreateTable
CREATE TABLE "MatterStatus" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "status" TEXT NOT NULL,

    CONSTRAINT "MatterStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Matter" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "statusId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "project" TEXT NOT NULL,
    "fileNumber" TEXT NOT NULL,
    "closedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "needsWrittenConfirmation" BOOLEAN NOT NULL,
    "confirmedAt" TIMESTAMP(3),

    CONSTRAINT "Matter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MatterStatus_status_key" ON "MatterStatus"("status");

-- AddForeignKey
ALTER TABLE "Matter" ADD CONSTRAINT "Matter_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "MatterStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matter" ADD CONSTRAINT "Matter_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
