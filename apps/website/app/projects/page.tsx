"use client";

import { ServiceProjectsSection } from "../components/ServiceProjectsSection";
import {
  PROJECT_CATEGORIES,
  ProjectCategory,
  getProjectsByCategory,
  getCategoryInfo,
} from "@/lib/mock-data";
import { useState, useEffect, useRef } from "react";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";

export default function ProjectsPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.5);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(
    PROJECT_CATEGORIES[0]
  );
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const navButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const navScrollRef = useRef<HTMLDivElement | null>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track active section based on scroll position with throttling
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (isScrollingRef.current || rafId) return;

      rafId = requestAnimationFrame(() => {
        const { scrollHeight } = document.documentElement;
        const scrollTop = window.scrollY;
        const clientHeight = window.innerHeight;

        if (scrollTop < 200) {
          setActiveCategory(PROJECT_CATEGORIES[0]);
          rafId = null;
          return;
        }

        if (scrollTop + clientHeight >= scrollHeight - 100) {
          setActiveCategory(PROJECT_CATEGORIES[PROJECT_CATEGORIES.length - 1]);
          rafId = null;
          return;
        }

        const viewportCenter = scrollTop + clientHeight / 2;
        let closestCategory = PROJECT_CATEGORIES[0];
        let closestDistance = Infinity;

        PROJECT_CATEGORIES.forEach((category) => {
          const element = sectionRefs.current[category];
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementCenter = scrollTop + rect.top + rect.height / 2;
            const distance = Math.abs(viewportCenter - elementCenter);

            if (distance < closestDistance) {
              closestDistance = distance;
              closestCategory = category;
            }
          }
        });

        setActiveCategory(closestCategory);
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Auto-scroll navigation to center active category
  useEffect(() => {
    const activeButton = navButtonRefs.current[activeCategory];
    const navScroll = navScrollRef.current;

    if (activeButton && navScroll) {
      const targetScroll =
        activeButton.offsetLeft -
        navScroll.offsetWidth / 2 +
        activeButton.offsetWidth / 2;

      navScroll.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  }, [activeCategory]);

  const scrollToCategory = (category: ProjectCategory) => {
    const element = sectionRefs.current[category];
    if (!element) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    isScrollingRef.current = true;
    setActiveCategory(category);

    const isMobile = window.innerWidth < 768;
    const headerOffset = isMobile ? 150 : 120;
    const offsetPosition =
      element.getBoundingClientRect().top + window.pageYOffset - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: "smooth" });

    let lastScrollTop = window.pageYOffset;
    let scrollCheckCount = 0;

    const checkScrollEnd = () => {
      const currentScrollTop = window.pageYOffset;

      if (
        Math.abs(currentScrollTop - lastScrollTop) < 1 ||
        scrollCheckCount >= 100
      ) {
        scrollTimeoutRef.current = setTimeout(() => {
          setActiveCategory(category);
          isScrollingRef.current = false;
        }, 200);
      } else {
        lastScrollTop = currentScrollTop;
        scrollCheckCount++;
        scrollTimeoutRef.current = setTimeout(checkScrollEnd, 50);
      }
    };

    scrollTimeoutRef.current = setTimeout(checkScrollEnd, 100);
  };

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
      <div className="sticky top-[44px] z-40 bg-white border-b border-[var(--color-border)] pt-5">
        <div className="px-4">
          <div
            ref={navScrollRef}
            className="overflow-x-auto custom-scrollbar pb-2"
          >
            <div className="flex items-center gap-4 min-w-max">
              {PROJECT_CATEGORIES.map((category) => {
                const info = getCategoryInfo(category);
                const projectCount = getProjectsByCategory(category).length;
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    ref={(el) => {
                      navButtonRefs.current[category] = el;
                    }}
                    onClick={() => scrollToCategory(category)}
                    className={`flex-shrink-0 px-4 py-1.5 rounded-full transition-all font-medium text-sm whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? "bg-[var(--color-red)] text-[var(--color-white)] shadow-md"
                        : "bg-[#e8e8e8] text-[#888888] hover:bg-[#ffe5e5] hover:text-[var(--color-red)]"
                    }`}
                  >
                    <span className="text-lg">{info.icon}</span>
                    {category}
                    <span className="opacity-70">({projectCount})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

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
