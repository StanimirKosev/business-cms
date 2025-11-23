"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

export default function NotFound() {
  const { locale } = useLanguage();
  const isBg = locale === "bg";

  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="max-w-md w-full text-center">
        <div className="space-y-6">
          <div>
            <h1 className="text-6xl font-bold text-[var(--color-red)] mb-4">404</h1>
            <h2 className="text-2xl font-bold text-[var(--color-charcoal)] mb-2">
              {isBg ? "Страницата не е намерена" : "Page not found"}
            </h2>
            <p className="text-gray-600">
              {isBg
                ? "Съжаляваме, страницата, която търсите, не съществува."
                : "Sorry, the page you're looking for doesn't exist."}
            </p>
          </div>

          <Link
            href="/"
            className="inline-block px-8 py-3 bg-[var(--color-red)] text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            {isBg ? "Върнете се в началото" : "Go back home"}
          </Link>
        </div>
      </div>
    </div>
  );
}
