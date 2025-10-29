"use client";

import { useState, useMemo } from "react";
import type { Client } from "@repo/database/client";
import { useLanguage } from "@/app/context/LanguageContext";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";
import Image from "next/image";
import { ClientsMapFilter } from "./ClientsMapFilter";
import { projectsByRegion } from "@/lib/map-data";
import { CLOUDINARY_BASE_URL } from "@/lib/cloudinary";

type ClientWithCount = Client & {
  _count: {
    projects: number;
  };
};

interface ClientsPageClientProps {
  clients: ClientWithCount[];
}

export default function ClientsPageClient({ clients }: ClientsPageClientProps) {
  const { t, locale } = useLanguage();
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.5);
  const [selectedRegions, setSelectedRegions] = useState<Set<string>>(
    new Set()
  );

  // Filter and sort clients based on selected regions
  const sortedClients = useMemo(() => {
    let filtered = clients;

    if (selectedRegions.size > 0) {
      const clientsInRegions = new Set<string>();
      selectedRegions.forEach((region) => {
        projectsByRegion[region]?.clients.forEach((clientName) => {
          clientsInRegions.add(clientName);
        });
      });
      filtered = clients.filter((client) =>
        clientsInRegions.has(client.nameBg)
      );
    }

    // Sort by Bulgarian name
    return [...filtered].sort((a, b) => a.nameBg.localeCompare(b.nameBg, "bg"));
  }, [clients, selectedRegions]);

  return (
    <main className="bg-[var(--color-bg)]">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 md:pt-40 md:pb-20 px-6 md:px-40 bg-white"
        aria-label={t.clients.hero.title}
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
                {t.clients.hero.title}
              </h1>

              <div className="space-y-6 leading-relaxed text-[var(--color-charcoal)]">
                <p
                  className={`text-xl font-semibold transition-all duration-500 ease-out delay-[300ms] ${
                    heroVisible
                      ? "opacity-90 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  {t.clients.hero.intro}
                </p>

                <p
                  className={`text-lg transition-all duration-500 ease-out delay-[500ms] ${
                    heroVisible
                      ? "opacity-80 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  {t.clients.hero.paragraph1}
                </p>

                <p
                  className={`text-lg transition-all duration-500 ease-out delay-[700ms] ${
                    heroVisible
                      ? "opacity-80 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  {t.clients.hero.paragraph2}
                </p>

                <p
                  className={`text-lg transition-all duration-500 ease-out delay-[900ms] ${
                    heroVisible
                      ? "opacity-80 translate-y-0"
                      : "opacity-0 translate-y-[20px]"
                  }`}
                >
                  {t.clients.hero.paragraph3}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map with Filtering */}
      <section className="pt-8 pb-20 px-6 md:px-40 bg-[var(--color-concrete-grey-light)]">
        <div className="max-w-7xl mx-auto">
          <ClientsMapFilter
            selectedRegions={selectedRegions}
            onRegionToggle={setSelectedRegions}
          />
        </div>
      </section>

      {/* Clients List Section */}
      <section className="py-20 px-6 md:px-40 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-charcoal)]">
              {sortedClients.length === clients.length
                ? `Всички клиенти (${sortedClients.length})`
                : `${sortedClients.length} ${sortedClients.length === 1 ? "клиент" : "клиента"}`}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedClients.map((client) => {
              const clientName =
                locale === "bg" ? client.nameBg : client.nameEn;
              const projectCount = client._count.projects;
              const hasWebsite = client.website && client.website.trim() !== "";
              const logoUrl = client.logoUrl
                ? `${CLOUDINARY_BASE_URL}/${client.logoUrl}`
                : null;

              return (
                <div key={client.id} className="flex items-center gap-4">
                  {logoUrl ? (
                    hasWebsite ? (
                      <a
                        href={client.website!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 w-32 h-32 flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-transparent rounded p-3 transition-colors duration-300"
                      >
                        <Image
                          src={logoUrl}
                          alt={clientName}
                          width={172}
                          height={200}
                          unoptimized
                          className="w-full h-full object-contain invert grayscale brightness-150 opacity-70"
                        />
                      </a>
                    ) : (
                      <div className="flex-shrink-0 w-32 h-32 flex items-center justify-center bg-gray-100 rounded p-3">
                        <Image
                          src={logoUrl}
                          alt={clientName}
                          width={172}
                          height={200}
                          unoptimized
                          className="w-full h-full object-contain invert grayscale brightness-150 opacity-70"
                        />
                      </div>
                    )
                  ) : (
                    <div className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--color-charcoal)] text-base leading-tight mb-1.5">
                      {clientName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {projectCount}{" "}
                      {projectCount === 1
                        ? t.clients.projectSingular
                        : t.clients.projectPlural}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
