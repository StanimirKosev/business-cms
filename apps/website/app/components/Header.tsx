"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HamburgerMenu from "./HamburgerMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";

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
        className={`px-6 md:pl-40 md:pr-60 flex items-center justify-between max-w-[1800px] mx-auto transition-[padding] duration-[400ms] ease-in-out ${
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

        <nav className="hidden md:flex items-center gap-8 text-base">
          <Link href="/" className="link-underline">
            Начало
          </Link>
          <Link href="/projects" className="link-underline">
            Проекти
          </Link>
          <Link href="/quality" className="link-underline">
            Качество
          </Link>
          <Link href="/contact" className="link-underline">
            Контакти
          </Link>
          <LanguageSwitcher />
        </nav>
        <HamburgerMenu />
      </div>
    </header>
  );
};

export default Header;
