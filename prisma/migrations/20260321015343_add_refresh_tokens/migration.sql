-- AlterTable
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "Tasks_id_key";

-- AlterTable
ALTER TABLE "Users" ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "Users_id_key" CASCADE;

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
