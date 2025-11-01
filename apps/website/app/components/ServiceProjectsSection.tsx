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
  const { t, locale } = useLanguage();

  return (
    <section className="py-12 md:py-16">
      {/* Mobile: Full-width service card + intro block */}

      <div className="px-6 md:px-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Project cards grid */}
            <div className="lg:col-span-7">
              <div className="mb-6 lg:mb-8 pb-4 border-b border-[#e8e8e8]">
                <p className="text-sm text-[#5a5a5a] font-medium">
                  {t.projects.selectedProjectsLabel} — {category.title}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((project) => {
                  const localized = localizeProject(project, locale);
                  const imageUrl = getCloudinaryUrl(project.heroImageUrl)!;

                  return (
                    <Card
                      key={project.id}
                      title={localized.title}
                      description={localized.description}
                      image={imageUrl}
                      slug={`/projects/${category.slug}/${project.slug}`}
                      location={localized.location}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
