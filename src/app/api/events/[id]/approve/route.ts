import { prisma } from "@/lib/prisma";
import { withAuth, apiResponse } from "@/lib/api-utils";

export const PATCH = withAuth(["ADMIN"], async (req, session, reqId) => {
  const urlParts = req.url.split("/");
  const id = urlParts[urlParts.length - 2]; 

  try {
    const targetEvent = await prisma.event.findUnique({ where: { id } });
    if (!targetEvent) return apiResponse(false, "Event not found", null, 404, reqId);

    const overlapping = await prisma.event.findFirst({
      where: {
        status: "APPROVED",
        date: targetEvent.date,
        startTime: { lt: targetEvent.endTime },
        endTime: { gt: targetEvent.startTime }
      }
    });

    if (overlapping) {
      return apiResponse(false, "Conflict", `Overlaps with approved event: ${overlapping.title}`, 409, reqId);
    }

    const event = await prisma.event.update({
      where: { id },
      data: { status: "APPROVED", approvedBy: session.user.id }
    });
    return apiResponse(true, "Event approved", event, 200, reqId);
  } catch (error: any) {
    if (error.code === 'P2025') return apiResponse(false, "Event not found", null, 404, reqId);
    return apiResponse(false, "Internal Server Error", error.message, 500, reqId);
  }
});
