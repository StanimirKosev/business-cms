import HeroCarousel from "@/app/components/HeroCarousel";
import AboutSection from "@/app/components/AboutSection";
import { FeaturedProjects } from "@/app/components/FeaturedProjects";
import ServicesSection from "./components/ServicesSection";
import { ClientsMap } from "./components/ClientsMap";
import { prisma } from "@repo/database/client";

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  const allProjects = await prisma.project.findMany({
    include: {
      category: true,
      client: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const featuredProjects = allProjects.filter((p) => p.featured);

  return (
    <div>
      <HeroCarousel />

      <AboutSection />

      <ClientsMap projects={allProjects} />

      <FeaturedProjects projects={featuredProjects} />

      <ServicesSection />
    </div>
  );
}
