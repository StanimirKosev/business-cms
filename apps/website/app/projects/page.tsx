import { prisma } from "@repo/database/client";
import ProjectsPageClient from "./ProjectsPageClient";

export const revalidate = 3600; // ISR: Revalidate every hour

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    include: { category: true, client: true },
    orderBy: { createdAt: "asc" },
  });

  // Build categories with project counts from the fetched projects
  const categoryMap: Record<string, typeof projects[0]["category"] & { _count: { projects: number } }> = {};

  projects.forEach((project) => {
    const catId = project.category.id;
    if (!categoryMap[catId]) {
      categoryMap[catId] = { ...project.category, _count: { projects: 0 } };
    }
    categoryMap[catId]._count.projects++;
  });

  const categories = Object.values(categoryMap);

  return <ProjectsPageClient categories={categories} projects={projects} />;
}
