import { prisma } from "@/lib/prisma";
import { withAuth, apiResponse } from "@/lib/api-utils";

export const PATCH = withAuth(["ADMIN"], async (req, session, reqId) => {
  const urlParts = req.url.split("/");
  const id = urlParts[urlParts.length - 2]; 

  try {
    const event = await prisma.event.update({
      where: { id },
      data: { status: "REJECTED", approvedBy: session.user.id }
    });
    return apiResponse(true, "Event rejected", event, 200, reqId);
  } catch (error: any) {
    if (error.code === 'P2025') return apiResponse(false, "Event not found", null, 404, reqId);
    return apiResponse(false, "Internal Server Error", error.message, 500, reqId);
  }
});
