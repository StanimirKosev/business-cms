import { notFound } from "next/navigation";
import { prisma } from "@repo/database/client";
import { ProjectPageClient } from "./ProjectPageClient";
import { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{ service: string; project: string }>;
}

// Generate dynamic metadata for each project page
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { service, project } = await params;

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
    return {
      title: "Проект не е намерен",
    };
  }

  const title = foundProject.titleBg;
  const description = foundProject.descriptionBg
    ? foundProject.descriptionBg.substring(0, 160)
    : `${foundProject.category.titleBg} проект в ${foundProject.locationBg}.`;

  // Build Cloudinary URL for hero image
  const heroImageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${foundProject.heroImageUrl}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Техно Строй България`,
      description,
      url: `https://technostroy.bg/projects/${service}/${project}`,
      images: [
        {
          url: heroImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

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

  // Get related projects (same category, exclude current, randomized)
  const allRelatedProjects = await prisma.project.findMany({
    where: {
      categoryId: foundProject.categoryId,
      id: { not: foundProject.id },
    },
    include: {
      category: true,
      client: true,
    },
  });

  // Randomize and take first 3
  const relatedProjects = allRelatedProjects
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return (
    <ProjectPageClient project={foundProject} relatedProjects={relatedProjects} />
  );
}
