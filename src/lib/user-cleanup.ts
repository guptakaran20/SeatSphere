import { prisma } from "@/lib/prisma";

const UNVERIFIED_USER_TTL_HOURS = 24;
const CLEANUP_INTERVAL_MS = 15 * 60 * 1000;

let lastCleanupAt = 0;

function getCutoffDate(ttlHours = UNVERIFIED_USER_TTL_HOURS) {
  return new Date(Date.now() - ttlHours * 60 * 60 * 1000);
}

export async function cleanupExpiredUnverifiedUsers(options?: {
  force?: boolean;
}) {
  const now = Date.now();
  if (!options?.force && now - lastCleanupAt < CLEANUP_INTERVAL_MS) {
    return { skipped: true, deletedCount: 0 };
  }

  lastCleanupAt = now;
  const cutoff = getCutoffDate();

  const result = await prisma.user.deleteMany({
    where: {
      isEmailVerified: false,
      isPhoneVerified: false,
      createdAt: { lte: cutoff },
    },
  });

  return { skipped: false, deletedCount: result.count };
}

export async function cleanupExpiredUnverifiedUsersByIdentifiers(params: {
  email?: string;
  phoneNumber?: string;
}) {
  const filters = [
    params.email ? { email: params.email } : null,
    params.phoneNumber ? { phoneNumber: params.phoneNumber } : null,
  ].filter(Boolean) as Array<{ email: string } | { phoneNumber: string }>;

  if (filters.length === 0) return { deletedCount: 0 };

  const cutoff = getCutoffDate();

  const result = await prisma.user.deleteMany({
    where: {
      OR: filters,
      isEmailVerified: false,
      isPhoneVerified: false,
      createdAt: { lte: cutoff },
    },
  });

  return { deletedCount: result.count };
}
