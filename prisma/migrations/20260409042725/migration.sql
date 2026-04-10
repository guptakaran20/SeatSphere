/*
  Warnings:

  - Added the required column `type` to the `OTPVerification` table without a default value. This is not possible if the table is not empty.
  - Made the column `phoneNumber` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "OTPType" AS ENUM ('EMAIL', 'PHONE');

-- AlterTable
ALTER TABLE "OTPVerification" ADD COLUMN     "type" "OTPType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phoneNumber" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Booking_eventId_idx" ON "Booking"("eventId");

-- CreateIndex
CREATE INDEX "Booking_userId_idx" ON "Booking"("userId");

-- CreateIndex
CREATE INDEX "OTPVerification_identifier_type_idx" ON "OTPVerification"("identifier", "type");
