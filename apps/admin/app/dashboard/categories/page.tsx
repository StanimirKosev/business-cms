import { prisma } from "@repo/database/client";
import { CategoriesPageClient } from "./categories-page-client";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <CategoriesPageClient initialCategories={categories} />;
}
