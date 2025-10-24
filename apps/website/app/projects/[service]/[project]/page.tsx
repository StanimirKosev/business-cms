import { notFound } from "next/navigation";
import { recentProjects } from "@/lib/mock-data";
import { ProjectPageClient } from "./ProjectPageClient";

interface ProjectPageProps {
  params: Promise<{ service: string; project: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { service, project } = await params;

  // Find project by slug and verify it belongs to the service category
  const foundProject = recentProjects.find(
    (p) => p.slug === project && p.category === service
  );

  if (!foundProject) {
    notFound();
  }

  return <ProjectPageClient project={foundProject} />;
}
