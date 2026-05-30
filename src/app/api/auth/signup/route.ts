import { z } from "zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { apiResponse, applyRateLimit } from "@/lib/api-utils";
import {
  cleanupExpiredUnverifiedUsers,
  cleanupExpiredUnverifiedUsersByIdentifiers,
} from "@/lib/user-cleanup";

const SignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z
  .string()
  .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  const reqId = crypto.randomUUID();
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown-ip";
    if (!applyRateLimit(`signup-${ip}`, 5, 10 * 60 * 1000)) {
      return apiResponse(false, "Rate limit exceeded. Try again later.", null, 429, reqId);
    }

    const body = await req.json();
    const parsed = SignupSchema.safeParse(body);
    if (!parsed.success) return apiResponse(false, "Validation Error", parsed.error.message, 400, reqId);

    const { name, email, phoneNumber, password } = parsed.data;

    await cleanupExpiredUnverifiedUsersByIdentifiers({ email, phoneNumber });
    cleanupExpiredUnverifiedUsers().catch((error) => {
      console.error("UNVERIFIED USER CLEANUP ERROR:", error);
    });

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { phoneNumber }] }
    });
    if (existingUser) return apiResponse(false, "Conflict", "User already exists", 409, reqId);

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name, 
        email, 
        phoneNumber, 
        password: hashedPassword,
        isEmailVerified: false, 
        isPhoneVerified: false,
        authProvider: "CREDENTIALS"
      }
    });

    return apiResponse(true, "Verify email and phone to continue", { userId: user.id }, 201, reqId);
  } catch (error) {
    return apiResponse(false, "Internal Server Error", error instanceof Error ? error.message : "Unknown Error", 500, reqId);
  }
}
