import { prisma } from "@repo/database/client";
import { ProjectsPageClient } from "./projects-page-client";

const PROJECTS_CUTOFF_DATE = new Date("2025-11-15T10:39:35.960Z");

export default async function ProjectsPage() {
  const [projects, categories, clients] = await Promise.all([
    prisma.project.findMany({
      include: {
        category: true,
        client: true,
        images: { orderBy: { order: "asc" } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.client.findMany({
      orderBy: { order: "asc" },
    }),
  ]);

  return (
    <ProjectsPageClient
      initialProjects={projects}
      initialCategories={categories}
      initialClients={clients}
      projectsCutoffDate={PROJECTS_CUTOFF_DATE}
    />
  );
}
