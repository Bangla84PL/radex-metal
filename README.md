# Radex Metal - Website Redesign

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com/)

Modern, industrial-themed website redesign for **Radex Metal** - a Pomorskie welding center with 41 years of experience specializing in steel gates, fences, railings, and yacht fittings.

**Live Site:** [radexmetal.com](https://radexmetal.com)

---

## 📖 Overview

This is a complete website redesign for Radex Metal (est. 1985), built using Vercel's Odyssey template. The project delivers:

- ✅ Modern, industrial aesthetic with metallic accents
- ✅ Fully responsive one-page design with smooth scrolling
- ✅ Professional contact form with image attachments
- ✅ Gallery with lightbox functionality
- ✅ Optimized performance (Lighthouse score >90)
- ✅ Polish language interface with RODO compliance

### Key Features

- **Hero Section** - Full-viewport hero with parallax effects
- **Services Showcase** - 4 main service categories (Railings, Gates, Fences, Yacht Fittings)
- **Project Gallery** - Responsive grid with full-screen lightbox
- **Contact Form** - Multi-field form with file upload (3 files, 5MB each)
- **Google Maps** - Embedded location map
- **Mobile-First** - Optimized for all devices

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Email Service Account** (Resend, Gmail SMTP, or SendGrid)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/radex-metal.git
cd radex-metal

# Install dependencies
npm install
# or
yarn install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Run development server
npm run dev
# or
yarn dev
```

Visit **http://localhost:3000** to see the site.

---

## 🏗️ Project Structure

```
radex-metal/
├── public/                    # Static assets
│   ├── images/               # Hero, services, about images
│   │   ├── gallery/          # Gallery project images
│   │   └── services/         # Service category images
│   └── icons/                # Custom SVG icons
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Homepage (one-page site)
│   │   ├── globals.css       # Global styles
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts  # Contact form API endpoint
│   ├── components/
│   │   ├── layout/           # Header, Footer, Navigation
│   │   ├── sections/         # Page sections (Hero, About, Services, etc.)
│   │   ├── ui/               # Reusable UI components
│   │   └── animations/       # Framer Motion animations
│   ├── lib/                  # Utilities
│   │   ├── email.ts          # Email sending logic
│   │   ├── validation.ts     # Form validation
│   │   └── utils.ts          # Helper functions
│   ├── types/                # TypeScript types
│   └── constants/            # Static content data
│       ├── content.ts        # Page content
│       ├── services.ts       # Service descriptions
│       └── gallery.ts        # Gallery images
├── docs/                     # Documentation
│   ├── architecture.md       # System design
│   ├── API.md               # API specifications
│   ├── db-schema.md         # Database design (Phase 2)
│   ├── features.md          # Feature breakdown
│   ├── DESIGN.md            # UI/UX guidelines
│   ├── TESTING.md           # Testing strategy
│   ├── conventions.md       # Coding standards
│   ├── ROADMAP.md           # Development plan
│   └── DECISIONS.md         # Architectural decisions
├── .claude/                  # Claude Code configuration
├── .env.example              # Environment template
├── PRD.md                    # Product Requirements Document
├── CHANGELOG.md              # Version history
├── TODO.md                   # Task tracking
└── package.json
```

---

## 📚 Documentation

Complete documentation is available in the `/docs` folder:

| Document | Description |
|----------|-------------|
| [Architecture](docs/architecture.md) | Tech stack, system design, architectural decisions |
| [API Documentation](docs/API.md) | Contact form endpoint, email integration |
| [Database Schema](docs/db-schema.md) | Phase 2 database design (Supabase/PostgreSQL) |
| [Features](docs/features.md) | Feature breakdown with user stories and acceptance criteria |
| [Design System](docs/DESIGN.md) | UI/UX guidelines, color palette, typography |
| [Testing Strategy](docs/TESTING.md) | Testing approach, tools, coverage targets |
| [Code Conventions](docs/conventions.md) | Coding standards, naming conventions, Git workflow |
| [Roadmap](docs/ROADMAP.md) | Development phases, sprint plans, milestones |
| [Decisions Log](docs/DECISIONS.md) | Architectural Decision Records (ADRs) |

**Start Here:** [PRD.md](PRD.md) - Full Product Requirements Document

---

## 🔧 Development

### Available Commands

```bash
# Development
npm run dev          # Start development server (localhost:3000)
npm run build        # Build production bundle
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Testing (coming in Phase 2)
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
npm run test:watch   # Run tests in watch mode
```

### Environment Variables

See [.env.example](.env.example) for required environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `RESEND_API_KEY` | Resend API key for emails | Yes (Option 1) |
| `SMTP_HOST` | SMTP server (Gmail) | Yes (Option 2) |
| `SMTP_USER` | SMTP username | Yes (Option 2) |
| `SMTP_PASSWORD` | SMTP password | Yes (Option 2) |
| `CONTACT_EMAIL` | Recipient email | Yes |
| `NEXT_PUBLIC_SITE_URL` | Production URL | Yes |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | No (Phase 2) |

---

## 🎨 Design System

### Color Palette (Industrial Theme)

```css
/* Dark Background */
--bg-black: #000000
--bg-dark-gray: #1A1A1A
--bg-darker-gray: #2D2D2D

/* Metallic Accents */
--steel-gray: #4A4A4A
--light-gray: #C0C0C0
--silver: #E8E8E8

/* Text */
--text-white: #FFFFFF
--text-light-gray: #E0E0E0

/* CTA Accent (optional) */
--accent-orange: #FF6B35
```

### Typography

- **Headings:** Bebas Neue (bold, industrial)
- **Body:** Roboto / Inter (clean, readable)
- **Weights:** 400 (regular), 500 (medium), 700 (bold)

### Responsive Breakpoints

- **Desktop:** 1920px - 1024px
- **Tablet:** 1024px - 768px
- **Mobile:** < 768px

See [docs/DESIGN.md](docs/DESIGN.md) for complete design guidelines.

---

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub/GitLab/Bitbucket
2. Import project in [Vercel](https://vercel.com/)
3. Configure environment variables
4. Deploy

Vercel automatically provides:
- SSL/HTTPS
- CDN (Edge Network)
- Automatic deployments on push
- Preview deployments for PRs

### Manual Deployment

```bash
# Build production bundle
npm run build

# Start production server
npm run start
```

Deploy the `.next` folder to your hosting provider.

See [Deployment Checklist](docs/architecture.md#deployment-checklist) for full instructions.

---

## 🧪 Testing

### MVP (Phase 1)

- Manual testing (cross-browser, devices)
- Lighthouse audits (Performance, Accessibility, SEO)
- Form submission testing

### Phase 2 (Coming Soon)

- Unit tests (Jest + React Testing Library)
- Integration tests (Playwright)
- Visual regression tests (Percy)

See [docs/TESTING.md](docs/TESTING.md) for testing strategy.

---

## 🚢 Roadmap

### Phase 1: MVP (Completed)

- ✅ Hero section with parallax
- ✅ About section
- ✅ Services showcase (4 categories)
- ✅ Gallery with lightbox
- ✅ Contact form with file upload
- ✅ Google Maps integration
- ✅ Responsive design
- ✅ RODO compliance

### Phase 2: Enhanced Features (Q1 2025)

- ⏳ Gallery filtering by category
- ⏳ Multi-step quote form
- ⏳ Price calculator
- ⏳ Live chat integration
- ⏳ Analytics (GA4 + Clarity)
- ⏳ Consultation booking

### Phase 3: Admin & CMS (Q2 2025)

- ⏳ Database implementation (Supabase)
- ⏳ Admin panel (NextAuth.js)
- ⏳ CMS-managed gallery
- ⏳ Form submissions dashboard

See [docs/ROADMAP.md](docs/ROADMAP.md) for detailed timeline.

---

## 🤝 Contributing

This is a private project for Radex Metal. For internal contributors:

1. Read [docs/conventions.md](docs/conventions.md)
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Follow code style guidelines
4. Test thoroughly
5. Create a pull request

---

## 🐛 Issues & Support

Report issues to the project maintainer or create an issue in the repository.

For urgent issues related to the live site, contact:
- **Email:** radexmetal.com@gmail.com
- **Phone:** 600 656 747

---

## 📄 License

**Proprietary** - All rights reserved by Radex Metal.

Unauthorized copying or distribution of this project is prohibited.

---

## 👥 Credits

- **Company:** Radex Metal (est. 1985)
- **Location:** ul. Cecorska 10, 76-200 Słupsk, Poland
- **Template:** [Vercel Odyssey](https://vercel.com/templates/saas/odyssey)
- **Development:** Powered by Claude Code
- **Deployment:** Vercel

---

## 📊 Project Stats

- **Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Email Service:** Resend / Nodemailer
- **Hosting:** Vercel
- **Performance:** Lighthouse score >90
- **Load Time:** <3 seconds
- **Mobile-First:** Yes

---

**Generated:** 2025-11-11
**Version:** 0.1.0
**Status:** MVP Complete, Ready for Implementation

---

## 🔗 Quick Links

- [Live Site](https://radexmetal.com)
- [Product Requirements](PRD.md)
- [Architecture Documentation](docs/architecture.md)
- [Feature Breakdown](docs/features.md)
- [Development Roadmap](docs/ROADMAP.md)
- [Change Log](CHANGELOG.md)
- [Task List](TODO.md)
