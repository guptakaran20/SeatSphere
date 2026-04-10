import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { logger } from "@/lib/logger";

export function apiResponse(success: boolean, message: string, payload?: any, status = 200, reqId?: string) {
  if (reqId && !success) logger.error(reqId, message, payload);
  if (reqId && success) logger.info(reqId, message);
  
  return NextResponse.json(
    { success, message, ...(success ? { data: payload } : { error: payload }), requestId: reqId },
    { status }
  );
}

const rateLimitMap = new Map<string, { count: number, resetAt: number }>();
// IMPORTANT: In-memory rate limiting is NOT scalable for serverless edge deployments 
// Replace with Redis instances (e.g., Upstash) in production.
export function applyRateLimit(identifier: string, limit: number, windowMs: number) {
  const now = Date.now();
  const userRate = rateLimitMap.get(identifier);

  if (!userRate || now > userRate.resetAt) {
    rateLimitMap.set(identifier, { count: 1, resetAt: now + windowMs });
    return true; 
  }
  if (userRate.count >= limit) return false;
  userRate.count++;
  return true;
}

export function withAuth(
  allowedRoles: string[],
  handler: (req: Request, session: any, reqId: string) => Promise<NextResponse>
) {
  return async (req: Request) => {
    const reqId = crypto.randomUUID(); 
    try {
      const session = await getServerSession(authOptions);
      if (!session?.user) return apiResponse(false, "Unauthorized", "Not logged in", 401, reqId);
      
      const role = (session.user as any).role;
      if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        logger.warn(reqId, `AUTH Access denied. Required: ${allowedRoles}, Got: ${role}`);
        return apiResponse(false, "Forbidden", "Insufficient permissions", 403, reqId);
      }

      return await handler(req, session, reqId);
    } catch (error: any) {
      return apiResponse(false, "Internal Server Error", error.message, 500, reqId);
    }
  };
}
