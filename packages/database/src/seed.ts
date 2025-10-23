import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // 2. Create categories (services)
  const categories = [
    {
      titleBg: "Транспортна инфракструктура",
      titleEn: "Transport Infrastructure",
      slug: "transport-infrastructure",
      descriptionBg:
        "Изграждане и рехабилитация на общински пътища, улици, мостове и паркинги",
      descriptionEn:
        "Construction and rehabilitation of municipal roads, streets, bridges and parking facilities",
      heroImageUrl: null,
      contentBg:
        "Реконструкция и рехабилитация на пътна инфраструктура - общински пътища, улици, пешеходни мостове и паркинги.",
      contentEn:
        "Reconstruction and rehabilitation of road infrastructure - municipal roads, streets, pedestrian bridges and parking facilities.",
      iconName: "Route",
      order: 0,
    },
    {
      titleBg: "ВИК проекти",
      titleEn: "Water Supply & Sewerage",
      slug: "water-supply-sewerage",
      descriptionBg:
        "Реконструкция на водопроводни и канализационни мрежи, пречиствателни станции",
      descriptionEn:
        "Reconstruction of water supply and sewerage networks, treatment plants",
      heroImageUrl: null,
      contentBg:
        "Реконструкция на улични водопроводи и канализация, изграждане на пречиствателни станции за питейни води.",
      contentEn:
        "Reconstruction of street water supply and sewerage, construction of drinking water treatment plants.",
      iconName: "Droplets",
      order: 1,
    },
    {
      titleBg: "Жилищно и сградно строителство",
      titleEn: "Residential & Building Construction",
      slug: "residential-building-construction",
      descriptionBg:
        "Изграждане на многофамилни жилищни сгради и апартаментни комплекси",
      descriptionEn:
        "Construction of multi-family residential buildings and apartment complexes",
      heroImageUrl: null,
      contentBg:
        "Изпълнение на жилищни сгради - многофамилни блокове и апартаментни комплекси.",
      contentEn:
        "Execution of residential buildings - multi-family blocks and apartment complexes.",
      iconName: "Building2",
      order: 2,
    },
    {
      titleBg: "Енергийна ефективност",
      titleEn: "Energy Efficiency",
      slug: "energy-efficiency",
      descriptionBg:
        "Саниране, топлоизолация и мерки за енергийна ефективност на сгради",
      descriptionEn:
        "Renovation, insulation and energy efficiency measures for buildings",
      heroImageUrl: null,
      contentBg:
        "Професионално саниране и енергийно обновяване на жилищни и обществени сгради.",
      contentEn:
        "Professional renovation and energy upgrading of residential and public buildings.",
      iconName: "Zap",
      order: 3,
    },
    {
      titleBg: "Благоустройство и озеленяване",
      titleEn: "Landscaping & Greenery",
      slug: "landscaping-greenery",
      descriptionBg:
        "Парково строителство, детски площадки, спортни площадки и благоустрояване",
      descriptionEn:
        "Park construction, playgrounds, sports facilities and landscaping",
      heroImageUrl: null,
      contentBg:
        "Обновяване на паркове, изграждане на открити детски и спортни площадки, благоустрояване на жилищни територии.",
      contentEn:
        "Park renovation, construction of outdoor playgrounds and sports facilities, landscaping of residential areas.",
      iconName: "Trees",
      order: 4,
    },
    {
      titleBg: "Сгради и съоръжения за обществено ползване",
      titleEn: "Public Buildings & Facilities",
      slug: "public-buildings-facilities",
      descriptionBg:
        "Спортни зали, училища, читалища, административни сгради, музеи и културни центрове",
      descriptionEn:
        "Sports halls, schools, community centers, administrative buildings, museums and cultural centers",
      heroImageUrl: null,
      contentBg:
        "Изграждане и ремонт на обществени сгради - спортни зали, училища, читалища, музеи и административни сгради.",
      contentEn:
        "Construction and renovation of public buildings - sports halls, schools, community centers, museums and administrative buildings.",
      iconName: "Building",
      order: 5,
    },
    {
      titleBg: "ОВК системи и вентилзации",
      titleEn: "HVAC & Ventilation Systems",
      slug: "hvac-ventilation",
      descriptionBg:
        "Отоплителни инсталации, геотермални инсталации и газоснабдяване",
      descriptionEn: "Heating installations, geothermal systems and gas supply",
      heroImageUrl: null,
      contentBg:
        "Монтаж на отоплителни инсталации, изграждане на геотермални системи и газорегулиращи станции.",
      contentEn:
        "Installation of heating systems, construction of geothermal installations and gas regulation stations.",
      iconName: "Wind",
      order: 6,
    },
    {
      titleBg: "Съоръжения и инсталации за третиране на отпадъци",
      titleEn: "Waste Treatment Facilities",
      slug: "waste-treatment-facilities",
      descriptionBg:
        "Депа за битови отпадъци, рекултивация и площадки за биологично третиране",
      descriptionEn:
        "Municipal waste landfills, reclamation and biological treatment facilities",
      heroImageUrl: null,
      contentBg:
        "Изграждане на депа за битови отпадъци, рекултивация на съществуващи депа и площадки за биологично третиране.",
      contentEn:
        "Construction of municipal waste landfills, reclamation of existing landfills and biological treatment facilities.",
      iconName: "Recycle",
      order: 7,
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }
  console.log("✅ Created 8 categories");
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
