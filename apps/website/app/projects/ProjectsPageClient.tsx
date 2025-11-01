"use client";

import { ServiceProjectsSection } from "../components/ServiceProjectsSection";
import { CategoryNavigationBar } from "../components/CategoryNavigationBar";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";
import { useRef } from "react";
import type { Category, Prisma } from "@repo/database/client";
import { useLanguage } from "../context/LanguageContext";

type CategoryWithCount = Category & {
  _count: {
    projects: number;
  };
};

type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: {
    category: true;
    client: true;
  };
}>;

interface ProjectsPageClientProps {
  categories: CategoryWithCount[];
  projects: ProjectWithRelations[];
}

export default function ProjectsPageClient({
  categories,
  projects,
}: ProjectsPageClientProps) {
  const { locale, t } = useLanguage();

  const categoriesLocalized = categories.map((category) => ({
    title: locale === "bg" ? category.titleBg : category.titleEn,
    description:
      locale === "bg" ? category.descriptionBg : category.descriptionEn,
    slug: category.slug,
    iconName: category.iconName || "",
    count: category._count.projects,
  }));

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.5);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const projectsByCategory = projects.reduce(
    (acc, project) => {
      const categorySlug = project.category.slug;
      if (!acc[categorySlug]) {
        acc[categorySlug] = [];
      }
      acc[categorySlug].push(project);
      return acc;
    },
    {} as Record<string, ProjectWithRelations[]>
  );

  return (
    <main className="bg-[var(--color-bg)]">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 md:pt-40 md:pb-20 px-6 md:px-40 bg-white"
        aria-label={t.projects.hero.title}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6">
            <div
              className={`hidden md:block w-1 bg-[var(--color-red)] transition-all duration-[400ms] ease-out ${
                heroVisible ? "h-16" : "h-0"
              }`}
            />

            <div className="flex-1">
              <h1
                className={`text-4xl md:text-5xl font-bold mb-8 text-[var(--color-charcoal)] transition-all duration-500 ease-out delay-[500ms] ${
                  heroVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-[30px]"
                }`}
              >
                {t.projects.hero.title}
              </h1>

              <div className="space-y-6 leading-relaxed text-[var(--color-charcoal)]">
                <p
                  className={`text-xl font-semibold transition-all duration-500 ease-out delay-[300ms] ${
                    heroVisible
                      ? "opacity-90 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  {t.projects.hero.intro}
                </p>

                <p
                  className={`text-lg transition-all duration-500 ease-out delay-[500ms] ${
                    heroVisible
                      ? "opacity-80 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  {t.projects.hero.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Sticky Navigation */}
      <CategoryNavigationBar
        categories={categoriesLocalized}
        sectionRefs={sectionRefs}
      />

      {/* Project Sections */}
      <div>
        {categoriesLocalized.map((category) => {
          const categoryProjects = projectsByCategory[category.slug] || [];
          return categoryProjects.length > 0 ? (
            <section
              key={category.slug}
              ref={(el) => {
                sectionRefs.current[category.slug] = el;
              }}
              id={category.slug}
            >
              <ServiceProjectsSection
                category={category}
                projects={categoryProjects}
              />
            </section>
          ) : null;
        })}
      </div>
    </main>
  );
}
