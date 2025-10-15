import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // 1. Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin User',
    },
  })
  console.log('✅ Created admin user:', admin.email)

  // 2. Create categories (services)
  const categories = [
    {
      name: 'Стоманобетонни и метални конструкции',
      slug: 'steel-concrete-structures',
      description: 'Изграждане на конструктивната рамка на сгради и съоръжения',
      iconName: 'building',
      order: 1,
    },
    {
      name: 'Саниране и рехабилитация',
      slug: 'renovation-rehabilitation',
      description: 'Енергийно обновяване, ремонт на фасади и покриви',
      iconName: 'wrench',
      order: 2,
    },
    {
      name: 'Инженерно-укрепителни и хидросъоръжения',
      slug: 'engineering-hydro',
      description: 'Изпълнение на укрепителни съоръжения и водни системи',
      iconName: 'droplet',
      order: 3,
    },
    {
      name: 'Инсталации – Ел, ВиК, ОВК',
      slug: 'installations',
      description: 'Електро, водопроводни, канализационни и климатични системи',
      iconName: 'zap',
      order: 4,
    },
    {
      name: 'Пътно строителство и инфраструктура',
      slug: 'road-construction',
      description: 'Изграждане и рехабилитация на пътища и инфраструктура',
      iconName: 'road',
      order: 5,
    },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
  }
  console.log('✅ Created 5 categories')

  // 3. Create sample projects
  const steelCategory = await prisma.category.findUnique({
    where: { slug: 'steel-concrete-structures' },
  })
  const renovationCategory = await prisma.category.findUnique({
    where: { slug: 'renovation-rehabilitation' },
  })

  if (steelCategory) {
    await prisma.project.upsert({
      where: { slug: 'multifunctional-building-sofia' },
      update: {},
      create: {
        title: 'Многофункционална сграда София',
        slug: 'multifunctional-building-sofia',
        description:
          'Изграждане на стоманобетонна конструкция на 8-етажна многофункционална сграда в центъра на София. Проектът включва изпълнение на основи, колони, греди и плочи.',
        location: 'София, бул. Витоша',
        client: 'ABC Строй ООД',
        year: 2023,
        size: '8,500 m²',
        featured: true,
        categoryId: steelCategory.id,
      },
    })
  }

  if (renovationCategory) {
    await prisma.project.upsert({
      where: { slug: 'residential-building-renovation' },
      update: {},
      create: {
        title: 'Саниране на жилищна сграда',
        slug: 'residential-building-renovation',
        description:
          'Цялостно саниране и енергийна ефективност на жилищна сграда. Включва топлоизолация на фасада, подмяна на дограма, ремонт на покрив.',
        location: 'Пловдив, ж.к. Тракия',
        client: 'Етажна собственост',
        year: 2024,
        size: '3,200 m²',
        featured: true,
        categoryId: renovationCategory.id,
      },
    })
  }

  console.log('✅ Created 2 sample projects')

  // 4. Create sample clients
  await prisma.client.upsert({
    where: { id: 'sample-client-1' },
    update: {},
    create: {
      id: 'sample-client-1',
      name: 'Client Logo 1',
      logoUrl: 'https://via.placeholder.com/200x100?text=Client+1',
      order: 1,
    },
  })

  await prisma.client.upsert({
    where: { id: 'sample-client-2' },
    update: {},
    create: {
      id: 'sample-client-2',
      name: 'Client Logo 2',
      logoUrl: 'https://via.placeholder.com/200x100?text=Client+2',
      order: 2,
    },
  })

  console.log('✅ Created 2 sample clients')

  // 5. Create site settings
  const settings = [
    { key: 'founded_year', value: '1995' },
    { key: 'total_clients', value: '150' },
    { key: 'total_projects', value: '134' },
    { key: 'awards_count', value: '12' },
    { key: 'company_about', value: 'Водеща строителна компания в България с над 25 години опит.' },
  ]

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    })
  }

  console.log('✅ Created site settings')
  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
