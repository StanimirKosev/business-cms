"use client";

interface ProjectCoordinatePickerProps {
  mapX: number | undefined;
  mapY: number | undefined;
  region: string;
  onCoordinatesChange: (x: number, y: number) => void;
}

/**
 * Interactive map component for selecting project coordinates
 * Click anywhere on the map to place a red dot at exact coordinates
 * Region is colored based on the selected region value
 */
export function ProjectCoordinatePicker({
  mapX,
  mapY,
  region,
  onCoordinatesChange,
}: ProjectCoordinatePickerProps) {
  const handleMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();

    // Get click position relative to viewport
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Convert to SVG coordinates (viewBox is 0 0 1000 651)
    const svgX = (clickX / rect.width) * 1000;
    const svgY = (clickY / rect.height) * 651;

    // Round to integers
    const finalX = Math.round(svgX);
    const finalY = Math.round(svgY);

    onCoordinatesChange(finalX, finalY);
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-semibold text-gray-700">
          Място на картата
        </label>
        <p className="text-xs text-gray-500 mt-1">
          Кликнете на картата, за да поставите червена маркер на точната позиция
        </p>
      </div>

      {/* Map Container */}
      <div className="relative w-full max-w-2xl mx-auto bg-gray-50 rounded-lg overflow-hidden border border-gray-300">
        <svg
          viewBox="0 0 1000 651"
          className="w-full h-auto cursor-crosshair bg-white"
          onClick={handleMapClick}
        >
          {/* Base map */}
          <image href="/bg-white.svg" width="1000" height="651" />

          {/* Region overlay - colored only if region is selected */}
          {region && region.trim() !== "" && (
            <use
              href={`/bg-white.svg#${getRegionId(region)}`}
              fill="rgba(220, 38, 38, 0.15)"
              className="pointer-events-none"
              style={{ mixBlendMode: "multiply" }}
            />
          )}

          {/* Current marker position - red dot */}
          {mapX !== undefined && mapY !== undefined && (
            <>
              {/* Outer ring */}
              <circle
                cx={mapX}
                cy={mapY}
                r="8"
                fill="none"
                stroke="#CC0000"
                strokeWidth="2"
                className="pointer-events-none"
              />
              {/* Inner filled dot */}
              <circle
                cx={mapX}
                cy={mapY}
                r="4"
                fill="#CC0000"
                className="pointer-events-none"
                style={{
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                }}
              />
            </>
          )}

          {/* Help text when no coordinates selected */}
          {(mapX === undefined || mapY === undefined) && (
            <text
              x="500"
              y="325"
              textAnchor="middle"
              fontSize="16"
              fill="#999"
              pointerEvents="none"
              opacity="0.5"
            >
              Кликнете, за да поставите маркер
            </text>
          )}
        </svg>
      </div>

      {/* Current Coordinates Display */}
      {mapX !== undefined && mapY !== undefined && (
        <div className="flex gap-3">
          <div className="flex-1 bg-red-50 p-3 rounded-md border border-red-200">
            <p className="text-xs text-gray-600 font-semibold">Координат X</p>
            <p className="text-lg font-bold text-red-600">{mapX}</p>
          </div>
          <div className="flex-1 bg-red-50 p-3 rounded-md border border-red-200">
            <p className="text-xs text-gray-600 font-semibold">Координат Y</p>
            <p className="text-lg font-bold text-red-600">{mapY}</p>
          </div>
          <button
            type="button"
            onClick={() => onCoordinatesChange(0, 0)}
            className="px-3 py-2 text-sm text-red-600 hover:text-red-700 border border-red-200 hover:bg-red-50 rounded-md transition-colors self-end"
          >
            Изчисти
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Helper function to get region SVG ID
 * Copied from @/lib/map-data to avoid circular imports
 */
function getRegionId(region: string): string {
  const idMap: Record<string, string> = {
    Sofia: "BG23",
    Plovdiv: "BG16",
    Varna: "BG03",
    Burgas: "BG02",
    Ruse: "BG18",
    "Stara Zagora": "BG24",
    Pleven: "BG15",
    Sliven: "BG20",
    Shumen: "BG27",
    Haskovo: "BG26",
    Yambol: "BG28",
    Gabrovo: "BG07",
    Smolyan: "BG21",
    Pernik: "BG14",
    Vidin: "BG05",
    Montana: "BG12",
    Kyustendil: "BG10",
    Blagoevgrad: "BG01",
    Silistra: "BG19",
    Dobrich: "BG08",
    Vratsa: "BG06",
    "Veliko Tarnovo": "BG04",
    Kardzhali: "BG09",
    Pazardzhik: "BG13",
    Lovech: "BG11",
    Razgrad: "BG17",
    Targovishte: "BG25",
    "Sofia-City": "BG22",
  };
  return idMap[region] || "";
}
