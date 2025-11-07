"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";
import { useLanguage } from "@/app/context/LanguageContext";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Category } from "@repo/database/client";

interface ServicesSectionProps {
  categories: Category[];
}

const ServicesSection = ({ categories }: ServicesSectionProps) => {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.05);
  const { t, locale } = useLanguage();

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 md:px-40 bg-[var(--color-concrete-grey-light)]"
      aria-label={t.home.services.title}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* Red Accent Line - Hidden on mobile */}
          <div
            className={`hidden md:block w-1 bg-[var(--color-red)] transition-all duration-[400ms] ease-out ${
              isVisible ? "h-16" : "h-0"
            }`}
          />

          <div className="flex-1">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-8 text-[var(--color-charcoal)] transition-all duration-500 ease-out delay-[500ms] ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-[30px]"
              }`}
            >
              {t.home.services.title}
            </h2>

            <div className="space-y-6 leading-relaxed text-[var(--color-charcoal)]">
              <p
                className={`text-xl font-semibold transition-all duration-500 ease-out delay-[300ms] ${
                  isVisible
                    ? "opacity-90 translate-y-0"
                    : "opacity-0 translate-y-[20px]"
                }`}
              >
                {t.home.services.intro}
              </p>

              {/* Services Grid - 2 columns */}
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 pt-2 transition-all duration-500 ease-out delay-[500ms] ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-[20px]"
                }`}
              >
                {categories.map((category) => {
                  const title =
                    locale === "bg" ? category.titleBg : category.titleEn;
                  const description =
                    locale === "bg"
                      ? category.descriptionBg
                      : category.descriptionEn;

                  return (
                    <div
                      key={category.id}
                      className="flex items-start gap-3 text-[var(--color-charcoal)]"
                    >
                      <CheckCircle2 className="w-6 h-6 text-[var(--color-red)] flex-shrink-0 mt-0.5" />
                      <span className="text-base leading-relaxed">
                        <span className="font-bold text-[var(--color-charcoal)] text-[17px]">
                          {title}
                        </span>
                        {description && (
                          <span className="text-[var(--color-muted-foreground)]">
                            {" "}
                            - {description}
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Machinery Text */}
              <p
                className={`text-lg transition-all duration-500 ease-out delay-[700ms] ${
                  isVisible
                    ? "opacity-85 translate-y-0"
                    : "opacity-0 translate-y-[20px]"
                }`}
              >
                {t.home.services.footer}
              </p>

              {/* Machinery Link */}
              <div
                className={`pt-2 transition-all duration-500 ease-out delay-[900ms] ${
                  isVisible
                    ? "opacity-85 translate-y-0"
                    : "opacity-0 translate-y-[20px]"
                }`}
              >
                <Link
                  href="/machinery"
                  className="inline-flex items-center gap-2 text-[var(--color-red)] hover:text-[var(--color-charcoal)] transition-colors duration-200 font-medium group"
                >
                  <span>{t.home.services.machineryLink}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
