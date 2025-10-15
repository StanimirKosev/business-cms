"use client";

import { ServiceProjectsSection } from "../components/ServiceProjectsSection";
import { CategoryNavigationBar } from "../components/CategoryNavigationBar";
import {
  PROJECT_CATEGORIES,
  getProjectsByCategory,
  getCategoryInfo,
} from "@/lib/mock-data";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";
import { useRef } from "react";

export default function ProjectsPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.5);

  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  return (
    <main className="bg-[var(--color-bg)]">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 md:pt-40 md:pb-20 px-6 md:px-40 bg-white"
        aria-label="Нашите проекти"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6">
            {/* Red Accent Line - Hidden on mobile */}
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
                Нашите проекти
              </h1>

              <div className="space-y-6 leading-relaxed text-[var(--color-charcoal)]">
                <p
                  className={`text-xl font-semibold transition-all duration-500 ease-out delay-[300ms] ${
                    heroVisible
                      ? "opacity-90 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  Разгледайте нашето портфолио от завършени и текущи проекти в
                  строителството. Всеки проект е доказателство за нашия
                  ангажимент към качество и иновации.
                </p>

                <p
                  className={`text-lg transition-all duration-500 ease-out delay-[500ms] ${
                    heroVisible
                      ? "opacity-80 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  Реализираме разнообразни проекти в областта на строителството
                  - от стоманобетонни конструкции и саниране до пътна
                  инфраструктура и инсталации. Всеки проект се изпълнява с
                  внимание към детайла и съобразно най-високите стандарти за
                  качество.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Sticky Navigation */}
      <CategoryNavigationBar
        categories={PROJECT_CATEGORIES.map((cat) => ({
          name: cat,
          icon: getCategoryInfo(cat).icon,
          count: getProjectsByCategory(cat).length,
        }))}
        sectionRefs={sectionRefs}
      />

      {/* Project Sections */}
      <div>
        {PROJECT_CATEGORIES.map((category) => {
          const projects = getProjectsByCategory(category);
          return projects.length > 0 ? (
            <section
              key={category}
              ref={(el) => {
                sectionRefs.current[category] = el;
              }}
              id={category}
            >
              <ServiceProjectsSection category={category} projects={projects} />
            </section>
          ) : null;
        })}
      </div>
    </main>
  );
}
