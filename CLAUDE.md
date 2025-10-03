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

- **Frontend Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 + CSS custom properties
- **UI Components**: shadcn/ui (shared in monorepo)
- **Form Handling**: React Hook Form + Zod validation
- **Notifications**: Sonner (toast notifications)
- **Carousel**: Embla Carousel
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js v5 (admin only)
- **File Storage**: Cloudinary (free tier)
- **Email**: Resend.com (contact form notifications)
- **Deployment**: Vercel (public) + Railway (admin + database)

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

- **Projects**: Construction projects with title, description, images, status
- **Images**: Project images stored on Cloudinary with metadata
- **Users**: Admin authentication for content management
- **ContactSubmissions**: Lead capture from contact form

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
