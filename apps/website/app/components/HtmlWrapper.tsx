"use client";

import { useLanguage } from "@/app/context/LanguageContext";

export function HtmlWrapper({ children }: { children: React.ReactNode }) {
  const { locale } = useLanguage();

  return (
    <html lang={locale}>
      {children}
    </html>
  );
}
