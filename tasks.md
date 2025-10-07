# Business CMS - Development Tasks

## Design System

**Color Palette:**

- **Construction Red** `#C62828` - Use sparingly: buttons, hover states, key headings, brand iconography
- **Concrete Grey** `#E0E0E0` or `#F2F2F2` - Background surfaces
- **Charcoal/Graphite** `#212121` or `#2C2C2C` - Primary text
- **White** `#FFFFFF` - Clean negative space

**Usage Guidelines:**

- Backgrounds: light greys and white (air, clarity)
- Text: charcoal (easy to read, clean)
- UI elements: subtle steel greys for dividers, borders
- Highlights/buttons/links: red
- Hover/states: red + muted grey-blue

---

## Information Architecture

**Main Navigation (4 items):**

- Начало (Homepage)
- Проекти (Projects page)
- Качество (Quality page)
- Контакти (Contact page)

**Footer Only:**

- Механизация (Equipment page - hidden from main nav)

**Removed Pages (integrated into homepage):**

- Дейности/Услуги → Homepage "Нашите услуги" section
- Клиенти → Homepage client logos section
- Individual service pages → Merged into Projects with filters

---

## ✅ COMPLETED

**Infrastructure:**

- [x] Monorepo setup with Turborepo
- [x] Next.js website app (`apps/website`)
- [x] Shared UI package (`packages/ui` / `@repo/ui`)
- [x] Tailwind CSS v4 with monorepo `@source` directives
- [x] shadcn/ui integration

**Components:**

- [x] Header with sticky navigation (4-item nav)
- [x] Footer component
- [x] Hero carousel with Embla Carousel
- [x] Ken Burns zoom animation
- [x] Carousel navigation (arrows, dots, progress bar)
- [x] Scroll chevron indicator
- [x] shadcn components: Button, Input, Textarea, Label, Form

**Pages:**

- [x] Contact page with React Hook Form + Zod validation
- [x] Contact form backend API route
- [x] Email integration with Resend
- [x] Server-side validation
- [x] Sonner toast notifications

---

## 📋 REMAINING TASKS

### Phase 1: Homepage Completion

**Homepage Section Order:**

1. Hero Carousel ✅ (Completed)
2. Stats Bar / За нас ✅ (About)
3. Наши Проекти ✅ (Featured Projects)
4. Нашите Услуги (Services)
5. Клиенти (Client Logos)
6. Footer ✅ (Completed)

---

**Stats Bar / За нас Section**

- [x] Stats bar component (4 stats: Founded, Clients, Projects, Awards)
- [x] Scroll animation (count-up effect optional)
- [x] 2-3 sentence company intro text
- [x] Optional: Company image or team photo

**Наши Проекти (Featured Projects Preview)**

- [ ] Featured projects grid component (show 6 most featured)
- [ ] ProjectCard component (image, title, category tag)
- [ ] "Всички проекти" button linking to `/projects`
- [ ] Mock data for 6 Featured projects

**Нашите Услуги (Services Grid)**

- [ ] Services grid component (6-8 service cards)
- [ ] Service cards with icon, name, 1-sentence description
- [ ] Services: Проектиране, Строителство, Управление на проекти, Реконструкции, Вентилация, Механизация
- [ ] No "Вижте повече" links (overview only)
- [ ] Hover effects (card lift, shadow)

**Нашите Клиенти (Client Logos)**

- [ ] Client logo grid component (12-20 logos)
- [ ] Grayscale logos with color on hover
- [ ] 4-6 logos per row, responsive
- [ ] Section title: "Доверени от водещи компании"

---

### Phase 2: Projects Page

**Projects List Page (`/projects`)**

- [ ] Category filter bar component
- [ ] Filter categories: Всички, Жилищно, Офис, Промишлени, Обществени, Инфраструктура, Реконструкции, Други
- [ ] Masonry/grid layout for all projects (100+)
- [ ] ProjectCard component (reuse from homepage)
- [ ] Filter functionality (client-side for now)
- [ ] Mock data for 20+ projects across categories

**Individual Project Page (`/projects/[slug]`)**

- [ ] Project page layout component
- [ ] Hero image (large, full-width)
- [ ] Project header (title, category tag, year)
- [ ] Description section
- [ ] Image gallery grid with lightbox
- [ ] Details sidebar (Location, Client, Size, Completion date)
- [ ] Related projects section (3-4 cards)
- [ ] Mock data for 5+ individual projects

---

### Phase 3: Quality Page

**Качество Page (`/quality`)**

- [ ] Quality page layout
- [ ] Quality Standards section (ISO certifications, safety protocols)
- [ ] Сертификати section (certificate grid, downloadable PDFs/images)
- [ ] Process Overview section (optional timeline graphic)
- [ ] Mock certificate images

---

### Phase 4: Equipment Page

**Механизация Page (`/equipment`)** - Footer link only

- [ ] Equipment page layout (simple)
- [ ] Equipment grid (photos + specs)
- [ ] Equipment name and specifications
- [ ] Mock equipment data (5-10 items)

---

### Phase 5: Database + Admin Setup

**Database Schema**

- [ ] Design Prisma schema (Projects, Images, Categories, Users, ContactSubmissions, Clients, Certificates, Equipment)
- [ ] Set up PostgreSQL (local Docker or Railway)
- [ ] Initialize Prisma, run migrations
- [ ] Create seed script for test data

**Admin App (`apps/admin`)**

- [ ] Create Next.js admin app
- [ ] Admin dashboard layout
- [ ] NextAuth.js v5 setup (credentials provider)
- [ ] Protected routes middleware
- [ ] Create seed user

**Admin CRUD - Projects**

- [ ] Projects list page (table with search/filter)
- [ ] Create project form (title, description, category, year, location, client, size)
- [ ] Edit project page
- [ ] Delete project confirmation
- [ ] Image upload with Cloudinary integration
- [ ] Image gallery management (add, remove, reorder)

**Admin CRUD - Other Entities**

- [ ] Client logos management (upload, edit, delete)
- [ ] Certificates management (upload PDFs/images, organize by type)
- [ ] Equipment management (add, edit, delete)
- [ ] Contact form submissions viewer (read-only)

**Admin Settings**

- [ ] Homepage stats editor (Founded year, Clients count, Projects count, Awards count)
- [ ] Company info editor (About text, contact details)

---

### Phase 6: Integration + Polish

**Connect Frontend to Database**

- [ ] Replace mock data with Prisma queries (Server Components)
- [ ] Create API routes for admin mutations
- [ ] Homepage: Fetch recent projects, client logos, stats
- [ ] Projects page: Fetch all projects with category filtering
- [ ] Quality page: Fetch certificates
- [ ] Equipment page: Fetch equipment list

**Mobile Optimization**

- [ ] Test all pages on mobile (375px, 768px, 1024px)
- [ ] Hamburger menu for mobile navigation
- [ ] Touch-friendly carousel controls
- [ ] Responsive grids and images
- [ ] Mobile-friendly forms

**SEO + Performance**

- [ ] Generate static pages with SSG where possible
- [ ] Add metadata to all pages (title, description, OG tags)
- [ ] Image optimization (WebP conversion, responsive images)
- [ ] Lighthouse audit (aim for 90+ scores)
- [ ] Sitemap generation
- [ ] robots.txt

---

### Phase 7: Deployment

**Production Setup**

- [ ] Set up Railway account
- [ ] Deploy PostgreSQL to Railway
- [ ] Deploy admin app to Railway (with DATABASE_URL)
- [ ] Set up Cloudinary production account
- [ ] Set up Resend production API key
- [ ] Configure environment variables for production

**Website Deployment**

- [ ] Deploy website to Vercel
- [ ] Configure domain (if available)
- [ ] Set up environment variables on Vercel
- [ ] Test contact form in production
- [ ] Test admin panel in production

**Final Testing**

- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS Safari, Android Chrome)
- [ ] Admin workflow testing (create, edit, delete projects)
- [ ] Contact form email delivery testing
- [ ] Image upload testing (Cloudinary)
- [ ] Performance testing (Core Web Vitals)

---

## Optional Enhancements (Future)

**Homepage:**

- Bento grid layout for project categories

**Projects Page:**

- Server-side pagination for large project lists
- Search functionality (by title, client, location)
- Sort options (date, category, title)
- Project comparison feature

**Admin Panel:**

- Bulk upload for projects/images
- Analytics dashboard (page views, contact form submissions)
- Draft/publish workflow for projects
- Image optimization on upload (auto-resize, compress)

**General:**

- Multi-language support (Bulgarian + English)
- Dark mode toggle
- Print-friendly project pages
- PDF export for project details
