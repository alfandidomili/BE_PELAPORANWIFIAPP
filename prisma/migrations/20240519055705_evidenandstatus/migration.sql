-- CreateTable
CREATE TABLE "StatusEviden" (
    "idStatusEvidence" SERIAL NOT NULL,
    "evidenceName" TEXT NOT NULL,

    CONSTRAINT "StatusEviden_pkey" PRIMARY KEY ("idStatusEvidence")
);

-- CreateTable
CREATE TABLE "Eviden" (
    "idEviden" SERIAL NOT NULL,
    "idTiket" TEXT NOT NULL,
    "idUsers" INTEGER NOT NULL,
    "idService" INTEGER NOT NULL,
    "waktuEviden" TIMESTAMP(3) NOT NULL,
    "notedEviden" TEXT,
    "idStatusOrder" INTEGER NOT NULL,
    "idStatusEvidence" INTEGER NOT NULL,

    CONSTRAINT "Eviden_pkey" PRIMARY KEY ("idEviden")
);

-- CreateIndex
CREATE UNIQUE INDEX "Eviden_idTiket_key" ON "Eviden"("idTiket");

-- AddForeignKey
ALTER TABLE "Eviden" ADD CONSTRAINT "Eviden_idUsers_fkey" FOREIGN KEY ("idUsers") REFERENCES "User"("idUsers") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eviden" ADD CONSTRAINT "Eviden_idService_fkey" FOREIGN KEY ("idService") REFERENCES "CategoryService"("idService") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eviden" ADD CONSTRAINT "Eviden_idStatusOrder_fkey" FOREIGN KEY ("idStatusOrder") REFERENCES "StatusOrder"("idStatusOrder") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eviden" ADD CONSTRAINT "Eviden_idStatusEvidence_fkey" FOREIGN KEY ("idStatusEvidence") REFERENCES "StatusEviden"("idStatusEvidence") ON DELETE CASCADE ON UPDATE CASCADE;
