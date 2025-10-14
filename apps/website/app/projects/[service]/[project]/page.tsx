import { notFound } from "next/navigation";
import { recentProjects, slugToCategory } from "@/lib/mock-data";
import { ProjectPageClient } from "./ProjectPageClient";

interface ProjectPageProps {
  params: Promise<{ service: string; project: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { service, project } = await params;

  // Convert service slug to category
  const category = slugToCategory(service);
  if (!category) {
    notFound();
  }

  // Find project by slug and verify it belongs to the service category
  const foundProject = recentProjects.find(
    (p) => p.slug === project && p.category === category
  );

  if (!foundProject) {
    notFound();
  }

  return <ProjectPageClient project={foundProject} />;
}
