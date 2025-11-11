# TODO - Radex Metal Website Redesign

**Project:** radex-metal
**Last Updated:** 2025-11-11
**Status:** Documentation Complete, Ready for Implementation

---

## Phase 1: MVP Implementation (94-130 hours, 2-3 weeks)

### Sprint 1: Setup & Structure (Days 1-2) - 16-20 hours
- [ ] Clone Vercel Odyssey template
- [ ] Initialize Next.js 14+ with TypeScript
- [ ] Configure Tailwind with industrial theme
- [ ] Install fonts (Bebas Neue, Roboto/Inter)
- [ ] Set up project structure (components, lib, types, constants)
- [ ] Configure ESLint and Prettier
- [ ] Create .env.local with email service credentials

### Sprint 2: Hero & About Sections (Days 3-4) - 18-24 hours
- [ ] Build HeroSection component with parallax
- [ ] Add CTA buttons with smooth scroll
- [ ] Build AboutSection component (two-column layout)
- [ ] Implement animated stats counter (41 years)
- [ ] Add fade-in animations using Framer Motion
- [ ] Test responsiveness (desktop, tablet, mobile)

### Sprint 3: Services Section (Days 5-7) - 24-32 hours
- [ ] Build ServicesSection component (2x2 grid)
- [ ] Create service cards (Balustrady, Bramy, Ogrodzenia, Jachty)
- [ ] Add hover effects and animations
- [ ] Create constants/services.ts with content
- [ ] Optimize service images (WebP + JPEG fallback)
- [ ] Test mobile layout (1 column)

### Sprint 4: Gallery with Lightbox (Days 8-9) - 28-36 hours
- [ ] Collect/optimize 8-12 gallery images
- [ ] Build GallerySection component (masonry grid)
- [ ] Create Lightbox component with:
  - [ ] Full-screen overlay
  - [ ] Navigation (prev/next/close)
  - [ ] Keyboard controls (ESC, arrows)
  - [ ] Touch/swipe support
- [ ] Implement lazy loading
- [ ] Create constants/gallery.ts with image data

### Sprint 5: Contact Form & Map (Days 10-11) - 36-48 hours
- [ ] Build ContactForm component with 7 fields
- [ ] Create FileUpload component (3 files, 5MB each, JPG/PNG/PDF)
- [ ] Implement frontend validation (Polish error messages)
- [ ] Create /api/contact/route.ts API endpoint
- [ ] Set up email service (Resend/Nodemailer/SendGrid)
- [ ] Implement rate limiting (5 submissions/hour per IP)
- [ ] Embed Google Maps (ul. Cecorska 10, Słupsk)
- [ ] Add contact information section

### Sprint 6: Navigation & Footer (Day 12) - 14-18 hours
- [ ] Build sticky navigation with smooth scroll
- [ ] Implement mobile hamburger menu
- [ ] Add active section highlighting
- [ ] Build footer (3-column layout)
- [ ] Add copyright and contact info

### Sprint 7: Polish & Optimization (Days 13-14) - 18-24 hours
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Responsiveness testing (all devices)
- [ ] Run Lighthouse audit (target >90 all metrics)
- [ ] Optimize images (<500KB each)
- [ ] Implement lazy loading
- [ ] Add SEO meta tags and Schema.org markup
- [ ] Accessibility check (WCAG AA)
- [ ] Fix all bugs

### Sprint 8: Deployment (Day 15) - 4-6 hours
- [ ] Set up Vercel project
- [ ] Configure environment variables
- [ ] Update DNS records for radexmetal.com
- [ ] Deploy to production
- [ ] Verify HTTPS/SSL
- [ ] Test all functionality on live site
- [ ] Document deployment process

---

## MVP Verification Checklist

### Functional Requirements
- [ ] Hero section with parallax and CTAs
- [ ] About section with stats animation
- [ ] Services section (4 categories)
- [ ] Gallery (8-12 images) with lightbox
- [ ] Contact form (7 fields + file upload)
- [ ] Google Maps embedded
- [ ] Sticky navigation with smooth scroll
- [ ] Mobile hamburger menu
- [ ] Footer with contact info
- [ ] RODO compliance

### Performance Targets
- [ ] Page load time <3 seconds
- [ ] Lighthouse Performance >90
- [ ] Lighthouse Accessibility >90
- [ ] Lighthouse SEO >90
- [ ] First Contentful Paint <1.5s
- [ ] Largest Contentful Paint <2.5s

### Responsiveness
- [ ] Desktop (1920px - 1024px)
- [ ] Tablet (1024px - 768px)
- [ ] Mobile (<768px)
- [ ] Touch targets ≥44x44px

---

## Phase 2: Enhanced Features (72-94 hours, 2-3 weeks)

- [ ] Gallery filtering by category (6-8 hours)
- [ ] Multi-step quote form (20-24 hours)
- [ ] Price calculator (12-16 hours)
- [ ] Live chat integration (4-6 hours)
- [ ] Analytics (GA4 + Clarity) (8-10 hours)
- [ ] Consultation booking system (12-16 hours)
- [ ] Testimonials carousel (10-14 hours)

---

## Phase 3: Admin & CMS (114-150 hours, 3-4 weeks)

- [ ] Database implementation (Supabase) (24-32 hours)
- [ ] Admin panel with NextAuth.js (30-40 hours)
- [ ] CMS integration (Sanity/Contentful) (40-50 hours)
- [ ] User management system (20-28 hours)

---

## ✅ Completed

- [x] Project initialization via `/claude-config-init` - 2025-11-11
- [x] Complete PRD (1607 lines) - 2025-11-11
- [x] Architecture documentation (docs/architecture.md) - 2025-11-11
- [x] API specification (docs/API.md) - 2025-11-11
- [x] Database schema (docs/db-schema.md) - 2025-11-11
- [x] Feature breakdown (docs/features.md) - 2025-11-11
- [x] README.md with project overview - 2025-11-11
- [x] CHANGELOG.md with v0.1.0 entry - 2025-11-11
- [x] Design system documentation - 2025-11-11
- [x] Testing strategy documentation - 2025-11-11
- [x] Code conventions documentation - 2025-11-11
- [x] Development roadmap - 2025-11-11
- [x] Architectural decisions log - 2025-11-11
- [x] .env.example template - 2025-11-11
- [x] CLAUDE.md with project context - 2025-11-11

---

## 📊 Summary

**Total MVP Effort:** 94-130 hours (2-3 weeks)
**Total Phase 2 Effort:** 72-94 hours (2-3 weeks)
**Total Phase 3 Effort:** 114-150 hours (3-4 weeks)

**Grand Total:** 280-374 hours (7-9 weeks)

**Current Status:** Documentation complete, ready to begin Sprint 1 implementation.

---

## 📝 Notes

**Email Service Options:**
1. **Resend** (Recommended) - Modern API, 100 emails/day free
2. **Nodemailer + Gmail SMTP** - Free, full control
3. **SendGrid** - Reliable, analytics included

**Image Assets Needed:**
- Hero background (welding/steel work)
- About section image (workshop)
- 4 service images (balustrady, bramy, ogrodzenia, jachty)
- 8-12 gallery images (project photos)

**Deployment:**
- Platform: Vercel
- Domain: radexmetal.com
- SSL: Automatic (Vercel)
- CI/CD: Automatic on Git push
