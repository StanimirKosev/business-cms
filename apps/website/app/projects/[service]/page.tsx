import { notFound } from "next/navigation";
import {
  slugToCategory,
  getProjectsByCategory,
  getCategoryInfo,
} from "@/lib/mock-data";
import { ServicePageClient } from "./ServicePageClient";

interface ServicePageProps {
  params: Promise<{ service: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { service } = await params;

  const category = slugToCategory(service);

  if (!category) {
    notFound();
  }

  const projects = getProjectsByCategory(category);
  const categoryInfo = getCategoryInfo(category);

  return (
    <ServicePageClient
      category={category}
      projects={projects}
      categoryInfo={categoryInfo}
    />
  );
}
