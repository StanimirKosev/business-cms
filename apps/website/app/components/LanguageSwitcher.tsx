"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const toggleLanguage = () => {
    setLocale(locale === "bg" ? "en" : "bg");
  };

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
