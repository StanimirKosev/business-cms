"use client";

import { useState, useEffect } from "react";
import {
  MOCK_PROJECTS,
  projectsByRegion,
  REGION_NAMES,
  getRegionId,
  getTooltipX,
  getTooltipY,
} from "@/lib/map-data";
import { MousePointerClick } from "lucide-react";

/**
 * Interactive map component with click-to-filter functionality
 * Used on the dedicated clients page for filtering client list by region
 */
export function ClientsMapFilter({
  selectedRegions,
  onRegionToggle,
}: {
  selectedRegions: Set<string>;
  onRegionToggle: (regions: Set<string>) => void;
}) {
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
        <div className="absolute left-0 right-0 flex items-center justify-center">
          <p className="text-sm text-gray-500 animate-chevron-nudge flex items-center gap-2">
            <MousePointerClick className="w-4 h-4" />
            Кликнете на област, за да филтрирате клиентите
          </p>
        </div>
      )}

      {/* Map - stays in fixed position with mt-12 from section top */}
      <div className="relative w-full max-w-5xl mx-auto pb-8">
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
          {MOCK_PROJECTS.map((project) => (
            <circle
              key={project.id}
              cx={project.x}
              cy={project.y}
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
                  Област {REGION_NAMES[hoveredRegion] || hoveredRegion}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {projectsByRegion[hoveredRegion].projects.length}{" "}
                  {projectsByRegion[hoveredRegion].projects.length === 1
                    ? "проект"
                    : "проекта"}
                  {" · "}
                  {projectsByRegion[hoveredRegion].clients.size}{" "}
                  {projectsByRegion[hoveredRegion].clients.size === 1
                    ? "клиент"
                    : "клиента"}
                </div>
                <div className="text-xs text-[var(--color-red)] mt-2 font-medium">
                  {selectedRegions.has(hoveredRegion)
                    ? "Кликнете за премахване"
                    : "Кликнете за филтриране"}
                </div>
              </div>
            </foreignObject>
          )}
        </svg>
        {/* Filter controls - positioned below map in reserved space */}
        {hasSelection && (
          <div className="absolute -bottom-13 left-0 right-0 flex flex-col items-center gap-2">
            <div className="flex flex-wrap gap-2 justify-center">
              {Array.from(selectedRegions).map((region) => (
                <button
                  key={region}
                  onClick={() => handleRegionToggle(region)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-red)] text-white rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  <span>Област {REGION_NAMES[region] || region}</span>
                  <span className="text-xs">✕</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => onRegionToggle(new Set())}
              className="text-sm text-[var(--color-red)] hover:underline font-medium"
            >
              Изчисти всички филтри
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
