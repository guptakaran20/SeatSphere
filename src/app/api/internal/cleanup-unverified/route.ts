import { apiResponse } from "@/lib/api-utils";
import { cleanupExpiredUnverifiedUsers } from "@/lib/user-cleanup";

function isAuthorized(req: Request) {
  const secret = process.env.CRON_SECRET;

  // In production, secret MUST exist
  if (!secret) return false;

  const authHeader = req.headers.get("authorization");

  // Vercel sends: "Bearer <CRON_SECRET>"
  return authHeader === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  const reqId = crypto.randomUUID();

  try {
    if (!isAuthorized(req)) {
      return apiResponse(false, "Unauthorized", "Invalid cron secret", 401, reqId);
    }

    const result = await cleanupExpiredUnverifiedUsers({ force: true });

    return apiResponse(
      true,
      "Cleanup completed",
      { deletedCount: result.deletedCount },
      200,
      reqId
    );
  } catch (error: any) {
    return apiResponse(false, "Internal Server Error", error.message, 500, reqId);
  }
}
