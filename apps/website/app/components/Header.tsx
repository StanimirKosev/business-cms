"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

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
        isHomePage && !isScrolled
          ? "bg-transparent backdrop-blur-[2px]"
          : "bg-[var(--color-red)] shadow-md"
      }`}
    >
      <div
        className={`px-6 md:pl-40 md:pr-60 flex flex-col md:flex-row items-end md:items-center md:justify-between gap-3 md:gap-0 max-w-[1800px] mx-auto transition-[padding] duration-[400ms] ease-in-out ${
          isScrolled ? "py-2" : "py-4"
        }`}
      >
        <Link
          href="/"
          className={`font-bold text-3xl leading-none md:origin-left transition-transform duration-[400ms] ease-in-out ${
            isScrolled ? "scale-[0.56]" : "scale-100"
          }`}
        >
          LOGO
        </Link>

        <nav className="flex items-center gap-4 md:gap-8 text-base w-full md:w-auto justify-between md:justify-start">
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
