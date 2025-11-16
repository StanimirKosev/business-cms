import HeroCarousel from "@/app/components/HeroCarousel";
import AboutSection from "@/app/components/AboutSection";
import { FeaturedProjects } from "@/app/components/FeaturedProjects";
import ServicesSection from "./components/ServicesSection";
import { ClientsMap } from "./components/ClientsMap";
import { prisma } from "@repo/database/client";

export default async function HomePage() {
  const [featuredProjects, projectsWithClients, categories] = await Promise.all([
    prisma.project.findMany({
      where: { featured: true },
      include: {
        category: true,
        client: true,
      },
      orderBy: { createdAt: "asc" },
    }),
    prisma.project.findMany({
      where: { client: { isNot: null } },
      include: {
        category: true,
        client: true,
      },
    }),
    prisma.category.findMany({
      orderBy: { order: "asc" },
    }),
  ]);

  // LocalBusiness Schema for SEO
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: "Техно Строй България ООД",
    alternateName: "Techno Stroy Bulgaria",
    url: "https://technostroy.bg",
    description:
      "Строителна фирма в София с над 15 години опит. Предлагаме строителни услуги - жилищно, промишлено и инфраструктурно строителство, реконструкция, рехабилитация и модернизация.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "бул. Витоша 188",
      addressLocality: "София",
      postalCode: "1408",
      addressCountry: "BG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.67604815562336,
      longitude: 23.309074845574987,
    },
    telephone: "+359-2-953-27-90",
    email: "office@technostroy.bg",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: {
      "@type": "Country",
      name: "Bulgaria",
    },
    serviceType: [
      "Жилищно строителство",
      "Промишлено строителство",
      "Инфраструктурно строителство",
      "Строителен надзор",
      "Проектиране",
    ],
  };

  return (
    <div>
      {/* Schema.org JSON-LD for LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      <HeroCarousel />

      <AboutSection />

      <ClientsMap projects={projectsWithClients} />

      <FeaturedProjects projects={featuredProjects} />

      <ServicesSection categories={categories} />
    </div>
  );
}
