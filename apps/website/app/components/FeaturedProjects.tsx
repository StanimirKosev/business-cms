"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Card } from "./Card";
import ChevronButton from "./ChevronButton";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";
import { useLanguage } from "../context/LanguageContext";
import type { Project, Category, Client } from "@repo/database/client";
import { CLOUDINARY_BASE_URL } from "@/lib/cloudinary";

type ProjectWithRelations = Project & {
  category: Category;
  client: Client;
};

interface FeaturedProjectsProps {
  projects: ProjectWithRelations[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const { t, locale } = useLanguage();
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.5);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 3,
    breakpoints: {
      "(max-width: 768px)": { slidesToScroll: 1 },
    },
  });

  return (
    <section
      ref={sectionRef}
      id="our-projects"
      className="relative py-17 px-6 md:px-40 bg-[#f9f9f9]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with Red Line */}
        <div className="flex gap-6 mb-12">
          {/* Red Accent Line - Hidden on mobile */}
          <div
            className={`hidden md:block w-1 bg-[var(--color-red)] transition-all duration-[400ms] ease-out ${
              isVisible ? "h-16" : "h-0"
            }`}
          />

          <div className="flex-1">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 text-[var(--color-charcoal)] transition-all duration-500 ease-out delay-[500ms] ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-[30px]"
              }`}
            >
              {t.home.projects.title}
            </h2>
            <p
              className={`text-lg text-[var(--color-muted-foreground)] transition-all duration-500 ease-out delay-[300ms] ${
                isVisible
                  ? "opacity-90 translate-y-0"
                  : "opacity-0 translate-y-[20px]"
              }`}
            >
              {t.home.projects.subtitle}
            </p>
          </div>
        </div>

        {/* Cards Container with Controls */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {projects.map((project) => {
                const title =
                  locale === "bg" ? project.titleBg : project.titleEn;
                const description =
                  locale === "bg"
                    ? project.descriptionBg
                    : project.descriptionEn;
                const location =
                  locale === "bg" ? project.locationBg : project.locationEn;
                const categoryName =
                  locale === "bg"
                    ? project.category.titleBg
                    : project.category.titleEn;
                const imageUrl = `${CLOUDINARY_BASE_URL}/${project.heroImageUrl}`;

                return (
                  <div
                    key={project.id}
                    className="flex-[0_0_100%] md:flex-[0_0_calc(33.333%-16px)] min-w-0"
                  >
                    <Card
                      title={title}
                      location={location}
                      description={description}
                      image={imageUrl}
                      slug={`/projects/${project.category.slug}/${project.slug}`}
                      category={categoryName}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls - Below Cards, Left Side */}
          <div className="flex gap-4 mt-8">
            <ChevronButton
              direction="left"
              onClick={() => emblaApi?.scrollPrev()}
              ariaLabel="Previous projects"
              className="!text-[var(--color-charcoal)] hover:!text-[var(--color-red)]"
            />
            <ChevronButton
              direction="right"
              onClick={() => emblaApi?.scrollNext()}
              ariaLabel="Next projects"
              className="!text-[var(--color-charcoal)] hover:!text-[var(--color-red)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
