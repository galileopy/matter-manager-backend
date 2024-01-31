-- CreateTable
CREATE TABLE "InternalNote" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT NOT NULL,
    "addedBy" UUID NOT NULL,
    "matterId" UUID NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "InternalNote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InternalNote" ADD CONSTRAINT "InternalNote_addedBy_fkey" FOREIGN KEY ("addedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternalNote" ADD CONSTRAINT "InternalNote_matterId_fkey" FOREIGN KEY ("matterId") REFERENCES "Matter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
