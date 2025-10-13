"use client";

import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";
import { FileText, Award, Shield, Leaf, Users, Zap } from "lucide-react";
import { ImageGallery } from "@/app/components/ImageGallery";

// ISO Standards timeline
const isoStandards = [
  {
    year: "2008",
    title: "ISO 9001:2000",
    description: "Стандарт за качество",
    icon: Award,
  },
  {
    year: "2009",
    title: "Интегрирана система",
    description: "ISO 9001:2008, ISO 14001:2004, BS OHSAS 18001:2007",
    icon: Shield,
  },
  {
    year: "2020",
    title: "ISO 45001:2018",
    description: "Преход към нов стандарт за безопасност",
    icon: Users,
  },
  {
    year: "2025",
    title: "ISO 50001:2018",
    description: "Система за управление на енергията",
    icon: Zap,
  },
];

// Quality management practices
const qualityPractices = [
  "Прилагане на нови съвременни технологии за изпълнение на СМР",
  "Прилагане на практики по ефективно управление на човешките ресурси",
  "Постоянно подобряване на Системите за управление",
  "Коректни отношения с инвеститорите",
  "Срочно и качествено изпълнение на договорените строителни работи",
  "Стриктно спазване на работните проекти",
  "Успешното прилагане на вътрешно-фирмения контрол за качество",
  "Еднакво отговорно отношение към поетите ангажименти",
  "Усвояване и прилагане на нови съвременни технологии и материали",
];

// Policy documents
const policyDocuments = [
  {
    title: "Декларация на ръководството",
    subtitle: "Политика по качеството, околната среда, здраве и безопасност",
    icon: FileText,
    file: "/policies/quality-policy.pdf",
  },
  {
    title: "Политика по социална отговорност",
    subtitle: "Корпоративна социална отговорност",
    icon: Users,
    file: "/policies/social-responsibility.pdf",
  },
  {
    title: "Политика за детски труд",
    subtitle: "Защита и възстановяване на деца",
    icon: Shield,
    file: "/policies/child-labor.pdf",
  },
  {
    title: "Политика за равни възможности",
    subtitle: "Липса на дискриминация",
    icon: Award,
    file: "/policies/equal-opportunities.pdf",
  },
  {
    title: "Политика за управление на енергията",
    subtitle: "Енергийна ефективност и устойчивост",
    icon: Zap,
    file: "/policies/energy-management.pdf",
  },
  {
    title: "Етичен кодекс",
    subtitle: "Корпоративна етика и ценности",
    icon: Leaf,
    file: "/policies/code-of-ethics.pdf",
  },
];

// Certificates data (will be managed from admin panel in future)
const certificateImages = [
  {
    src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=800&fit=crop",
    alt: 'Награда за сграда на годината в категория "Градски проекти - транспортна инфраструктура"',
    title: 'Награда за сграда на годината в категория "Градски проекти - транспортна инфраструктура"',
  },
  {
    src: "https://images.unsplash.com/photo-1568667256549-094345857637?w=600&h=800&fit=crop",
    alt: "ISO 9001:2015 - Система за управление на качеството",
    title: "ISO 9001:2015 - Система за управление на качеството",
  },
  {
    src: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&h=800&fit=crop",
    alt: "ISO 14001:2015 - Система за управление на околната среда",
    title: "ISO 14001:2015 - Система за управление на околната среда",
  },
  {
    src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=800&fit=crop",
    alt: "ISO 45001:2018 - Система за управление на здраве и безопасност при работа",
    title: "ISO 45001:2018 - Система за управление на здраве и безопасност при работа",
  },
  {
    src: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=800&fit=crop",
    alt: "ISO 50001:2018 - Система за управление на енергията",
    title: "ISO 50001:2018 - Система за управление на енергията",
  },
];

export default function QualityPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.5);
  const { ref: certificatesRef, isVisible: certificatesVisible } =
    useScrollAnimation(0.3);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 md:px-40 bg-white"
        aria-label="Качество и сертификати"
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
                Качество
              </h1>

              <div className="space-y-6 leading-relaxed text-[var(--color-charcoal)]">
                <p
                  className={`text-xl font-semibold transition-all duration-500 ease-out delay-[300ms] ${
                    heroVisible
                      ? "opacity-90 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  От 2008г. Техно Строй България ООД развива дейността си в
                  съответствие с изискванията на международните стандарти за
                  качество, околна среда и безопасност.
                </p>

                <p
                  className={`text-lg transition-all duration-500 ease-out delay-[500ms] ${
                    heroVisible
                      ? "opacity-80 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  Политиката на дружеството е насочена към усъвършенстването на
                  системата за управление на качеството за нарастване на
                  удовлетвореността на клиентите, чрез все по-пълно задоволяване
                  на техните изисквания.
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
              Еволюция на системите за управление
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-[var(--color-red)] ml-6"></div>

            <div className="space-y-12">
              {isoStandards.map((standard, index) => {
                const Icon = standard.icon;
                return (
                  <div
                    key={standard.year}
                    className="relative flex gap-8"
                  >
                    {/* Year badge */}
                    <div className="flex-shrink-0 w-24 md:w-32">
                      <div className="relative z-10 w-12 h-12 bg-[var(--color-red)] rounded-full flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="mt-2 text-2xl font-bold text-[var(--color-red)]">
                        {standard.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-[var(--color-charcoal)] mb-2">
                          {standard.title}
                        </h3>
                        <p className="text-gray-600">{standard.description}</p>
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
              Сертификати
            </h2>
          </div>

          <ImageGallery
            images={certificateImages}
            columns={{ mobile: 2, tablet: 4, desktop: 5 }}
            aspectRatio="portrait"
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
              Методи за управление на качеството
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {qualityPractices.map((practice, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex-shrink-0 w-2 h-2 bg-[var(--color-red)] rounded-full mt-2"></div>
                <p className="text-base text-gray-700 leading-relaxed">
                  {practice}
                </p>
              </div>
            ))}
          </div>

          {/* Social Responsibility Statement */}
          <div className="mt-10 pt-10 border-t border-gray-200">
            <p className="text-base md:text-lg leading-relaxed text-[var(--color-charcoal)] max-w-4xl">
              Политиката на фирмата е насочена към поемане на ангажименти за
              устойчиво икономическо развитие, коректни трудови отношения с
              работниците, защита от дискриминация, спазване на нормативните
              изисквания за здравословни и безопасни условия на труд и опазване
              на околната среда.
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
              Политики и документи
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policyDocuments.map((doc, index) => {
              const Icon = doc.icon;
              return (
                <a
                  key={index}
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[var(--color-red)] transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-[#ffe5e5] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[var(--color-red)] transition-colors">
                    <Icon className="w-6 h-6 text-[var(--color-red)] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-charcoal)] mb-2 group-hover:text-[var(--color-red)] transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-gray-600">{doc.subtitle}</p>
                  <div className="mt-4 flex items-center text-[var(--color-red)] text-sm font-medium">
                    <span>Преглед</span>
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
