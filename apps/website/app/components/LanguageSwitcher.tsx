"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

interface LanguageSwitcherProps {
  variant?: "desktop" | "mobile";
  onToggle?: () => void;
}

export function LanguageSwitcher({ variant = "desktop", onToggle }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  const toggleLanguage = () => {
    setLocale(locale === "bg" ? "en" : "bg");
    onToggle?.();
  };

  if (variant === "mobile") {
    return (
      <button
        onClick={toggleLanguage}
        className="w-full px-5 py-4 min-h-[44px] flex items-center text-[var(--color-charcoal)] text-left"
        aria-label={`Switch to ${locale === "bg" ? "English" : "Bulgarian"}`}
      >
        {locale === "bg" ? "English" : "Български"}
      </button>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 link-underline cursor-pointer text-[0.9rem]"
      aria-label={`Switch to ${locale === "bg" ? "English" : "Bulgarian"}`}
    >
      <Languages size={16} />
      <span>{locale === "bg" ? "EN" : "БГ"}</span>
    </button>
  );
}
