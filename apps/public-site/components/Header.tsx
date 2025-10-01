"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

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
      className={`fixed top-0 left-0 right-0 z-[999] text-[var(--color-white)] transition-[background-color,box-shadow] duration-[400ms] ease-in-out ${
        isScrolled
          ? "bg-[var(--color-red)] shadow-md"
          : "bg-transparent backdrop-blur-[2px]"
      }`}
    >
      <div
        className={`pl-40 pr-60 flex items-center justify-between max-w-[1800px] mx-auto transition-[padding] duration-[400ms] ease-in-out ${
          isScrolled ? "py-2" : "py-4"
        }`}
      >
        <Link
          href="/"
          className={`font-bold text-3xl leading-none origin-left transition-transform duration-[400ms] ease-in-out ${
            isScrolled ? "scale-[0.56]" : "scale-100"
          }`}
        >
          LOGO
        </Link>

        <nav className="flex items-center gap-8 text-base">
          <Link href="/" className="link-underline">
            Начало
          </Link>
          <Link href="/projects" className="link-underline">
            Проекти
          </Link>
          <Link href="/contact" className="link-underline">
            Контакти
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
