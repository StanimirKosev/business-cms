# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Business CMS for a Bulgarian construction company built as dual Next.js applications in a monorepo. The system allows the company to showcase their construction projects to potential clients while providing an admin interface for employees to manage content.

## Architecture

Dual Next.js application approach:

**Public Site** (`apps/public-site`):

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
- **Styling**: Tailwind CSS + CSS custom properties
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js v5 (admin only)
- **File Storage**: Cloudinary (free tier)
- **Email**: Resend.com (contact form notifications)
- **Deployment**: Vercel (public) + Railway (admin + database)

## Project Structure

```
business-cms/
├── apps/
│   ├── public-site/           # Client website (Next.js)
│   │   ├── app/
│   │   │   ├── layout.tsx     # Root layout with nav/footer
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── projects/      # Project showcase pages
│   │   │   ├── about/         # Company information
│   │   │   ├── contact/       # Contact form
│   │   │   └── components/    # App-specific components
│   │   └── public/            # App-specific static assets
│   └── admin/                 # Admin dashboard (to be created)
├── packages/
│   ├── database/              # Prisma schema and migrations
│   ├── types/                 # TypeScript interfaces
│   ├── api/                   # API functions by domain
│   ├── ui/                    # Shared React components
│   └── utils/                 # Utility functions
├── shared-assets/             # Company branding, shared icons
├── scripts/                   # Database setup, deployment scripts
├── docs/                      # API docs, deployment guides
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

# Run public site in development
npm run dev:public

# Run admin dashboard in development
npm run dev:admin
```

## Key Features

- **Image optimization**: Automatic WebP conversion and responsive images
- **SEO optimization**: Static generation with proper meta tags for local search
- **Mobile responsive**: Construction projects viewable on all devices
- **Admin workflow**: Simple content management for non-technical users
- **Performance**: Fast loading times critical for user engagement
