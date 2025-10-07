export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  location: string;
  description: string;
  year: number;
  slug: string;
}

export const recentProjects: Project[] = [
  {
    id: 1,
    title: "Жилищен комплекс Витоша",
    category: "Жилищно строителство",
    location: "СОФИЯ, БЪЛГАРИЯ",
    description:
      "Модерен жилищен комплекс с 120 апартамента и подземен паркинг в централната част на столицата.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80",
    year: 2024,
    slug: "жилищен-комплекс-витоша",
  },
  {
    id: 2,
    title: "Бизнес сграда София Тех Парк",
    category: "Офис сгради",
    location: "СОФИЯ, БЪЛГАРИЯ",
    description:
      "Съвременна офис сграда клас А с площ от 15,000 кв.м. и интелигентни системи за управление.",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1600&q=80",
    year: 2024,
    slug: "бизнес-сграда-софия-тех-парк",
  },
  {
    id: 3,
    title: "Търговски център Paradise",
    category: "Търговски обекти",
    location: "ПЛОВДИВ, БЪЛГАРИЯ",
    description:
      "Многофункционален търговски център с над 80 магазина и модерна развлекателна зона.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80",
    year: 2023,
    slug: "търговски-център-paradise",
  },
  {
    id: 4,
    title: "Реконструкция на Национална библиотека",
    category: "Реконструкции",
    location: "СОФИЯ, БЪЛГАРИЯ",
    description:
      "Цялостна реконструкция и модернизация на историческата сграда с опазване на оригиналната архитектура.",
    image:
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=1600&q=80",
    year: 2023,
    slug: "реконструкция-национална-библиотека",
  },
  {
    id: 5,
    title: "Производствена база Пловдив",
    category: "Промишлено строителство",
    location: "ПЛОВДИВ, БЪЛГАРИЯ",
    description:
      "Индустриален комплекс с производствени халета, складове и административна сграда на площ от 25,000 кв.м.",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1600&q=80",
    year: 2023,
    slug: "производствена-база-пловдив",
  },
  {
    id: 6,
    title: "Болница Пирогов - разширение",
    category: "Лечебни заведения",
    location: "СОФИЯ, БЪЛГАРИЯ",
    description:
      "Разширение на спешното отделение с 50 нови легла и модерна медицинска апаратура.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80",
    year: 2023,
    slug: "болница-пирогов-разширение",
  },
];
