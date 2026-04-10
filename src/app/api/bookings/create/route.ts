import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth, apiResponse } from "@/lib/api-utils";
import { Prisma } from "@/generated/prisma/browser";

const BookingSchema = z.object({
  eventId: z.string().uuid(),
  seatId: z.string().uuid()
});

const MAX_SEATS_PER_USER_EVENT = 5;

const handler = async (req: Request, session: any, reqId: string) => {
  const body = await req.json();
  const parsed = BookingSchema.safeParse(body);
  if (!parsed.success) return apiResponse(false, "Validation Error", parsed.error.message, 400, reqId);

  const { eventId, seatId } = parsed.data;
  const userId = session.user.id;

  try {
    const booking = await prisma.$transaction(async (tx : Prisma.TransactionClient) => {
      // 1. Validate Event
      const event = await tx.event.findUnique({ where: { id: eventId } });
      if (!event) throw new Error("EVENT_NOT_FOUND");
      if (event.status !== "APPROVED") throw new Error("EVENT_NOT_APPROVED");
      if (new Date() >= event.startTime) throw new Error("EVENT_ALREADY_STARTED");

      // 2. Validate Seat Existence
      const seat = await tx.seat.findUnique({ where: { id: seatId } });
      if (!seat) throw new Error("SEAT_NOT_FOUND");

      // 3. User Limits
      const userBookings = await tx.booking.count({
        where: { eventId, userId, status: { not: "CANCELLED" } }
      });
      if (userBookings >= MAX_SEATS_PER_USER_EVENT) throw new Error("MAX_LIMIT_REACHED");

      // 4. Create (Atomicity ensures @@unique([eventId, seatId]) prevents double-booking)
      return await tx.booking.create({
        data: { userId, eventId, seatId, status: "BOOKED" }
      });
    });

    return apiResponse(true, "Booking successful", booking, 201, reqId);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return apiResponse(false, "Conflict", "Seat is already taken", 409, reqId);
    }
    
    const errorMap: Record<string, { msg: string, status: number }> = {
      "EVENT_NOT_FOUND": { msg: "Event does not exist.", status: 404 },
      "EVENT_NOT_APPROVED": { msg: "Event not approved.", status: 403 },
      "EVENT_ALREADY_STARTED": { msg: "Event has already started.", status: 400 },
      "SEAT_NOT_FOUND": { msg: "Invalid seat selection.", status: 404 },
      "MAX_LIMIT_REACHED": { msg: `Exceeded ${MAX_SEATS_PER_USER_EVENT} seats limit.`, status: 400 }
    };

    if (errorMap[error.message]) {
      return apiResponse(false, "Booking Failed", errorMap[error.message].msg, errorMap[error.message].status, reqId);
    }
    throw error;
  }
};

export const POST = withAuth(["STUDENT", "CLUB", "ADMIN", "VALIDATOR"], handler);
