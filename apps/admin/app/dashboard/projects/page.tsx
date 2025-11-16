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
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.client.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <ProjectsPageClient
      initialProjects={projects}
      initialCategories={categories}
      initialClients={clients}
    />
  );
}
