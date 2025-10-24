"use client";

import { Card } from "./Card";
import { Project } from "@/lib/mock-data";
import { useLanguage } from "@/app/context/LanguageContext";

interface ServiceProjectsSectionProps {
  category: { title: string; description: string; slug: string };
  projects: Project[];
}

export function ServiceProjectsSection({
  category,
  projects,
}: ServiceProjectsSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-16">
      {/* Mobile: Full-width service card + intro block */}

      <div className="px-6 md:px-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Project cards grid */}
            <div className="lg:col-span-7">
              <div className="hidden lg:block mb-8 pb-4 border-b border-[#e8e8e8]">
                <p className="text-sm text-[#5a5a5a] font-medium">
                  {t.projects.selectedProjectsLabel} — {category.title}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    slug={`/projects/${category.slug}/${project.slug}`}
                    location={project.location}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
