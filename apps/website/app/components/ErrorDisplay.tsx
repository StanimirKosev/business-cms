"use client";

import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

interface ErrorDisplayProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorDisplay({ error, reset }: ErrorDisplayProps) {
  const { locale } = useLanguage();

  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-[var(--color-red)]" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[var(--color-charcoal)]">
              {locale === "bg" ? "Нещо се обърка" : "Something went wrong"}
            </h2>
            <p className="text-gray-600 text-sm">
              {locale === "bg"
                ? "Съжаляваме, възникна проблем при зареждане на страницата. Моля, опитайте отново."
                : "Sorry, there was a problem loading the page. Please try again."}
            </p>
          </div>

          {process.env.NODE_ENV === "development" && (
            <details className="w-full text-left">
              <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                {locale === "bg" ? "Технически детайли" : "Technical details"}
              </summary>
              <pre className="mt-2 text-xs text-red-600 bg-red-50 p-3 rounded overflow-auto max-h-32">
                {error.message}
              </pre>
            </details>
          )}

          <button
            onClick={reset}
            className="mt-4 px-6 py-2.5 bg-[var(--color-red)] text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            {locale === "bg" ? "Опитайте отново" : "Try again"}
          </button>
        </div>
      </div>
    </div>
  );
}
