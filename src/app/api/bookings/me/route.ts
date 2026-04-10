import { prisma } from "@/lib/prisma";
import { withAuth, apiResponse } from "@/lib/api-utils";

const handler = async (req: Request, session: any, reqId: string) => {
  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: { event: true, seat: true },
    orderBy: { createdAt: 'desc' }
  });
  return apiResponse(true, "Fetched user bookings", bookings, 200, reqId);
}

export const GET = withAuth([], handler);
