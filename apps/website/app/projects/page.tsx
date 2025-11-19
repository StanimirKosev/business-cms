import { prisma } from "@repo/database/client";
import ProjectsPageClient from "./ProjectsPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Проекти",
  description:
    "Портфолио от завършени строителни проекти в България - жилищно, промишлено и инфраструктурно строителство.",
  openGraph: {
    title: "Проекти | Техно Строй България",
    description:
      "Портфолио от завършени строителни проекти в България.",
    url: "https://technostroy.bg/projects",
  },
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
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

  const categories = Object.values(categoryMap).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return <ProjectsPageClient categories={categories} projects={projects} />;
}
