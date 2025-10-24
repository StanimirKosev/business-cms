// Mock data for construction projects
// Categories based on Bulgarian construction services (Дейности)

export type ProjectCategory =
  | "Стоманобетонни и метални конструкции"
  | "Саниране и рехабилитация"
  | "Инженерно-укрепителни и хидросъоръжения"
  | "Инсталации – Ел, ВиК, ОВК"
  | "Пътно строителство и инфраструктура";

export interface Project {
  id?: number | string;
  title?: string;
  category?: string;
  location?: string;
  description?: string;
  image?: string;
  year?: number;
  slug?: string;
  client?: string;
  region?: string; // Oblast name (София, Пловдив, etc.)
  x?: number; // Dot coordinates on map (0-1000)
  y?: number; // Dot coordinates on map (0-651)
}

export const recentProjects: Project[] = [
  {
    id: 1,
    title: "Жилищен комплекс Витоша",
    category: "transport-infrastructure",
    location: "СОФИЯ, БЪЛГАРИЯ",
    description:
      "Модерен жилищен комплекс с 120 апартамента и подземен паркинг в централната част на столицата.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80",
    year: 2024,
    slug: "vitosha-residential-complex",
  },
  {
    id: 2,
    title: "Бизнес сграда София Тех Парк",
    category: "water-supply-sewerage",
    location: "СОФИЯ, БЪЛГАРИЯ",
    description:
      "Съвременна офис сграда клас А с площ от 15,000 кв.м. и интелигентни системи за управление.",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1600&q=80",
    year: 2024,
    slug: "sofia-tech-park",
  },
  {
    id: 3,
    title: "Стоманобетонна конструкция на жилищен комплекс",
    category: "residential-building-construction",
    location: "ВАРНА, БЪЛГАРИЯ",
    description: "Конструктивна рамка на жилищен блок със 100 апартамента",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80",
    year: 2024,
    slug: "concrete-residential-varna",
  },
  {
    id: 4,
    title: "Метална конструкция на производствена хале",
    category: "public-buildings-facilities",
    location: "БУРГАС, БЪЛГАРИЯ",
    description:
      "Стоманена рамка за индустриално производство с мостови кранове",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80",
    year: 2023,
    slug: "industrial-steel-burgas",
  },
  {
    id: 5,
    title: "Саниране на жилищен блок",
    category: "energy-efficiency",
    location: "СОФИЯ, БЪЛГАРИЯ",
    description:
      "Енергийно обновяване на жилищна сграда - топлоизолация, дограма, покрив",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80",
    year: 2024,
    slug: "energy-renovation-building-sofia",
  },
  {
    id: 6,
    title: "Реставрация на исторична фасада",
    category: "energy-efficiency",
    location: "ПЛОВДИВ, БЪЛГАРИЯ",
    description: "Възстановяване на фасада на къща от Възраждането",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80",
    year: 2023,
    slug: "facade-restoration-plovdiv",
  },
  {
    id: 7,
    title: "Цялостен ремонт на училище",
    category: "public-buildings-facilities",
    location: "ВАРНА, БЪЛГАРИЯ",
    description:
      "Реконструкция и обновяване на СУ 'Христо Ботев' - фасада, покрив, вътрешни помещения",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80",
    year: 2024,
    slug: "school-renovation-varna",
  },
  {
    id: 8,
    title: "Ремонт на покрив на административна сграда",
    category: "energy-efficiency",
    location: "БУРГАС, БЪЛГАРИЯ",
    description: "Хидроизолация и топлоизолация на плосък покрив",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
    year: 2023,
    slug: "roof-repair-burgas",
  },
  {
    id: 9,
    title: "Укрепителна подпорна стена",
    category: "landscaping-greenery",
    location: "СОФИЯ, БЪЛГАРИЯ",
    description: "Изграждане на подпорна стена за стабилизиране на терен",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&q=80",
    year: 2024,
    slug: "retaining-wall-sofia",
  },
  {
    id: 10,
    title: "Помпена станция за отпадни води",
    category: "landscaping-greenery",
    location: "ПЛОВДИВ, БЪЛГАРИЯ",
    description: "Изграждане на съоръжение за пречистване и помпене на води",
    image:
      "https://images.unsplash.com/photo-1581093458791-9f3c3250a8e5?w=1600&q=80",
    year: 2023,
    slug: "water-pump-station",
  },
  {
    id: 11,
    title: "Укрепване на срутище",
    category: "landscaping-greenery",
    location: "ВАРНА, БЪЛГАРИЯ",
    description: "Стабилизация на свлачище с габиони и дренажна система",
    image:
      "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=1600&q=80",
    year: 2024,
    slug: "slope-stabilization-varna",
  },
  {
    id: 12,
    title: "Електрическа инсталация на офис сграда",
    category: "hvac-ventilation",
    location: "СОФИЯ, БЪЛГАРИЯ",
    description:
      "Цялостно изграждане на ел. инсталация, пожароизвестяване, контрол достъп",
    image:
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=1600&q=80",
    year: 2024,
    slug: "electrical-system-office",
  },
  {
    id: 13,
    title: "ОВК система на търговски център",
    category: "hvac-ventilation",
    location: "ПЛОВДИВ, БЪЛГАРИЯ",
    description: "Отопление, вентилация и климатизация на търговски комплекс",
    image:
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1600&q=80",
    year: 2023,
    slug: "hvac-shopping-mall",
  },
  {
    id: 14,
    title: "ВиК инсталация на жилищна сграда",
    category: "hvac-ventilation",
    location: "ВАРНА, БЪЛГАРИЯ",
    description: "Водопровод, канализация и отоплителна инсталация",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80",
    year: 2024,
    slug: "plumbing-residential",
  },
  {
    id: 15,
    title: "Вентилационна система на фабрика",
    category: "hvac-ventilation",
    location: "БУРГАС, БЪЛГАРИЯ",
    description: "Индустриална вентилация и прахоулавяне",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80",
    year: 2023,
    slug: "ventilation-factory",
  },
  {
    id: 16,
    title: "Рехабилитация на магистрала 'Тракия'",
    category: "waste-treatment-facilities",
    location: "ПЛОВДИВ - СТАРА ЗАГОРА, БЪЛГАРИЯ",
    description: "Основен ремонт на 15 км участък от АМ 'Тракия'",
    image:
      "https://images.unsplash.com/photo-1621544402532-90a61dc8ccd7?w=1600&q=80",
    year: 2024,
    slug: "highway-rehabilitation",
  },
  {
    id: 17,
    title: "Мост над река Струма",
    category: "waste-treatment-facilities",
    location: "БЛАГОЕВГРАД, БЪЛГАРИЯ",
    description: "Изграждане на нов пътен мост с дължина 120 метра",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&q=80",
    year: 2023,
    slug: "bridge-construction",
  },
  {
    id: 18,
    title: "Реконструкция на бул. 'България'",
    category: "waste-treatment-facilities",
    location: "СОФИЯ, БЪЛГАРИЯ",
    description: "Основен ремонт и разширение на градски булевард - 2.5 км",
    image:
      "https://images.unsplash.com/photo-1589395937772-510c8f1f623e?w=1600&q=80",
    year: 2024,
    slug: "urban-street-sofia",
  },
  {
    id: 19,
    title: "Паркинг и вертикална планировка",
    category: "waste-treatment-facilities",
    location: "ВАРНА, БЪЛГАРИЯ",
    description: "Изграждане на паркинг с озеленяване и алеи",
    image:
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1600&q=80",
    year: 2023,
    slug: "parking-landscaping-varna",
  },
  {
    id: 20,
    title: "Реконструкция на тротоари и алеи",
    category: "waste-treatment-facilities",
    location: "ПЛОВДИВ, БЪЛГАРИЯ",
    description: "Обновяване на пешеходни зони с гранитни плочи и осветление",
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600&q=80",
    year: 2024,
    slug: "sidewalk-renovation-plovdiv",
  },
];

// Convert category to URL-friendly slug
export function categoryToSlug(category: ProjectCategory): string {
  const slugMap: Record<ProjectCategory, string> = {
    "Стоманобетонни и метални конструкции": "steel-concrete-structures",
    "Саниране и рехабилитация": "renovation-rehabilitation",
    "Инженерно-укрепителни и хидросъоръжения": "engineering-hydro",
    "Инсталации – Ел, ВиК, ОВК": "installations",
    "Пътно строителство и инфраструктура": "road-construction",
  };
  return slugMap[category];
}

// Get projects by category
export function getProjectsByCategory(category: string): Project[] {
  return recentProjects.filter((p) => p.category === category);
}

// Machinery Types - Card-based structure
export interface MachineryCategory {
  id: string;
  name: string;
  count: number;
  models: MachineryModel[];
  image: string;
}

export interface MachineryModel {
  name: string;
  count: number;
}

export const machineryCategories: MachineryCategory[] = [
  {
    id: "tracked-excavators",
    name: "Верижни багери",
    count: 9,
    models: [
      { name: "JCB JS220 LC", count: 1 },
      { name: "JCB JS160", count: 1 },
      { name: "Volvo EC200 EL", count: 1 },
      { name: "JCB 86C серии", count: 5 },
      { name: "JCB 86C-1", count: 1 },
    ],
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
  },
  {
    id: "wheeled-excavators",
    name: "Колесни багери",
    count: 1,
    models: [{ name: "JCB JS175W", count: 1 }],
    image:
      "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800&q=80",
  },
  {
    id: "combined-excavators",
    name: "Комбинирани колесни багери",
    count: 7,
    models: [{ name: "JCB 3CX", count: 7 }],
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
  },
  {
    id: "bulldozers",
    name: "Булдозери",
    count: 1,
    models: [{ name: "Hitachi D180 LPG", count: 1 }],
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
  },
  {
    id: "telescopic-loaders",
    name: "Телескопични товарачи",
    count: 2,
    models: [
      { name: "JCB 531-170", count: 1 },
      { name: "JCB 536-95", count: 1 },
    ],
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  },
  {
    id: "mini-excavators",
    name: "Мини багери",
    count: 3,
    models: [
      { name: "JCB 8025", count: 2 },
      { name: "Takeuchi TB016", count: 1 },
    ],
    image:
      "https://images.unsplash.com/photo-1581093458791-9f3c3250a8e5?w=800&q=80",
  },
  {
    id: "mini-loaders",
    name: "Мини челни товарачи",
    count: 3,
    models: [
      { name: "JCB 155SSL", count: 1 },
      { name: "BOBCAT T190", count: 1 },
      { name: "CATERPILLAR 216b", count: 1 },
    ],
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
  },
  {
    id: "front-loaders",
    name: "Челни товарачи",
    count: 2,
    models: [
      { name: "Komatsu WA 65", count: 1 },
      { name: "JCB 406 WLS", count: 1 },
    ],
    image:
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&q=80",
  },
  {
    id: "rollers",
    name: "Валяци (вибрационни / пътни)",
    count: 6,
    models: [
      { name: "Dynapac CC 422", count: 1 },
      { name: "JCB VM 75D", count: 1 },
      { name: "Dynapac CC-122", count: 1 },
      { name: "JCB VMT 260-120", count: 1 },
      { name: "JCB CT 260-120", count: 1 },
      { name: "JCB VMT 160-80", count: 1 },
    ],
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
  },
  {
    id: "road-mill",
    name: "Пътна фреза",
    count: 1,
    models: [{ name: "Wirtgen W120 F", count: 1 }],
    image:
      "https://images.unsplash.com/photo-1589395937772-510c8f1f623e?w=800&q=80",
  },
  {
    id: "asphalt-pavers",
    name: "Асфалтополагачи",
    count: 2,
    models: [
      { name: "Vogele Super 1800-2", count: 1 },
      { name: "DF 135 C Svedala-Demag", count: 1 },
    ],
    image:
      "https://images.unsplash.com/photo-1621544402532-90a61dc8ccd7?w=800&q=80",
  },
  {
    id: "curb-machine",
    name: "Машина за полагане на банкети",
    count: 1,
    models: [{ name: "Hydrog DG-1500", count: 1 }],
    image:
      "https://images.unsplash.com/photo-1589395937772-510c8f1f623e?w=800&q=80",
  },
  {
    id: "dump-trucks",
    name: "Самосвали",
    count: 9,
    models: [
      { name: "MAN TGS 35.400", count: 2 },
      { name: "Скания G 410", count: 1 },
      { name: "Скания G 420", count: 1 },
      { name: "IVECO", count: 1 },
      { name: "Скания R124", count: 2 },
      { name: "Скания P114GB", count: 1 },
      { name: "Скания 94", count: 1 },
    ],
    image:
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&q=80",
  },
  {
    id: "cargo-trucks",
    name: "Товарни автомобили",
    count: 7,
    models: [
      { name: "MAN TGL 8.150", count: 4 },
      { name: "MAN L2000", count: 2 },
      { name: "MITSUBISHI CANTER 75", count: 1 },
    ],
    image:
      "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800&q=80",
  },
  {
    id: "trailers",
    name: "Ремаркета",
    count: 2,
    models: [
      { name: "Wograndi Doka 1622", count: 1 },
      { name: "Schwarzmueller TU 30 100", count: 1 },
    ],
    image:
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&q=80",
  },
  {
    id: "other-equipment",
    name: "Друго оборудване",
    count: 0,
    models: [
      { name: "Електрически платформи (Alimak, Elektroesla)", count: 15 },
      { name: "Строително скеле", count: 15000 },
    ],
    image:
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&q=80",
  },
];
