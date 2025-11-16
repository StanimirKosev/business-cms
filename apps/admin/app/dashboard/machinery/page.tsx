import { prisma } from "@repo/database/client";
import { MachineryPageClient } from "./machinery-page-client";

export default async function MachineryPage() {
  const categories = await prisma.machineryCategory.findMany({
    include: {
      models: {
        orderBy: { order: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return <MachineryPageClient initialCategories={categories} />;
}
