// Mock data for construction projects
// Categories based on Bulgarian construction services (Дейности)

export type ProjectCategory =
  | "Стоманобетонни и метални конструкции"
  | "Саниране и рехабилитация"
  | "Инженерно-укрепителни и хидросъоръжения"
  | "Инсталации – Ел, ВиК, ОВК"
  | "Пътно строителство и инфраструктура";

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  location: string;
  description: string;
  image: string;
  year: number;
  slug: string;
}

export const recentProjects: Project[] = [
  {
    id: 1,
    title: "Жилищен комплекс Витоша",
    category: "Стоманобетонни и метални конструкции",
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
    category: "Инженерно-укрепителни и хидросъоръжения",
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
    category: "Стоманобетонни и метални конструкции",
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
    category: "Стоманобетонни и метални конструкции",
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
    category: "Саниране и рехабилитация",
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
    category: "Саниране и рехабилитация",
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
    category: "Саниране и рехабилитация",
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
    category: "Саниране и рехабилитация",
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
    category: "Инженерно-укрепителни и хидросъоръжения",
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
    category: "Инженерно-укрепителни и хидросъоръжения",
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
    category: "Инженерно-укрепителни и хидросъоръжения",
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
    category: "Инсталации – Ел, ВиК, ОВК",
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
    category: "Инсталации – Ел, ВиК, ОВК",
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
    category: "Инсталации – Ел, ВиК, ОВК",
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
    category: "Инсталации – Ел, ВиК, ОВК",
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
    category: "Пътно строителство и инфраструктура",
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
    category: "Пътно строителство и инфраструктура",
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
    category: "Пътно строителство и инфраструктура",
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
    category: "Пътно строителство и инфраструктура",
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
    category: "Пътно строителство и инфраструктура",
    location: "ПЛОВДИВ, БЪЛГАРИЯ",
    description: "Обновяване на пешеходни зони с гранитни плочи и осветление",
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600&q=80",
    year: 2024,
    slug: "sidewalk-renovation-plovdiv",
  },
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Стоманобетонни и метални конструкции",
  "Саниране и рехабилитация",
  "Инженерно-укрепителни и хидросъоръжения",
  "Инсталации – Ел, ВиК, ОВК",
  "Пътно строителство и инфраструктура",
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

// Convert slug back to category
export function slugToCategory(slug: string): ProjectCategory | null {
  const categoryMap: Record<string, ProjectCategory> = {
    "steel-concrete-structures": "Стоманобетонни и метални конструкции",
    "renovation-rehabilitation": "Саниране и рехабилитация",
    "engineering-hydro": "Инженерно-укрепителни и хидросъоръжения",
    "installations": "Инсталации – Ел, ВиК, ОВК",
    "road-construction": "Пътно строителство и инфраструктура",
  };
  return categoryMap[slug] || null;
}

// Get projects by category
export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return recentProjects.filter((p) => p.category === category);
}

// Service details with overview and subcategories
export const serviceDetails: Record<
  ProjectCategory,
  {
    overview: string[];
    subcategories: string[];
  }
> = {
  "Стоманобетонни и метални конструкции": {
    overview: [
      "Специализираме се в изграждането на стоманобетонни и метални конструкции за жилищни, промишлени и инфраструктурни проекти. Екипът ни разполага с богат опит в проектирането и изпълнението на носещи конструкции, рамки, колони и плочи.",
      "Използваме най-съвременните технологии и материали, за да осигурим дълготрайност и сигурност на всяка конструкция. Нашите специалисти следят стриктно изискванията на строителните норми и стандарти.",
      "Работим с wide спектър от проекти - от жилищни сгради до промишлени халета и инфраструктурни обекти, като гарантираме качество и прецизност на всеки етап.",
    ],
    subcategories: [
      "Жилищни сгради - стоманобетонни рамки и конструкции",
      "Промишлени халета - метални носещи конструкции",
      "Търговски центрове - комбинирани стоманобетонни системи",
      "Инфраструктурни обекти - мостове и подпорни стени",
    ],
  },
  "Саниране и рехабилитация": {
    overview: [
      "Предлагаме цялостни решения за енергийно обновяване и реставрация на жилищни, обществени и исторически сгради. Нашият опит включва работа с различни типове фасади, покриви и конструкции.",
      "Извършваме детайлни технически прегледи и енергийни одити, за да определим оптималните решения за всяка сграда. Използваме качествени материали и сертифицирани системи за топло и хидроизолация.",
      "Специализирани сме в работа с исторически сгради, където съчетаваме модерни технологии с традиционни техники за запазване на архитектурното наследство.",
    ],
    subcategories: [
      "Енергийно обновяване - топлоизолация и дограма",
      "Фасадни системи - реновиране и реставрация",
      "Покривни конструкции - ремонт и хидроизолация",
      "Исторически сгради - реставрация на фасади и елементи",
    ],
  },
  "Инженерно-укрепителни и хидросъоръжения": {
    overview: [
      "Изпълняваме специализирани инженерни решения за укрепване на терени, стабилизация на свлачища и изграждане на хидротехнически съоръжения. Нашият екип има експертиза в сложни геотехнически проекти.",
      "Работим с модерни технологии за изграждане на подпорни стени, дренажни системи и укрепителни конструкции. Осигуряваме дългосрочна стабилност и безопасност на терените.",
      "Специализирани сме в проектиране и изпълнение на водни съоръжения - помпени станции, пречиствателни станции и системи за водоснабдяване.",
    ],
    subcategories: [
      "Подпорни стени - стоманобетонни и габионни конструкции",
      "Стабилизация на терени - укрепване на свлачища",
      "Дренажни системи - отводняване и защита",
      "Хидросъоръжения - помпени и пречиствателни станции",
    ],
  },
  "Инсталации – Ел, ВиК, ОВК": {
    overview: [
      "Осигуряваме цялостно изграждане на всички видове инсталации в жилищни, търговски и промишлени обекти. Екипът ни включва лицензирани специалисти с опит в проектиране и монтаж на сложни системи.",
      "Работим с водещи производители на оборудване и материали, за да гарантираме надеждност и енергийна ефективност. Всички инсталации се изпълняват съгласно актуалните технически изисквания и стандарти.",
      "Предлагаме решения за интелигентно управление на сгради (BMS), системи за възобновяема енергия и енергоспестяващи технологии.",
    ],
    subcategories: [
      "Електрически инсталации - силнотокови и слаботокови системи",
      "ВиК системи - водоснабдяване, канализация, пожарогасене",
      "ОВК системи - отопление, вентилация, климатизация",
      "Специални системи - контрол достъп, видеонаблюдение, BMS",
    ],
  },
  "Пътно строителство и инфраструктура": {
    overview: [
      "Изпълняваме проекти за изграждане и рехабилитация на пътна инфраструктура - магистрали, пътища, улици, паркинги и алеи. Разполагаме със специализирана техника и опитен персонал за всички видове пътни работи.",
      "Нашата експертиза включва както ново строителство, така и основен ремонт на съществуваща инфраструктура. Работим с модерни технологии за асфалтиране, бетонови настилки и специализирани пътни покрития.",
      "Извършваме вертикална планировка, изграждане на дренажни системи, пътна сигнализация и озеленяване на прилежащи площи.",
    ],
    subcategories: [
      "Магистрали и пътища - ново строителство и рехабилитация",
      "Градска инфраструктура - улици, булеварди, кръстовища",
      "Паркинги и площи - асфалтови и бетонови настилки",
      "Пешеходни зони - тротоари, алеи, велоалеи",
    ],
  },
};

// Get category description and icon
export function getCategoryInfo(category: ProjectCategory) {
  const categoryInfo: Record<
    ProjectCategory,
    { description: string; icon: string }
  > = {
    "Стоманобетонни и метални конструкции": {
      description:
        "Изграждане на конструктивната рамка на сгради и съоръжения – стоманобетон, стомана, комбинирани системи.",
      icon: "🏗️",
    },
    "Саниране и рехабилитация": {
      description:
        "Енергийно обновяване, ремонт на фасади и покриви, хидро- и топлоизолации, възстановяване на стари сгради.",
      icon: "🔧",
    },
    "Инженерно-укрепителни и хидросъоръжения": {
      description:
        "Изпълнение на укрепителни съоръжения, подпорни стени, водни и подемни инсталации.",
      icon: "⚙️",
    },
    "Инсталации – Ел, ВиК, ОВК": {
      description:
        "Цялостно изграждане на електро, водопроводни, канализационни, отоплителни, вентилационни и климатични системи.",
      icon: "⚡",
    },
    "Пътно строителство и инфраструктура": {
      description:
        "Изграждане и рехабилитация на пътища, прилежаща инфраструктура, вертикална планировка и озеленяване.",
      icon: "🛣️",
    },
  };

  return categoryInfo[category];
}

// Machinery Types based on functional grouping
export type MachineryCategory =
  | "Земни Работи и Изкопи"
  | "Товарене и Преместване"
  | "Пътно Строителство и Настилки"
  | "Транспорт и Логистика"
  | "Специализирани и Помощни Работи";

export interface Machinery {
  id: number;
  name: string;
  category: MachineryCategory;
  image: string;
  specs: {
    label: string;
    value: string;
  }[];
}

export const machineryData: Machinery[] = [
  // Земни Работи и Изкопи
  {
    id: 1,
    name: "Верижен Багер CAT 320",
    category: "Земни Работи и Изкопи",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=80",
    specs: [
      { label: "Капацитет кофа", value: "1.2 m³" },
      { label: "Дълбочина на изкоп", value: "6.5 m" },
      { label: "Мощност", value: "147 HP" },
    ],
  },
  {
    id: 2,
    name: "Колесен Багер Liebherr A914",
    category: "Земни Работи и Изкопи",
    image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=1600&q=80",
    specs: [
      { label: "Капацитет кофа", value: "0.8 m³" },
      { label: "Дълбочина на изкоп", value: "5.8 m" },
      { label: "Мобилност", value: "Висока" },
    ],
  },
  {
    id: 3,
    name: "Булдозер Komatsu D65",
    category: "Земни Работи и Изкопи",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80",
    specs: [
      { label: "Мощност", value: "215 HP" },
      { label: "Тегло", value: "20 тона" },
      { label: "Ширина на острието", value: "3.7 m" },
    ],
  },

  // Товарене и Преместване
  {
    id: 4,
    name: "Челен Товарач CAT 950",
    category: "Товарене и Преместване",
    image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1600&q=80",
    specs: [
      { label: "Капацитет кофа", value: "3.0 m³" },
      { label: "Товароподемност", value: "5 тона" },
      { label: "Мощност", value: "195 HP" },
    ],
  },
  {
    id: 5,
    name: "Телескопичен Товарач Manitou MLT 735",
    category: "Товарене и Преместване",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&q=80",
    specs: [
      { label: "Товароподемност", value: "3.5 тона" },
      { label: "Височина на повдигане", value: "7 m" },
      { label: "Обхват", value: "4.5 m" },
    ],
  },
  {
    id: 6,
    name: "Мини Товарач Bobcat S650",
    category: "Товарене и Преместване",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600&q=80",
    specs: [
      { label: "Товароподемност", value: "1.1 тона" },
      { label: "Мощност", value: "74 HP" },
      { label: "Приложение", value: "Тесни пространства" },
    ],
  },

  // Пътно Строителство и Настилки
  {
    id: 7,
    name: "Асфалтополагач Vogele Super 1800",
    category: "Пътно Строителство и Настилки",
    image: "https://images.unsplash.com/photo-1621544402532-90a61dc8ccd7?w=1600&q=80",
    specs: [
      { label: "Ширина на полагане", value: "2.5-9 m" },
      { label: "Производителност", value: "450 т/ч" },
      { label: "Тип управление", value: "Електронно" },
    ],
  },
  {
    id: 8,
    name: "Пътна Фреза Wirtgen W100",
    category: "Пътно Строителство и Настилки",
    image: "https://images.unsplash.com/photo-1589395937772-510c8f1f623e?w=1600&q=80",
    specs: [
      { label: "Работна ширина", value: "1 m" },
      { label: "Дълбочина на фрезоване", value: "0-32 cm" },
      { label: "Мощност", value: "335 HP" },
    ],
  },
  {
    id: 9,
    name: "Вибрационен Валяк Bomag BW 213",
    category: "Пътно Строителство и Настилки",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80",
    specs: [
      { label: "Тегло", value: "13 тона" },
      { label: "Ширина на валяка", value: "2.13 m" },
      { label: "Тип", value: "Двувалков" },
    ],
  },

  // Транспорт и Логистика
  {
    id: 10,
    name: "Самосвал MAN TGS 6x4",
    category: "Транспорт и Логистика",
    image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1600&q=80",
    specs: [
      { label: "Товароподемност", value: "20 тона" },
      { label: "Обем на коша", value: "15 m³" },
      { label: "Задвижване", value: "6x4" },
    ],
  },
  {
    id: 11,
    name: "Товарен Автомобил Mercedes Actros",
    category: "Транспорт и Логистика",
    image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=1600&q=80",
    specs: [
      { label: "Товароподемност", value: "25 тона" },
      { label: "Дължина платформа", value: "7.5 m" },
      { label: "Приложение", value: "Дълги товари" },
    ],
  },

  // Специализирани и Помощни Работи
  {
    id: 12,
    name: "Мини Багер Kubota U17",
    category: "Специализирани и Помощни Работи",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3250a8e5?w=1600&q=80",
    specs: [
      { label: "Тегло", value: "1.7 тона" },
      { label: "Дълбочина на изкоп", value: "2.4 m" },
      { label: "Приложение", value: "Стесни места" },
    ],
  },
  {
    id: 13,
    name: "Електрическа Платформа Genie Z-45",
    category: "Специализирани и Помощни Работи",
    image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1600&q=80",
    specs: [
      { label: "Работна височина", value: "15.7 m" },
      { label: "Хоризонтален обхват", value: "7.5 m" },
      { label: "Товароподемност", value: "230 kg" },
    ],
  },
  {
    id: 14,
    name: "Хидравличен Кран Liebherr LTM 1050",
    category: "Специализирани и Помощни Работи",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600&q=80",
    specs: [
      { label: "Товароподемност", value: "50 тона" },
      { label: "Височина на повдигане", value: "40 m" },
      { label: "Обхват", value: "35 m" },
    ],
  },
];

export const MACHINERY_CATEGORIES: MachineryCategory[] = [
  "Земни Работи и Изкопи",
  "Товарене и Преместване",
  "Пътно Строителство и Настилки",
  "Транспорт и Логистика",
  "Специализирани и Помощни Работи",
];

// Get machinery by category
export function getMachineryByCategory(category: MachineryCategory): Machinery[] {
  return machineryData.filter((m) => m.category === category);
}

// Get category info for machinery
export function getMachineryCategoryInfo(category: MachineryCategory) {
  const categoryInfo: Record<
    MachineryCategory,
    { description: string; icon: string; subtitle: string }
  > = {
    "Земни Работи и Изкопи": {
      description:
        "Започваме всеки проект с прецизност. Нашата тежка техника осигурява бързо и точно изкопаване на всякакъв терен.",
      icon: "⛏️",
      subtitle: "Прецизност и сила при земни работи",
    },
    "Товарене и Преместване": {
      description:
        "Ефективност и сила при работа с насипни материали и товари. Максимална производителност на обекта.",
      icon: "🏗️",
      subtitle: "Високопроизводителни товарни решения",
    },
    "Пътно Строителство и Настилки": {
      description:
        "Технологии за перфектен път. Прецизно полагане, фрезоване и уплътняване за дълготрайни резултати.",
      icon: "🛣️",
      subtitle: "Качествени пътни настилки",
    },
    "Транспорт и Логистика": {
      description:
        "Надеждна и навременна доставка на материали. Голям автопарк от самосвали за всякакъв обем товари.",
      icon: "🚛",
      subtitle: "Бърза и надеждна логистика",
    },
    "Специализирани и Помощни Работи": {
      description:
        "Гъвкави решения за специфични задачи. Мини-техника за тесни пространства и повдигателни съоръжения за височина.",
      icon: "🔧",
      subtitle: "Решения за всяка специфична нужда",
    },
  };

  return categoryInfo[category];
}
