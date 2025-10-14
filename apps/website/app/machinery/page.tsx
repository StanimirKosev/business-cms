"use client";

import {
  MACHINERY_CATEGORIES,
  type MachineryCategory,
  type Machinery,
  getMachineryByCategory,
  getMachineryCategoryInfo,
} from "@/lib/mock-data";
import { useState, useEffect, useRef } from "react";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

interface MachineryGalleryProps {
  machinery: Machinery[];
}

function MachineryGallery({ machinery }: MachineryGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {machinery.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setLightboxIndex(index)}
            className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Overlay with name */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
              <h3 className="text-white font-bold text-lg p-4 w-full group-hover:from-black/80 transition-all duration-300">
                {item.name}
              </h3>
            </div>
            {/* Hover icon */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={machinery.map((item) => ({
          src: item.image,
          alt: item.name,
          title: item.name,
        }))}
        plugins={[Captions]}
      />
    </>
  );
}

export default function MachineryPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.5);
  const [activeCategory, setActiveCategory] = useState<MachineryCategory>(
    MACHINERY_CATEGORIES[0]
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
          setActiveCategory(MACHINERY_CATEGORIES[0]);
          rafId = null;
          return;
        }

        if (scrollTop + clientHeight >= scrollHeight - 100) {
          setActiveCategory(
            MACHINERY_CATEGORIES[MACHINERY_CATEGORIES.length - 1]
          );
          rafId = null;
          return;
        }

        const viewportCenter = scrollTop + clientHeight / 2;
        let closestCategory = MACHINERY_CATEGORIES[0];
        let closestDistance = Infinity;

        MACHINERY_CATEGORIES.forEach((category) => {
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

  const scrollToCategory = (category: MachineryCategory) => {
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
        aria-label="Механизация"
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
                Механизация
              </h1>

              <div className="space-y-6 leading-relaxed text-[var(--color-charcoal)]">
                <p
                  className={`text-xl font-semibold transition-all duration-500 ease-out delay-[300ms] ${
                    heroVisible
                      ? "opacity-90 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  Разполагаме с пълната гама специализирана техника, необходима
                  за всеки етап от вашия проект - от първия изкоп до финалната
                  настилка.
                </p>

                <p
                  className={`text-lg transition-all duration-500 ease-out delay-[500ms] ${
                    heroVisible
                      ? "opacity-80 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  Нашата механизация включва съвременна тежка и специализирана
                  техника от водещи производители. Всяка машина се поддържа в
                  отлично техническо състояние и се управлява от опитни
                  оператори, за да гарантираме максимална ефективност и
                  безопасност на строителния обект.
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
              {MACHINERY_CATEGORIES.map((category) => {
                const info = getMachineryCategoryInfo(category);
                const machineryCount = getMachineryByCategory(category).length;
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
                    <span className="opacity-70">({machineryCount})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Machinery Sections */}
      <div>
        {MACHINERY_CATEGORIES.map((category) => {
          const machinery = getMachineryByCategory(category);
          const info = getMachineryCategoryInfo(category);

          return machinery.length > 0 ? (
            <section
              key={category}
              ref={(el) => {
                sectionRefs.current[category] = el;
              }}
              id={category}
              className="py-16 px-6 md:px-40 bg-white border-b border-[var(--color-border)]"
            >
              <div className="max-w-7xl mx-auto">
                {/* Category Header */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{info.icon}</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]">
                      {category}
                    </h2>
                  </div>
                  <p className="text-lg text-[var(--color-charcoal)] opacity-80 mb-2">
                    {info.subtitle}
                  </p>
                  <p className="text-base text-[var(--color-charcoal)] opacity-70 leading-relaxed">
                    {info.description}
                  </p>
                </div>

                {/* Machinery Gallery */}
                <MachineryGallery machinery={machinery} />
              </div>
            </section>
          ) : null;
        })}
      </div>
    </main>
  );
}
