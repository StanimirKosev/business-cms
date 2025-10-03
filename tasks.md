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

## Current Progress

**✅ COMPLETED:**
- [x] Project structure and monorepo setup
- [x] Next.js website application created (`apps/website`)
- [x] Shared UI package setup (`packages/ui` / `@repo/ui`)
- [x] Tailwind CSS v4 with monorepo `@source` directives
- [x] shadcn/ui integration with `components.json`
- [x] Basic layout.tsx with SEO metadata configured
- [x] Default boilerplate cleaned up
- [x] Architecture decisions finalized
- [x] Header component with sticky navigation and link underline effects
- [x] Footer component
- [x] Design system with CSS custom properties (brand colors, overlays)
- [x] Hero carousel with Embla Carousel implementation
- [x] Ken Burns zoom animation (subtle 8% scale)
- [x] Carousel navigation (arrows, dots, progress bar)
- [x] Scroll chevron indicator with smooth scroll
- [x] ChevronButton reusable component
- [x] Contact form page with React Hook Form + Zod validation
- [x] Sonner toast notifications
- [x] Shared validation schemas (`@repo/ui/validation`)
- [x] shadcn components: Button, Input, Textarea, Label, Form

**🔄 IN PROGRESS:**
- [ ] Homepage remaining sections (Stats Bar, Project Categories, etc.)
- [ ] Contact form backend (API route + email sending)

**📋 REMAINING TASKS:**

## Week 1: Public Site (Static)

### Homepage (PRIORITY)

**Page Structure (top to bottom):**

1. **Header**
   - Logo (left)
   - Navigation: Начало | Проекти | Контакти
   - Sticky on scroll

2. **Hero Carousel**
   - Full-width image slider (3-5 project images)
   - Text overlay: company tagline (short, punchy)
   - Auto-play with manual controls
   - Use Embla Carousel or similar

3. **Stats Bar**
   - 4 stats in a row: "Основана през 2011 | 300+ Клиенти | 200+ Завършени проекта | 30+ Награди"
   - Icons for each stat
   - Subtle animation on scroll

4. **Project Categories Grid**
   - Flexible grid (not fixed to 6 items)
   - Each card: category image + name overlay
   - Hover effect (slight zoom, overlay darkens)
   - Click → filters projects page by category
   - "Всички проекти" button below grid

5. **About Section ("За нас")**
   - 2 columns: text (left) + image (right)
   - 2-3 sentences max
   - Simple, clean layout
   - Include: "Разполагаме с висококвалифицирани инженери и икономисти в проектирането, ръководството и контрола на строителството, маркетинга и техническия анализ, финансово-счетоводната и икономическата дейност"

6. **Services Grid ("Нашите услуги")**
   - Flexible grid (3-4 items per row)
   - Each card: icon + service name + 1 sentence
   - Clean, minimal design
   - Include: "Дружеството разполага с необходимата за дейността си съвременна тежка и лека механизация, транспортна и подемна техника, автотранспорт."

7. **Floating Contact Button**
   - Fixed position (bottom-right)
   - Clicking shows modal/popover with:
     - Phone number
     - Email address
     - "Изпрати запитване" button → links to /contact
   - Always visible on all pages

8. **Footer**
   - Minimal: Quick links | Copyright | Social icons (if provided)

**Components to build:**
- [x] Header with sticky navigation ✅
- [x] Hero carousel component (Embla Carousel) ✅
  - [x] Autoplay with manual controls
  - [x] Ken Burns zoom animation
  - [x] Navigation arrows (below text)
  - [x] Dot indicators (right side, vertically centered)
  - [x] Progress bar at bottom
  - [x] Scroll chevron with smooth scroll functionality
- [ ] Stats bar with animation
- [ ] Project categories grid
- [ ] About section (2-column layout)
- [ ] Services grid
- [ ] Floating contact button + modal
- [ ] Footer component
- [ ] Clients grid component (logo grid pattern) - TBD placement

### Other Public Site Tasks
- [ ] Create Next.js public-site app
- [ ] Library selection and installation
- [ ] Navigation and footer components
- [ ] Create ProjectCard component
- [ ] Build projects list page (with mock data)
- [ ] Build individual project page
- [ ] Create contact form (no backend yet)
- [ ] Make it responsive
- [ ] Deploy to Vercel (optional, for demo)

## Week 2: Database + Admin Foundation

- [ ] Design Prisma schema based on public site needs
- [ ] Set up local PostgreSQL (Docker)
- [ ] Initialize Prisma, run migrations
- [ ] Create admin Next.js app
- [ ] Set up NextAuth (local testing)
- [ ] Create seed script (test user)

## Week 3: Admin CRUD

- [ ] Build admin dashboard layout
- [ ] Projects list + create/edit pages
- [ ] Set up Cloudinary
- [ ] Image upload component
- [ ] Connect admin to local DB
- [ ] Test: Add project in admin → appears on public site

## Week 4: Deploy + Polish

- [ ] Set up Railway account
- [ ] Deploy admin + DB to Railway
- [ ] Update public site to fetch from Railway API
- [ ] Set up Resend for contact form emails
- [ ] Final testing
- [ ] Client handoff

---

## UI Enhancement Ideas (Optional/Future)

**Hero Carousel:**
- Parallax effect on scroll (image moves slower than content)
- Dark gradient overlay (bottom-up) for text readability
- Large bold typography for tagline ("Строим вашето бъдеще")
- Subtle ken burns effect (slow zoom on images)
- Dots navigation + prev/next arrows

**Stats Bar:**
- Glass morphism style (semi-transparent, blur background)
- Count-up animation when scrolls into view (300 → counts up to 300+)
- Icons from construction (hard hat, building, trophy, handshake)
- Vertical dividers between stats
- Hover effect - stat grows slightly

**Project Categories Grid:**
- Masonry layout (Pinterest-style, not rigid grid) OR Bento grid (varied sizes)
- Image fills card with dark overlay
- Category name appears on hover (slides up from bottom)
- Subtle border glow on hover
- Optional: First card could be larger (featured category)

**About Section:**
- Image on right: team photo or construction site (add subtle border/shadow)
- Timeline graphic beside text? (2011 → Today with milestones)
- Pull quote style for key sentence ("Качество е нашият приоритет")
- Simple, confident tone - no fluff

**Services Grid:**
- Icon in colored circle (brand color)
- Card lifts on hover (shadow grows)
- Each card has accent color (different shade per service)
- Optional: Diagonal cut on card corners (modern look)

**Floating Contact Button:**
- Pulsing animation (subtle, draws attention)
- Phone icon (universally recognized)
- Tooltip on hover ("Свържете се с нас")
- Modal slides from bottom (not popup) with phone/email
- WhatsApp icon? (if they use it for business)
