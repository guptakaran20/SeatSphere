import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth, apiResponse } from "@/lib/api-utils";
import { Prisma } from "@prisma/client";

const CancelSchema = z.object({ bookingId: z.string().uuid() });

const handler = async (req: Request, session: any, reqId: string) => {
  const parsed = CancelSchema.safeParse(await req.json());
  if (!parsed.success) return apiResponse(false, "Validation Error", parsed.error.message, 400, reqId);

  const { bookingId } = parsed.data;

  try {
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const booking = await tx.booking.findUnique({ 
        where: { id: bookingId }, include: { event: true } 
      });

      if (!booking) throw new Error("BOOKING_NOT_FOUND");
      if (booking.userId !== session.user.id) throw new Error("UNAUTHORIZED");
      if (booking.status !== "BOOKED") throw new Error("INVALID_STATE");
      if (new Date() >= booking.event.startTime) throw new Error("EVENT_ALREADY_STARTED");

      return await tx.booking.update({
        where: { id: booking.id },
        data: { status: "CANCELLED" }
      });
    });

    return apiResponse(true, "Booking cancelled", result, 200, reqId);
  } catch (error: any) {
    return apiResponse(false, "Cancellation Failed", error.message, 400, reqId);
  }
}

export const POST = withAuth([], handler);
