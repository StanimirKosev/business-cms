import { prisma } from "@repo/database/client";
import { ProjectsPageClient } from "./projects-page-client";

export default async function ProjectsPage() {
  const [projects, categories, clients] = await Promise.all([
    prisma.project.findMany({
      include: {
        category: true,
        client: true,
        images: { orderBy: { order: "asc" } },
      },
      orderBy: [{ categoryId: "asc" }, { order: "asc" }],
    }),
    prisma.category.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.client.findMany({
      orderBy: { order: "asc" },
    }),
  ]);

  // Group projects by category
  const projectsByCategory = projects.reduce(
    (acc, project) => {
      const categoryId = project.categoryId;
      if (!acc[categoryId]) {
        acc[categoryId] = [];
      }
      acc[categoryId].push(project);
      return acc;
    },
    {} as Record<string, typeof projects>
  );

  // Create structure with categories and their projects
  const categorizedProjects = categories.map((category) => ({
    category,
    projects: projectsByCategory[category.id] || [],
  }));

  return (
    <ProjectsPageClient
      categorizedProjects={categorizedProjects}
      initialCategories={categories}
      initialClients={clients}
    />
  );
}
