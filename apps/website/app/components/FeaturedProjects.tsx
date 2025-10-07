"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ProjectCard } from "./ProjectCard";
import { recentProjects } from "@/lib/mockData";
import ChevronButton from "./ChevronButton";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";

export function FeaturedProjects() {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.5);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  // Calculate visible range for counter (desktop shows 3, mobile shows 1)
  const firstVisible = selectedIndex + 1;
  const lastVisible = Math.min(selectedIndex + 3, recentProjects.length);

  return (
    <section
      ref={sectionRef}
      id="our-projects"
      className="relative py-17 px-6 md:px-40 bg-[var(--color-concrete-grey-light)]"
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
              Нашите проекти
            </h2>
            <p
              className={`text-lg text-[var(--color-muted-foreground)] transition-all duration-500 ease-out delay-[300ms] ${
                isVisible
                  ? "opacity-90 translate-y-0"
                  : "opacity-0 translate-y-[20px]"
              }`}
            >
              Реализирани строителни проекти с най-високо качество
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
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex-[0_0_100%] md:flex-[0_0_calc(33.333%-16px)] min-w-0"
                >
                  <ProjectCard
                    title={project.title}
                    location={project.location}
                    description={project.description}
                    image={project.image}
                    slug={project.slug}
                    category={project.category}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls - Below Cards, Left Side */}
          <div className="flex gap-4 mt-8">
            <ChevronButton
              direction="left"
              onClick={() => emblaApi?.scrollPrev()}
              ariaLabel="Previous projects"
              disabled={!emblaApi?.canScrollPrev()}
              className="!text-[var(--color-charcoal)] hover:!text-[var(--color-red)]"
            />
            <ChevronButton
              direction="right"
              onClick={() => emblaApi?.scrollNext()}
              ariaLabel="Next projects"
              disabled={!emblaApi?.canScrollNext()}
              className="!text-[var(--color-charcoal)] hover:!text-[var(--color-red)]"
            />
          </div>
        </div>
      </div>

      {/* Counter (Vertical) - Fixed Right Side, Outside Cards - Hidden on Mobile */}
      <div className="hidden md:flex absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex-col items-center z-10 pointer-events-none">
        <span className="text-xl md:text-2xl font-bold text-[var(--color-red)] text-center">
          {firstVisible === lastVisible
            ? firstVisible
            : `${firstVisible}-${lastVisible}`}
        </span>
        <div className="w-px h-8 bg-[var(--color-charcoal)] my-1" />
        <span className="text-lg md:text-xl font-medium text-[var(--color-charcoal)]">
          {recentProjects.length}
        </span>
      </div>
    </section>
  );
}
