-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_addedBy_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "addedBy" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_addedBy_fkey" FOREIGN KEY ("addedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
