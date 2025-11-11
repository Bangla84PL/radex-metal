# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- [New features]

### Changed
- [Changes in existing functionality]

### Deprecated
- [Soon-to-be removed features]

### Removed
- [Removed features]

### Fixed
- [Bug fixes]

### Security
- [Security fixes]

---

## [0.1.0] - 2025-11-11

### Added - Documentation Generated
- **Complete project initialization** via `/claude-config-init`
- **Comprehensive PRD** (Product Requirements Document) - 1607 lines
- **Architecture documentation** (docs/architecture.md) - Tech stack, system design, ADRs
- **API specification** (docs/API.md) - Contact form endpoint, email integration
- **Database schema** (docs/db-schema.md) - MVP data model + Phase 2 PostgreSQL schema
- **Feature breakdown** (docs/features.md) - 20 features with user stories and acceptance criteria
- **README.md** - Complete project overview with quick start guide
- **DESIGN.md** - Industrial design system (colors, typography, components)
- **TESTING.md** - Testing strategy (manual, unit, integration, E2E)
- **conventions.md** - Code standards, naming conventions, Git workflow
- **ROADMAP.md** - 3-phase development plan with sprint details
- **DECISIONS.md** - Architectural Decision Records (7 major decisions)
- **.env.example** - Environment variables template with 3 email service options
- **TODO.md** - MVP task list with 85 actionable items
- **CLAUDE.md** - Project context with @imports to all documentation

### Added - Project Structure
- `.claude/` directory with settings.json and project configuration
- `docs/` directory with 12 comprehensive documentation files
- `.mcp.json` - MCP servers configuration for development tools
- Project metadata and placeholders replaced with "radex-metal"

### Technical Specifications
- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes, Resend/Nodemailer for email
- **Hosting:** Vercel with Edge CDN
- **Template:** Vercel Odyssey (industrial-themed customization)
- **Design:** Dark industrial aesthetic with metallic accents
- **Language:** Polish (RODO compliant)

### Documentation Metrics
- **Total Documentation:** ~8,000+ lines across 15 files
- **PRD:** 1,607 lines (complete product specification)
- **Architecture:** Comprehensive system design with 7 ADRs
- **API:** Full REST API specification with TypeScript types
- **Database:** ERD diagrams + SQL schemas for Phase 2
- **Features:** 20 features, 85 tasks, 94-130 hours estimated
- **Design System:** Complete color palette, typography, component guidelines
- **Testing:** 60+ test scenarios across 3 testing levels

### Next Steps
- Begin implementation Phase 1 (Sprint 1: Setup & Structure)
- Clone Vercel Odyssey template
- Configure Tailwind with industrial theme
- Start building Hero and About sections
- Estimated MVP completion: 2-3 weeks (94-130 hours)

---

**Legend:**
- Added: New features
- Changed: Changes in existing functionality
- Deprecated: Soon-to-be removed features
- Removed: Removed features
- Fixed: Bug fixes
- Security: Security fixes
