"use client";

import { machineryCategories } from "@/lib/mock-data";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";
import { useLanguage } from "@/app/context/LanguageContext";
import Image from "next/image";

export default function MachineryPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.5);
  const { t } = useLanguage();

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 md:pt-40 md:pb-20 px-6 md:px-40 bg-white"
        aria-label={t.machinery.title}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6">
            {/* Red Accent Line - Hidden on mobile */}
            <div
              className={`hidden md:block w-1 bg-[var(--color-red)] transition-all duration-[400ms] ease-out ${
                heroVisible ? "h-16" : "h-0"
              }`}
            />

            <div className="flex-1">
              <h1
                className={`text-4xl md:text-5xl font-bold mb-8 text-[var(--color-charcoal)] transition-all duration-500 ease-out delay-[500ms] ${
                  heroVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-[30px]"
                }`}
              >
                {t.machinery.title}
              </h1>

              <div className="space-y-6 leading-relaxed text-[var(--color-charcoal)]">
                <p
                  className={`text-xl font-semibold transition-all duration-500 ease-out delay-[300ms] ${
                    heroVisible
                      ? "opacity-90 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  {t.machinery.intro}
                </p>

                <p
                  className={`text-lg transition-all duration-500 ease-out delay-[500ms] ${
                    heroVisible
                      ? "opacity-80 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  {t.machinery.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Machinery Alternating Sections */}
      <div>
        {machineryCategories.map((category, index) => {
          const isEven = index % 2 === 0;

          return (
            <section
              key={category.id}
              className={`py-16 px-6 md:px-40 ${
                index % 2 === 0
                  ? "bg-[var(--color-concrete-grey-light)]"
                  : "bg-white"
              }`}
            >
              <div className="max-w-7xl mx-auto">
                <div
                  className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center ${
                    isEven ? "" : "md:grid-flow-dense"
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`relative h-[350px] md:h-[420px] overflow-hidden rounded-lg shadow-xl ${
                      isEven ? "" : "md:col-start-2"
                    }`}
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={`flex gap-6 ${isEven ? "" : "md:col-start-1 md:row-start-1"}`}
                  >
                    {/* Vertical Red Line - Hidden on mobile */}
                    <div
                      className="hidden md:block w-1 bg-[var(--color-red)] transition-all duration-[400ms] ease-out h-16 flex-shrink-0"
                    />

                    <div className="flex-1">
                      {/* Title and Count */}
                      <div className="mb-8">
                        <div className="flex items-start gap-4 mb-2">
                          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-charcoal)] leading-tight flex-1">
                            {category.name}
                          </h2>
                          {category.count > 0 && (
                            <div className="flex-shrink-0 bg-[var(--color-red)] text-white text-xl font-bold px-5 py-3 rounded-xl shadow-md">
                              {category.count}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Models List */}
                      <div className="space-y-3">
                        {category.models.map((model, modelIndex) => (
                          <div
                            key={modelIndex}
                            className="flex justify-between items-center gap-6 py-3 border-b border-gray-200 last:border-0"
                          >
                            <span className="text-[var(--color-charcoal)] font-medium text-lg">
                              {model.name}
                            </span>
                            {model.count > 0 && (
                              <span className="flex-shrink-0 text-[var(--color-muted-foreground)] font-semibold text-base">
                                {model.count === 15000
                                  ? "15 000 м²"
                                  : model.count === 15
                                    ? "15 бр."
                                    : `${model.count} бр.`}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
