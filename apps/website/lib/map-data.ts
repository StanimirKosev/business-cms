/**
 * GPS to SVG Coordinate Conversion with Iterative Calibration
 *
 * OVERVIEW:
 * Converts Google Maps GPS coordinates (latitude, longitude) to SVG map coordinates (mapX, mapY)
 * for the Bulgarian map (SVG viewBox: 1000 x 651).
 *
 * ALGORITHM:
 * Uses Inverse Distance Weighting (IDW) interpolation with multiple calibration points.
 * - Weight for each point = 1 / (distance²) where distance = sqrt((lat1-lat2)² + (lng1-lng2)²)
 * - Final coordinates = weighted average of all calibration points
 * - Points exactly on a calibration point return exact SVG coordinates (weight = 1e10)
 *
 * CALIBRATION PROCESS (How to improve accuracy):
 * 1. User adds a project with GPS coordinates from Google Maps
 * 2. Function calculates SVG position using current calibration points
 * 3. User visually checks if the red dot appears in correct location on map
 * 4. If incorrect, user provides the correct SVG coordinates (by inspecting map)
 * 5. Add/update calibration point in the array below
 *
 * EXAMPLE - Adding a new calibration point:
 * User says: "GPS 42.6556, 23.2709 maps to (265, 400) but should be (180, 350)"
 *
 * Action: Update or add entry:
 * { name: "Location Name", gps: { lat: 42.6556, lng: 23.2709 }, svg: { x: 180, y: 350 } }
 *
 * CONTINUOUS IMPROVEMENT:
 * - Started with 4 regional points, now has 29 calibration points
 * - Each verified project location improves accuracy for nearby areas
 * - The more calibration points, the better the interpolation accuracy
 * - Geographic coverage: North (Byala, Levski), South (pending), East (Burgas),
 *   West (Sofia), Center (Gabrovo) - well distributed
 *
 * VERIFIED CALIBRATION POINTS (user-confirmed accurate):
 * - Burgas (42.4961, 27.4714) → (791, 379)
 * - Grad Sofiya (42.6556, 23.2709) → (180, 350)
 * - Byala near Ruse (43.5112, 25.7108) → (535, 180)
 * - Gabrovo (42.8887, 25.3159) → (480, 300)
 * - Levski near Pleven (43.3701, 25.1394) → (450, 200)
 *
 * FUTURE IMPROVEMENTS:
 * As more projects are added, especially in southern Bulgaria (Plovdiv, Kardzhali,
 * Smolyan areas), add calibration points there to improve accuracy in those regions.
 */
export function gpsToSvgCoordinates(
  lat: number,
  lng: number
): { mapX: number; mapY: number } {
  // All Bulgarian region calibration points with GPS coordinates and SVG positions
  // Additional project-specific points added for higher accuracy
  const calibrationPoints = [
    { name: "Blagoevgrad", gps: { lat: 42.0116, lng: 23.0941 }, svg: { x: 250, y: 520 } },
    { name: "Burgas", gps: { lat: 42.4961, lng: 27.4714 }, svg: { x: 791, y: 379 } },
    { name: "Byala (near Ruse)", gps: { lat: 43.5112, lng: 25.7108 }, svg: { x: 535, y: 180 } },
    { name: "Dobrich", gps: { lat: 43.5667, lng: 27.8272 }, svg: { x: 800, y: 140 } },
    { name: "Gabrovo", gps: { lat: 42.8887, lng: 25.3159 }, svg: { x: 480, y: 300 } },
    { name: "Haskovo", gps: { lat: 41.9344, lng: 25.5557 }, svg: { x: 520, y: 530 } },
    { name: "Kardzhali", gps: { lat: 41.6486, lng: 25.3781 }, svg: { x: 500, y: 500 } },
    { name: "Kyustendil", gps: { lat: 42.2858, lng: 22.6897 }, svg: { x: 180, y: 410 } },
    { name: "Levski (near Pleven)", gps: { lat: 43.3701, lng: 25.1394 }, svg: { x: 450, y: 200 } },
    { name: "Lovech", gps: { lat: 43.1363, lng: 24.7141 }, svg: { x: 380, y: 270 } },
    { name: "Montana", gps: { lat: 43.4092, lng: 23.2254 }, svg: { x: 200, y: 180 } },
    { name: "Pazardzhik", gps: { lat: 42.1887, lng: 24.3332 }, svg: { x: 350, y: 470 } },
    { name: "Pernik", gps: { lat: 42.6054, lng: 23.0336 }, svg: { x: 220, y: 380 } },
    { name: "Pleven", gps: { lat: 43.4170, lng: 24.6167 }, svg: { x: 450, y: 250 } },
    { name: "Plovdiv", gps: { lat: 42.1354, lng: 24.7453 }, svg: { x: 420, y: 430 } },
    { name: "Razgrad", gps: { lat: 43.5258, lng: 26.5236 }, svg: { x: 680, y: 160 } },
    { name: "Ruse", gps: { lat: 43.8564, lng: 25.9656 }, svg: { x: 620, y: 100 } },
    { name: "Shumen", gps: { lat: 43.2706, lng: 26.9225 }, svg: { x: 730, y: 240 } },
    { name: "Silistra", gps: { lat: 44.1167, lng: 27.2606 }, svg: { x: 820, y: 80 } },
    { name: "Sliven", gps: { lat: 42.6824, lng: 26.3228 }, svg: { x: 650, y: 420 } },
    { name: "Smolyan", gps: { lat: 41.5771, lng: 24.7014 }, svg: { x: 410, y: 540 } },
    { name: "Sofia", gps: { lat: 42.6977, lng: 23.3219 }, svg: { x: 300, y: 410 } },
    { name: "Grad Sofiya", gps: { lat: 42.6556, lng: 23.2709 }, svg: { x: 180, y: 350 } },
    { name: "Stara Zagora", gps: { lat: 42.4258, lng: 25.6342 }, svg: { x: 500, y: 420 } },
    { name: "Targovishte", gps: { lat: 43.2503, lng: 26.5722 }, svg: { x: 700, y: 200 } },
    { name: "Varna", gps: { lat: 43.2141, lng: 27.9147 }, svg: { x: 770, y: 250 } },
    { name: "Veliko Tarnovo", gps: { lat: 43.0757, lng: 25.6172 }, svg: { x: 520, y: 180 } },
    { name: "Vidin", gps: { lat: 43.9859, lng: 22.8578 }, svg: { x: 150, y: 140 } },
    { name: "Vratsa", gps: { lat: 43.2100, lng: 23.5628 }, svg: { x: 300, y: 240 } },
    { name: "Yambol", gps: { lat: 42.4841, lng: 26.5106 }, svg: { x: 670, y: 450 } },
  ];

  // Calculate distance-based weights for each calibration point
  const weights = calibrationPoints.map((point) => {
    const latDiff = lat - point.gps.lat;
    const lngDiff = lng - point.gps.lng;
    const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
    // Inverse distance weighting (closer points have more influence)
    // If exactly on a calibration point, return that point's coordinates
    return distance === 0 ? 1e10 : 1 / (distance * distance);
  });

  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  // Weighted average of all calibration points
  let mapX = 0;
  let mapY = 0;

  calibrationPoints.forEach((point, i) => {
    const normalizedWeight = weights[i] / totalWeight;
    mapX += point.svg.x * normalizedWeight;
    mapY += point.svg.y * normalizedWeight;
  });

  return {
    mapX: Math.round(mapX),
    mapY: Math.round(mapY),
  };
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
