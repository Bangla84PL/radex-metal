# Project Context for Claude Code

**Project:** Radex Metal - Website Redesign
**Description:** Modern, industrial-themed website for Radex Metal, a Pomorskie welding center with 41 years of experience (est. 1985). One-page responsive site showcasing steel gates, fences, railings, and yacht fittings.
**Tech Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer Motion, Vercel
**Domain:** radexmetal.com
**Language:** Polish (RODO compliant)

---

## Documentation Structure

This project uses comprehensive documentation stored in multiple files:

**Root Documentation:**
@README.md
@PRD.md
@TODO.md

**Technical Documentation:**
@docs/architecture.md
@docs/API.md
@docs/db-schema.md
@docs/features.md
@docs/DESIGN.md
@docs/TESTING.md
@docs/conventions.md
@docs/ROADMAP.md
@docs/DECISIONS.md

---

## Coding Guidelines

### Code Style (See docs/conventions.md for full details)
- Indentation: 2 spaces
- Line length: 100 characters max
- Naming: camelCase for variables/functions, PascalCase for components/classes
- File naming: kebab-case for utilities, PascalCase for React components
- TypeScript: Strict mode enabled, explicit types preferred

### Best Practices
- Write unit tests for all business logic
- Document public APIs with JSDoc/TSDoc
- Follow DRY principle
- Prefer composition over inheritance

### Git Workflow
- Branch naming: `feature/`, `bugfix/`, `hotfix/`
- Commit messages: Conventional Commits format
- PR requirements: Tests pass + code review

---

## Project Commands

### Development
```bash
npm install          # Install dependencies
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Testing (Phase 2)
```bash
npm run test         # Run unit tests (Jest)
npm run test:e2e     # Run E2E tests (Playwright)
npm run test:watch   # Run tests in watch mode
```

### Claude Code Commands
- `/claude-config-init` - Initialize project structure (if not already done)
- `/generate-docs-from-prd` - Generate all documentation from PRD.md
- `/orchestrate <task>` - Delegate complex tasks to specialized subagents
- `/update-docs [focus]` - Synchronize documentation with code changes
- `/apply-branding` - Apply SmartCamp.AI branding (optional)
- `/output-style learning` - Enable step-by-step learning mode

---

## Subagent Workflow

This project uses specialized subagents for different aspects of development:

- **architect** - System architecture and tech decisions
- **api-designer** - API endpoint design
- **db-designer** - Database schema design
- **feature-planner** - Feature breakdown and planning
- **implementer** - Code implementation
- **visual-excellence-architect** - Modern UI/UX design and frontend excellence
- **doc-guardian** - Documentation maintenance
- **brand-guardian** - SmartCamp.AI branding (call explicitly with /apply-branding)

Claude Code automatically delegates to appropriate subagents based on task context.

**For UI/Frontend work:** The visual-excellence-architect researches current design trends and creates visually stunning interfaces. Use `/orchestrate` for UI tasks to ensure beautiful, modern design.

---

## Important Notes

### MVP (Phase 1) - Current Status
- **No database** - Static content in TypeScript constants
- **Email-only** contact form submissions (no storage)
- **Polish language** throughout (error messages, content)
- **Industrial design** - Dark theme with metallic accents
- **Performance target** - Lighthouse >90 all metrics

### Documentation-First Workflow
- **Always read docs** before implementing (PRD.md → architecture.md → features.md)
- Never modify architecture without updating docs/architecture.md
- All API changes must be reflected in docs/API.md
- Database changes (Phase 2) require migrations + docs/db-schema.md updates
- Update TODO.md with checkboxes for task tracking
- Use doc-guardian subagent to sync docs after code changes

### Key Technical Decisions (See docs/DECISIONS.md)
1. **Next.js App Router** over Pages Router - Future-proof, better performance
2. **No Database in MVP** - Simplicity, speed, cost ($0/month)
3. **Resend for Email** - Modern API, generous free tier
4. **Static Content** - TypeScript constants, type-safe, Git-versioned
5. **Vercel Hosting** - Next.js creator, automatic SSL/deployments

---

## Design System (Radex Metal Industrial Theme)

**Not using SmartCamp branding** - This project has its own industrial/metallic aesthetic.

### Color Palette (See docs/DESIGN.md)
- **Black:** #000000 (primary background)
- **Dark Gray:** #1A1A1A, #2D2D2D (sections)
- **Steel Gray:** #4A4A4A (borders, accents)
- **Silver:** #C0C0C0, #E8E8E8 (metallic highlights)
- **White:** #FFFFFF (text)
- **Accent (optional):** #FF6B35 (CTA buttons)

### Typography
- **Headings:** Bebas Neue (bold, industrial)
- **Body:** Roboto / Inter (clean, readable)
- **Weights:** 400 (regular), 500 (medium), 700 (bold)

### Design Principles
- Dark, moody industrial aesthetic
- High contrast (dark bg + light text)
- Metallic textures and gradients
- Generous spacing, minimal UI
- Focus on product imagery (welding, steel work)

---

**Last Updated:** 2025-11-11
