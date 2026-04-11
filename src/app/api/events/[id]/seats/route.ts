import { prisma } from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";
import { Prisma } from "@prisma/client";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const seats = await prisma.seat.findMany({
      include: {
        bookings: {
          where: { eventId: id, status: { not: "CANCELLED" } }
        }
      }
    });
type SeatWithBookings = Prisma.SeatGetPayload<{
  include: {
    bookings: true;
  };
}>;
const seatMap = seats.map((s: SeatWithBookings) => ({
  id: s.id,
  row: s.row,
  seatNumber: s.seatNumber,
  status: s.bookings.length > 0 ? "BOOKED" : "AVAILABLE"
}));
    return apiResponse(true, "Seats loaded successfully", seatMap, 200);
  } catch (error: any) {      
    return apiResponse(false, "Internal server error", error.message, 500);
  }
}
