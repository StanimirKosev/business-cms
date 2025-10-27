import { prisma } from "@repo/database/client";
import MachineryPageClient from "./MachineryPageClient";
import { Suspense } from "react";

export default async function MachineryPage() {
  const categories = await prisma.machineryCategory.findMany({
    include: {
      models: {
        orderBy: { order: "asc" },
      },
    },
    orderBy: { order: "asc" },
  });

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <MachineryPageClient categories={categories} />
    </Suspense>
  );
}
