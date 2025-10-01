"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const navLinkClasses = `relative pb-1 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:transition-[width] after:duration-300 ${
    isScrolled ? "after:bg-[var(--color-white)]" : "after:bg-[var(--color-red)]"
  }`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[999] text-[var(--color-white)] transition-[background-color,box-shadow,backdrop-filter] duration-[400ms] ease-in-out ${
        isScrolled
          ? "bg-[var(--color-red)] shadow-md"
          : "bg-transparent backdrop-blur-md"
      }`}
    >
      <div
        className={`pl-40 pr-60 flex items-center justify-between max-w-[1800px] mx-auto transition-[height] duration-[400ms] ease-in-out ${
          isScrolled ? "h-[60px]" : "h-[76px]"
        }`}
      >
        <Link
          href="/"
          className={`font-bold transition-[font-size] duration-[400ms] ease-in-out ${
            isScrolled ? "text-base" : "text-3xl"
          }`}
        >
          LOGO
        </Link>

        <nav className="flex items-center gap-8">
          <Link href="/" className={navLinkClasses}>
            Начало
          </Link>
          <Link href="/projects" className={navLinkClasses}>
            Проекти
          </Link>
          <Link href="/contact" className={navLinkClasses}>
            Контакти
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
