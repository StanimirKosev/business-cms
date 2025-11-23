import { prisma } from "@repo/database/client";
import { MachineryPageClient } from "./machinery-page-client";

export default async function MachineryPage() {
  const categories = await prisma.machineryCategory.findMany({
    include: {
      models: {
        orderBy: { order: "asc" },
      },
      images: {
        orderBy: { order: "asc" },
      },
    },
    orderBy: { order: "asc" },
  });

  return <MachineryPageClient initialCategories={categories} />;
}
