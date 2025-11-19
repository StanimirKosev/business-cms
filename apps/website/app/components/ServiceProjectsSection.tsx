"use client";

import { Card } from "./Card";
import type { Prisma } from "@repo/database/client";
import { useLanguage } from "@/app/context/LanguageContext";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { localizeProject } from "@/lib/i18n-utils";

type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: {
    category: true;
    client: true;
  };
}>;

interface ServiceProjectsSectionProps {
  category: { title: string; description: string; slug: string };
  projects: ProjectWithRelations[];
}

export function ServiceProjectsSection({
  category,
  projects,
}: ServiceProjectsSectionProps) {
  const { locale } = useLanguage();

  return (
    <section className="py-12 md:py-16">
      {/* Mobile: Full-width service card + intro block */}

      <div className="px-6 md:px-40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 lg:mb-8 pb-4 border-b border-[#e8e8e8]">
            <p className="text-sm text-[#5a5a5a] font-medium">
              {category.title}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const localized = localizeProject(project, locale);
              const imageUrl = project.heroImageUrl
                ? getCloudinaryUrl(project.heroImageUrl)!
                : undefined;

              return (
                <Card
                  key={project.id}
                  title={localized.title}
                  description={localized.description}
                  image={imageUrl}
                  slug={`/projects/${category.slug}/${project.slug}`}
                  location={localized.location}
                  variant="compact"
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
