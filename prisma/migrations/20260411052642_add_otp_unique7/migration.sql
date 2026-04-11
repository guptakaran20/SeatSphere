/*
  Warnings:

  - A unique constraint covering the columns `[userId,type]` on the table `OtpVerification` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "OtpVerification_userId_type_idx";

-- CreateIndex
CREATE INDEX "OtpVerification_userId_idx" ON "OtpVerification"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OtpVerification_userId_type_key" ON "OtpVerification"("userId", "type");
