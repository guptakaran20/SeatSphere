import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { apiResponse, applyRateLimit } from "@/lib/api-utils";
import { Prisma } from "@prisma/client";
import { cleanupExpiredUnverifiedUsers } from "@/lib/user-cleanup";

const SendOtpSchema = z.object({
  identifier: z.string(),
  type: z.enum(["EMAIL", "PHONE"])
});

export async function POST(req: Request) {
  const reqId = crypto.randomUUID();
  try {
    const body = await req.json();
    const parsed = SendOtpSchema.safeParse(body);
    if (!parsed.success) return apiResponse(false, "Validation Error", parsed.error.message, 400, reqId);

    const { identifier, type } = parsed.data;

    cleanupExpiredUnverifiedUsers().catch((error) => {
      console.error("UNVERIFIED USER CLEANUP ERROR:", error);
    });

    if (!applyRateLimit(`otp-${identifier}`, 3, 15 * 60 * 1000)) {
      return apiResponse(false, "Rate limit exceeded. Try again in 15 minutes.", null, 429, reqId);
    }

    const existingUser = await prisma.user.findFirst({
      where: type === "EMAIL" ? { email: identifier } : { phoneNumber: identifier }
    });

    if (!existingUser) return apiResponse(false, "Not Found", "User not found", 404, reqId);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    // Hash OTP before storing
    const hashedOtp = await bcrypt.hash(otp, 10);

    const otpRecord = await prisma.otpVerification.upsert({
      where: {
        userId_type: {
          userId: existingUser.id,
          type,
        },
      },
      update: {
        otp: hashedOtp,
        expiresAt,
        verified: false,
      },
      create: {
        userId: existingUser.id,
        type,
        otp: hashedOtp,
        expiresAt,
      },
    });

    // TODO: Integrate actual Email/SMS service here
    console.log(`[DEV ONLY] OTP for ${identifier} is ${otp}`);

    return apiResponse(true, "OTP sent successfully", null, 200, reqId);
  } catch (error: any) {
    return apiResponse(false, "Internal Server Error", error.message, 500, reqId);
  }
}
