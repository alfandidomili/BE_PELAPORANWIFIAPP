/*
  Warnings:

  - Changed the type of `idTiket` on the `Eviden` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Eviden" DROP COLUMN "idTiket",
ADD COLUMN     "idTiket" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Eviden_idTiket_key" ON "Eviden"("idTiket");

-- AddForeignKey
ALTER TABLE "Eviden" ADD CONSTRAINT "Eviden_idTiket_fkey" FOREIGN KEY ("idTiket") REFERENCES "Order"("idOrder") ON DELETE CASCADE ON UPDATE CASCADE;
