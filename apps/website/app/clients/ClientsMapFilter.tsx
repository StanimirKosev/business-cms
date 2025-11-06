"use client";

import { useState, useEffect } from "react";
import {
  REGION_NAMES,
  getRegionId,
  getTooltipX,
  getTooltipY,
} from "@/lib/map-data";
import { MousePointerClick } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import type { Prisma } from "@repo/database/client";
import type { ProjectsByRegion } from "@/lib/map-utils";

type ProjectWithClient = Prisma.ProjectGetPayload<{
  include: {
    client: true;
  };
}>;

/**
 * Interactive map component with click-to-filter functionality
 * Used on the dedicated clients page for filtering client list by region
 */
export function ClientsMapFilter({
  projects,
  projectsByRegion,
  selectedRegions,
  onRegionToggle,
}: {
  projects: ProjectWithClient[];
  projectsByRegion: ProjectsByRegion;
  selectedRegions: Set<string>;
  onRegionToggle: (regions: Set<string>) => void;
}) {
  const { locale } = useLanguage();
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [showHelper, setShowHelper] = useState(true);

  const hasSelection = selectedRegions.size > 0;

  // Show/hide helper text based on selection state
  useEffect(() => {
    setShowHelper(!hasSelection);
  }, [hasSelection]);

  // Toggle region selection
  const handleRegionToggle = (region: string) => {
    const newSet = new Set(selectedRegions);
    if (newSet.has(region)) {
      newSet.delete(region);
    } else {
      newSet.add(region);
    }
    onRegionToggle(newSet);
  };

  return (
    <div className="relative">
      {/* Helper text - absolutely positioned in the middle of space above map */}
      {showHelper && (
        <div className="absolute left-0 right-0 top-0 flex items-center justify-center px-4">
          <p className="text-sm text-gray-500 animate-chevron-nudge flex items-center gap-2">
            <MousePointerClick className="w-4 h-4" />
            {locale === "bg"
              ? "Кликнете на област, за да филтрирате клиентите"
              : "Click on a region to filter clients"}
          </p>
        </div>
      )}

      {/* Map - stays in fixed position with extra top padding for helper text on mobile */}
      <div className="relative w-full max-w-5xl mx-auto pb-8 pt-12 md:pt-0">
        <svg viewBox="0 0 1000 651" className="w-full h-auto touch-auto">
          {/* Base map */}
          <image href="/bg-white.svg" width="1000" height="651" />

          {/* Clickable regions with visual feedback */}
          {Object.keys(projectsByRegion).map((region) => {
            const isSelected = selectedRegions.has(region);
            const isHovered = hoveredRegion === region;
            const shouldFade = hasSelection && !isSelected;

            return (
              <use
                key={region}
                href={`/bg-white.svg#${getRegionId(region)}`}
                fill={
                  isSelected
                    ? "rgba(204, 0, 0, 0.3)" // Selected: darker red
                    : isHovered
                      ? "rgba(204, 0, 0, 0.2)" // Hovered: medium red
                      : shouldFade
                        ? "rgba(204, 0, 0, 0.05)" // Faded: very light
                        : "rgba(204, 0, 0, 0.1)" // Default: light red
                }
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredRegion(region)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={() => handleRegionToggle(region)}
                style={{
                  mixBlendMode: "multiply",
                  opacity: shouldFade ? 0.5 : 1,
                }}
              />
            );
          })}

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

          {/* Hover tooltip */}
          {hoveredRegion && projectsByRegion[hoveredRegion] && (
            <foreignObject
              x={getTooltipX(hoveredRegion)}
              y={getTooltipY(hoveredRegion)}
              width="220"
              height="auto"
              className="pointer-events-none"
              style={{ overflow: "visible" }}
            >
              <div className="bg-white shadow-lg rounded-lg px-4 py-3 border-l-2 border-[var(--color-red)]">
                <div className="font-bold text-base text-[var(--color-charcoal)]">
                  {locale === "bg" ? "Област" : "Region"}{" "}
                  {locale === "bg"
                    ? REGION_NAMES[hoveredRegion] || hoveredRegion
                    : hoveredRegion}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {projectsByRegion[hoveredRegion].projects.length}{" "}
                  {projectsByRegion[hoveredRegion].projects.length === 1
                    ? locale === "bg"
                      ? "проект"
                      : "project"
                    : locale === "bg"
                      ? "проекта"
                      : "projects"}
                  {" · "}
                  {
                    projectsByRegion[hoveredRegion].clientNames[locale].size
                  }{" "}
                  {projectsByRegion[hoveredRegion].clientNames[locale].size ===
                  1
                    ? locale === "bg"
                      ? "клиент"
                      : "client"
                    : locale === "bg"
                      ? "клиента"
                      : "clients"}
                </div>
                <div className="text-xs text-[var(--color-red)] mt-2 font-medium">
                  {selectedRegions.has(hoveredRegion)
                    ? locale === "bg"
                      ? "Кликнете за премахване"
                      : "Click to remove"
                    : locale === "bg"
                      ? "Кликнете за филтриране"
                      : "Click to filter"}
                </div>
              </div>
            </foreignObject>
          )}
        </svg>
        {/* Filter controls - positioned below map, scaled for mobile */}
        {hasSelection && (
          <div className="absolute -bottom-13 left-0 right-0 flex flex-col items-center gap-2 md:gap-2 scale-75 md:scale-100 origin-top">
            <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center max-w-full px-2">
              {Array.from(selectedRegions).map((region) => (
                <button
                  key={region}
                  onClick={() => handleRegionToggle(region)}
                  className="inline-flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-[var(--color-red)] text-white rounded-full text-xs md:text-sm font-medium hover:bg-red-700 transition-colors cursor-pointer"
                >
                  <span className="whitespace-nowrap">
                    {locale === "bg" ? "Обл." : "Reg."}{" "}
                    {locale === "bg" ? REGION_NAMES[region] || region : region}
                  </span>
                  <span className="text-xs">✕</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => onRegionToggle(new Set())}
              className="text-xs md:text-sm text-[var(--color-red)] hover:underline font-medium cursor-pointer"
            >
              {locale === "bg" ? "Изчисти всички филтри" : "Clear all filters"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
