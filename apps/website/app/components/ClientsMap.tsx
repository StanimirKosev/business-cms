"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";
import { Project } from "@/lib/mock-data";

// TODO: Replace with database query when admin is ready
// Future: const projects = await prisma.project.findMany();
// Each project will have: title, client, region, coordinateX, coordinateY

// MOCK DATA - Will be replaced with Prisma query
// Example: Sofia region has 10 projects
const MOCK_PROJECTS: Project[] = [
  // София област (10 projects)
  {
    id: "1",
    title: "Административна сграда НЕК",
    client: "Национална електрическа компания ЕАД",
    region: "Sofia",
    x: 230,
    y: 410,
  },
  {
    id: "2",
    title: "Газопровод Булгартрансгаз",
    client: "Булгартрансгаз ЕАД",
    region: "Sofia",
    x: 235,
    y: 405,
  },
  {
    id: "3",
    title: "Правителствена сграда",
    client: "Министерски съвет",
    region: "Sofia",
    x: 225,
    y: 415,
  },
  {
    id: "4",
    title: "Офис МИ",
    client: "Министерство на икономиката",
    region: "Sofia",
    x: 228,
    y: 408,
  },
  {
    id: "5",
    title: "Административна сграда МОН",
    client: "Министерство на образованието",
    region: "Sofia",
    x: 233,
    y: 412,
  },
  {
    id: "6",
    title: "Казарми МО",
    client: "Министерство на отбраната",
    region: "Sofia",
    x: 227,
    y: 407,
  },
  {
    id: "7",
    title: "Сграда МВР",
    client: "Министерство на вътрешните работи",
    region: "Sofia",
    x: 232,
    y: 413,
  },
  {
    id: "8",
    title: "Железопътна инфраструктура",
    client: "ДП НКЖИ",
    region: "Sofia",
    x: 229,
    y: 409,
  },
  {
    id: "9",
    title: "Дипломатически имоти",
    client: "Агенция за дипломатически имоти",
    region: "Sofia",
    x: 226,
    y: 411,
  },
  {
    id: "10",
    title: "ЕСО сграда",
    client: "Електроенергиен системен оператор ЕАД",
    region: "Sofia",
    x: 231,
    y: 414,
  },
  {
    id: "11",
    title: "Болница Д-р Венкова",
    client: 'МБАЛ "Д-р Тота Венкова" АД',
    region: "Sofia",
    x: 234,
    y: 406,
  },

  // Варна област
  {
    id: "12",
    title: "Пристанище Варна",
    client: "Пристанище Варна ЕАД",
    region: "Varna",
    x: 770,
    y: 250,
  },

  // Стара Загора област
  {
    id: "13",
    title: "Мини Марица Изток",
    client: "Мини Марица Изток ЕАД",
    region: "Stara Zagora",
    x: 500,
    y: 420,
  },
  {
    id: "14",
    title: "ТЕЦ Марица",
    client: "ТЕЦ Марица изток 2 ЕАД",
    region: "Stara Zagora",
    x: 505,
    y: 425,
  },

  // All municipalities (one project each for simplicity in mock data)
  {
    id: "15",
    title: "Общински проект",
    client: "Община София",
    region: "Sofia",
    x: 228,
    y: 412,
  },
  {
    id: "16",
    title: "Общински проект",
    client: "Община Златица",
    region: "Sofia",
    x: 380,
    y: 380,
  },
  {
    id: "17",
    title: "Общински проект",
    client: "Община Левски",
    region: "Pleven",
    x: 480,
    y: 220,
  },
  {
    id: "18",
    title: "Общински проект",
    client: "Община Бяла",
    region: "Ruse",
    x: 520,
    y: 250,
  },
  {
    id: "19",
    title: "Общински проект",
    client: "Община Раднево",
    region: "Stara Zagora",
    x: 530,
    y: 450,
  },
  {
    id: "20",
    title: "Общински проект",
    client: "Община Средец",
    region: "Burgas",
    x: 720,
    y: 450,
  },
  {
    id: "21",
    title: "Общински проект",
    client: "Община Никопол",
    region: "Pleven",
    x: 420,
    y: 210,
  },
  {
    id: "22",
    title: "Общински проект",
    client: "Община Бургас",
    region: "Burgas",
    x: 730,
    y: 460,
  },
  {
    id: "23",
    title: "Общински проект",
    client: "Община Хасково",
    region: "Haskovo",
    x: 520,
    y: 530,
  },
  {
    id: "24",
    title: "Общински проект",
    client: "Община Стара Загора",
    region: "Stara Zagora",
    x: 498,
    y: 418,
  },
  {
    id: "25",
    title: "Общински проект",
    client: "Община Трявна",
    region: "Gabrovo",
    x: 520,
    y: 310,
  },
  {
    id: "26",
    title: "Общински проект",
    client: "Община Шумен",
    region: "Shumen",
    x: 730,
    y: 240,
  },
  {
    id: "27",
    title: "Общински проект",
    client: "Община Плевен",
    region: "Pleven",
    x: 450,
    y: 250,
  },
  {
    id: "28",
    title: "Общински проект",
    client: "Община Белово",
    region: "Pazardzhik",
    x: 420,
    y: 450,
  },
  {
    id: "29",
    title: "Общински проект",
    client: "Община Велинград",
    region: "Pazardzhik",
    x: 380,
    y: 480,
  },
  {
    id: "30",
    title: "Общински проект",
    client: "Община Сандански",
    region: "Blagoevgrad",
    x: 270,
    y: 520,
  },
  {
    id: "31",
    title: "Общински проект",
    client: "Община Белоградчик",
    region: "Vidin",
    x: 280,
    y: 190,
  },
  {
    id: "32",
    title: "Общински проект",
    client: "Община Борово",
    region: "Ruse",
    x: 520,
    y: 140,
  },
  {
    id: "33",
    title: "Общински проект",
    client: "Община Дряново",
    region: "Gabrovo",
    x: 500,
    y: 310,
  },
  {
    id: "34",
    title: "Общински проект",
    client: "Община Две Могили",
    region: "Ruse",
    x: 520,
    y: 150,
  },
  {
    id: "35",
    title: "Общински проект",
    client: "Община Баните",
    region: "Smolyan",
    x: 440,
    y: 480,
  },
  {
    id: "36",
    title: "Общински проект",
    client: "Община Русе",
    region: "Ruse",
    x: 620,
    y: 100,
  },
  {
    id: "37",
    title: "Общински проект",
    client: "Община Габрово",
    region: "Gabrovo",
    x: 500,
    y: 330,
  },
  {
    id: "38",
    title: "Общински проект",
    client: "Община Пловдив",
    region: "Plovdiv",
    x: 420,
    y: 430,
  },
  {
    id: "39",
    title: "Общински проект",
    client: "Община Долни чифлик",
    region: "Varna",
    x: 750,
    y: 230,
  },
  {
    id: "40",
    title: "Общински проект",
    client: "Община Смолян",
    region: "Smolyan",
    x: 410,
    y: 540,
  },
  {
    id: "41",
    title: "Общински проект",
    client: "Община Елена",
    region: "Veliko Tarnovo",
    x: 540,
    y: 310,
  },
  {
    id: "42",
    title: "Общински проект",
    client: "Община Роман",
    region: "Vratsa",
    x: 620,
    y: 250,
  },
  {
    id: "43",
    title: "Общински проект",
    client: "Община Сливен",
    region: "Sliven",
    x: 650,
    y: 420,
  },
  {
    id: "44",
    title: "Общински проект",
    client: "Община Струмяни",
    region: "Blagoevgrad",
    x: 250,
    y: 520,
  },
  {
    id: "45",
    title: "Общински проект",
    client: "Община Кнежа",
    region: "Pleven",
    x: 390,
    y: 210,
  },
  {
    id: "46",
    title: "Общински проект",
    client: "Община Ямбол",
    region: "Yambol",
    x: 670,
    y: 450,
  },
  {
    id: "47",
    title: "Общински проект",
    client: "Община Костенец",
    region: "Sofia",
    x: 350,
    y: 410,
  },
  {
    id: "48",
    title: "Общински проект",
    client: "Община Белене",
    region: "Pleven",
    x: 480,
    y: 190,
  },
  {
    id: "49",
    title: "Общински проект",
    client: "Община Твърдица",
    region: "Sliven",
    x: 580,
    y: 450,
  },
];

// Region names mapping (SVG name to Bulgarian name)
const REGION_NAMES: Record<string, string> = {
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

// Group projects by region
const projectsByRegion = MOCK_PROJECTS.reduce(
  (acc, project) => {
    if (!acc[project.region!]) {
      acc[project.region!] = {
        projects: [],
        clients: new Set<string>(),
      };
    }
    acc[project.region!].projects.push(project);
    acc[project.region!].clients.add(project.client!);
    return acc;
  },
  {} as Record<string, { projects: Project[]; clients: Set<string> }>
);

export function ClientsMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.2);

  // TODO: Calculate from database in the future
  const totalRegions = Object.keys(projectsByRegion).length;
  const totalProjects = MOCK_PROJECTS.length;
  const totalClients = new Set(MOCK_PROJECTS.map((p) => p.client)).size;

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
              Нашите клиенти
            </h2>
            <p
              className={`text-base md:text-lg text-[var(--color-charcoal)] opacity-80 leading-relaxed transition-all duration-500 ease-out delay-[600ms] ${
                isVisible
                  ? "opacity-80 translate-x-0"
                  : "opacity-0 -translate-x-[30px]"
              }`}
            >
              Реализирали сме строителни проекти в над {totalRegions} области из
              цялата страна, работейки в партньорство с държавни институции,
              общини и частни инвеститори.
            </p>
            <p
              className={`text-sm md:text-base text-[var(--color-charcoal)] opacity-60 mt-4 transition-all duration-500 ease-out delay-[700ms] ${
                isVisible
                  ? "opacity-60 translate-x-0"
                  : "opacity-0 -translate-x-[30px]"
              }`}
            >
              {totalRegions} области | {totalProjects} проекта | {totalClients}{" "}
              клиента
            </p>
          </div>
        </div>

        {/* Map */}
        <div className="relative w-full max-w-5xl mx-auto">
          <svg viewBox="0 0 1000 651" className="w-full h-auto">
            {/* Base map */}
            <image href="/bg-white.svg" width="1000" height="651" />

            {/* Hoverable regions with red fill overlay */}
            {Object.entries(projectsByRegion).map(([region]) => (
              <use
                key={region}
                href={`/bg-white.svg#${getRegionId(region)}`}
                fill={
                  hoveredRegion === region
                    ? "rgba(204, 0, 0, 0.2)"
                    : "rgba(204, 0, 0, 0.1)"
                }
                className="cursor-pointer transition-all duration-200 pointer-events-auto"
                onMouseEnter={() => setHoveredRegion(region)}
                onMouseLeave={() => setHoveredRegion(null)}
                style={{ mixBlendMode: "multiply" }}
              />
            ))}

            {/* Static project dots (no hover) */}
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
                      Област {REGION_NAMES[hoveredRegion] || hoveredRegion}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {projectsByRegion[hoveredRegion].projects.length}{" "}
                      {projectsByRegion[hoveredRegion].projects.length === 1
                        ? "проект"
                        : "проекта"}
                    </div>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-[var(--color-red)] [&::-webkit-scrollbar-thumb]:rounded-full">
                    {Array.from(projectsByRegion[hoveredRegion].clients).map(
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

// Helper function to get region SVG ID (from bg-white.svg)
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
    "Grad Sofiya": "BG22",
  };
  return idMap[region] || "";
}

// Helper function to position tooltip based on region
function getTooltipX(region: string): number {
  // Approximate center X coordinates for each region
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

function getTooltipY(region: string): number {
  // Approximate center Y coordinates for each region
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
