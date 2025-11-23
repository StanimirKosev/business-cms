"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@repo/ui/components/button";

interface ErrorDisplayProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorDisplay({ error, reset }: ErrorDisplayProps) {
  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900">Нещо се обърка</h2>
            <p className="text-gray-600 text-sm">
              Съжаляваме, възникна проблем при зареждане на страницата. Моля, опитайте отново.
            </p>
          </div>

          {process.env.NODE_ENV === "development" && (
            <details className="w-full text-left">
              <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                Технически детайли
              </summary>
              <pre className="mt-2 text-xs text-red-600 bg-red-50 p-3 rounded overflow-auto max-h-32">
                {error.message}
              </pre>
            </details>
          )}

          <Button onClick={reset} className="mt-4">
            Опитайте отново
          </Button>
        </div>
      </div>
    </div>
  );
}
