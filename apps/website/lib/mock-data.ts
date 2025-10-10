// Mock data for construction projects
// Categories based on Bulgarian construction services (Дейности)

export type ProjectCategory =
  | "Стоманобетонни и метални конструкции"
  | "Саниране и рехабилитация"
  | "Инженерно-укрепителни и хидросъоръжения"
  | "Инсталации – Ел, ВиК, ОВК"
  | "Пътно строителство и инфраструктура";

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  description: string;
  image: string;
  year: number;
  status: "completed" | "in-progress";
  images?: string[]; // For detail page gallery
}

export const PROJECTS: Project[] = [
  // Стоманобетонни и метални конструкции
  {
    id: "1",
    slug: "concrete-frame-office-sofia",
    title: "Стоманобетонна конструкция на офис сграда",
    category: "Стоманобетонни и метални конструкции",
    location: "София, Бизнес Парк",
    description: "Изпълнение на конструктивната рамка на 12-етажна офис сграда с подземни нива",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    year: 2024,
    status: "in-progress",
  },
  {
    id: "2",
    slug: "steel-warehouse-plovdiv",
    title: "Метална конструкция за логистичен център",
    category: "Стоманобетонни и метални конструкции",
    location: "Пловдив",
    description: "Изграждане на стоманен скелет на складово помещение - 8000 кв.м",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    year: 2023,
    status: "completed",
  },
  {
    id: "3",
    slug: "concrete-residential-varna",
    title: "Стоманобетонна конструкция на жилищен комплекс",
    category: "Стоманобетонни и метални конструкции",
    location: "Варна",
    description: "Конструктивна рамка на жилищен блок със 100 апартамента",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    year: 2024,
    status: "in-progress",
  },
  {
    id: "4",
    slug: "industrial-steel-burgas",
    title: "Метална конструкция на производствена хале",
    category: "Стоманобетонни и метални конструкции",
    location: "Бургас",
    description: "Стоманена рамка за индустриално производство с мостови кранове",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    year: 2023,
    status: "completed",
  },

  // Саниране и рехабилитация
  {
    id: "5",
    slug: "energy-renovation-building-sofia",
    title: "Саниране на жилищен блок",
    category: "Саниране и рехабилитация",
    location: "София, кв. Младост",
    description: "Енергийно обновяване на жилищна сграда - топлоизолация, дограма, покрив",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    year: 2024,
    status: "in-progress",
  },
  {
    id: "6",
    slug: "facade-restoration-plovdiv",
    title: "Реставрация на исторична фасада",
    category: "Саниране и рехабилитация",
    location: "Пловдив, Стария град",
    description: "Възстановяване на фасада на къща от Възраждането",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    year: 2023,
    status: "completed",
  },
  {
    id: "7",
    slug: "school-renovation-varna",
    title: "Цялостен ремонт на училище",
    category: "Саниране и рехабилитация",
    location: "Варна",
    description: "Реконструкция и обновяване на СУ 'Христо Ботев' - фасада, покрив, вътрешни помещения",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    year: 2024,
    status: "completed",
  },
  {
    id: "8",
    slug: "roof-repair-burgas",
    title: "Ремонт на покрив на административна сграда",
    category: "Саниране и рехабилитация",
    location: "Бургас",
    description: "Хидроизолация и топлоизолация на плосък покрив",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    year: 2023,
    status: "completed",
  },

  // Инженерно-укрепителни и хидросъоръжения
  {
    id: "9",
    slug: "retaining-wall-sofia",
    title: "Укрепителна подпорна стена",
    category: "Инженерно-укрепителни и хидросъоръжения",
    location: "София, Витоша",
    description: "Изграждане на подпорна стена за стабилизиране на терен",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    year: 2024,
    status: "in-progress",
  },
  {
    id: "10",
    slug: "water-pump-station",
    title: "Помпена станция за отпадни води",
    category: "Инженерно-укрепителни и хидросъоръжения",
    location: "Пловдив",
    description: "Изграждане на съоръжение за пречистване и помпене на води",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3250a8e5?w=800&q=80",
    year: 2023,
    status: "completed",
  },
  {
    id: "11",
    slug: "slope-stabilization-varna",
    title: "Укрепване на срутище",
    category: "Инженерно-укрепителни и хидросъоръжения",
    location: "Варна, крайбрежие",
    description: "Стабилизация на свлачище с габиони и дренажна система",
    image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800&q=80",
    year: 2024,
    status: "completed",
  },

  // Инсталации – Ел, ВиК, ОВК
  {
    id: "12",
    slug: "electrical-system-office",
    title: "Електрическа инсталация на офис сграда",
    category: "Инсталации – Ел, ВиК, ОВК",
    location: "София, бул. Цариградско шосе",
    description: "Цялостно изграждане на ел. инсталация, пожароизвестяване, контрол достъп",
    image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&q=80",
    year: 2024,
    status: "in-progress",
  },
  {
    id: "13",
    slug: "hvac-shopping-mall",
    title: "ОВК система на търговски център",
    category: "Инсталации – Ел, ВиК, ОВК",
    location: "Пловдив",
    description: "Отопление, вентилация и климатизация на търговски комплекс",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80",
    year: 2023,
    status: "completed",
  },
  {
    id: "14",
    slug: "plumbing-residential",
    title: "ВиК инсталация на жилищна сграда",
    category: "Инсталации – Ел, ВиК, ОВК",
    location: "Варна",
    description: "Водопровод, канализация и отоплителна инсталация",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    year: 2024,
    status: "completed",
  },
  {
    id: "15",
    slug: "ventilation-factory",
    title: "Вентилационна система на фабрика",
    category: "Инсталации – Ел, ВиК, ОВК",
    location: "Бургас",
    description: "Индустриална вентилация и прахоулавяне",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    year: 2023,
    status: "completed",
  },

  // Пътно строителство и инфраструктура
  {
    id: "16",
    slug: "highway-rehabilitation",
    title: "Рехабилитация на магистрала 'Тракия'",
    category: "Пътно строителство и инфраструктура",
    location: "Пловдив - Стара Загора",
    description: "Основен ремонт на 15 км участък от АМ 'Тракия'",
    image: "https://images.unsplash.com/photo-1621544402532-90a61dc8ccd7?w=800&q=80",
    year: 2024,
    status: "in-progress",
  },
  {
    id: "17",
    slug: "bridge-construction",
    title: "Мост над река Струма",
    category: "Пътно строителство и инфраструктура",
    location: "Благоевград",
    description: "Изграждане на нов пътен мост с дължина 120 метра",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    year: 2023,
    status: "completed",
  },
  {
    id: "18",
    slug: "urban-street-sofia",
    title: "Реконструкция на бул. 'България'",
    category: "Пътно строителство и инфраструктура",
    location: "София",
    description: "Основен ремонт и разширение на градски булевард - 2.5 км",
    image: "https://images.unsplash.com/photo-1589395937772-510c8f1f623e?w=800&q=80",
    year: 2024,
    status: "completed",
  },
  {
    id: "19",
    slug: "parking-landscaping-varna",
    title: "Паркинг и вертикална планировка",
    category: "Пътно строителство и инфраструктура",
    location: "Варна",
    description: "Изграждане на паркинг с озеленяване и алеи",
    image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&q=80",
    year: 2023,
    status: "completed",
  },
  {
    id: "20",
    slug: "sidewalk-renovation-plovdiv",
    title: "Реконструкция на тротоари и алеи",
    category: "Пътно строителство и инфраструктура",
    location: "Пловдив, Капана",
    description: "Обновяване на пешеходни зони с гранитни плочи и осветление",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
    year: 2024,
    status: "in-progress",
  },
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Стоманобетонни и метални конструкции",
  "Саниране и рехабилитация",
  "Инженерно-укрепителни и хидросъоръжения",
  "Инсталации – Ел, ВиК, ОВК",
  "Пътно строителство и инфраструктура",
];

// Get projects by category
export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return PROJECTS.filter((p) => p.category === category);
}

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
