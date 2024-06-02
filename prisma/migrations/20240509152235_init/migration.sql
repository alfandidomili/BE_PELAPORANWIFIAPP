-- CreateTable
CREATE TABLE "UserRole" (
    "idUserRoles" SERIAL NOT NULL,
    "idName" VARCHAR(50) NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("idUserRoles")
);
