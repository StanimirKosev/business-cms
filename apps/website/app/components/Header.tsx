"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import HamburgerMenu from "./HamburgerMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/app/context/LanguageContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  // Check if current page is a project detail page (e.g., /projects/residential/example-project)
  const isProjectPage = pathname.startsWith("/projects/") && pathname.split("/").length === 4;
  const { t } = useLanguage();

  // Track scroll on homepage and project pages
  const shouldTrackScroll = isHomePage || isProjectPage;

  useEffect(() => {
    if (!shouldTrackScroll) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldTrackScroll]);

  // Use compact version for all routes except homepage/project pages at top
  const isCompact = (!isHomePage && !isProjectPage) || isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[999] text-[var(--color-white)] transition-[background-color,box-shadow] duration-[400ms] ease-in-out ${
        (isHomePage || isProjectPage) && !isScrolled
          ? "bg-transparent backdrop-blur-[2px]"
          : "bg-[var(--color-red)] shadow-md"
      }`}
    >
      <div
        className={`px-6 md:pl-40 md:pr-60 flex items-center justify-between max-w-[1800px] mx-auto transition-[padding] duration-[400ms] ease-in-out ${
          isCompact ? "py-2.5 md:py-3" : "py-4 md:py-5"
        }`}
      >
        {/* Logo with responsive sizing */}
        <Link
          href="/"
          className={`relative block transition-all duration-[400ms] ease-in-out origin-left ${
            isCompact
              ? "w-[160px] h-[41px] md:w-[180px] md:h-[46px]"
              : "w-[200px] h-[51px] md:w-[240px] md:h-[62px]"
          }`}
        >
          <Image
            src="/logo.svg"
            alt="Техно Покрив България - Строителна фирма"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-base">
          <Link href="/" className="link-underline">
            {t.nav.home}
          </Link>
          <Link href="/projects" className="link-underline">
            {t.nav.projects}
          </Link>
          <Link href="/clients" className="link-underline">
            {t.nav.clients}
          </Link>
          <Link href="/machinery" className="link-underline">
            {t.nav.machinery}
          </Link>
          <Link href="/quality" className="link-underline">
            {t.nav.quality}
          </Link>
          <Link href="/contact" className="link-underline">
            {t.nav.contact}
          </Link>
          <LanguageSwitcher />
        </nav>

        {/* Mobile: Language Switcher + Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <LanguageSwitcher />
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
