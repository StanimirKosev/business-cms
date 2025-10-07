import { useEffect, useRef, useState } from "react";

/**
 * Custom hook that triggers animations when an element scrolls into view.
 * Uses IntersectionObserver to detect when the element becomes visible in the viewport.
 *
 * @param threshold - Percentage of element visibility required to trigger (0-1). Default: 0.5
 * @returns Object containing the ref to attach to the element and the visibility state
 *
 * @example
 * const { ref, isVisible } = useScrollAnimation(0.5);
 * return <section ref={ref} className={isVisible ? "animate-in" : ""}> ... </section>
 */
export function useScrollAnimation(threshold: number = 0.5) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentElement = ref.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold }
    );

    observer.observe(currentElement);
    return () => observer.unobserve(currentElement);
  }, [threshold]);

  return { ref, isVisible };
}
