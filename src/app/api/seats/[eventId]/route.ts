import { prisma } from "@/lib/prisma";
import { withAuth, apiResponse } from "@/lib/api-utils";

export const GET = withAuth(["STUDENT", "CLUB", "ADMIN", "VALIDATOR"], async (req, session, reqId) => {
  const urlParts = req.url.split("/");
  const eventId = urlParts[urlParts.length - 1]; 
  const userId = session.user.id;

  try {
    const allSeats = await prisma.seat.findMany({
      orderBy: [
        { row: 'asc' },
        { seatNumber: 'asc' }
      ]
    });

    const bookings = await prisma.booking.findMany({
      where: { eventId, status: { in: ["BOOKED", "USED"] } }
    });

    const activeLocks = await prisma.seatLock.findMany({
      where: { eventId, expiresAt: { gt: new Date() } }
    });

    const bookingMap = new Set(bookings.map((b: any) => b.seatId));
    const lockMap = new Map(activeLocks.map((l: any) => [l.seatId, l.userId]));

    const seatsWithStatus = allSeats.map((seat: any) => {
      let status = "AVAILABLE";
      if (bookingMap.has(seat.id)) {
        status = "BOOKED";
      } else if (lockMap.has(seat.id)) {
        const lockUserId = lockMap.get(seat.id);
        if (lockUserId !== userId) {
          status = "LOCKED";
        } else {
          status = "LOCKED_BY_YOU";
        }
      }

      return {
        ...seat,
        status
      };
    });

    return apiResponse(true, "Seats fetched", seatsWithStatus, 200, reqId);
  } catch (error: any) {
    return apiResponse(false, "Internal Server Error", error.message, 500, reqId);
  }
});
