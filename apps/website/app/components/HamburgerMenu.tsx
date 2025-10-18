"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";

const HamburgerMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !menuRef.current?.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="md:hidden relative">
      <button
        ref={buttonRef}
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        className="p-2 -mr-2 flex flex-col items-center justify-center w-10 h-10"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "rotate-45 translate-y-1.5"
              : "rotate-0 translate-y-0"
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white my-1 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "-rotate-45 -translate-y-1.5"
              : "rotate-0 translate-y-0"
          }`}
        />
      </button>

      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-full right-0 mt-2 w-48 bg-[var(--color-white)] rounded-lg shadow-xl overflow-hidden"
        >
          {[
            { href: "/", label: "Начало" },
            { href: "/projects", label: "Проекти" },
            { href: "/quality", label: "Качество" },
            { href: "/contact", label: "Контакти" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-5 py-4 min-h-[44px] flex items-center border-b border-[var(--color-concrete-grey)] ${
                pathname === link.href
                  ? "bg-[var(--color-concrete-grey-light)] text-[var(--color-red)] font-semibold"
                  : "text-[var(--color-charcoal)]"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher
            variant="mobile"
            onToggle={() => setIsMobileMenuOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
