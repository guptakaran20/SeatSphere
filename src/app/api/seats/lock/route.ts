import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth, apiResponse } from "@/lib/api-utils";

const LockSchema = z.object({
  seatId: z.string().uuid(),
  eventId: z.string().uuid()
});

export const POST = withAuth(["STUDENT", "CLUB", "ADMIN", "VALIDATOR"], async (req, session, reqId) => {
  const parsed = LockSchema.safeParse(await req.json());
  if (!parsed.success) return apiResponse(false, "Validation Error", parsed.error.message, 400, reqId);

  const { seatId, eventId } = parsed.data;
  const userId = session.user.id;

  try {
    const existingLock = await prisma.seatLock.findUnique({
      where: { seatId_eventId: { seatId, eventId } }
    });

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    if (existingLock) {
      if (existingLock.expiresAt > new Date() && existingLock.userId !== userId) {
        return apiResponse(false, "Conflict", "Seat is temporarily locked by another user", 409, reqId);
      }
      
      // refresh or overwrite expired lock
      const updatedLock = await prisma.seatLock.update({
        where: { id: existingLock.id },
        data: { userId, expiresAt }
      });
      return apiResponse(true, "Seat lock refreshed", updatedLock, 200, reqId);
    }

    const newLock = await prisma.seatLock.create({
      data: { seatId, eventId, userId, expiresAt }
    });

    return apiResponse(true, "Seat locked successfully", newLock, 201, reqId);
  } catch (error: any) {
    if (error.code === 'P2002') return apiResponse(false, "Conflict", "Concurrent lock attempt", 409, reqId);
    return apiResponse(false, "Internal Server Error", error.message, 500, reqId);
  }
});

export const DELETE = withAuth(["STUDENT", "CLUB", "ADMIN", "VALIDATOR"], async (req, session, reqId) => {
  const parsed = LockSchema.safeParse(await req.json());
  if (!parsed.success) return apiResponse(false, "Validation Error", parsed.error.message, 400, reqId);

  const { seatId, eventId } = parsed.data;
  const userId = session.user.id;

  try {
    const existingLock = await prisma.seatLock.findUnique({
      where: { seatId_eventId: { seatId, eventId } }
    });

    if (existingLock && existingLock.userId === userId) {
      await prisma.seatLock.delete({ where: { id: existingLock.id } });
    }

    return apiResponse(true, "Lock released", null, 200, reqId);
  } catch (error: any) {
    return apiResponse(false, "Internal Server Error", error.message, 500, reqId);
  }
});
