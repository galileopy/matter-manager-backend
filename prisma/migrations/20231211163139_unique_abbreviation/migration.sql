/*
  Warnings:

  - A unique constraint covering the columns `[abbreviation]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_abbreviation_key" ON "User"("abbreviation");
