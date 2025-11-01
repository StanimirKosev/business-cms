import { notFound } from "next/navigation";
import { prisma } from "@repo/database/client";
import { ProjectPageClient } from "./ProjectPageClient";

interface ProjectPageProps {
  params: Promise<{ service: string; project: string }>;
}

export const revalidate = 3600; // ISR: Revalidate every hour

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { service, project } = await params;

  // Find project by slug and verify it belongs to the service category
  const foundProject = await prisma.project.findFirst({
    where: {
      slug: project,
      category: { slug: service },
    },
    include: {
      category: true,
      client: true,
      images: { orderBy: { order: "asc" } },
    },
  });

  if (!foundProject) {
    notFound();
  }

  // Get related projects (same category, exclude current)
  const relatedProjects = await prisma.project.findMany({
    where: {
      categoryId: foundProject.categoryId,
      id: { not: foundProject.id },
    },
    include: {
      category: true,
      client: true,
    },
    take: 3,
  });

  return (
    <ProjectPageClient project={foundProject} relatedProjects={relatedProjects} />
  );
}
