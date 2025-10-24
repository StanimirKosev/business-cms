import { Suspense } from "react";
import { prisma } from "@repo/database/client";
import ProjectsPageClient from "./ProjectsPageClient";

export default async function ProjectsPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { projects: true },
      },
    },
    orderBy: { order: "asc" },
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectsPageClient categories={categories} />
    </Suspense>
  );
}
