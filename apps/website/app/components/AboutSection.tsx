"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";
import { useLanguage } from "@/app/context/LanguageContext";

const AboutSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.5);
  const { t } = useLanguage();
  const [projectCount, setProjectCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const steps = 60;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      setProjectCount(Math.floor((200 / steps) * current));
      setClientCount(Math.floor((300 / steps) * current));
      if (current >= steps) clearInterval(timer);
    }, 2000 / steps);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 md:px-40 bg-white"
      aria-label={t.home.about.title}
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
                {t.home.about.title}
              </h2>

              <div className="space-y-6 leading-relaxed text-[var(--color-charcoal)]">
                <p
                  className={`text-xl font-semibold transition-all duration-500 ease-out delay-[300ms] ${
                    isVisible
                      ? "opacity-90 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  {t.home.about.intro}
                </p>

                <p
                  className={`text-lg transition-all duration-500 ease-out delay-[500ms] ${
                    isVisible
                      ? "opacity-80 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  {t.home.about.description}
                </p>

                <p
                  className={`text-lg transition-all duration-500 ease-out delay-[700ms] ${
                    isVisible
                      ? "opacity-85 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  {t.home.about.registry}
                </p>
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
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                alt={`${t.home.about.title} - Techno Stroy Bulgaria`}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 45vw"
              />

              {/* Stats Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-[var(--color-red)]/90 text-white p-6">
                <div className="flex justify-around items-center">
                  <div
                    className={`text-center transition-all duration-500 ease-out delay-[1000ms] ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-[10px]"
                    }`}
                  >
                    <div className="text-3xl font-bold">{t.home.about.stats.foundedYear}</div>
                    <div className="text-sm opacity-90">{t.home.about.stats.founded}</div>
                  </div>
                  <div className="w-px h-12 bg-white/30" />
                  <div
                    className={`text-center transition-all duration-500 ease-out delay-[1200ms] ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-[10px]"
                    }`}
                  >
                    <div className="text-3xl font-bold">{projectCount}+</div>
                    <div className="text-sm opacity-90">{t.home.about.stats.projects}</div>
                  </div>
                  <div className="w-px h-12 bg-white/30" />
                  <div
                    className={`text-center transition-all duration-500 ease-out delay-[1400ms] ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-[10px]"
                    }`}
                  >
                    <div className="text-3xl font-bold">{clientCount}+</div>
                    <div className="text-sm opacity-90">{t.home.about.stats.clients}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
