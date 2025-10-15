# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Business CMS for a Bulgarian construction company built as dual Next.js applications in a monorepo. The system allows the company to showcase their construction projects to potential clients while providing an admin interface for employees to manage content.

## Architecture

Dual Next.js application approach:

**Public Website** (`apps/website`):

- Client-facing website optimized for visual impact and SEO
- Static Site Generation (SSG) for fast loading
- Project galleries with optimized images
- Contact form for lead generation
- Deployed on Vercel

**Admin Dashboard** (`apps/admin`):

- Employee dashboard optimized for content management workflows
- Full-stack Next.js with API routes
- Authentication system
- Image upload and project management
- Deployed on Railway with PostgreSQL

## Tech Stack

**Frontend:**
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 + CSS custom properties
- **UI Components**: shadcn/ui (shared in monorepo)
- **Form Handling**: React Hook Form + Zod validation
- **Notifications**: Sonner (toast notifications)
- **Carousel**: Embla Carousel

**Backend:**
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js v5 (admin only)
- **File Storage**: Cloudinary (free tier)
- **Email**: Resend.com (contact form notifications)

**Deployment Architecture:**
- **Public Website**: Vercel (Static Site Generation)
- **Admin Dashboard**: Railway (Full-stack Next.js with API routes)
- **Database**: Railway PostgreSQL
- **File Storage**: Cloudinary CDN

## Project Structure

```
business-cms/
├── apps/
│   ├── website/               # Client website (Next.js)
│   │   ├── app/
│   │   │   ├── layout.tsx     # Root layout with nav/footer
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── contact/       # Contact form
│   │   │   └── components/    # App-specific components
│   │   ├── next.config.ts     # Next.js configuration
│   │   ├── postcss.config.mjs # Tailwind v4 PostCSS config
│   │   ├── tsconfig.json      # TypeScript config
│   │   └── package.json       # App dependencies
│   └── admin/                 # Admin dashboard (to be created)
├── packages/
│   ├── database/              # Shared database package (@repo/database)
│   │   ├── prisma/
│   │   │   ├── schema.prisma  # Database schema
│   │   │   └── seed.ts        # Seed data script
│   │   ├── index.ts           # Prisma client export
│   │   ├── tsconfig.json      # TypeScript config
│   │   └── package.json       # Package dependencies
│   └── ui/                    # Shared frontend package (@repo/ui)
│       ├── components/        # shadcn/ui components
│       │   ├── button.tsx
│       │   ├── input.tsx
│       │   ├── textarea.tsx
│       │   ├── label.tsx
│       │   └── form.tsx
│       ├── validation/        # Zod validation schemas
│       │   ├── index.ts
│       │   └── schemas/
│       │       └── contact.ts
│       ├── lib/
│       │   └── utils.ts       # cn() utility
│       ├── base.css           # Tailwind v4 theme + CSS variables
│       ├── components.json    # shadcn CLI config
│       ├── tsconfig.json      # TypeScript config
│       └── package.json       # Package exports & dependencies
├── CLAUDE.md                  # Project instructions for Claude
└── tasks.md                   # Development roadmap and progress
```

## Data Models

**Core entities:**

- **User**: Admin users for authentication (id, email, password hash, name, role, createdAt, updatedAt)
- **Project**: Construction projects (id, title, slug, description, year, location, clientId, size, status, featured, createdAt, updatedAt)
- **ProjectImage**: Images for projects (id, projectId, cloudinaryId, url, width, height, order, caption, createdAt)
- **Category**: Service categories (id, name, slug, description, icon, order)
- **ProjectCategory**: Many-to-many relation between projects and categories (projectId, categoryId)
- **Client**: Client companies (id, name, logo, website, featured, order, createdAt, updatedAt)
- **Certificate**: Quality certifications (id, name, type, issuer, issueDate, expiryDate, fileUrl, thumbnail, order, createdAt)
- **Equipment**: Company machinery (id, name, type, description, specifications, imageUrl, createdAt, updatedAt)
- **ContactSubmission**: Lead capture from contact form (id, name, email, phone, company, message, status, createdAt, updatedAt)
- **SiteSetting**: Key-value store for site configuration (id, key, value, type, description, updatedAt)

## Development Commands

```bash
# Install dependencies for all workspaces
npm install

# Run website in development
npm run dev:website

# Run admin dashboard in development
npm run dev:admin

# Build for production
npm run build:website
npm run build:admin

# Add shadcn components
cd packages/ui
npx shadcn@latest add [component-name]
```

## Key Features

- **Monorepo architecture**: Shared UI components and validation across apps
- **Tailwind CSS v4**: Modern styling with `@source` directives for monorepo support
- **shadcn/ui integration**: Properly configured for monorepo with `components.json`
- **Type-safe forms**: React Hook Form + Zod validation in shared package
- **Image optimization**: Automatic WebP conversion and responsive images
- **SEO optimization**: Static generation with proper meta tags for local search
- **Mobile responsive**: Construction projects viewable on all devices
- **Performance**: Fast loading times critical for user engagement

## Important Setup Notes

### Tailwind v4 + Monorepo
The project uses Tailwind CSS v4 which requires special configuration in monorepos:

**In `apps/website/app/globals.css`:**
```css
@import "@repo/ui/base.css";

/* Critical: Tell Tailwind where to scan for classes */
@source "../../**/*.{ts,tsx,js,jsx}";
@source "../../../packages/ui/**/*.{ts,tsx,js,jsx}";
```

The `@source` directives are **required** for Tailwind to generate CSS for classes used in the shared `packages/ui` package. Without them, components will render without styling.

### Shared UI Package
All UI components, validation schemas, and base styles live in `packages/ui` (`@repo/ui`):
- Components can be added via shadcn CLI from `packages/ui` directory
- Both apps import from `@repo/ui/components/*` and `@repo/ui/validation`
- CSS variables and Tailwind theme defined in `packages/ui/base.css`

## Admin Dashboard Implementation Plan

### Phase 1: Foundation
**Database Setup:**
- Set up Railway PostgreSQL database
- Create `packages/database` shared package
- Design comprehensive Prisma schema with all 9 entities (User, Project, ProjectImage, Category, ProjectCategory, Client, Certificate, Equipment, ContactSubmission, SiteSetting)
- Run initial migration
- Create seed script with 134+ projects across all 5 categories

### Phase 2: Admin App Scaffold
**Next.js Admin Application:**
- Create `apps/admin` Next.js app with App Router
- Configure Tailwind CSS v4 with monorepo support
- Set up NextAuth.js v5 with credentials provider
- Create login page with authentication
- Implement middleware for protected routes
- Build admin sidebar layout with navigation

### Phase 3: Core CRUD for Projects
**Project Management:**
- Projects list page with pagination, search, and category filtering
- Create project form with all fields (title, description, categories, year, location, client, size, featured)
- Edit project page with existing data
- Delete project with confirmation modal
- Cloudinary integration for image uploads
- Image gallery management (upload, delete, reorder, captions)

### Phase 4: Additional Entities
**Content Management:**
- Categories CRUD (add, edit, delete, reorder service categories)
- Clients CRUD (upload logos, manage client information, set featured clients, reorder)
- Certificates CRUD (upload PDFs/images, manage certification details, set expiry dates, reorder)
- Equipment CRUD (add machinery, upload images, manage specifications)
- Contact submissions viewer (read-only list with filtering and status updates)
- Site settings editor (key-value pairs for homepage stats, company info, contact details)

### Phase 5: Connect Public Website
**Database Integration:**
- Replace all mock data with Prisma queries using Server Components
- Homepage: Fetch featured projects, client logos, site settings for stats
- Projects page: Query projects with category filtering
- Individual project pages: Fetch project details with images
- Quality page: Fetch certificates
- Equipment page: Fetch machinery list
- Implement proper error handling and loading states
