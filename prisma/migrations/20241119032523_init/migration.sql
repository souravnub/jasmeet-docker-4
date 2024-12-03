-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "courses" TEXT[]
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_id_key" ON "Student"("id");
