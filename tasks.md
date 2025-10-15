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

- [ ] Services grid component (5 service cards)
- [ ] Service cards with icon, name, 1-sentence description
- [ ] Services (Дейности):
  1. **Стоманобетонни и метални конструкции** - Изграждане на конструктивната рамка на сгради и съоръжения
  2. **Саниране и рехабилитация** - Енергийно обновяване, ремонт на фасади и покриви, хидро- и топлоизолации
  3. **Инженерно-укрепителни и хидросъоръжения** - Изпълнение на укрепителни съоръжения, подпорни стени, водни и подемни инсталации
  4. **Инсталации – Ел, ВиК, ОВК** - Цялостно изграждане на електро, водопроводни, канализационни, отоплителни, вентилационни и климатични системи
  5. **Пътно строителство и инфраструктура** - Изграждане и рехабилитация на пътища, прилежаща инфраструктура, вертикална планировка и озеленяване
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

- [x] Hero section with scroll animations
- [x] Horizontal sticky navigation with auto-scroll tracking
- [x] Service sections with sticky image and scrollable cards
- [x] Filter categories (Дейности):
  1. Стоманобетонни и метални конструкции
  2. Саниране и рехабилитация
  3. Инженерно-укрепителни и хидросъоръжения
  4. Инсталации – Ел, ВиК, ОВК
  5. Пътно строителство и инфраструктура
- [x] ProjectCard component with variant support (default, service, service-mobile)
- [x] Intersection Observer scroll detection with viewport center calculation
- [x] Mobile-optimized navigation and full-width service cards
- [x] Custom scrollbar styling
- [x] Mock data for 20+ projects across categories

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

### Phase 5: Database + Admin Setup ⏳ IN PROGRESS

**Database Schema**

- [ ] Set up Railway PostgreSQL database instance
- [ ] Create `packages/database` shared package with proper configuration
- [ ] Design comprehensive Prisma schema including:
  - User model (id, email, passwordHash, name, role, timestamps)
  - Project model (id, title, slug, description, year, location, clientId, size, status, featured, timestamps)
  - ProjectImage model (id, projectId, cloudinaryId, url, width, height, order, caption, createdAt)
  - Category model (id, name, slug, description, icon, order)
  - ProjectCategory junction table (projectId, categoryId)
  - Client model (id, name, logo, website, featured, order, timestamps)
  - Certificate model (id, name, type, issuer, issueDate, expiryDate, fileUrl, thumbnail, order, createdAt)
  - Equipment model (id, name, type, description, specifications, imageUrl, timestamps)
  - ContactSubmission model (id, name, email, phone, company, message, status, timestamps)
  - SiteSetting model (id, key, value, type, description, updatedAt)
- [ ] Run initial Prisma migration to create database tables
- [ ] Create comprehensive seed script with 134+ projects across all 5 categories
- [ ] Seed categories (5 service categories from design)
- [ ] Seed client logos (12-20 test clients)
- [ ] Seed admin user for testing
- [ ] Export Prisma client from `@repo/database` package

**Admin App Scaffold (`apps/admin`)**

- [ ] Create Next.js 15 admin app with App Router
- [ ] Set up Tailwind CSS v4 with monorepo `@source` directives
- [ ] Configure shared UI package import (`@repo/ui`)
- [ ] Set up NextAuth.js v5 with credentials provider
- [ ] Create login page with form validation
- [ ] Implement authentication middleware for protected routes
- [ ] Create admin dashboard layout with sidebar navigation
- [ ] Add navigation items (Dashboard, Projects, Categories, Clients, Certificates, Equipment, Contacts, Settings)
- [ ] Set up environment variables (DATABASE_URL, NEXTAUTH_SECRET, CLOUDINARY keys)

**Admin CRUD - Projects**

- [ ] Projects list page with:
  - Pagination (20 items per page)
  - Search functionality (by title, location, client)
  - Category filter dropdown (multi-select)
  - Year filter
  - Featured toggle filter
  - Sort options (date, title, year)
- [ ] Create project form with fields:
  - Title (required)
  - Slug (auto-generated, editable)
  - Description (rich text or textarea)
  - Categories (multi-select checkboxes)
  - Year (number input)
  - Location (text input)
  - Client (dropdown select)
  - Size (text input with unit)
  - Status (draft/published)
  - Featured (checkbox)
- [ ] Edit project page (pre-populated form)
- [ ] Delete project with confirmation modal
- [ ] Cloudinary integration for image uploads:
  - Upload multiple images at once
  - Display upload progress
  - Auto-save cloudinaryId and URL
- [ ] Image gallery management:
  - Display all project images
  - Drag-and-drop reordering
  - Delete individual images
  - Add captions to images
  - Set primary image

**Admin CRUD - Categories**

- [ ] Categories list page with reorderable table
- [ ] Create category form (name, slug, description, icon selection, order)
- [ ] Edit category page
- [ ] Delete category with confirmation (check for projects using it)
- [ ] Drag-and-drop reordering

**Admin CRUD - Other Entities**

- [ ] Client logos management:
  - List page with logo thumbnails
  - Create form (name, logo upload via Cloudinary, website URL, featured checkbox, order)
  - Edit form with existing logo preview
  - Delete with confirmation
  - Drag-and-drop reordering
  - Featured clients section
- [ ] Certificates management:
  - List page with certificate previews
  - Create form (name, type, issuer, issue date, expiry date, file upload for PDF/image, thumbnail)
  - Edit form with file preview
  - Delete with confirmation
  - Drag-and-drop reordering
  - Organize by type (ISO, safety, quality)
- [ ] Equipment management:
  - List page with equipment grid
  - Create form (name, type, description, specifications as JSON or textarea, image upload)
  - Edit form with image preview
  - Delete with confirmation
- [ ] Contact form submissions viewer:
  - Read-only list page with all submissions
  - Status filter (new, read, contacted, resolved)
  - Date range filter
  - Search by name, email, company
  - Mark as read/resolved
  - View full submission details
  - Export to CSV option

**Admin Settings**

- [ ] Site settings page with key-value editor for:
  - Homepage stats (foundedYear, clientsCount, projectsCount, awardsCount)
  - Company info (aboutText, contactEmail, contactPhone, address)
  - Social media links
  - SEO defaults (meta description, OG image URL)
- [ ] Settings form with validation
- [ ] Group settings by category (General, Homepage, Contact, SEO)

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
