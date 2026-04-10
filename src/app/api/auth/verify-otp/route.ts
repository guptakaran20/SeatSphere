import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";
import { Prisma } from "@/generated/prisma/browser";

const VerifyOtpSchema = z.object({
  identifier: z.string(),
  otp: z.string().length(6),
  type: z.enum(["EMAIL", "PHONE"])
});

export async function POST(req: Request) {
  const reqId = crypto.randomUUID();
  try {
    const body = await req.json();
    const parsed = VerifyOtpSchema.safeParse(body);
    if (!parsed.success) return apiResponse(false, "Validation Error", parsed.error.message, 400, reqId);
    
    const { identifier, otp, type } = parsed.data;

    const otpRecord = await prisma.oTPVerification.findFirst({
      where: { identifier, type },
      orderBy: { createdAt: "desc" }
    });

    if (!otpRecord) return apiResponse(false, "OTP request not found", null, 404, reqId);
    if (otpRecord.verified) return apiResponse(false, "OTP already used", null, 400, reqId);
    if (new Date() > otpRecord.expiresAt) return apiResponse(false, "OTP has expired", null, 400, reqId);
    if (otpRecord.otp !== otp) return apiResponse(false, "Invalid OTP", null, 400, reqId);

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.oTPVerification.update({
        where: { id: otpRecord.id },
        data: { verified: true }
      });

      const userField = type === "EMAIL" ? "email" : "phoneNumber";
      const userStatusField = type === "EMAIL" ? "isEmailVerified" : "isPhoneVerified";
      
      const user = await tx.user.findUnique({ where: { [userField]: identifier } as any });
      if (user) {
        await tx.user.update({
          where: { id: user.id },
          data: { [userStatusField]: true }
        });
      }
    });

    return apiResponse(true, "OTP verified successfully", null, 200, reqId);
  } catch (error: any) {
    return apiResponse(false, "Internal Server Error", error.message, 500, reqId);
  }
}
