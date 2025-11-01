"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export function LoadingSpinner() {
  const { locale } = useLanguage();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        {/* Simple spinner */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[var(--color-red)] rounded-full animate-spin" />
        <p className="text-gray-600 text-sm">
          {locale === "bg" ? "Зареждане..." : "Loading..."}
        </p>
      </div>
    </div>
  );
}
