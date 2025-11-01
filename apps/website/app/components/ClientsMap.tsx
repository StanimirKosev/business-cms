"use client";

import { useState, useMemo } from "react";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";
import { useLanguage } from "@/app/context/LanguageContext";
import {
  REGION_NAMES,
  getRegionId,
  getTooltipX,
  getTooltipY,
} from "@/lib/map-data";
import { computeProjectsByRegion } from "@/lib/map-utils";
import type { Prisma } from "@prisma/client";

type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: {
    category: true;
    client: true;
  };
}>;

interface ClientsMapProps {
  projects: ProjectWithRelations[];
}

/**
 * Homepage map component with hover tooltips
 * Shows project distribution across Bulgaria with passive discovery
 */
export function ClientsMap({ projects }: ClientsMapProps) {
  const { t, locale } = useLanguage();
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.2);

  // Compute map data from database projects using shared utility
  const { projectsByRegion, mapStats } = useMemo(() => {
    const byRegion = computeProjectsByRegion(projects);

    const clientNameField = locale === "bg" ? "nameBg" : "nameEn";
    const stats = {
      totalRegions: Object.keys(byRegion).length,
      totalProjects: projects.length,
      totalClients: new Set(projects.map((p) => p.client[clientNameField])).size,
    };

    return { projectsByRegion: byRegion, mapStats: stats };
  }, [projects, locale]);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 md:px-40 bg-[var(--color-concrete-grey-light)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with red line */}
        <div className="flex gap-6 mb-12">
          {/* Red Accent Line - Hidden on mobile */}
          <div
            className={`hidden md:block w-1 bg-[var(--color-red)] transition-all duration-[400ms] ease-out ${
              isVisible ? "h-16" : "h-0"
            }`}
          />

          <div className="flex-1">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 text-[var(--color-charcoal)] transition-all duration-500 ease-out delay-[500ms] ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-[30px]"
              }`}
            >
              {t.home.clients.map.title}
            </h2>
            <p
              className={`text-base md:text-lg text-[var(--color-charcoal)] leading-relaxed transition-all duration-500 ease-out delay-[600ms] ${
                isVisible
                  ? "opacity-80 translate-y-0"
                  : "opacity-0 translate-y-[20px]"
              }`}
            >
              {t.home.clients.map.description.replace(
                "{count}",
                mapStats.totalRegions.toString()
              )}
            </p>
            <p
              className={`text-sm md:text-base text-[var(--color-charcoal)] mt-4 transition-all duration-500 ease-out delay-[700ms] ${
                isVisible
                  ? "opacity-60 translate-y-0"
                  : "opacity-0 translate-y-[20px]"
              }`}
            >
              {mapStats.totalRegions} {t.home.clients.map.stats.regions} |{" "}
              {mapStats.totalProjects} {t.home.clients.map.stats.projects} |{" "}
              {mapStats.totalClients} {t.home.clients.map.stats.clients}
            </p>
          </div>
        </div>

        {/* Map */}
        <div className="relative w-full max-w-5xl mx-auto">
          <svg viewBox="0 0 1000 651" className="w-full h-auto touch-auto">
            {/* Base map */}
            <image href="/bg-white.svg" width="1000" height="651" />

            {/* Hoverable regions with red fill overlay */}
            {Object.keys(projectsByRegion).map((region) => (
              <use
                key={region}
                href={`/bg-white.svg#${getRegionId(region)}`}
                fill={
                  hoveredRegion === region
                    ? "rgba(204, 0, 0, 0.2)"
                    : "rgba(204, 0, 0, 0.1)"
                }
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredRegion(region)}
                onMouseLeave={() => setHoveredRegion(null)}
                style={{ mixBlendMode: "multiply" }}
              />
            ))}

            {/* Static project dots */}
            {projects.map((project) => (
              <circle
                key={project.id}
                cx={project.mapX}
                cy={project.mapY}
                r="3"
                fill="#CC0000"
                className="pointer-events-none"
                style={{
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
                }}
              />
            ))}

            {/* Tooltip */}
            {hoveredRegion && projectsByRegion[hoveredRegion] && (
              <foreignObject
                x={getTooltipX(hoveredRegion)}
                y={getTooltipY(hoveredRegion)}
                width="260"
                height="auto"
                className="pointer-events-auto"
                style={{ overflow: "visible", zIndex: 9999 }}
              >
                <div
                  className="bg-white shadow-lg rounded-lg p-5 border-l-2 border-[var(--color-red)] max-w-xs"
                  onMouseEnter={() => setHoveredRegion(hoveredRegion)}
                  onMouseLeave={() => setHoveredRegion(null)}
                >
                  <div className="mb-3 pb-3 border-b border-gray-100">
                    <div className="font-bold text-lg text-[var(--color-charcoal)]">
                      {locale === "bg" ? "Област" : "Region"}{" "}
                      {locale === "bg"
                        ? REGION_NAMES[hoveredRegion] || hoveredRegion
                        : hoveredRegion}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {projectsByRegion[hoveredRegion].projects.length}{" "}
                      {projectsByRegion[hoveredRegion].projects.length === 1
                        ? "проект"
                        : "проекта"}
                      {" · "}
                      {projectsByRegion[hoveredRegion].clientNames[locale].size}{" "}
                      {projectsByRegion[hoveredRegion].clientNames[locale].size === 1
                        ? "клиент"
                        : "клиента"}
                    </div>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-[var(--color-red)] [&::-webkit-scrollbar-thumb]:rounded-full">
                    {Array.from(projectsByRegion[hoveredRegion].clientNames[locale]).map(
                      (client, idx) => (
                        <div
                          key={idx}
                          className="text-sm text-gray-700 leading-relaxed pl-3 border-l-2 border-transparent hover:border-gray-300 transition-colors"
                        >
                          {client}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </foreignObject>
            )}
          </svg>
        </div>
      </div>
    </section>
  );
}
