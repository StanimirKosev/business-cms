"use client";

import { Card } from "@/app/components/Card";
import { PageBreadcrumb } from "@/app/components/PageBreadcrumb";
import { Project, ProjectCategory, categoryToSlug, serviceDetails } from "@/lib/mock-data";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";

interface ServicePageClientProps {
  category: ProjectCategory;
  projects: Project[];
  categoryInfo: { description: string; icon: string };
}

export function ServicePageClient({
  category,
  projects,
  categoryInfo,
}: ServicePageClientProps) {
  const { ref: overviewRef, isVisible: overviewVisible } = useScrollAnimation(0.3);
  const { ref: typesRef, isVisible: typesVisible } = useScrollAnimation(0.3);
  const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation(0.3);

  const serviceSlug = categoryToSlug(category);
  const heroImage = projects[0]?.image || "/placeholder.jpg";
  const details = serviceDetails[category];

  return (
    <main>
      {/* Hero Section - Full Width using Card */}
      <section className="w-full h-[400px] md:h-[500px] mb-20 md:mb-24">
        <div className="h-full pointer-events-none">
          <Card
            title={category}
            description={categoryInfo.description}
            image={heroImage}
            slug={`/projects/${serviceSlug}`}
            variant="hero"
            priority
          />
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-40 py-5">
          <PageBreadcrumb
            items={[
              { label: "Начало", href: "/" },
              { label: "Проекти", href: "/projects" },
              { label: category },
            ]}
          />
        </div>
      </section>

      {/* Service Overview Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-40 py-16">
        <div className="space-y-12">
          {/* Service Description */}
          <section ref={overviewRef} className="space-y-6">
            <div className="flex gap-6">
              <div className="hidden md:block w-1 h-12 bg-[var(--color-red)]" />
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]">
                Описание на услугата
              </h2>
            </div>
            <div className={`space-y-6 leading-relaxed text-[var(--color-charcoal)] max-w-4xl transition-all duration-500 ${overviewVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              {details.overview.map((paragraph, index) => (
                <p key={index} className="text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Project Types & Stats */}
          <section ref={typesRef} className="grid md:grid-cols-2 gap-12">
            {/* Subcategories */}
            <div className={`space-y-6 transition-all duration-500 ${typesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <div className="flex gap-6">
                <div className="hidden md:block w-1 h-12 bg-[var(--color-red)]" />
                <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-charcoal)]">
                  Видове проекти
                </h3>
              </div>
              <ul className="space-y-3">
                {details.subcategories.map((subcat, index) => {
                  const [title, ...rest] = subcat.split(" - ");
                  const description = rest.join(" - ");
                  return (
                    <li key={index} className="flex gap-3">
                      <span className="text-[var(--color-red)] mt-1.5">•</span>
                      <div>
                        <span className="font-semibold text-[var(--color-charcoal)]">
                          {title}
                        </span>
                        {description && (
                          <>
                            <br />
                            <span className="text-[#6b6b6b] text-sm">
                              {description}
                            </span>
                          </>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Stats */}
            <div className={`space-y-6 transition-all duration-500 delay-100 ${typesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <div className="flex gap-6">
                <div className="hidden md:block w-1 h-12 bg-[var(--color-red)]" />
                <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-charcoal)]">
                  Статистика
                </h3>
              </div>
              <div className="bg-[var(--color-concrete-grey-light)] p-8 rounded-lg">
                <div className="space-y-6">
                  <div>
                    <div className="text-5xl font-bold text-[var(--color-red)] mb-2">
                      {projects.length}
                    </div>
                    <div className="text-sm text-[#6b6b6b] uppercase tracking-wider">
                      Завършени проекта
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-300">
                    <div className="text-2xl font-bold text-[var(--color-charcoal)] mb-2">
                      {new Date().getFullYear() - 2020}+ години
                    </div>
                    <div className="text-sm text-[#6b6b6b] uppercase tracking-wider">
                      Опит в сферата
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* All Projects Section */}
      <section ref={projectsRef} className="max-w-7xl mx-auto px-6 md:px-40 pb-16">
        <div className="space-y-8">
          <div className="flex gap-6">
            <div className="hidden md:block w-1 h-12 bg-[var(--color-red)]" />
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]">
              Всички проекти
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`transition-all duration-500 ${projectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <Card
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  slug={`/projects/${serviceSlug}/${project.slug}`}
                  location={project.location}
                  variant="compact"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
