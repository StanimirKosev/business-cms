/**
 * Converts Google Maps GPS coordinates (latitude, longitude) to SVG map coordinates (mapX, mapY)
 *
 * Calibrated using reference point:
 * GPS: lat=42.49610279129718, lng=27.471405457632592
 * SVG: mapX=791, mapY=379
 *
 * Bulgaria geographic bounds used for projection:
 * - North: 44.22° N, South: 41.24° N
 * - West: 22.36° E, East: 28.61° E
 *
 * SVG viewBox: 1000 x 651
 */
export function gpsToSvgCoordinates(
  lat: number,
  lng: number
): { mapX: number; mapY: number } {
  // Bulgaria's geographic bounds (adjusted for accurate projection)
  const bounds = {
    north: 44.22,
    south: 41.24,
    west: 22.36,
    east: 28.61,
  };

  // SVG viewBox dimensions
  const svgWidth = 1000;
  const svgHeight = 651;

  // Calculate normalized position (0 to 1)
  const normalizedX = (lng - bounds.west) / (bounds.east - bounds.west);
  const normalizedY = (bounds.north - lat) / (bounds.north - bounds.south); // Inverted for SVG coordinates

  // Apply calibration correction based on reference point
  // Reference: GPS(42.49610279, 27.471405457632592) should map to SVG(791, 379)
  const refLat = 42.49610279129718;
  const refLng = 27.471405457632592;
  const refMapX = 791;
  const refMapY = 379;

  // Calculate what the reference point would map to with current bounds
  const refNormalizedX = (refLng - bounds.west) / (bounds.east - bounds.west);
  const refNormalizedY =
    (bounds.north - refLat) / (bounds.north - bounds.south);
  const calculatedRefX = refNormalizedX * svgWidth;
  const calculatedRefY = refNormalizedY * svgHeight;

  // Calculate correction offsets
  const offsetX = refMapX - calculatedRefX;
  const offsetY = refMapY - calculatedRefY;

  // Apply transformation with correction
  const mapX = Math.round(normalizedX * svgWidth + offsetX);
  const mapY = Math.round(normalizedY * svgHeight + offsetY);

  return { mapX, mapY };
}

// Region names mapping (SVG name to Bulgarian name)
export const REGION_NAMES: Record<string, string> = {
  Sofia: "София",
  Plovdiv: "Пловдив",
  Varna: "Варна",
  Burgas: "Бургас",
  Ruse: "Русе",
  "Stara Zagora": "Стара Загора",
  Pleven: "Плевен",
  Sliven: "Сливен",
  Shumen: "Шумен",
  Haskovo: "Хасково",
  Yambol: "Ямбол",
  Gabrovo: "Габрово",
  Smolyan: "Смолян",
  Pernik: "Перник",
  Vidin: "Видин",
  Montana: "Монтана",
  Kyustendil: "Кюстендил",
  Blagoevgrad: "Благоевград",
  Silistra: "Силистра",
  Dobrich: "Добрич",
  Vratsa: "Враца",
  "Veliko Tarnovo": "Велико Търново",
  Kardzhali: "Кърджали",
  Pazardzhik: "Пазарджик",
  Lovech: "Ловеч",
  Razgrad: "Разград",
  Targovishte: "Търговище",
  "Grad Sofiya": "Град София",
};

// Helper function to get region SVG ID (from bg-white.svg)
export function getRegionId(region: string): string {
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
    "Grad Sofiya": "BG22",
  };
  return idMap[region] || "";
}

// Helper function to position tooltip based on region (X coordinate)
export function getTooltipX(region: string): number {
  const centerX: Record<string, number> = {
    Sofia: 300,
    Plovdiv: 420,
    Varna: 770,
    Burgas: 730,
    Ruse: 620,
    "Stara Zagora": 500,
    Pleven: 450,
    Sliven: 650,
    Shumen: 730,
    Haskovo: 520,
    Yambol: 670,
    Gabrovo: 500,
    Smolyan: 410,
    Pernik: 220,
    Vidin: 150,
    Montana: 200,
    Kyustendil: 180,
    Blagoevgrad: 250,
    Silistra: 820,
    Dobrich: 800,
    Vratsa: 300,
    "Veliko Tarnovo": 520,
    Kardzhali: 500,
    Pazardzhik: 350,
    Lovech: 380,
    Razgrad: 680,
    Targovishte: 700,
    "Grad Sofiya": 230,
  };
  const x = centerX[region] || 500;
  return x > 500 ? x - 270 : x + 15;
}

// Helper function to position tooltip based on region (Y coordinate)
export function getTooltipY(region: string): number {
  const centerY: Record<string, number> = {
    Sofia: 410,
    Plovdiv: 430,
    Varna: 250,
    Burgas: 460,
    Ruse: 100,
    "Stara Zagora": 420,
    Pleven: 250,
    Sliven: 420,
    Shumen: 240,
    Haskovo: 530,
    Yambol: 450,
    Gabrovo: 330,
    Smolyan: 540,
    Pernik: 380,
    Vidin: 140,
    Montana: 180,
    Kyustendil: 410,
    Blagoevgrad: 520,
    Silistra: 80,
    Dobrich: 140,
    Vratsa: 240,
    "Veliko Tarnovo": 180,
    Kardzhali: 500,
    Pazardzhik: 470,
    Lovech: 270,
    Razgrad: 160,
    Targovishte: 200,
    "Grad Sofiya": 410,
  };
  return (centerY[region] || 325) - 100;
}
