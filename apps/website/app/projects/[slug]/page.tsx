import { notFound } from "next/navigation";
import { recentProjects } from "@/lib/mock-data";
import { ProjectPageClient } from "./ProjectPageClient";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = recentProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} />;
}
