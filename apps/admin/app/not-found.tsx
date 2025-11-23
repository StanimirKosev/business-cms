"use client";

import Link from "next/link";
import { Button } from "@repo/ui/components/button";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="max-w-md w-full text-center">
        <div className="space-y-6">
          <div>
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Страницата не е намерена
            </h2>
            <p className="text-gray-600">
              Съжаляваме, страницата, която търсите, не съществува.
            </p>
          </div>

          <Link href="/dashboard">
            <Button className="w-full">
              Върнете се в администрацията
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
