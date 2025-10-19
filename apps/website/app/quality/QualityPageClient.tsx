"use client";

import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";
import { FileText, Award, Shield, Leaf, Users, Zap } from "lucide-react";
import { ImageGallery } from "@/app/components/ImageGallery";
import { useLanguage } from "@/app/context/LanguageContext";
import type { Certificate, Policy } from "@repo/database/client";
import { CLOUDINARY_BASE_URL } from "@/lib/cloudinary";

// ISO Standards timeline data
const ISO_STANDARDS_DATA = [
  { year: "2008", icon: Award },
  { year: "2009", icon: Shield },
  { year: "2020", icon: Users },
  { year: "2025", icon: Zap },
];

// Icon mapping for policies (order matters)
const POLICY_ICONS = [FileText, Users, Shield, Award, Zap, Leaf];

interface QualityPageClientProps {
  certificates: Certificate[];
  policies: Policy[];
}

export default function QualityPageClient({
  certificates,
  policies,
}: QualityPageClientProps) {
  const { locale, t } = useLanguage();

  const certificateImages = certificates.map((cert) => ({
    id: cert.id,
    src: `${CLOUDINARY_BASE_URL}/${cert.cloudinaryPublicId}`,
    alt: locale === "bg" ? cert.titleBg : cert.titleEn,
    title: locale === "bg" ? cert.titleBg : cert.titleEn,
  }));

  const policyDocuments = policies.map((policy) => ({
    id: policy.id,
    title: locale === "bg" ? policy.titleBg : policy.titleEn,
    subtitle: locale === "bg" ? policy.subtitleBg : policy.subtitleEn,
    file: `${CLOUDINARY_BASE_URL}/${policy.cloudinaryPublicId}.pdf`,
  }));

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.5);
  const { ref: certificatesRef, isVisible: certificatesVisible } =
    useScrollAnimation(0.3);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 md:px-40 bg-white"
        aria-label={t.quality.title}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6">
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
                {t.quality.title}
              </h1>

              <div className="space-y-6 leading-relaxed text-[var(--color-charcoal)]">
                <p
                  className={`text-xl font-semibold transition-all duration-500 ease-out delay-[300ms] ${
                    heroVisible
                      ? "opacity-90 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  {t.quality.hero.intro}
                </p>

                <p
                  className={`text-lg transition-all duration-500 ease-out delay-[500ms] ${
                    heroVisible
                      ? "opacity-80 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  {t.quality.hero.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ISO Standards Timeline */}
      <section className="py-16 md:py-20 px-6 md:px-40 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6 mb-12">
            <div className="hidden md:block w-1 h-12 bg-[var(--color-red)]" />
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]">
              {t.quality.timeline.title}
            </h2>
          </div>

          <div className="relative max-w-4xl">
            <div className="space-y-0">
              {ISO_STANDARDS_DATA.map((standard, index) => {
                const Icon = standard.icon;
                const isLast = index === ISO_STANDARDS_DATA.length - 1;
                return (
                  <div key={standard.year} className="flex gap-6 md:gap-8 pb-8 relative">
                    <div className="flex-shrink-0 w-20 md:w-24 relative flex flex-col items-center">
                      <div className="relative z-10 w-12 h-12 bg-[var(--color-red)] rounded-full flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      <div className="mt-2 mb-3 text-2xl font-bold text-[var(--color-red)]">
                        {standard.year}
                      </div>

                      {/* Line segment after year text with gap */}
                      {!isLast && (
                        <div className="absolute left-1/2 -translate-x-px top-[5.5rem] w-px h-16 bg-[var(--color-red)]"></div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-[var(--color-charcoal)] mb-2">
                          {
                            t.quality.standards[
                              standard.year as keyof typeof t.quality.standards
                            ].title
                          }
                        </h3>
                        <p className="text-gray-600">
                          {
                            t.quality.standards[
                              standard.year as keyof typeof t.quality.standards
                            ].description
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Gallery */}
      <section
        ref={certificatesRef}
        className="py-16 md:py-20 px-6 md:px-40 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6 mb-10">
            <div
              className={`hidden md:block w-1 bg-[var(--color-red)] transition-all duration-[400ms] ease-out ${
                certificatesVisible ? "h-12" : "h-0"
              }`}
            />
            <h2
              className={`text-3xl md:text-4xl font-bold text-[var(--color-charcoal)] transition-all duration-500 ${
                certificatesVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-[30px]"
              }`}
            >
              {t.quality.certificates.title}
            </h2>
          </div>

          <ImageGallery
            images={certificateImages}
            columns={{ mobile: 2, tablet: 3, desktop: 4 }}
            aspectRatio="square"
            isVisible={certificatesVisible}
            showTitles={true}
          />
        </div>
      </section>

      {/* Quality Management Practices */}
      <section className="py-16 md:py-20 px-6 md:px-40 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6 mb-10">
            <div className="hidden md:block w-1 h-12 bg-[var(--color-red)]" />
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]">
              {t.quality.practices.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.quality.practices.items.map(
              (practice: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 w-2 h-2 bg-[var(--color-red)] rounded-full mt-2"></div>
                  <p className="text-base text-gray-700 leading-relaxed">
                    {practice}
                  </p>
                </div>
              )
            )}
          </div>

          <div className="mt-10 pt-10 border-t border-gray-200">
            <p className="text-base md:text-lg leading-relaxed text-[var(--color-charcoal)] max-w-4xl">
              {t.quality.practices.footer}
            </p>
          </div>
        </div>
      </section>

      {/* Policy Documents */}
      <section className="py-16 md:py-20 px-6 md:px-40 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6 mb-10">
            <div className="hidden md:block w-1 h-12 bg-[var(--color-red)]" />
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-charcoal)]">
              {t.quality.policies.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policyDocuments.map((doc, index) => {
              const Icon = POLICY_ICONS[index];
              return (
                <a
                  key={doc.id}
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[var(--color-red)] transition-all duration-200 flex flex-col"
                >
                  <div className="w-12 h-12 bg-[#ffe5e5] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[var(--color-red)] transition-colors">
                    <Icon className="w-6 h-6 text-[var(--color-red)] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-charcoal)] mb-2 group-hover:text-[var(--color-red)] transition-colors min-h-[3.5rem]">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-gray-600 flex-grow">
                    {doc.subtitle}
                  </p>
                  <div className="mt-4 flex items-center text-[var(--color-red)] text-sm font-medium">
                    <span>{t.quality.policies.viewLabel}</span>
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
