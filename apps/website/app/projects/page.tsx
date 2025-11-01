import { prisma } from "@repo/database/client";
import ProjectsPageClient from "./ProjectsPageClient";

export const revalidate = 3600; // ISR: Revalidate every hour

export default async function ProjectsPage() {
  const allProjects = await prisma.project.findMany({
    include: { category: true, client: true },
    orderBy: { createdAt: "desc" },
  });

  const categoriesMap = new Map();

  allProjects.forEach((p) => {
    const cat = p.category;
    if (!categoriesMap.has(cat.id)) {
      categoriesMap.set(cat.id, { ...cat, _count: { projects: 0 } });
    }
    categoriesMap.get(cat.id)._count.projects++;
  });

  const categories = Array.from(categoriesMap.values()).sort(
    (a, b) => a.order - b.order
  );

  return <ProjectsPageClient categories={categories} projects={allProjects} />;
}
