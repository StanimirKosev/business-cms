// Mock client data based on old website
export interface Client {
  id: number;
  name: string;
  logo?: string;
  category: "state" | "municipality" | "private";
  projectCount: number;
}

export const mockClients: Client[] = [
  // State institutions (Държавни институции)
  {
    id: 1,
    name: "ДП Национална компания железопътна инфраструктура",
    category: "state",
    projectCount: 5,
  },
  {
    id: 2,
    name: "Национална електрическа компания ЕАД",
    category: "state",
    projectCount: 3,
  },
  {
    id: 3,
    name: "Министерски съвет",
    category: "state",
    projectCount: 2,
  },
  {
    id: 4,
    name: "Министерство на икономиката, енергетиката и туризма",
    category: "state",
    projectCount: 1,
  },
  {
    id: 5,
    name: "Министерство на образованието",
    category: "state",
    projectCount: 2,
  },
  {
    id: 6,
    name: "Министерство на отбраната",
    category: "state",
    projectCount: 3,
  },
  {
    id: 7,
    name: "Министерство на вътрешните работи",
    category: "state",
    projectCount: 2,
  },
  {
    id: 8,
    name: "Мини Марица Изток ЕАД",
    category: "state",
    projectCount: 4,
  },
  {
    id: 9,
    name: "Пристанище Варна ЕАД",
    category: "state",
    projectCount: 2,
  },
  {
    id: 10,
    name: "Агенция за дипломатически имоти в страната",
    category: "state",
    projectCount: 1,
  },
  {
    id: 11,
    name: "ТЕЦ Марица изток 2 ЕАД",
    category: "state",
    projectCount: 3,
  },
  {
    id: 12,
    name: "Булгартрансгаз ЕАД",
    category: "state",
    projectCount: 2,
  },
  {
    id: 13,
    name: "Електроенергиен системен оператор ЕАД",
    category: "state",
    projectCount: 2,
  },

  // Municipalities (Общини)
  {
    id: 14,
    name: "Община София",
    category: "municipality",
    projectCount: 8,
  },
  {
    id: 15,
    name: "Община Златица",
    category: "municipality",
    projectCount: 1,
  },
  {
    id: 16,
    name: "Община Левски",
    category: "municipality",
    projectCount: 1,
  },
  {
    id: 17,
    name: "Община Бяла",
    category: "municipality",
    projectCount: 1,
  },
  {
    id: 18,
    name: "Община Раднево",
    category: "municipality",
    projectCount: 2,
  },
  {
    id: 19,
    name: "Община Средец",
    category: "municipality",
    projectCount: 1,
  },
  {
    id: 20,
    name: "Община Никопол",
    category: "municipality",
    projectCount: 1,
  },
  {
    id: 21,
    name: "Община Бургас",
    category: "municipality",
    projectCount: 4,
  },
  {
    id: 22,
    name: "Община Хасково",
    category: "municipality",
    projectCount: 2,
  },
  {
    id: 23,
    name: "Община Стара Загора",
    category: "municipality",
    projectCount: 3,
  },
  {
    id: 24,
    name: "Община Трявна",
    category: "municipality",
    projectCount: 1,
  },
  {
    id: 25,
    name: "Община Шумен",
    category: "municipality",
    projectCount: 2,
  },
  {
    id: 26,
    name: "Община Плевен",
    category: "municipality",
    projectCount: 3,
  },
  {
    id: 27,
    name: "Община Белово",
    category: "municipality",
    projectCount: 1,
  },
  {
    id: 28,
    name: "Община Велинград",
    category: "municipality",
    projectCount: 2,
  },
  {
    id: 29,
    name: "Община Сандански",
    category: "municipality",
    projectCount: 1,
  },
  {
    id: 30,
    name: "Община Белоградчик",
    category: "municipality",
    projectCount: 1,
  },
  {
    id: 31,
    name: "Община Борово",
    category: "municipality",
    projectCount: 1,
  },
  {
    id: 32,
    name: "Община Дряново",
    category: "municipality",
    projectCount: 1,
  },
  {
    id: 33,
    name: "Община Две Могили",
    category: "municipality",
    projectCount: 1,
  },
  {
    id: 34,
    name: "Община Баните",
    category: "municipality",
    projectCount: 1,
  },
  {
    id: 35,
    name: "Община Русе",
    category: "municipality",
    projectCount: 3,
  },
  {
    id: 36,
    name: "Община Габрово",
    category: "municipality",
    projectCount: 2,
  },
  {
    id: 37,
    name: "Община Пловдив",
    category: "municipality",
    projectCount: 5,
  },
  {
    id: 38,
    name: "Община Долни чифлик",
    category: "municipality",
    projectCount: 1,
  },
  {
    id: 39,
    name: "Община Смолян",
    category: "municipality",
    projectCount: 2,
  },
  {
    id: 40,
    name: "Община Елена",
    category: "municipality",
    projectCount: 1,
  },
  {
    id: 41,
    name: "Община Роман",
    category: "municipality",
    projectCount: 1,
  },
  {
    id: 42,
    name: "Община Сливен",
    category: "municipality",
    projectCount: 2,
  },
  {
    id: 43,
    name: "Община Струмяни",
    category: "municipality",
    projectCount: 1,
  },
  {
    id: 44,
    name: "Община Кнежа",
    category: "municipality",
    projectCount: 1,
  },
  {
    id: 45,
    name: "Община Ямбол",
    category: "municipality",
    projectCount: 2,
  },
  {
    id: 46,
    name: "Община Костенец",
    category: "municipality",
    projectCount: 1,
  },
  {
    id: 47,
    name: "Община Белене",
    category: "municipality",
    projectCount: 1,
  },
  {
    id: 48,
    name: "Община Твърдица",
    category: "municipality",
    projectCount: 1,
  },

  // Private/Other (Частни)
  {
    id: 49,
    name: 'МБАЛ "Д-р Тота Венкова" АД',
    category: "private",
    projectCount: 2,
  },
];
