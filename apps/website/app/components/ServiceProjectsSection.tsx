"use client";

import { Card } from "./Card";
import { Project, ProjectCategory, getCategoryInfo, categoryToSlug } from "@/lib/mock-data";

interface ServiceProjectsSectionProps {
  category: ProjectCategory;
  projects: Project[];
}

export function ServiceProjectsSection({
  category,
  projects,
}: ServiceProjectsSectionProps) {
  const categoryInfo = getCategoryInfo(category);
  const heroImage = projects[0]?.image || "/placeholder.jpg";
  const serviceSlug = categoryToSlug(category);

  const serviceCardProps = {
    title: category,
    description: categoryInfo.description,
    image: heroImage,
    slug: `/projects/${serviceSlug}`,
  };

  return (
    <section className="py-12 md:py-16">
      {/* Mobile: Full-width service card + intro block */}
      <div className="lg:hidden">
        <Card {...serviceCardProps} variant="service-mobile" />
        <div className="bg-[#f7f7f7] px-6 py-6 mb-8">
          <p className="text-sm text-[#6b6b6b] font-medium">
            Избрани проекти — {category}
          </p>
        </div>
      </div>

      <div className="px-6 md:px-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Desktop: Sticky service card */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Card {...serviceCardProps} variant="service" />
              </div>
            </div>

            {/* Project cards grid */}
            <div className="lg:col-span-7">
              <div className="hidden lg:block mb-8 pb-4 border-b border-[#e8e8e8]">
                <p className="text-sm text-[#5a5a5a] font-medium">
                  Избрани проекти — {category}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    slug={`/projects/${serviceSlug}/${project.slug}`}
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
