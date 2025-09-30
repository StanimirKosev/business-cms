# Business CMS - Development Tasks

## Current Progress

**✅ COMPLETED:**
- [x] Project structure and monorepo setup
- [x] Next.js public-site application created
- [x] Basic layout.tsx with SEO metadata configured
- [x] Default boilerplate cleaned up
- [x] Architecture decisions finalized

**🔄 IN PROGRESS:**
- [ ] Library selection and installation
- [ ] Homepage design and layout
- [ ] Navigation and footer components

**📋 REMAINING TASKS:**

## Week 1: Public Site (Static)

- [ ] Create Next.js public-site app
- [ ] Design homepage layout
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
