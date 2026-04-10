import { z } from "zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { apiResponse } from "@/lib/api-utils";

const SignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  const reqId = crypto.randomUUID();
  try {
    const body = await req.json();
    const parsed = SignupSchema.safeParse(body);
    if (!parsed.success) return apiResponse(false, "Validation Error", parsed.error.message, 400, reqId);

    const { name, email, phoneNumber, password } = parsed.data;

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { phoneNumber }] }
    });
    if (existingUser) return apiResponse(false, "User already exists", null, 400, reqId);

    const emailVerified = await checkVerifiedOTP(email, "EMAIL");
    const phoneVerified = await checkVerifiedOTP(phoneNumber, "PHONE");
    if (!emailVerified || !phoneVerified) {
      return apiResponse(false, "Forbidden", "Email and Phone must be verified first", 403, reqId);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name, email, phoneNumber, password: hashedPassword,
        isEmailVerified: true, isPhoneVerified: true
      }
    });

    return apiResponse(true, "Signup successful", { userId: user.id }, 201, reqId);
  } catch (error: any) {
    return apiResponse(false, "Internal Server Error", error.message, 500, reqId);
  }
}

async function checkVerifiedOTP(identifier: string, type: "EMAIL" | "PHONE") {
  const otpRec = await prisma.oTPVerification.findFirst({
    where: { identifier, type, verified: true },
    orderBy: { createdAt: 'desc' }
  });
  return !!otpRec;
}
