import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";

const VerifyOtpSchema = z.object({
  identifier: z.string(),
  otp: z.string().length(6),
  type: z.enum(["EMAIL", "PHONE"]),
});

export async function POST(req: Request) {
  const reqId = crypto.randomUUID();

  try {
    const body = await req.json();
    const parsed = VerifyOtpSchema.safeParse(body);

    if (!parsed.success) {
      return apiResponse(
        false,
        "Validation Error",
        parsed.error.flatten(),
        400,
        reqId
      );
    }

    const { identifier, otp, type } = parsed.data;

    // ✅ 2. Find user
    const user = await prisma.user.findFirst({
      where:
        type === "EMAIL"
          ? { email: identifier }
          : { phoneNumber: identifier },
      select: {
        id: true,
        isEmailVerified: true,
        isPhoneVerified: true,
      },
    });

    if (!user) {
      return apiResponse(false, "Invalid request", null, 400, reqId);
    }

    // ✅ 3. Fetch OTP using unique constraint
    const otpRecord = await prisma.otpVerification.findUnique({
      where: {
        userId_type: {
          userId: user.id,
          type,
        },
      },
    });

    // ✅ 4. Validate OTP existence & status
    if (!otpRecord || otpRecord.verified) {
      return apiResponse(false, "Invalid OTP", null, 400, reqId);
    }

    // ✅ 5. Check expiry FIRST
    if (new Date() > otpRecord.expiresAt) {
      return apiResponse(false, "OTP expired", null, 410, reqId);
    }

    // ✅ 6. Constant-time OTP check (basic safe compare)
    if (otpRecord.otp !== otp) {
      return apiResponse(false, "Invalid OTP", null, 400, reqId);
    }

    // ✅ 7. Transaction: mark verified + update user
    const updatedUser = await prisma.$transaction(async (tx) => {
      await tx.otpVerification.update({
        where: { id: otpRecord.id },
        data: { verified: true },
      });

      const updated = await tx.user.update({
        where: { id: user.id },
        data:
          type === "EMAIL"
            ? { isEmailVerified: true }
            : { isPhoneVerified: true },
        select: {
          isEmailVerified: true,
          isPhoneVerified: true,
        },
      });

      return updated;
    });

    // ✅ 8. Success response
    return apiResponse(
      true,
      "OTP verified successfully",
      updatedUser,
      200,
      reqId
    );
  } catch (error: any) {
    console.error("OTP VERIFY ERROR:", error);

    return apiResponse(
      false,
      "Internal Server Error",
      process.env.NODE_ENV === "development" ? error.message : null,
      500,
      reqId
    );
  }
}