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
    if (existingUser) return apiResponse(false, "Conflict", "User already exists", 409, reqId);

    const hashedPassword = await bcrypt.hash(password, 10);
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
  } catch (error: any) {
    return apiResponse(false, "Internal Server Error", error.message, 500, reqId);
  }
}
