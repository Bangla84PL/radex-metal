# Architecture Documentation

**Project:** Radex Metal Website Redesign
**Created:** 2025-11-11
**Last Updated:** 2025-11-11
**Version:** 1.0

---

## Overview

Radex Metal is a modern, responsive one-page website redesign for a 41-year-old welding and metalwork company based in Slupsk, Poland. The architecture is designed as a **static-first, serverless application** built on Next.js 14+ with the App Router, leveraging Vercel's Odyssey template as the foundation.

### Key Characteristics

- **Type**: One-page marketing website (SPA-style with anchor navigation)
- **Approach**: Static-first with API routes for dynamic features (contact form)
- **Scale**: Small to medium business website (~1,000-5,000 monthly visitors)
- **MVP Focus**: Simplicity, performance, and ease of maintenance
- **Phase 2 Path**: Designed for future CMS integration and database addition

### Primary Goals

1. **Performance**: Sub-3-second load times, Lighthouse score >90
2. **User Experience**: Industrial aesthetic, smooth animations, mobile-first design
3. **Lead Generation**: Functional contact form with file attachments
4. **Maintainability**: Minimal infrastructure, low operational overhead
5. **Scalability**: Foundation for Phase 2 enhancements (CMS, analytics, admin panel)

---

## Tech Stack

### Frontend

**Framework: Next.js 14.2+ (App Router)**
- **Rationale**:
  - Server Components reduce client-side JS bundle
  - Excellent performance optimizations (automatic code splitting, image optimization)
  - Built-in TypeScript support
  - Seamless API Routes integration
  - Perfect Vercel deployment experience
- **Trade-offs**:
  - Learning curve for App Router (newer than Pages Router)
  - Server Components require careful client/server boundary management

**Template Base: Vercel Odyssey**
- **Rationale**:
  - Pre-built SaaS template with modern design patterns
  - Tailwind CSS pre-configured
  - Framer Motion integration
  - Optimized for Vercel deployment
  - Production-ready component structure
- **Customization**: Extensive theming for industrial/metal aesthetic

**Language: TypeScript**
- **Rationale**:
  - Type safety prevents runtime errors
  - Better IDE support and autocomplete
  - Self-documenting code
  - Easier refactoring and maintenance
- **Configuration**: Strict mode enabled

**Styling: Tailwind CSS 3.4+**
- **Rationale**:
  - Utility-first approach speeds development
  - Excellent responsive design utilities
  - PurgeCSS removes unused styles (smaller bundles)
  - Easy to customize theme (industrial color palette)
  - No CSS naming conflicts
- **Custom Theme**:
  ```javascript
  colors: {
    primary: { black: '#000000', darkGray: '#1A1A1A', medGray: '#2D2D2D' },
    steel: { gray: '#4A4A4A', medGray: '#6B6B6B' },
    metallic: { silver: '#C0C0C0', lightSilver: '#E8E8E8' },
    accent: { orange: '#FF6B35', red: '#D64545' },
    text: { white: '#FFFFFF', lightGray: '#E0E0E0' }
  }
  ```

**Animations: Framer Motion**
- **Rationale**:
  - Declarative animation API
  - Excellent scroll-triggered animations
  - Parallax effects support
  - Gesture support for mobile
  - Performance optimized (GPU-accelerated)
- **Usage**: Scroll reveals, fade-ins, parallax hero, lightbox transitions

**State Management: React Context + Hooks**
- **Rationale**:
  - Simple state needs (form, lightbox, mobile menu)
  - No complex global state required
  - Avoids Redux/Zustand overhead for MVP
  - Built-in to React
- **Phase 2**: May add Zustand for admin panel

**UI Components: Custom + shadcn/ui (selective)**
- **Rationale**:
  - shadcn/ui provides accessible, customizable components
  - Tailwind-based (consistent styling)
  - Copy-paste approach (no dependency bloat)
  - Full control over component code
- **Components**: Button, Input, Select, FileUpload, Lightbox

**Icons: Heroicons + Custom SVG**
- **Rationale**:
  - Heroicons: Tailwind-official, consistent design
  - Custom SVG: Service-specific icons (welding, gates, railings, boats)
  - Inline SVG: No additional HTTP requests

**Fonts**:
- **Headings**: Bebas Neue (Google Fonts) - Industrial, bold
- **Body**: Inter (Google Fonts) - Clean, readable
- **Rationale**: Free, performant, good character set for Polish language

### Backend

**API Layer: Next.js API Routes (App Router)**
- **Rationale**:
  - Collocated with frontend (monorepo simplicity)
  - Serverless functions (auto-scaling)
  - TypeScript shared types between client/server
  - Vercel Edge Functions support
- **Endpoints**:
  - `POST /api/contact` - Contact form submission with file uploads

**Email Service: Resend (Primary) / Nodemailer (Fallback)**
- **Rationale - Resend**:
  - Modern API, excellent DX
  - React Email template support
  - 100 emails/day free tier (sufficient for MVP)
  - Built-in attachment handling
  - Reliable deliverability
- **Rationale - Nodemailer (Fallback)**:
  - Gmail SMTP integration
  - No vendor lock-in
  - Free (uses existing Gmail account)
  - Battle-tested library
- **Decision**: Start with Resend, fallback to Nodemailer if needed
- **Trade-offs**: Resend free tier limit, Gmail SMTP may hit spam filters

**File Upload Handling: Multipart/Form-Data**
- **Approach**: Direct upload in API route (no object storage in MVP)
- **Rationale**:
  - Files sent as email attachments (temporary storage)
  - No need for S3/Cloudinary in MVP
  - Simpler architecture
- **Limitations**: 5MB per file (Vercel serverless function limit)
- **Phase 2**: Migrate to Cloudinary/Vercel Blob Storage

**Database: None (MVP)**
- **Rationale**:
  - All content is static (no dynamic content updates)
  - Contact form submissions sent via email (no storage)
  - Reduces complexity, cost, and attack surface
  - Faster development
- **Content Storage**: JSON files, TypeScript constants
- **Phase 2 Migration Path**: Supabase or Vercel Postgres

**Authentication: None (MVP)**
- **Rationale**: No admin panel, no user accounts
- **Phase 2**: NextAuth.js for admin access

### Infrastructure

**Hosting: Vercel**
- **Rationale**:
  - Next.js creator (first-class support)
  - Automatic SSL/HTTPS
  - Edge Network CDN (global performance)
  - Zero-config deployments
  - Generous free tier
  - Automatic preview deployments
  - Built-in analytics
- **Regions**: Auto-distributed globally
- **Trade-offs**: Vendor lock-in (mitigated by standard Next.js code)

**Domain: radexmetal.com (existing)**
- **DNS**: Configured to point to Vercel
- **SSL**: Automatic via Vercel (Let's Encrypt)

**CI/CD: Vercel Git Integration**
- **Workflow**:
  1. Push to `main` branch → Production deployment
  2. Push to feature branches → Preview deployments
  3. Pull Requests → Automatic preview URLs
- **Build Process**: Automatic on commit
- **Rollbacks**: One-click via Vercel dashboard

**CDN: Vercel Edge Network**
- **Rationale**:
  - Automatic for static assets
  - 99.99% uptime SLA
  - Global edge caching
  - Image optimization at edge
- **Cache Strategy**:
  - Static assets: `Cache-Control: public, max-age=31536000, immutable`
  - HTML: `Cache-Control: public, max-age=0, must-revalidate`
  - API routes: No caching (dynamic)

**Monitoring: Vercel Analytics (built-in)**
- **MVP**: Basic analytics (page views, performance metrics)
- **Phase 2**: Google Analytics 4 + Microsoft Clarity

**Error Tracking: Vercel Logs (MVP)**
- **MVP**: Built-in logging
- **Phase 2**: Sentry integration

### Third-Party Integrations

**Phase 1 (MVP)**:
- **Google Maps Embed**: Static iframe for location map
  - No API key required (public embed)
  - URL: `https://maps.app.goo.gl/ornSRoVhrXrX2VzK6`

**Phase 2 (Future)**:
- **Google Analytics 4**: Traffic tracking, conversion analysis
- **Microsoft Clarity**: Session recordings, heatmaps
- **Live Chat**: Tawk.to or Crisp (free tiers)
- **Calendly**: Consultation booking
- **Cloudinary**: Image hosting and optimization
- **Sanity/Contentful**: Headless CMS for content management

---

## System Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           USER DEVICES                              │
│  (Desktop 1920px | Tablet 768-1024px | Mobile <768px)              │
└────────────────────────────┬────────────────────────────────────────┘
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      VERCEL EDGE NETWORK (CDN)                      │
│  - Global Edge Nodes                                                │
│  - Automatic SSL/TLS                                                │
│  - Image Optimization                                               │
│  - Static Asset Caching                                             │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                 ┌───────────┴────────────┐
                 │                        │
                 ▼                        ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│   STATIC CONTENT         │  │   SERVERLESS FUNCTIONS   │
│   (Next.js SSG)          │  │   (API Routes)           │
├──────────────────────────┤  ├──────────────────────────┤
│ - Hero Section           │  │ POST /api/contact        │
│ - About Section          │  │   ├─ Validate Input      │
│ - Services (4 cards)     │  │   ├─ Sanitize Data       │
│ - Gallery (8-12 images)  │  │   ├─ Process Files       │
│ - Contact Form UI        │  │   ├─ Send Email          │
│ - Footer                 │  │   └─ Return Response     │
│ - Navigation             │  │                          │
└──────────────────────────┘  └────────┬─────────────────┘
                                       │
                                       ▼
                         ┌──────────────────────────┐
                         │   EMAIL SERVICE          │
                         │   (Resend / Nodemailer)  │
                         ├──────────────────────────┤
                         │ - Format Email           │
                         │ - Attach Files           │
                         │ - Send to Owner          │
                         └────────┬─────────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────────┐
                    │   RECIPIENT EMAIL            │
                    │   radexmetal.com@gmail.com   │
                    └──────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    CONTENT STORAGE (MVP)                            │
│  - JSON Files (services, gallery)                                   │
│  - TypeScript Constants (content)                                   │
│  - Public Folder (images, icons)                                    │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         NEXT.JS APP                                 │
│                        (App Router)                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                      layout.tsx (Root)                       │ │
│  │  - Global Styles                                             │ │
│  │  - Font Loading                                              │ │
│  │  - Metadata (SEO)                                            │ │
│  │  - Header + Footer Layout                                    │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                │                                   │
│                                ▼                                   │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                       page.tsx (Home)                        │ │
│  │                                                              │ │
│  │  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐  │ │
│  │  │  HeroSection   │  │  AboutSection  │  │ ServicesGrid │  │ │
│  │  └────────────────┘  └────────────────┘  └──────────────┘  │ │
│  │                                                              │ │
│  │  ┌────────────────┐  ┌────────────────────────────────────┐│ │
│  │  │ GallerySection │  │     ContactSection                 ││ │
│  │  │  └─ Lightbox   │  │  ├─ ContactForm                    ││ │
│  │  └────────────────┘  │  ├─ ContactInfo                    ││ │
│  │                      │  └─ GoogleMapEmbed                 ││ │
│  │                      └────────────────────────────────────┘│ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                  Shared Components                           │ │
│  │                                                              │ │
│  │  ┌─────────────┐  ┌──────────┐  ┌──────────────┐           │ │
│  │  │ Navigation  │  │  Button  │  │  FileUpload  │           │ │
│  │  └─────────────┘  └──────────┘  └──────────────┘           │ │
│  │                                                              │ │
│  │  ┌─────────────┐  ┌──────────┐  ┌──────────────┐           │ │
│  │  │   Footer    │  │  Input   │  │   Lightbox   │           │ │
│  │  └─────────────┘  └──────────┘  └──────────────┘           │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                   Animation Components                       │ │
│  │  - FadeIn (scroll-triggered)                                 │ │
│  │  - ParallaxSection (hero background)                         │ │
│  │  - ScrollReveal (stagger animations)                         │ │
│  └──────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### Data Flow

#### Static Content Flow (Page Load)

```
1. User → radexmetal.com
   │
2. Vercel Edge CDN → Serve cached HTML
   │
3. Browser → Parse HTML
   │
4. Browser → Request static assets (CSS, JS, Images)
   │
5. Vercel Edge CDN → Serve optimized assets
   │
6. React Hydration → Interactive page
   │
7. Scroll Events → Trigger animations
```

#### Contact Form Submission Flow

```
1. User fills form
   ├─ Name (required)
   ├─ Email (required, validated)
   ├─ Phone (required, formatted)
   ├─ Service Type (dropdown)
   ├─ Message (required, min 20 chars)
   ├─ Files (optional, max 3, 5MB each)
   └─ RODO Consent (required checkbox)
   │
2. Frontend Validation
   ├─ HTML5 validation
   ├─ Custom React validation
   ├─ File type/size check
   └─ Display errors if invalid
   │
3. Submit → POST /api/contact
   │
4. API Route Processing
   ├─ Backend Validation
   │  ├─ Sanitize inputs (XSS prevention)
   │  ├─ Verify file types (whitelist: jpg, png, pdf)
   │  ├─ Check file sizes (<5MB)
   │  └─ Validate email format
   │
   ├─ Rate Limiting Check
   │  └─ Max 5 submissions/hour per IP
   │
   ├─ Email Composition
   │  ├─ Format email body (HTML template)
   │  ├─ Attach files (base64 encoding)
   │  └─ Set metadata (from, to, subject)
   │
   └─ Send via Resend/Nodemailer
      │
      ├─ Success → 200 OK
      │  └─ Return { success: true, message: "Email sent" }
      │
      └─ Error → 500 Error
         └─ Return { success: false, error: "Failed to send" }
   │
5. Frontend Response Handling
   ├─ Success → Show success message
   │  └─ "Dziękujemy! Skontaktujemy się w ciągu 24h"
   │
   └─ Error → Show error message
      └─ "Wystąpił błąd. Spróbuj ponownie."
   │
6. Email Delivery
   └─ radexmetal.com@gmail.com receives email
```

#### Gallery Lightbox Flow

```
1. User clicks gallery image
   │
2. React State Update
   ├─ Set active image index
   └─ Set lightbox open = true
   │
3. Framer Motion Animation
   ├─ Overlay fade in (opacity 0 → 1)
   ├─ Image scale in (scale 0.8 → 1)
   └─ Disable body scroll
   │
4. User Actions
   ├─ Click Next → Update index, animate transition
   ├─ Click Previous → Update index, animate transition
   ├─ Press ESC → Close lightbox
   ├─ Press Arrow Keys → Navigate
   └─ Click Overlay/Close → Close lightbox
   │
5. Close Lightbox
   ├─ Framer Motion Animation (reverse)
   ├─ Set lightbox open = false
   └─ Re-enable body scroll
```

---

## Design Patterns

### Component Composition Pattern

**Pattern**: Atomic Design Principles
- **Atoms**: Button, Input, Icon
- **Molecules**: FileUpload, FormField
- **Organisms**: ContactForm, Navigation, GalleryGrid
- **Templates**: SectionWrapper, PageLayout
- **Pages**: HomePage

**Rationale**: Promotes reusability, consistency, and testability

**Example**:
```typescript
// Atom
<Button variant="primary" onClick={handleClick}>Submit</Button>

// Molecule
<FormField label="Email" error={errors.email}>
  <Input type="email" value={email} onChange={setEmail} />
</FormField>

// Organism
<ContactForm onSubmit={handleSubmit} />
```

### Server/Client Component Strategy

**Pattern**: Maximize Server Components, minimize Client Components

**Server Components** (default):
- Static sections (Hero, About, Services, Gallery)
- No interactivity
- Reduced JavaScript bundle

**Client Components** (`"use client"`):
- Interactive elements (ContactForm, Lightbox, MobileMenu, Navigation)
- Animation wrappers (Framer Motion)
- State management

**Rationale**: Better performance, smaller client bundle, improved SEO

### State Management Pattern

**Pattern**: Collocated State + React Context (minimal)

**Local State**: Form inputs, lightbox state, menu state
- **Tool**: `useState`
- **Scope**: Component-level

**Shared State**: Theme preferences (future), form submission status
- **Tool**: React Context API
- **Scope**: App-level (only when needed)

**Server State**: None in MVP (no data fetching)

**Rationale**: Avoid over-engineering, keep state close to usage

### Form Handling Pattern

**Pattern**: Controlled Components + Server Actions

**Approach**:
1. React controlled inputs (client-side validation)
2. Form submission via Server Action (server-side validation)
3. Progressive enhancement (works without JS for basic functionality)

**Example**:
```typescript
// Client Component
const [formData, setFormData] = useState(initialState);
const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await submitContactForm(formData);
  // Handle response
};

// Server Action
async function submitContactForm(data: FormData) {
  'use server';
  // Validate, sanitize, send email
  // Return success/error
}
```

### Animation Architecture

**Pattern**: Scroll-Triggered Animations + Gesture-Based Interactions

**Tools**:
- Framer Motion for declarative animations
- Intersection Observer API for scroll detection
- CSS transitions for simple hover states

**Guidelines**:
- Respect `prefers-reduced-motion`
- Animations: 300-500ms duration (not too fast, not too slow)
- Ease curves: `ease-out` for entrances, `ease-in` for exits
- Stagger delays: 100-150ms between items

**Example**:
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  {content}
</motion.div>
```

### Error Handling Pattern

**Pattern**: Defensive Programming + User-Friendly Messages

**Layers**:
1. **Frontend Validation**: Immediate feedback (HTML5 + custom)
2. **Backend Validation**: Security layer (never trust client)
3. **API Error Handling**: Try-catch with structured errors
4. **User Feedback**: Polish error messages (no technical jargon)

**Example**:
```typescript
// API Route
try {
  await sendEmail(data);
  return NextResponse.json({ success: true });
} catch (error) {
  console.error('Email error:', error); // Log technical error
  return NextResponse.json(
    { success: false, message: 'Nie udało się wysłać wiadomości' }, // User-friendly
    { status: 500 }
  );
}
```

### Code Organization Pattern

**Pattern**: Feature-Based Organization + Shared Components

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles
│   └── api/
│       └── contact/
│           └── route.ts          # Contact API route
├── components/
│   ├── sections/                 # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── GallerySection.tsx
│   │   └── ContactSection.tsx
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── ui/                       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── FileUpload.tsx
│   │   └── Lightbox.tsx
│   └── animations/               # Animation wrappers
│       ├── FadeIn.tsx
│       ├── ParallaxSection.tsx
│       └── ScrollReveal.tsx
├── lib/                          # Utility functions
│   ├── email.ts                  # Email sending logic
│   ├── validation.ts             # Form validation
│   └── utils.ts                  # Generic utilities
├── types/                        # TypeScript types
│   └── index.ts
├── constants/                    # Static data
│   ├── content.ts                # Page content
│   ├── services.ts               # Services data
│   └── gallery.ts                # Gallery images
└── styles/                       # Additional styles (if needed)
```

**Rationale**: Clear separation of concerns, easy to navigate, scalable

---

## Security Architecture

### HTTPS Enforcement

**Implementation**: Vercel automatic SSL/TLS
- Let's Encrypt certificates (auto-renewed)
- HSTS headers (HTTP Strict Transport Security)
- Redirect HTTP → HTTPS (automatic)

### Input Validation & Sanitization

**Frontend Validation**:
- HTML5 validation attributes (`required`, `type="email"`, `pattern`)
- Custom React validation (real-time feedback)
- File type checking (client-side, before upload)

**Backend Validation** (Critical - Never Trust Client):
```typescript
// API Route: /api/contact
1. Validate field presence (required fields)
2. Validate field types (string, email, phone format)
3. Sanitize inputs (strip HTML, prevent XSS)
   - Use: DOMPurify or manual sanitization
4. Validate file uploads:
   - MIME type check (whitelist: image/jpeg, image/png, application/pdf)
   - File size check (<5MB)
   - File extension validation
   - Optional: Virus scanning (ClamAV or cloud service)
5. Rate limiting (max 5 submissions/hour per IP)
```

**XSS Prevention**:
- React automatic escaping (default)
- DOMPurify for user-generated content (if displayed)
- Content Security Policy (CSP) headers

**SQL Injection**: N/A (no database in MVP)
- **Phase 2**: Use Prisma ORM with parameterized queries

### File Upload Security

**Restrictions**:
- Allowed MIME types: `image/jpeg`, `image/png`, `application/pdf`
- Max file size: 5MB per file
- Max files: 3 per submission

**Validation Flow**:
```typescript
1. Client-side: Check file type and size (UX feedback)
2. Server-side: Re-validate (security)
   - Check MIME type (not just extension)
   - Check magic bytes (file signature)
   - Scan for malware (optional: VirusTotal API)
3. Processing:
   - Do NOT serve files from same domain
   - Do NOT execute uploaded files
   - Store temporarily (only for email attachment)
   - Delete after email sent (no persistent storage)
```

**Phase 2**: Move to object storage (Cloudinary/Vercel Blob) with signed URLs

### Rate Limiting

**Contact Form**:
- Max 5 submissions per hour per IP
- Max 20 submissions per day per IP

**Implementation**:
```typescript
// Using Vercel Edge Config or Redis (Phase 2)
// MVP: In-memory rate limiting (resets on serverless function cold start)
const rateLimit = new Map<string, { count: number; resetAt: number }>();
```

**Alternative**: Vercel Edge Middleware for global rate limiting

### RODO/GDPR Compliance

**MVP Requirements**:
1. **Explicit Consent**: RODO checkbox (required)
   - Text: "Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z polityką prywatności"
2. **Minimal Data Collection**: Only necessary fields
3. **No Persistent Storage**: Data sent via email (not stored in DB)
4. **Privacy Policy**: Link in footer (Phase 1 or Phase 2)
5. **Right to Deletion**: Manual process (email request)

**Phase 2 Enhancements**:
- Cookie consent banner (if GA/Clarity added)
- Automated data deletion requests
- Data retention policy (30-day auto-delete from DB)

### API Security

**Headers** (configured in `next.config.js`):
```typescript
headers: [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]
```

**CSRF Protection**: Next.js built-in (SameSite cookies)

### Environment Variables Security

**Storage**: Vercel Environment Variables (encrypted)
- Never commit `.env.local` to Git (in `.gitignore`)
- Use `.env.example` for template

**Access Control**:
- Production secrets only in Vercel Production environment
- Preview deployments use Preview environment variables
- Local development uses `.env.local`

---

## Performance Architecture

### Image Optimization Strategy

**Next.js Image Component**:
```typescript
import Image from 'next/image';

<Image
  src="/images/hero-bg.jpg"
  alt="Spawanie metalu"
  width={1920}
  height={1080}
  priority // For above-fold images
  placeholder="blur" // For smooth loading
/>
```

**Benefits**:
- Automatic WebP/AVIF generation
- Responsive image sizes (`srcset`)
- Lazy loading (below-fold images)
- Automatic `width` and `height` (prevents CLS)
- CDN caching at Vercel Edge

**Image Sizes**:
- Hero: 1920x1080 (WebP, ~200KB)
- Gallery: 800x600 (WebP, ~100KB each)
- Services: 600x400 (WebP, ~80KB each)

**Optimization Workflow**:
1. Source images: High-res (2000px+)
2. Compress with TinyPNG/ImageOptim
3. Next.js Image component handles rest

### Code Splitting & Lazy Loading

**Automatic Code Splitting**:
- Next.js splits by route automatically
- Each page = separate bundle
- Shared components = separate chunk

**Dynamic Imports** (for heavy components):
```typescript
const Lightbox = dynamic(() => import('@/components/ui/Lightbox'), {
  ssr: false, // Client-side only
  loading: () => <LoadingSpinner />,
});
```

**Lazy Loading Images**:
- Automatic via Next.js Image (below-fold images)
- Intersection Observer API (custom implementation if needed)

### Caching Strategy

**Static Assets**:
- CSS/JS: Versioned filenames (cache forever)
- Images: Cached at CDN edge (1 year)
- Fonts: Cached locally (1 year)

**HTML**:
- Revalidate on every request (ISR)
- CDN caching: `s-maxage=0, stale-while-revalidate`

**API Routes**:
- No caching (dynamic)
- `Cache-Control: no-store`

### Bundle Size Optimization

**Strategies**:
1. Tree shaking (automatic)
2. Minimize dependencies (avoid large libraries)
3. Use Next.js Bundle Analyzer to identify bloat
4. Import only needed modules (e.g., `import { Button } from '@/ui/Button'` not `import * as UI`)
5. Avoid polyfills for modern browsers

**Target Bundle Sizes**:
- First Load JS: <150KB (gzipped)
- Total JS: <300KB (gzipped)

### Performance Monitoring

**Metrics Tracked**:
- **Core Web Vitals**:
  - LCP (Largest Contentful Paint): <2.5s
  - FID (First Input Delay): <100ms
  - CLS (Cumulative Layout Shift): <0.1
- **Custom Metrics**:
  - Time to Interactive (TTI): <5s
  - First Contentful Paint (FCP): <1.5s

**Tools**:
- Lighthouse (development)
- Vercel Analytics (production)
- PageSpeed Insights (validation)
- WebPageTest (detailed analysis)

---

## Integration Points

### Google Maps Embed

**Implementation**: Static iframe (no API key required)

```html
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!..."
  width="100%"
  height="400"
  style="border:0;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
></iframe>
```

**Fallback**: Link to Google Maps if iframe fails to load

### Email Service Integration (Resend)

**Setup**:
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'noreply@radexmetal.com', // Verified domain
  to: 'radexmetal.com@gmail.com',
  subject: `Nowe zapytanie: ${serviceType}`,
  html: emailTemplate,
  attachments: files.map(file => ({
    filename: file.name,
    content: file.buffer,
  })),
});
```

**Alternative (Nodemailer + Gmail)**:
```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD, // App password
  },
});

await transporter.sendMail({
  from: process.env.SMTP_USER,
  to: 'radexmetal.com@gmail.com',
  subject: `Nowe zapytanie: ${serviceType}`,
  html: emailTemplate,
  attachments: files,
});
```

### Future Integrations (Phase 2)

**Google Analytics 4**:
```typescript
// app/layout.tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
  strategy="afterInteractive"
/>
```

**Microsoft Clarity**:
```typescript
<Script id="clarity-script" strategy="afterInteractive">
  {`(function(c,l,a,r,i,t,y){...})(window,document,'clarity','script','${CLARITY_ID}');`}
</Script>
```

**Live Chat (Tawk.to)**:
```typescript
<Script id="tawk-script" strategy="lazyOnload">
  {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();...`}
</Script>
```

---

## File Structure & Organization

### Directory Structure

```
radex-metal/
├── .next/                        # Build output (gitignored)
├── node_modules/                 # Dependencies (gitignored)
├── public/                       # Static assets (served as-is)
│   ├── images/
│   │   ├── hero/
│   │   │   └── hero-bg.jpg
│   │   ├── about/
│   │   │   └── workshop.jpg
│   │   ├── services/
│   │   │   ├── balustrady.jpg
│   │   │   ├── bramy.jpg
│   │   │   ├── ogrodzenia.jpg
│   │   │   └── jachty.jpg
│   │   └── gallery/
│   │       ├── project-01.jpg
│   │       ├── project-02.jpg
│   │       └── ... (8-12 images)
│   ├── icons/
│   │   ├── welding.svg
│   │   ├── gate.svg
│   │   ├── railing.svg
│   │   └── boat.svg
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── robots.txt
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout (metadata, fonts, global styles)
│   │   ├── page.tsx              # Homepage (all sections)
│   │   ├── globals.css           # Global Tailwind CSS
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts      # POST handler for contact form
│   │   └── error.tsx             # Error boundary (optional)
│   ├── components/
│   │   ├── sections/             # Full-page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── GallerySection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── layout/               # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── ui/                   # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── Lightbox.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── animations/           # Animation wrappers
│   │   │   ├── FadeIn.tsx
│   │   │   ├── ParallaxSection.tsx
│   │   │   ├── ScrollReveal.tsx
│   │   │   └── StaggerChildren.tsx
│   │   └── forms/                # Form-specific components
│   │       ├── ContactForm.tsx
│   │       └── FormField.tsx
│   ├── lib/                      # Utility functions & helpers
│   │   ├── email.ts              # Email sending logic (Resend/Nodemailer)
│   │   ├── validation.ts         # Form validation functions
│   │   ├── utils.ts              # General utilities (cn, formatters)
│   │   └── rate-limit.ts         # Rate limiting logic
│   ├── types/                    # TypeScript type definitions
│   │   ├── index.ts              # Shared types
│   │   ├── contact.ts            # Contact form types
│   │   └── gallery.ts            # Gallery types
│   ├── constants/                # Static data & content
│   │   ├── content.ts            # Page content (hero, about, etc.)
│   │   ├── services.ts           # Services data
│   │   ├── gallery.ts            # Gallery images array
│   │   └── navigation.ts         # Navigation links
│   └── styles/                   # Additional styles (if needed)
│       └── animations.css        # Custom animation keyframes
├── .env.local                    # Environment variables (gitignored)
├── .env.example                  # Environment variables template
├── .eslintrc.json                # ESLint configuration
├── .gitignore                    # Git ignore rules
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies & scripts
├── postcss.config.js             # PostCSS configuration (Tailwind)
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── README.md                     # Project documentation
└── vercel.json                   # Vercel deployment configuration (optional)
```

### Code Organization Principles

1. **Feature-Based Organization**: Group related files by feature (e.g., `sections/`, `forms/`)
2. **Shared Components**: Reusable UI in `ui/`, layout components in `layout/`
3. **Separation of Concerns**: Logic in `lib/`, types in `types/`, data in `constants/`
4. **Naming Conventions**:
   - Components: PascalCase (`HeroSection.tsx`)
   - Utilities: camelCase (`validation.ts`)
   - Constants: UPPER_SNAKE_CASE or camelCase
   - Types/Interfaces: PascalCase (`ContactFormData`)
5. **Barrel Exports**: Use `index.ts` in folders for clean imports

**Example Barrel Export** (`components/ui/index.ts`):
```typescript
export { Button } from './Button';
export { Input } from './Input';
export { Lightbox } from './Lightbox';
// Import: import { Button, Input, Lightbox } from '@/components/ui';
```

---

## Scalability Considerations

### Vertical Scaling (Performance)

**Current State (MVP)**:
- Static pages (instant scaling via CDN)
- Serverless functions (auto-scale to demand)
- No database bottlenecks

**Optimizations**:
- Image CDN caching (Vercel Edge)
- Code splitting (per-page bundles)
- Lazy loading (deferred content)

**Limits**:
- Serverless function timeout: 10s (Vercel Hobby), 60s (Pro)
- Max request size: 4.5MB (Vercel)
- Function memory: 1GB (Hobby), 3GB (Pro)

### Horizontal Scaling (Traffic)

**Current Capacity**:
- 5,000-10,000 monthly visitors (Vercel free tier)
- Static content: Unlimited (CDN caching)
- API requests: 100k/month (Resend free tier)

**Scaling Path**:
1. **Tier 1** (0-10k visitors/month): Vercel Hobby (free)
2. **Tier 2** (10k-100k): Vercel Pro ($20/month)
3. **Tier 3** (100k+): Vercel Enterprise (custom pricing)

**Bottlenecks to Monitor**:
- Email sending limit (Resend: 100/day free, upgrade to 10k/month for $10)
- Serverless function invocations (Vercel: 100GB-hours free)

### Database Migration Path (Phase 2)

**When to Add Database**:
- Need to store form submissions (for admin review)
- Need CMS for gallery/content updates
- Need user authentication (admin panel)

**Recommended Stack**:
```
Option 1: Vercel Postgres + Prisma
├── Pros: Tight Vercel integration, auto-scaling, easy setup
├── Cons: Cost (~$20/month for 256MB DB)
└── Use Case: Transactional data (form submissions, user accounts)

Option 2: Supabase (PostgreSQL + Auth + Storage)
├── Pros: Free tier (500MB DB, 1GB storage), built-in auth, real-time
├── Cons: External service, potential latency
└── Use Case: Full backend replacement (CMS, admin panel)

Option 3: Vercel KV (Redis)
├── Pros: Ultra-fast, free tier (256MB), serverless
├── Cons: Limited to key-value storage
└── Use Case: Rate limiting, session storage, caching
```

**Migration Strategy**:
1. Set up database (Supabase recommended for MVP budget)
2. Create schema (Prisma ORM for type-safety)
3. Migrate static content → database (gallery images, services)
4. Build admin panel (NextAuth.js + CRUD operations)
5. Update frontend to fetch from database (still use SSG with ISR)

**Data Model (Phase 2)**:
```sql
-- Contact Submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  service_type VARCHAR(50),
  message TEXT,
  attachments JSONB,
  gdpr_consent BOOLEAN,
  status VARCHAR(20), -- new, contacted, closed
  created_at TIMESTAMP
);

-- Gallery Images
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY,
  src VARCHAR(500),
  alt VARCHAR(255),
  category VARCHAR(50),
  tags TEXT[],
  order_index INT,
  is_featured BOOLEAN,
  created_at TIMESTAMP
);

-- Services (for dynamic updates)
CREATE TABLE services (
  id UUID PRIMARY KEY,
  slug VARCHAR(100),
  title VARCHAR(255),
  description TEXT,
  details TEXT[],
  icon VARCHAR(255),
  image VARCHAR(500),
  order_index INT,
  is_active BOOLEAN
);
```

### Analytics Integration (Phase 2)

**Google Analytics 4**:
- Track page views, events, conversions
- Monitor form submissions (event: `contact_form_submit`)
- Analyze traffic sources, demographics

**Microsoft Clarity**:
- Session recordings (user behavior)
- Heatmaps (click patterns)
- Identify UX issues

**Vercel Analytics**:
- Real User Monitoring (RUM)
- Core Web Vitals tracking
- Geographic performance insights

### Content Delivery Network (CDN)

**Current**: Vercel Edge Network (automatic)
- 100+ global edge locations
- Automatic caching
- DDoS protection

**Future**: If Vercel becomes insufficient
- Cloudflare CDN (additional layer)
- AWS CloudFront (enterprise needs)

---

## Architectural Decisions

### ADR-001: Next.js App Router over Pages Router

**Context**:
- Next.js 14+ recommends App Router for new projects
- App Router uses React Server Components (better performance)
- Pages Router is still supported but considered legacy

**Decision**: Use App Router

**Rationale**:
- Future-proof (Vercel's investment in App Router)
- Better performance (less client-side JS)
- Improved data fetching (Server Actions, async components)
- Simplified layouts (nested layouts, shared UI)
- Native TypeScript support

**Consequences**:
- **Positive**:
  - Smaller bundle sizes (Server Components)
  - Faster page loads (streaming, suspense)
  - Better SEO (more content server-rendered)
- **Negative**:
  - Steeper learning curve (new paradigm)
  - Some third-party libraries may not support Server Components yet
  - Requires careful client/server boundary management

**Alternatives Considered**:
- Pages Router: Easier migration from older Next.js, but deprecated
- Remix: Great DX, but smaller ecosystem, less Vercel integration

---

### ADR-002: No Database in MVP

**Context**:
- Contact form submissions need to be sent to owner
- Gallery images and services are static content
- No user authentication or dynamic content in MVP

**Decision**: Avoid database, use email for form submissions, static JSON for content

**Rationale**:
- **Simplicity**: No database setup, migrations, or ORM configuration
- **Cost**: Free (no database hosting fees)
- **Performance**: Faster page loads (no DB queries)
- **Security**: Reduced attack surface (no SQL injection risk)
- **Maintenance**: Less infrastructure to manage
- **Development Speed**: Faster MVP delivery

**Consequences**:
- **Positive**:
  - Faster development (no schema design, migrations)
  - Zero database costs
  - Simpler deployment (no DB credentials, connection pooling)
  - Better performance (static content, no queries)
- **Negative**:
  - No form submission history (owner must save emails manually)
  - Content updates require code changes (re-deploy)
  - No analytics on form submissions (without GA)
  - Phase 2 migration may require refactoring

**Migration Path (Phase 2)**:
- Add Supabase (free tier: 500MB DB, 1GB storage)
- Store form submissions for admin review
- Store gallery images with metadata (tags, categories)
- Add admin panel for content management

**Alternatives Considered**:
- Supabase (free tier): Adds complexity, not needed for MVP
- Vercel Postgres: Costs $20/month, overkill for static site
- MongoDB Atlas (free tier): NoSQL overhead, not needed

---

### ADR-003: Resend as Primary Email Service

**Context**:
- Contact form needs to send emails with attachments
- Email must be reliable and deliverable (avoid spam filters)
- Budget is limited (free or low-cost preferred)

**Decision**: Use Resend as primary email service, Nodemailer (Gmail SMTP) as fallback

**Rationale - Resend**:
- **Modern API**: TypeScript-first, excellent DX
- **Free Tier**: 100 emails/day, 3k/month (sufficient for MVP)
- **Attachments**: Built-in support (base64 encoding)
- **Deliverability**: High inbox rate (better than Gmail SMTP)
- **React Email**: Template support (future use)
- **Vercel Integration**: Easy setup, environment variables

**Rationale - Nodemailer Fallback**:
- **No Vendor Lock-in**: Can switch to Gmail SMTP if Resend has issues
- **Free**: Uses existing Gmail account
- **Battle-Tested**: Widely used, stable library
- **Flexibility**: Works with any SMTP server

**Consequences**:
- **Positive**:
  - Reliable email delivery
  - Easy integration (Vercel environment variables)
  - Scalable (upgrade to paid plan if needed)
  - Modern developer experience
- **Negative**:
  - Resend free tier limit (100 emails/day)
  - Requires email domain verification (for production)
  - Fallback adds code complexity (conditional logic)

**Alternatives Considered**:
- **SendGrid**: Popular, but complex API, free tier limited (100 emails/day)
- **Mailgun**: Great for transactional emails, but pricing unclear
- **AWS SES**: Cheap, but requires AWS account, complex setup
- **Gmail SMTP (only)**: Simple, but poor deliverability, may hit spam filters

**Implementation**:
```typescript
// Resend (primary)
try {
  await resend.emails.send({ ... });
} catch (error) {
  // Fallback to Nodemailer (Gmail SMTP)
  await transporter.sendMail({ ... });
}
```

---

### ADR-004: Static Content Over CMS in MVP

**Context**:
- Gallery images, services, and page content rarely change
- Client may want to update gallery/services in the future
- CMS adds complexity and cost

**Decision**: Use static JSON/TypeScript constants in code, defer CMS to Phase 2

**Rationale**:
- **MVP Speed**: No CMS setup, no learning curve
- **Simplicity**: Content lives in code (Git version control)
- **Performance**: Static generation (no API calls to CMS)
- **Cost**: Free (no CMS subscription)
- **Type Safety**: TypeScript interfaces for content

**Consequences**:
- **Positive**:
  - Faster development (no CMS configuration)
  - Full type safety (TypeScript)
  - Git history for content changes
  - No external dependencies
- **Negative**:
  - Content updates require developer (code changes + redeploy)
  - No non-technical user access (owner can't update gallery)
  - Gallery additions require PR + merge + deploy cycle

**Phase 2 Migration**:
- Add Sanity or Contentful (headless CMS)
- Migrate gallery images and services to CMS
- Keep static content (hero, about) in code (rarely changes)
- Use Incremental Static Regeneration (ISR) to update content

**Alternatives Considered**:
- **Sanity**: Great DX, free tier (3 users, 10k API requests/month), but adds complexity
- **Contentful**: Industry standard, free tier (1 user, 25k records), but overkill for MVP
- **Strapi**: Self-hosted, flexible, but requires server management

---

### ADR-005: Tailwind CSS Over CSS Modules/Styled Components

**Context**:
- Odyssey template uses Tailwind CSS
- Need to customize theme for industrial aesthetic
- Want fast development with consistent design system

**Decision**: Use Tailwind CSS with custom theme

**Rationale**:
- **Pre-configured**: Odyssey template has Tailwind set up
- **Utility-First**: Fast prototyping, no CSS naming debates
- **Responsive**: Mobile-first utilities (sm:, md:, lg:)
- **Purge CSS**: Removes unused styles (small bundles)
- **Customization**: Easy theme config (colors, fonts, spacing)
- **Consistency**: Design tokens enforce visual consistency

**Consequences**:
- **Positive**:
  - Fast development (no writing CSS files)
  - Small bundle size (PurgeCSS)
  - Responsive design built-in
  - No CSS naming conflicts
  - Easy theme customization
- **Negative**:
  - Long class names (verbose HTML)
  - Learning curve for Tailwind syntax
  - Custom animations may need separate CSS

**Alternatives Considered**:
- **CSS Modules**: Good isolation, but slower development
- **Styled Components**: Great for dynamic styles, but larger bundle, no SSR benefit
- **Plain CSS**: Simple, but no design system, hard to maintain

---

### ADR-006: Framer Motion for Animations

**Context**:
- Design requires scroll-triggered animations, parallax, lightbox transitions
- Want declarative API (not imperative jQuery-style)
- Performance is critical (60fps animations)

**Decision**: Use Framer Motion for all animations

**Rationale**:
- **Declarative**: `<motion.div>` components (React-friendly)
- **Performance**: GPU-accelerated, optimized for 60fps
- **Features**: Scroll animations, gestures, variants, layout animations
- **Accessibility**: Respects `prefers-reduced-motion`
- **Developer Experience**: TypeScript support, great documentation

**Consequences**:
- **Positive**:
  - Smooth, performant animations
  - Easy scroll-triggered effects (Intersection Observer built-in)
  - Gesture support (swipe lightbox on mobile)
  - Accessibility built-in
- **Negative**:
  - Adds ~30KB to bundle (gzipped)
  - Requires client components (not Server Components)
  - Learning curve for advanced animations

**Alternatives Considered**:
- **CSS Animations**: Lightweight, but limited features, harder to orchestrate
- **GSAP**: Powerful, but larger bundle, subscription for advanced features
- **React Spring**: Great for physics-based animations, but complex API

---

### ADR-007: Vercel Hosting Over Alternatives

**Context**:
- Need reliable hosting with global CDN
- Want automatic deployments from Git
- Budget-conscious (prefer free tier for MVP)
- Next.js-specific optimizations beneficial

**Decision**: Host on Vercel

**Rationale**:
- **Next.js Creator**: First-class Next.js support, automatic optimizations
- **Free Tier**: Generous (100GB bandwidth, unlimited static requests)
- **CDN**: Global edge network (100+ locations)
- **SSL**: Automatic HTTPS (Let's Encrypt)
- **CI/CD**: Git integration (push to deploy)
- **Preview Deployments**: Every PR gets a unique URL
- **Analytics**: Built-in Web Vitals tracking
- **Developer Experience**: Best-in-class deployment flow

**Consequences**:
- **Positive**:
  - Zero DevOps (no server management)
  - Fast global performance (CDN)
  - Free for MVP (upgrade if traffic grows)
  - Automatic SSL, caching, compression
  - Excellent monitoring and logs
- **Negative**:
  - Vendor lock-in (mitigated by standard Next.js code)
  - Serverless function limits (10s timeout on free tier)
  - Costs increase with traffic (bandwidth, function invocations)

**Alternatives Considered**:
- **Netlify**: Similar to Vercel, but less Next.js optimization
- **AWS Amplify**: More complex, overkill for simple site
- **Cloudflare Pages**: Great CDN, but less Next.js support
- **Self-hosted (VPS)**: Full control, but requires DevOps, more expensive

**Cost Projection**:
- MVP (0-10k visitors/month): $0 (free tier)
- Growth (10k-100k visitors): $20/month (Pro plan)
- Scale (100k+): $40+/month (custom)

---

## Version History

### Version 1.0 (2025-11-11)

**Created By**: Chief Architect (AI Agent)
**Status**: Final - Ready for Implementation
**Next Review**: After MVP Launch

**Changes**:
- Initial architecture document created from PRD
- All sections completed (tech stack, architecture, patterns, decisions)
- ADRs documented with context, rationale, and consequences
- Migration paths defined for Phase 2 enhancements

---

## Approval & Next Steps

**Reviewed By**: _____________________ (Bangla)
**Date**: _____________________
**Approved for Implementation**: [ ] Yes  [ ] No (specify changes needed)

**Next Steps**:
1. **API Designer**: Generate `docs/API.md` (contact form endpoint spec)
2. **Database Designer**: Generate `docs/db-schema.md` (Phase 2 schema design)
3. **Feature Planner**: Generate `docs/features.md` (user stories, tasks)
4. **Implementer**: Begin Sprint 1 (project setup, template customization)

---

**End of Architecture Documentation**

*This document is a living artifact and will be updated as architectural decisions evolve or new requirements emerge.*
