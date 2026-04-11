import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { withAuth, apiResponse } from "@/lib/api-utils";

const CreateEventSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string(), // YYYY-MM-DD
  startTime: z.string(), // ISO String or YYYY-MM-DDTHH:mm:ssZ
  endTime: z.string(),
});

export const POST = withAuth(["CLUB"], async (req, session, reqId) => {
  const body = await req.json();
  const parsed = CreateEventSchema.safeParse(body);
  if (!parsed.success) return apiResponse(false, "Validation Error", parsed.error.message, 400, reqId);

  const data = parsed.data;

  try {
    const event = await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        clubId: session.user.id,
        status: "PENDING"
      }
    });
    return apiResponse(true, "Event created", event, 201, reqId);
  } catch (error: any) {
    return apiResponse(false, "Internal Server Error", error.message, 500, reqId);
  }
});

export const GET = withAuth(["STUDENT", "CLUB", "ADMIN", "VALIDATOR"], async (req, session, reqId) => {
  const role = session.user.role;
  let events;
  
  try {
    let rawEvents;
    if (role === "ADMIN" || role === "VALIDATOR") {
      rawEvents = await prisma.event.findMany({ orderBy: { createdAt: 'desc' } });
    } else if (role === "CLUB") {
      rawEvents = await prisma.event.findMany({ where: { clubId: session.user.id }, orderBy: { createdAt: 'desc' } });
    } else {
      rawEvents = await prisma.event.findMany({ where: { status: "APPROVED" }, orderBy: { startTime: 'asc' } });
    }

    const totalSeats = await prisma.seat.count();

    const events = await Promise.all(
      rawEvents.map(async (event: any) => {
        const booked = await prisma.booking.count({
          where: { eventId: event.id, status: { in: ["BOOKED", "USED"] } }
        });
        const locked = await prisma.seatLock.count({
          where: { eventId: event.id, expiresAt: { gt: new Date() } }
        });
        return { ...event, availableSeats: totalSeats - booked - locked };
      })
    );

    return apiResponse(true, "Events fetched", events, 200, reqId);
  } catch (error: any) {
    return apiResponse(false, "Internal Server Error", error.message, 500, reqId);
  }
});
