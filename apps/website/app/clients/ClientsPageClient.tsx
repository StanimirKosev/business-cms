"use client";

import { useState, useMemo } from "react";
import type { Client, Prisma } from "@repo/database/client";
import { useLanguage } from "@/app/context/LanguageContext";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";
import Image from "next/image";
import { ClientsMapFilter } from "./ClientsMapFilter";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { computeProjectsByRegion } from "@/lib/map-utils";
import { Briefcase } from "lucide-react";

type ProjectWithClient = Prisma.ProjectGetPayload<{
  include: {
    client: true;
  };
}>;

interface ClientsPageClientProps {
  clients: Client[];
  projects: ProjectWithClient[];
}

export default function ClientsPageClient({
  clients,
  projects,
}: ClientsPageClientProps) {
  const { t, locale } = useLanguage();
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.5);
  const [selectedRegions, setSelectedRegions] = useState<Set<string>>(
    new Set()
  );

  // Compute projectsByRegion - now supports both locales
  const projectsByRegion = computeProjectsByRegion(projects);

  const sortedClients = useMemo(() => {
    let filtered = clients;

    if (selectedRegions.size > 0) {
      const clientsInRegions = new Set<string>();
      const clientNameField = locale === "bg" ? "nameBg" : "nameEn";

      selectedRegions.forEach((region) => {
        projectsByRegion[region]?.clientNames[locale].forEach((clientName) => {
          clientsInRegions.add(clientName);
        });
      });

      filtered = clients.filter((client) =>
        clientsInRegions.has(client[clientNameField])
      );
    }

    // Sort by current locale
    const sortField = locale === "bg" ? "nameBg" : "nameEn";
    return [...filtered].sort((a, b) =>
      a[sortField].localeCompare(b[sortField], locale)
    );
  }, [clients, selectedRegions, projectsByRegion, locale]);

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
            projects={projects}
            projectsByRegion={projectsByRegion}
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
                ? locale === "bg"
                  ? `Всички клиенти (${sortedClients.length})`
                  : `All Clients (${sortedClients.length})`
                : `${sortedClients.length} ${
                    sortedClients.length === 1
                      ? locale === "bg"
                        ? "клиент"
                        : "client"
                      : locale === "bg"
                        ? "клиента"
                        : "clients"
                  }`}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedClients.map((client) => {
              const clientName =
                locale === "bg" ? client.nameBg : client.nameEn;
              const logoUrl = getCloudinaryUrl(client.logoUrl);
              // Note: Client website links disabled per client request (DB field retained)

              return (
                <div key={client.id} className="flex items-center gap-4 group">
                  {logoUrl ? (
                    <div className="flex-shrink-0 w-32 h-32 flex items-center justify-center rounded p-3">
                      <Image
                        src={logoUrl}
                        alt={clientName}
                        width={172}
                        height={200}
                        unoptimized
                        className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-32 h-32 flex items-center justify-center rounded p-3">
                      {/* Special case: Private Investors client gets Briefcase icon with hover effect */}
                      {client.id === "cmhaou0sk001dgzdshhbtc1e2" ? (
                        <Briefcase className="w-16 h-16 text-gray-500 group-hover:text-gray-900 transition-all duration-300 opacity-60 group-hover:opacity-100" />
                      ) : null}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--color-charcoal)] text-base leading-tight mb-1.5">
                      {clientName}
                    </h3>
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
