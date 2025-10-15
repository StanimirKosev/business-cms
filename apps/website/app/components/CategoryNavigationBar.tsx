"use client";

import { useRef, useEffect, useState } from "react";

interface Category {
  name: string;
  icon: string;
  count: number;
}

interface CategoryNavigationBarProps {
  categories: Category[];
  sectionRefs: React.RefObject<{ [key: string]: HTMLElement | null }>;
}

export function CategoryNavigationBar({
  categories,
  sectionRefs,
}: CategoryNavigationBarProps) {
  const navScrollRef = useRef<HTMLDivElement | null>(null);
  const navButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.name || ""
  );
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
          setActiveCategory(categories[0]?.name || "");
          rafId = null;
          return;
        }

        if (scrollTop + clientHeight >= scrollHeight - 100) {
          setActiveCategory(categories[categories.length - 1]?.name || "");
          rafId = null;
          return;
        }

        const viewportCenter = scrollTop + clientHeight / 2;
        let closestCategory = categories[0]?.name || "";
        let closestDistance = Infinity;

        categories.forEach((category) => {
          const element = sectionRefs.current[category.name];
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementCenter = scrollTop + rect.top + rect.height / 2;
            const distance = Math.abs(viewportCenter - elementCenter);

            if (distance < closestDistance) {
              closestDistance = distance;
              closestCategory = category.name;
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
  }, [categories, sectionRefs]);

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

  const scrollToCategory = (categoryName: string) => {
    const element = sectionRefs.current[categoryName];
    if (!element) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    isScrollingRef.current = true;
    setActiveCategory(categoryName);

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
          setActiveCategory(categoryName);
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
    <div className="sticky top-[44px] z-40 bg-white border-b border-[var(--color-border)] pt-5">
      <div className="px-4">
        <div
          ref={navScrollRef}
          className="overflow-x-auto custom-scrollbar pb-2"
        >
          <div className="flex items-center gap-4 min-w-max">
            {categories.map((category) => {
              const isActive = activeCategory === category.name;

              return (
                <button
                  key={category.name}
                  ref={(el) => {
                    navButtonRefs.current[category.name] = el;
                  }}
                  onClick={() => scrollToCategory(category.name)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full transition-all font-medium text-sm whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-[var(--color-red)] text-[var(--color-white)] shadow-md"
                      : "bg-[#e8e8e8] text-[#888888] hover:bg-[#ffe5e5] hover:text-[var(--color-red)]"
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  {category.name}
                  <span className="opacity-70">({category.count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
