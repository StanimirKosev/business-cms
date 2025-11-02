"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scrolls to top on route changes
 * This fixes the issue where navigating from bottom of one page
 * keeps you at the bottom of the next page
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
