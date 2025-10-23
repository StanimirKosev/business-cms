import { PrismaClient } from "@prisma/client";

// Singleton pattern to prevent multiple Prisma Client instances
// in development (hot reload creates new instances)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Export Prisma types for use in other packages
export type { Certificate, Policy, Category } from "@prisma/client";
