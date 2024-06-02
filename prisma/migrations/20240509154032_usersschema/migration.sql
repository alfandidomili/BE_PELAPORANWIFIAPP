-- CreateTable
CREATE TABLE "User" (
    "idUsers" SERIAL NOT NULL,
    "usernameId" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "idUserRoles" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("idUsers")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_usernameId_key" ON "User"("usernameId");

-- CreateIndex
CREATE UNIQUE INDEX "User_idUserRoles_key" ON "User"("idUserRoles");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idUserRoles_fkey" FOREIGN KEY ("idUserRoles") REFERENCES "UserRole"("idUserRoles") ON DELETE CASCADE ON UPDATE CASCADE;
