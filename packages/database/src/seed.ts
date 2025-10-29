import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // 1. Create clients
  const clients = [
    {
      nameBg: "ДП Национална компания железопътна инфраструктура",
      nameEn: "National Railway Infrastructure Company",
      logoUrl: "",
      website: "",
      order: 0,
    },
    {
      nameBg: "Национална електрическа компания ЕАД",
      nameEn: "National Electric Company EAD",
      logoUrl: "",
      website: "",
      order: 1,
    },
    {
      nameBg: "Министерски съвет",
      nameEn: "Council of Ministers",
      logoUrl: "",
      website: "",
      order: 2,
    },
    {
      nameBg: "Министерство на икономиката, енергетиката и туризма",
      nameEn: "Ministry of Economy, Energy and Tourism",
      logoUrl: "",
      website: "",
      order: 3,
    },
    {
      nameBg: "Министерство на образованието",
      nameEn: "Ministry of Education",
      logoUrl: "",
      website: "",
      order: 4,
    },
    {
      nameBg: "Министерство на отбраната",
      nameEn: "Ministry of Defense",
      logoUrl: "",
      website: "",
      order: 5,
    },
    {
      nameBg: "Министерство на вътрешните работи",
      nameEn: "Ministry of Interior",
      logoUrl: "",
      website: "",
      order: 6,
    },
    {
      nameBg: "Мини Марица Изток ЕАД",
      nameEn: "Mini Maritsa East EAD",
      logoUrl: "",
      website: "",
      order: 7,
    },
    {
      nameBg: "Пристанище Варна ЕАД",
      nameEn: "Port of Varna EAD",
      logoUrl: "",
      website: "",
      order: 8,
    },
    {
      nameBg: "Агенция за дипломатически имоти в страната",
      nameEn: "Agency for Diplomatic Properties in the Country",
      logoUrl: "",
      website: "",
      order: 9,
    },
    {
      nameBg: "ТЕЦ Марица изток 2 ЕАД",
      nameEn: "TPP Maritsa East 2 EAD",
      logoUrl: "",
      website: "",
      order: 10,
    },
    {
      nameBg: "Булгартрансгаз ЕАД",
      nameEn: "Bulgartransgaz EAD",
      logoUrl: "",
      website: "",
      order: 11,
    },
    {
      nameBg: "Електроенергиен системен оператор ЕАД",
      nameEn: "Electricity System Operator EAD",
      logoUrl: "",
      website: "",
      order: 12,
    },
    {
      nameBg: "Община София",
      nameEn: "Sofia Municipality",
      logoUrl: "",
      website: "",
      order: 13,
    },
    {
      nameBg: "Община Златица",
      nameEn: "Zlatitsa Municipality",
      logoUrl: "",
      website: "",
      order: 14,
    },
    {
      nameBg: "Община Левски",
      nameEn: "Levski Municipality",
      logoUrl: "",
      website: "",
      order: 15,
    },
    {
      nameBg: "Община Бяла",
      nameEn: "Byala Municipality",
      logoUrl: "",
      website: "",
      order: 16,
    },
    {
      nameBg: "Община Раднево",
      nameEn: "Radnevo Municipality",
      logoUrl: "",
      website: "",
      order: 17,
    },
    {
      nameBg: "Община Средец",
      nameEn: "Sredets Municipality",
      logoUrl: "",
      website: "",
      order: 18,
    },
    {
      nameBg: "Община Никопол",
      nameEn: "Nikopol Municipality",
      logoUrl: "",
      website: "",
      order: 19,
    },
    {
      nameBg: "Община Бургас",
      nameEn: "Burgas Municipality",
      logoUrl: "",
      website: "",
      order: 20,
    },
    {
      nameBg: "Община Хасково",
      nameEn: "Haskovo Municipality",
      logoUrl: "",
      website: "",
      order: 21,
    },
    {
      nameBg: "Община Стара Загора",
      nameEn: "Stara Zagora Municipality",
      logoUrl: "",
      website: "",
      order: 22,
    },
    {
      nameBg: "Община Трявна",
      nameEn: "Tryavna Municipality",
      logoUrl: "",
      website: "",
      order: 23,
    },
    {
      nameBg: "Община Шумен",
      nameEn: "Shumen Municipality",
      logoUrl: "",
      website: "",
      order: 24,
    },
    {
      nameBg: "Община Плевен",
      nameEn: "Pleven Municipality",
      logoUrl: "",
      website: "",
      order: 25,
    },
    {
      nameBg: "Община Белово",
      nameEn: "Belovo Municipality",
      logoUrl: "",
      website: "",
      order: 26,
    },
    {
      nameBg: "Община Велинград",
      nameEn: "Velingrad Municipality",
      logoUrl: "",
      website: "",
      order: 27,
    },
    {
      nameBg: "Община Сандански",
      nameEn: "Sandanski Municipality",
      logoUrl: "",
      website: "",
      order: 28,
    },
    {
      nameBg: "Община Белоградчик",
      nameEn: "Belogradchik Municipality",
      logoUrl: "",
      website: "",
      order: 29,
    },
    {
      nameBg: "Община Борово",
      nameEn: "Borovo Municipality",
      logoUrl: "",
      website: "",
      order: 30,
    },
    {
      nameBg: "Община Дряново",
      nameEn: "Dryanovo Municipality",
      logoUrl: "",
      website: "",
      order: 31,
    },
    {
      nameBg: "Община Две Могили",
      nameEn: "Dve Mogili Municipality",
      logoUrl: "",
      website: "",
      order: 32,
    },
    {
      nameBg: "Община Баните",
      nameEn: "Banite Municipality",
      logoUrl: "",
      website: "",
      order: 33,
    },
    {
      nameBg: "Община Русе",
      nameEn: "Ruse Municipality",
      logoUrl: "",
      website: "",
      order: 34,
    },
    {
      nameBg: "Община Габрово",
      nameEn: "Gabrovo Municipality",
      logoUrl: "",
      website: "",
      order: 35,
    },
    {
      nameBg: "Община Пловдив",
      nameEn: "Plovdiv Municipality",
      logoUrl: "",
      website: "",
      order: 36,
    },
    {
      nameBg: "Община Долни чифлик",
      nameEn: "Dolni Chiflik Municipality",
      logoUrl: "",
      website: "",
      order: 37,
    },
    {
      nameBg: "Община Смолян",
      nameEn: "Smolyan Municipality",
      logoUrl: "",
      website: "",
      order: 38,
    },
    {
      nameBg: "Община Елена",
      nameEn: "Elena Municipality",
      logoUrl: "",
      website: "",
      order: 39,
    },
    {
      nameBg: "Община Роман",
      nameEn: "Roman Municipality",
      logoUrl: "",
      website: "",
      order: 40,
    },
    {
      nameBg: "Община Сливен",
      nameEn: "Sliven Municipality",
      logoUrl: "",
      website: "",
      order: 41,
    },
    {
      nameBg: "Община Струмяни",
      nameEn: "Strumyani Municipality",
      logoUrl: "",
      website: "",
      order: 42,
    },
    {
      nameBg: "Община Кнежа",
      nameEn: "Knezha Municipality",
      logoUrl: "",
      website: "",
      order: 43,
    },
    {
      nameBg: "Община Ямбол",
      nameEn: "Yambol Municipality",
      logoUrl: "",
      website: "",
      order: 44,
    },
    {
      nameBg: "Община Костенец",
      nameEn: "Kostenets Municipality",
      logoUrl: "",
      website: "",
      order: 45,
    },
    {
      nameBg: "Община Белене",
      nameEn: "Belene Municipality",
      logoUrl: "",
      website: "",
      order: 46,
    },
    {
      nameBg: "Община Твърдица",
      nameEn: "Tvarditsa Municipality",
      logoUrl: "",
      website: "",
      order: 47,
    },
    {
      nameBg: 'МБАЛ "Д-р Тота Венкова" АД',
      nameEn: 'MBAL "Dr. Tota Venkova" AD',
      logoUrl: "",
      website: "",
      order: 48,
    },
    {
      nameBg: "Частни инвеститори",
      nameEn: "Private Investors",
      logoUrl: "",
      website: "",
      order: 49,
    },
  ];

  for (const client of clients) {
    const existing = await prisma.client.findFirst({
      where: { nameBg: client.nameBg },
    });
    if (!existing) {
      await prisma.client.create({
        data: client,
      });
    }
  }
  console.log("✅ Created 50 clients");

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
