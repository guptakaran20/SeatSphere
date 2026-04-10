import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth, apiResponse } from "@/lib/api-utils";

const QRValidateSchema = z.object({ qrCode: z.string().uuid() });

const handler = async (req: Request, session: any, reqId: string) => {
  const parsed = QRValidateSchema.safeParse(await req.json());
  if (!parsed.success) return apiResponse(false, "Validation Error", parsed.error.message, 400, reqId);

  try {
    const booking = await prisma.booking.findUnique({ 
      where: { qrCode: parsed.data.qrCode },
      include: { event: true }
    });

    if (!booking) return apiResponse(false, "Not Found", "Invalid QR code", 404, reqId);
    if (!booking.event) return apiResponse(false, "Error", "Event not found", 404, reqId);
    
    if (booking.status === "USED") return apiResponse(false, "Forbidden", "Ticket already used", 403, reqId);
    if (booking.status === "CANCELLED") return apiResponse(false, "Forbidden", "Booking is cancelled", 400, reqId);

    const updated = await prisma.booking.update({
      where: { id: booking.id },
      data: { status: "USED" },
      include: { user: { select: { name: true, email: true } } }
    });

    return apiResponse(true, "Ticket validated", updated.user, 200, reqId);
  } catch(error: any) {
    return apiResponse(false, "Internal Server Error", error.message, 500, reqId);
  }
}

export const POST = withAuth(["ADMIN", "VALIDATOR"], handler);
