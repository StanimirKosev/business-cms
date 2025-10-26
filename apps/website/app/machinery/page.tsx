import { prisma } from "@repo/database/client";
import MachineryPageClient from "./MachineryPageClient";

export default async function MachineryPage() {
  const categories = await prisma.machineryCategory.findMany({
    include: {
      models: {
        orderBy: { order: "asc" },
      },
    },
    orderBy: { order: "asc" },
  });

  return <MachineryPageClient categories={categories} />;
}
