/*
  Warnings:

  - A unique constraint covering the columns `[idUserRoles]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `idUserRoles` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "idUserRoles" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_idUserRoles_key" ON "User"("idUserRoles");
