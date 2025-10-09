"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";
import {
  Building2,
  Briefcase,
  Factory,
  Landmark,
  Wrench,
  Warehouse,
  ArrowRight,
} from "lucide-react";

const services = [
  { name: "Жилищно строителство", icon: Building2 },
  { name: "Офис и бизнес сгради", icon: Briefcase },
  { name: "Промишлено строителство", icon: Factory },
  { name: "Инфраструктурни проекти", icon: Landmark },
  { name: "Реконструкции и обновяване", icon: Wrench },
  { name: "Складови и логистични бази", icon: Warehouse },
];

const ServicesSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.5);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 md:px-40 bg-white"
      aria-label="Нашите услуги"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-12">
          {/* Left Column: Text Content */}
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
                Нашите услуги
              </h2>

              <div className="space-y-6 leading-relaxed text-[var(--color-charcoal)]">
                <p
                  className={`text-xl font-semibold transition-all duration-500 ease-out delay-[300ms] ${
                    isVisible
                      ? "opacity-90 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  Предлагаме пълен цикъл на строителни услуги - от концепция и
                  проектиране до изпълнение, контрол и въвеждане в експлоатация.
                </p>

                <p
                  className={`text-lg transition-all duration-500 ease-out delay-[500ms] ${
                    isVisible
                      ? "opacity-80 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  Нашият екип от специалисти осигурява професионално управление
                  на проекти в жилищно, търговско и промишлено строителство.
                  Работим с модерни технологии и най-високи стандарти за
                  качество.
                </p>

                {/* Services Grid */}
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 transition-all duration-500 ease-out delay-[700ms] ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  {services.map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 text-[var(--color-charcoal)]"
                      >
                        <Icon className="w-5 h-5 text-[var(--color-red)] flex-shrink-0" />
                        <span className="text-base">{service.name}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Machinery Link */}
                <div
                  className={`pt-4 transition-all duration-500 ease-out delay-[900ms] ${
                    isVisible
                      ? "opacity-85 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  <Link
                    href="/machinery"
                    className="inline-flex items-center gap-2 text-[var(--color-red)] hover:text-[var(--color-charcoal)] transition-colors duration-200 font-medium group"
                  >
                    <span>Разполагаме с модерна строителна механизация</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative">
            <div
              className={`relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl transition-all duration-[800ms] ease-out delay-[600ms] ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop"
                alt="Строителни услуги"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
