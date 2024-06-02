-- CreateTable
CREATE TABLE "Order" (
    "idOrder" SERIAL NOT NULL,
    "idTiket" TEXT NOT NULL,
    "idUsers" INTEGER NOT NULL,
    "idService" INTEGER NOT NULL,
    "waktuOrder" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "noted" TEXT,
    "idStatusOrder" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("idOrder")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_idTiket_key" ON "Order"("idTiket");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_idUsers_fkey" FOREIGN KEY ("idUsers") REFERENCES "User"("idUsers") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_idService_fkey" FOREIGN KEY ("idService") REFERENCES "CategoryService"("idService") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_idStatusOrder_fkey" FOREIGN KEY ("idStatusOrder") REFERENCES "StatusOrder"("idStatusOrder") ON DELETE CASCADE ON UPDATE CASCADE;
