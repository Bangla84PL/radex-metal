# Database Schema - Radex Metal

**Project:** radex-metal
**Database Strategy:** MVP: No Database → Phase 2: Supabase/PostgreSQL
**Last Updated:** 2025-11-11
**Version:** 1.0

---

## 1. Database Strategy Overview

### MVP (Phase 1): No Database
**Rationale for Delayed Database Implementation:**

The MVP intentionally **avoids database usage** to prioritize speed, simplicity, and cost-effectiveness:

- **Static Content:** All page content (hero, about, services, gallery) is hardcoded in TypeScript/React components
- **No User Accounts:** No authentication or user management needed
- **Email-Based Contact:** Form submissions sent directly via email (Resend/Nodemailer)
- **No Persistence:** Contact form data is NOT stored; only emailed to radexmetal.com@gmail.com
- **Gallery Management:** Images stored in `/public/images/gallery/` with static paths in code

**Benefits:**
- Zero database hosting costs
- No database migration complexity
- Faster development (1-2 weeks vs 3-4 weeks)
- Simpler deployment (Vercel static/serverless only)
- No security vulnerabilities from DB access
- Easier maintenance

**Trade-offs:**
- Cannot track form submissions history
- No admin panel for content management
- Gallery updates require code changes and redeployment
- No analytics on user inquiries

---

### Phase 2: Database Implementation Plan

**When to migrate to database:**
- Admin panel needed for gallery management
- Form submission tracking/CRM required
- Blog/news section added
- User testimonials/reviews system
- Consultation booking system
- Analytics dashboard for business metrics

**Database Choice:** Supabase (PostgreSQL)

**Why Supabase:**
- Free tier: 500MB database, 2GB bandwidth, 50,000 monthly active users
- Built-in authentication (NextAuth.js integration)
- Row-Level Security (RLS) for data protection
- Real-time subscriptions (for live updates)
- Auto-generated REST API
- Edge Functions for serverless logic
- Built-in file storage (for gallery images, attachments)
- Easy Vercel integration

**Alternatives Considered:**
- Vercel Postgres (good, but more expensive)
- PlanetScale (MySQL, limited free tier)
- MongoDB Atlas (NoSQL, not ideal for relational data)

---

## 2. MVP Data Model (Static - TypeScript Interfaces)

### TypeScript Types (`src/types/index.ts`)

```typescript
// ============================================
// PAGE CONTENT (Static in Code)
// ============================================

export interface PageContent {
  hero: HeroContent;
  about: AboutContent;
  services: Service[];
  gallery: GalleryImage[];
  contact: ContactInfo;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  backgroundImage: string;
  backgroundVideo?: string; // Optional video
}

export interface AboutContent {
  title: string;
  content: string; // Full HTML/Markdown
  stats: Stat[];
  image: string;
}

export interface Stat {
  label: string;
  value: string;
  icon?: string;
}

// ============================================
// SERVICE ENTITY (Static)
// ============================================

export interface Service {
  id: string; // 'balustrady' | 'bramy' | 'ogrodzenia' | 'jachty'
  title: string;
  description: string; // Short description for card
  details: string[]; // Bullet points of features
  icon: string; // Path to icon SVG
  image: string; // Background image for card
  order: number; // Display order (1-4)
}

// ============================================
// GALLERY IMAGE (Static)
// ============================================

export interface GalleryImage {
  id: string; // Unique identifier
  src: string; // Image path in /public/images/gallery/
  alt: string; // Alt text for accessibility
  category: ServiceCategory;
  width?: number; // Optional for optimization
  height?: number; // Optional for optimization
}

export type ServiceCategory =
  | 'balustrady'
  | 'bramy'
  | 'ogrodzenia'
  | 'jachty';

// ============================================
// CONTACT INFO (Static)
// ============================================

export interface ContactInfo {
  companyName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  emails: string[];
  mapUrl: string; // Google Maps embed link
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// ============================================
// CONTACT FORM DATA (No Storage, Email Only)
// ============================================

export interface ContactFormData {
  name: string; // min 2 chars
  email: string; // valid email format
  phone: string; // Polish format: 600 656 747
  serviceType: ServiceType;
  message: string; // min 20 chars
  attachments: File[]; // max 3 files, 5MB each
  gdprConsent: boolean; // must be true
  submittedAt: Date; // timestamp
}

export type ServiceType =
  | 'balustrady'
  | 'bramy'
  | 'ogrodzenia'
  | 'jachty'
  | 'konstrukcje'
  | 'zbrojenia'
  | 'renowacja'
  | 'inne';

// ============================================
// EMAIL TEMPLATE DATA
// ============================================

export interface EmailData {
  to: string; // radexmetal.com@gmail.com
  subject: string;
  html: string; // HTML email template
  attachments?: EmailAttachment[];
}

export interface EmailAttachment {
  filename: string;
  content: Buffer;
  contentType: string;
}
```

### Static Data Constants (`src/constants/`)

**services.ts:**
```typescript
import { Service } from '@/types';

export const SERVICES: Service[] = [
  {
    id: 'balustrady',
    title: 'Balustrady Radex Metal',
    description: 'Balustrady balkonowe i schodowe ze stali nierdzewnej i węglowej',
    details: [
      'Balustrady balkonowe i schodowe',
      'Stal nierdzewna i stal węglowa',
      'Możliwość montażu szyb',
      'Indywidualne projekty klientów',
    ],
    icon: '/icons/railing.svg',
    image: '/images/services/balustrady.jpg',
    order: 1,
  },
  {
    id: 'bramy',
    title: 'Bramy Radex Metal',
    description: 'Bramy przesuwne i uchylne pod indywidualne zamówienie',
    details: [
      'Bramy przesuwne i uchylne',
      'Indywidualne wymiary i projekty',
      'Bogaty wybór wzorów',
      'Możliwość automatyki',
    ],
    icon: '/icons/gate.svg',
    image: '/images/services/bramy.jpg',
    order: 2,
  },
  {
    id: 'ogrodzenia',
    title: 'Ogrodzenia Radex Metal',
    description: 'Kompletny system ogrodzeniowy z bramami i furtkami',
    details: [
      'Wypełnienie drewnem lub blachą',
      'Kowalstwo artystyczne',
      'Kompletny system: bramy, furtki, segmenty, słupki',
      'Ujednolicony wygląd całego ogrodzenia',
    ],
    icon: '/icons/fence.svg',
    image: '/images/services/ogrodzenia.jpg',
    order: 3,
  },
  {
    id: 'jachty',
    title: 'Jachty Motorowe (Okucia)',
    description: 'Profesjonalne okucia ze stali nierdzewnej dla jachtów',
    details: [
      'Okucia ze stali nierdzewnej',
      'Balustrady i uchwyty',
      'Meble i orurowanie',
      'Dostosowane do popularnych jachtów',
    ],
    icon: '/icons/boat.svg',
    image: '/images/services/jachty.jpg',
    order: 4,
  },
];
```

**gallery.ts:**
```typescript
import { GalleryImage } from '@/types';

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'gallery-1',
    src: '/images/gallery/project-1.jpg',
    alt: 'Brama przesuwna nowoczesna',
    category: 'bramy',
  },
  {
    id: 'gallery-2',
    src: '/images/gallery/project-2.jpg',
    alt: 'Balustrada balkonowa stal nierdzewna',
    category: 'balustrady',
  },
  // ... 6-10 more images
];
```

**contact.ts:**
```typescript
import { ContactInfo } from '@/types';

export const CONTACT_INFO: ContactInfo = {
  companyName: 'Radex Metal',
  address: 'ul. Cecorska 10',
  city: 'Słupsk',
  postalCode: '76-200',
  phone: '600 656 747',
  emails: ['radexmetal.com@gmail.com', 'radexmetal.pl@gmail.com'],
  mapUrl: 'https://maps.app.goo.gl/ornSRoVhrXrX2VzK6',
  coordinates: {
    lat: 54.4641,
    lng: 17.0285,
  },
};
```

---

## 3. Phase 2 Database Schema (Supabase/PostgreSQL)

### ERD Diagram (ASCII)

```
┌─────────────────────┐
│       users         │
├─────────────────────┤
│ id (PK)             │◄───┐
│ email               │    │
│ password_hash       │    │
│ role                │    │
│ created_at          │    │
│ updated_at          │    │
└─────────────────────┘    │
                           │
                           │ 1:N
                           │
┌─────────────────────┐    │
│ contact_submissions │────┘
├─────────────────────┤
│ id (PK)             │
│ name                │
│ email               │
│ phone               │
│ service_type        │
│ message             │
│ attachments (JSONB) │
│ gdpr_consent        │
│ status              │
│ assigned_to (FK)    │──┘
│ created_at          │
│ updated_at          │
└─────────────────────┘


┌─────────────────────┐
│   gallery_images    │
├─────────────────────┤
│ id (PK)             │
│ src                 │
│ alt                 │
│ category            │
│ tags (TEXT[])       │
│ order_index         │
│ is_featured         │
│ created_at          │
│ updated_at          │
└─────────────────────┘


┌─────────────────────┐
│   consultations     │
├─────────────────────┤
│ id (PK)             │
│ client_name         │
│ client_email        │
│ client_phone        │
│ scheduled_date      │
│ topic               │
│ service_type        │
│ status              │
│ notes (TEXT)        │
│ created_at          │
│ updated_at          │
└─────────────────────┘
```

---

### Table Definitions

#### 3.1 `users`
**Purpose:** Admin user accounts for panel access

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, NOT NULL, DEFAULT uuid_generate_v4() | Primary key |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Admin email |
| password_hash | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| role | VARCHAR(20) | NOT NULL, DEFAULT 'admin' | User role (admin/super_admin) |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Account creation |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update |

**Indexes:**
- `idx_users_email` on `email` (unique constraint already provides index)

**SQL:**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Super admins can view all users"
  ON users FOR SELECT
  USING (role = 'super_admin');
```

---

#### 3.2 `contact_submissions`
**Purpose:** Store contact form submissions for CRM/tracking

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, NOT NULL, DEFAULT uuid_generate_v4() | Primary key |
| name | VARCHAR(255) | NOT NULL | Client name |
| email | VARCHAR(255) | NOT NULL | Client email |
| phone | VARCHAR(20) | NOT NULL | Phone number |
| service_type | VARCHAR(50) | NOT NULL | Enum: balustrady, bramy, ogrodzenia, jachty, konstrukcje, zbrojenia, renowacja, inne |
| message | TEXT | NOT NULL | Client message (min 20 chars) |
| attachments | JSONB | NULL | Array of file URLs: `[{filename, url, size, type}]` |
| gdpr_consent | BOOLEAN | NOT NULL, DEFAULT FALSE | RODO consent flag |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'new' | Enum: new, contacted, in_progress, quoted, closed, spam |
| assigned_to | UUID | FK(users.id), NULL | Admin user assigned to inquiry |
| notes | TEXT | NULL | Internal notes for admin |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Submission time |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last status update |

**Indexes:**
- `idx_contact_submissions_status` on `status`
- `idx_contact_submissions_created_at` on `created_at DESC`
- `idx_contact_submissions_service_type` on `service_type`
- `idx_contact_submissions_email` on `email`

**SQL:**
```sql
CREATE TYPE submission_status AS ENUM (
  'new', 'contacted', 'in_progress', 'quoted', 'closed', 'spam'
);

CREATE TYPE service_type_enum AS ENUM (
  'balustrady', 'bramy', 'ogrodzenia', 'jachty',
  'konstrukcje', 'zbrojenia', 'renowacja', 'inne'
);

CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  service_type service_type_enum NOT NULL,
  message TEXT NOT NULL,
  attachments JSONB,
  gdpr_consent BOOLEAN NOT NULL DEFAULT FALSE,
  status submission_status NOT NULL DEFAULT 'new',
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_service_type ON contact_submissions(service_type);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);

-- RLS Policies
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all submissions"
  ON contact_submissions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role IN ('admin', 'super_admin')
  ));

CREATE POLICY "Admins can update submissions"
  ON contact_submissions FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role IN ('admin', 'super_admin')
  ));

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

#### 3.3 `gallery_images`
**Purpose:** CMS-managed gallery images (Phase 2)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, NOT NULL, DEFAULT uuid_generate_v4() | Primary key |
| src | VARCHAR(500) | NOT NULL | Image URL (Supabase Storage path) |
| alt | VARCHAR(255) | NOT NULL | Alt text for SEO/accessibility |
| category | VARCHAR(50) | NOT NULL | Enum: balustrady, bramy, ogrodzenia, jachty |
| tags | TEXT[] | NULL | Array of tags for filtering |
| order_index | INTEGER | NOT NULL, DEFAULT 0 | Display order (manual sorting) |
| is_featured | BOOLEAN | NOT NULL, DEFAULT FALSE | Featured on homepage |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Upload time |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update |

**Indexes:**
- `idx_gallery_images_category` on `category`
- `idx_gallery_images_order_index` on `order_index ASC`
- `idx_gallery_images_is_featured` on `is_featured`

**SQL:**
```sql
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  src VARCHAR(500) NOT NULL,
  alt VARCHAR(255) NOT NULL,
  category service_type_enum NOT NULL,
  tags TEXT[],
  order_index INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_gallery_images_category ON gallery_images(category);
CREATE INDEX idx_gallery_images_order_index ON gallery_images(order_index ASC);
CREATE INDEX idx_gallery_images_is_featured ON gallery_images(is_featured);

-- RLS Policies
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published images"
  ON gallery_images FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage images"
  ON gallery_images FOR ALL
  USING (EXISTS (
    SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role IN ('admin', 'super_admin')
  ));

CREATE TRIGGER update_gallery_images_updated_at
  BEFORE UPDATE ON gallery_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

#### 3.4 `consultations`
**Purpose:** Booking system for consultations (Phase 2 - future feature)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, NOT NULL, DEFAULT uuid_generate_v4() | Primary key |
| client_name | VARCHAR(255) | NOT NULL | Client name |
| client_email | VARCHAR(255) | NOT NULL | Client email |
| client_phone | VARCHAR(20) | NOT NULL | Phone number |
| scheduled_date | TIMESTAMP | NOT NULL | Appointment date/time |
| topic | VARCHAR(255) | NULL | Consultation topic |
| service_type | VARCHAR(50) | NOT NULL | Service of interest |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'scheduled' | Enum: scheduled, completed, cancelled, no_show |
| notes | TEXT | NULL | Admin notes |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Booking time |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update |

**Indexes:**
- `idx_consultations_scheduled_date` on `scheduled_date ASC`
- `idx_consultations_status` on `status`
- `idx_consultations_client_email` on `client_email`

**SQL:**
```sql
CREATE TYPE consultation_status AS ENUM (
  'scheduled', 'completed', 'cancelled', 'no_show'
);

CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(20) NOT NULL,
  scheduled_date TIMESTAMP NOT NULL,
  topic VARCHAR(255),
  service_type service_type_enum NOT NULL,
  status consultation_status NOT NULL DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_consultations_scheduled_date ON consultations(scheduled_date ASC);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_client_email ON consultations(client_email);

-- RLS Policies
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all consultations"
  ON consultations FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role IN ('admin', 'super_admin')
  ));

CREATE TRIGGER update_consultations_updated_at
  BEFORE UPDATE ON consultations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

## 4. Migration Strategy

### From Static (MVP) to Database (Phase 2)

#### Step 1: Pre-Migration Planning
**Timeline:** 1-2 days before migration

**Actions:**
1. Set up Supabase project
2. Configure environment variables
3. Create database schema (run SQL scripts)
4. Test database connection from Next.js
5. Backup current static data (content.ts, gallery.ts)

**Checklist:**
- [ ] Supabase project created
- [ ] Database tables created
- [ ] RLS policies enabled
- [ ] Environment variables set
- [ ] Connection tested successfully

---

#### Step 2: Data Migration
**Timeline:** 1 day

**Gallery Images Migration:**
```typescript
// Script: scripts/migrate-gallery.ts
import { GALLERY_IMAGES } from '@/constants/gallery';
import { createClient } from '@supabase/supabase-js';

async function migrateGallery() {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

  for (const image of GALLERY_IMAGES) {
    // 1. Upload image to Supabase Storage
    const file = await fs.readFile(`public${image.src}`);
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(`${image.id}.jpg`, file);

    if (uploadError) throw uploadError;

    // 2. Insert metadata to gallery_images table
    const { error: insertError } = await supabase
      .from('gallery_images')
      .insert({
        src: uploadData.path,
        alt: image.alt,
        category: image.category,
        order_index: GALLERY_IMAGES.indexOf(image),
      });

    if (insertError) throw insertError;
  }

  console.log('Gallery migration complete!');
}
```

**Services Migration:**
- Services remain static in Phase 2 (rarely change)
- Only migrate to DB in Phase 3 if dynamic content editing needed

---

#### Step 3: Code Refactoring
**Timeline:** 2-3 days

**Changes:**
1. **Contact Form Component:**
   - Add dual submission: Email + Database insert
   - Update API route to save to `contact_submissions` table

```typescript
// Before (MVP):
async function submitForm(data: ContactFormData) {
  await sendEmail(data); // Email only
}

// After (Phase 2):
async function submitForm(data: ContactFormData) {
  await Promise.all([
    sendEmail(data), // Still send email
    saveToDatabase(data), // Also save to DB
  ]);
}
```

2. **Gallery Component:**
   - Fetch from database instead of static constant
   - Implement server-side rendering (SSR) or static generation (SSG)

```typescript
// Before (MVP):
import { GALLERY_IMAGES } from '@/constants/gallery';

// After (Phase 2):
import { createClient } from '@/lib/supabase';

async function getGalleryImages() {
  const supabase = createClient();
  const { data } = await supabase
    .from('gallery_images')
    .select('*')
    .order('order_index', { ascending: true });
  return data;
}
```

---

#### Step 4: Zero-Downtime Deployment
**Timeline:** 1 day

**Strategy:**
1. Deploy new version with database integration to staging
2. Test all functionality on staging
3. Run data migration script
4. Deploy to production (Vercel auto-deployment)
5. Monitor for errors (Vercel logs, Sentry)

**Rollback Plan:**
- If issues occur, revert to previous deployment (1-click rollback on Vercel)
- Database data remains safe (no destructive operations)
- Static files still accessible as fallback

---

## 5. Data Validation & Constraints

### Field-Level Constraints

#### Contact Form Validation

**Frontend (TypeScript + Zod):**
```typescript
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Imię musi mieć minimum 2 znaki').max(255),
  email: z.string().email('Nieprawidłowy format email'),
  phone: z.string().regex(/^[0-9]{9}$/, 'Numer telefonu musi mieć 9 cyfr'),
  serviceType: z.enum([
    'balustrady', 'bramy', 'ogrodzenia', 'jachty',
    'konstrukcje', 'zbrojenia', 'renowacja', 'inne'
  ]),
  message: z.string().min(20, 'Wiadomość musi mieć minimum 20 znaków'),
  attachments: z.array(z.instanceof(File)).max(3, 'Maksymalnie 3 pliki'),
  gdprConsent: z.literal(true, { errorMap: () => ({ message: 'Zgoda RODO jest wymagana' }) }),
});
```

**Backend (Database Constraints):**
```sql
-- Check constraints
ALTER TABLE contact_submissions
  ADD CONSTRAINT check_name_length CHECK (LENGTH(name) >= 2),
  ADD CONSTRAINT check_message_length CHECK (LENGTH(message) >= 20),
  ADD CONSTRAINT check_gdpr_consent CHECK (gdpr_consent = TRUE);
```

---

### Business Rule Validation

**Rule 1: Prevent Duplicate Submissions**
```sql
-- Prevent same email submitting same message within 1 hour
CREATE UNIQUE INDEX idx_prevent_duplicate_submissions
  ON contact_submissions (email, MD5(message))
  WHERE created_at > NOW() - INTERVAL '1 hour';
```

**Rule 2: Max 5 Submissions Per Email Per Day**
```sql
-- Check in API route before insert
SELECT COUNT(*)
FROM contact_submissions
WHERE email = $1
  AND created_at > NOW() - INTERVAL '24 hours'
HAVING COUNT(*) >= 5;
```

**Rule 3: Spam Detection**
```typescript
// API route validation
function detectSpam(data: ContactFormData): boolean {
  const spamKeywords = ['viagra', 'casino', 'lottery', 'click here'];
  const messageContent = data.message.toLowerCase();

  return spamKeywords.some(keyword => messageContent.includes(keyword));
}
```

---

## 6. Security Considerations

### Row-Level Security (RLS)

**Enabled on all tables:**
```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
```

**Policy Examples:**
- **Public Read:** `gallery_images` visible to all (authenticated or not)
- **Admin Only:** `contact_submissions`, `consultations` only visible to admins
- **User Isolation:** Each admin can only see their assigned submissions

---

### User Access Control

**Role-Based Access:**
- **super_admin:** Full access (CRUD on all tables)
- **admin:** Read/Update on submissions, Read-only on users

**Authentication:**
- NextAuth.js with email/password
- Session-based authentication (JWT tokens)
- HTTPS-only cookies

---

### Data Encryption

**In-Transit:**
- HTTPS enforced (Vercel automatic SSL)
- TLS 1.3 for database connections

**At-Rest:**
- Supabase encrypts all data at rest (AES-256)
- Password hashing: bcrypt with salt rounds = 12

**File Uploads:**
- Stored in Supabase Storage (separate from database)
- Pre-signed URLs for secure access
- Automatic virus scanning (future enhancement)

---

### RODO (GDPR) Compliance

**Data Minimization:**
- Only collect necessary fields (name, email, phone, message)
- No sensitive data stored (no credit cards, SSN, etc.)

**Consent Management:**
- `gdpr_consent` boolean field (must be TRUE)
- Checkbox in form: "Wyrażam zgodę na przetwarzanie moich danych osobowych"

**Right to Access:**
- Admin panel allows searching submissions by email
- Export functionality for user data

**Right to Deletion:**
```sql
-- Soft delete (recommended)
ALTER TABLE contact_submissions ADD COLUMN deleted_at TIMESTAMP;

-- Hard delete (if requested)
DELETE FROM contact_submissions WHERE email = 'user@example.com';
```

**Data Retention:**
- Contact submissions: 2 years
- Consultations: 1 year after completion
- Automatic cleanup script:

```sql
-- Run monthly via cron job
DELETE FROM contact_submissions
WHERE created_at < NOW() - INTERVAL '2 years';

DELETE FROM consultations
WHERE status = 'completed'
  AND scheduled_date < NOW() - INTERVAL '1 year';
```

---

## 7. Query Patterns

### Expected Query Patterns

#### Admin Dashboard - Recent Submissions
```sql
-- Fetch 20 most recent submissions
SELECT
  id, name, email, phone, service_type, message, status, created_at
FROM contact_submissions
WHERE status != 'spam'
ORDER BY created_at DESC
LIMIT 20 OFFSET $1;

-- Performance: Uses idx_contact_submissions_created_at
```

#### Admin Dashboard - Filter by Status
```sql
-- Fetch all 'new' submissions
SELECT *
FROM contact_submissions
WHERE status = 'new'
ORDER BY created_at DESC;

-- Performance: Uses idx_contact_submissions_status
```

#### Gallery - Public View
```sql
-- Fetch all gallery images for homepage
SELECT id, src, alt, category
FROM gallery_images
WHERE is_featured = TRUE
ORDER BY order_index ASC;

-- Performance: Uses idx_gallery_images_is_featured + idx_gallery_images_order_index
```

#### Gallery - Category Filtering (Phase 2)
```sql
-- Fetch gallery images by category
SELECT *
FROM gallery_images
WHERE category = 'bramy'
ORDER BY order_index ASC;

-- Performance: Uses idx_gallery_images_category
```

#### Search Submissions by Email
```sql
-- Admin searches for customer history
SELECT *
FROM contact_submissions
WHERE email = 'jan@example.com'
ORDER BY created_at DESC;

-- Performance: Uses idx_contact_submissions_email
```

---

### Performance Optimization

**Indexing Strategy:**
- **Primary Keys:** Automatic B-tree index (UUID)
- **Foreign Keys:** Indexed for JOIN performance
- **Frequently Filtered Columns:** status, created_at, service_type, category
- **Search Columns:** email (partial match with LIKE requires GIN index)

**GIN Index for Text Search (Future):**
```sql
-- Enable full-text search on message field
CREATE INDEX idx_contact_submissions_message_fts
  ON contact_submissions
  USING GIN (to_tsvector('polish', message));

-- Usage:
SELECT * FROM contact_submissions
WHERE to_tsvector('polish', message) @@ to_tsquery('polish', 'brama');
```

**Query Plan Analysis:**
```sql
EXPLAIN ANALYZE
SELECT * FROM contact_submissions
WHERE status = 'new'
ORDER BY created_at DESC
LIMIT 20;
```

---

## 8. Backup & Recovery

### Backup Strategy

**Supabase Automatic Backups:**
- **Free Tier:** Daily backups (retained for 7 days)
- **Pro Tier:** Daily backups (retained for 30 days) + point-in-time recovery

**Manual Backups:**
```bash
# PostgreSQL dump (run weekly via cron)
pg_dump -h db.supabase.co -U postgres -d radex_metal > backup_$(date +%Y%m%d).sql

# Upload to Vercel Blob Storage or AWS S3
vercel blob put backup_$(date +%Y%m%d).sql --token $VERCEL_TOKEN
```

---

### Recovery Procedures

**Scenario 1: Accidental Data Deletion**
```sql
-- Restore from soft delete (if deleted_at is set)
UPDATE contact_submissions
SET deleted_at = NULL
WHERE id = 'xxx-xxx-xxx';

-- Restore from backup (if hard deleted)
-- 1. Download latest backup
-- 2. Extract specific row
grep "xxx-xxx-xxx" backup_20250111.sql > restore.sql
psql -h db.supabase.co -U postgres -d radex_metal -f restore.sql
```

**Scenario 2: Database Corruption**
- Supabase has built-in high availability (HA)
- Automatic failover to replica
- Manual restore from daily backup if needed

**Scenario 3: Total Data Loss (Disaster Recovery)**
- Restore from Supabase automated backup (up to 30 days)
- Restore from manual backup (S3/Vercel Blob)
- Rebuild static content from Git repository

---

### Data Retention Policy

| Table | Retention Period | Cleanup Method |
|-------|------------------|----------------|
| contact_submissions | 2 years | Automated monthly script |
| consultations | 1 year after completion | Automated monthly script |
| gallery_images | Indefinite | Manual deletion only |
| users | Indefinite | Manual deletion only |

**Cleanup Script (run monthly via Supabase Edge Function):**
```sql
-- Archive old submissions to backup table before deletion
INSERT INTO contact_submissions_archive
SELECT * FROM contact_submissions
WHERE created_at < NOW() - INTERVAL '2 years';

DELETE FROM contact_submissions
WHERE created_at < NOW() - INTERVAL '2 years';

-- Vacuum to reclaim space
VACUUM ANALYZE contact_submissions;
```

---

## 9. Scalability Planning

### Expected Growth

**Year 1 Projections:**
- Monthly visitors: 1,000 - 5,000
- Contact submissions: 20 - 50 per month
- Gallery images: 50 - 100 total
- Database size: < 100 MB

**Year 2 Projections:**
- Monthly visitors: 5,000 - 15,000
- Contact submissions: 50 - 150 per month
- Gallery images: 100 - 300 total
- Database size: 200 - 500 MB

**Year 3 Projections:**
- Monthly visitors: 15,000 - 50,000
- Contact submissions: 150 - 500 per month
- Gallery images: 300 - 1,000 total
- Database size: 1 - 2 GB

---

### Scaling Strategies

#### Vertical Scaling (Increase Resources)
**Supabase Tier Upgrades:**
- **Free:** 500 MB DB, 2 GB bandwidth (adequate for Year 1)
- **Pro ($25/month):** 8 GB DB, 50 GB bandwidth (Year 2-3)
- **Team ($599/month):** 32 GB DB, 250 GB bandwidth (if explosive growth)

#### Horizontal Scaling (Distribute Load)
- **Read Replicas:** Supabase Pro tier includes read replicas for query distribution
- **CDN:** Vercel Edge Network caches static assets (images, CSS, JS)
- **Database Caching:** Redis/Upstash for frequently accessed data (gallery images)

#### Connection Pooling
```typescript
// Use Supabase connection pooler for high concurrency
const supabase = createClient(
  process.env.SUPABASE_POOLER_URL, // Pooler endpoint
  process.env.SUPABASE_ANON_KEY
);
```

---

### Partitioning Considerations

**When to partition:**
- `contact_submissions` table exceeds 1 million rows
- Query performance degrades (>1 second for common queries)

**Partitioning Strategy: Range Partitioning by Date**
```sql
-- Create parent table (partitioned)
CREATE TABLE contact_submissions_partitioned (
  LIKE contact_submissions INCLUDING ALL
) PARTITION BY RANGE (created_at);

-- Create partitions per year
CREATE TABLE contact_submissions_2025
  PARTITION OF contact_submissions_partitioned
  FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

CREATE TABLE contact_submissions_2026
  PARTITION OF contact_submissions_partitioned
  FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

-- Migrate data
INSERT INTO contact_submissions_partitioned
SELECT * FROM contact_submissions;

-- Swap tables (requires downtime)
DROP TABLE contact_submissions;
ALTER TABLE contact_submissions_partitioned RENAME TO contact_submissions;
```

**Benefits:**
- Faster queries (only scan relevant partitions)
- Easier data archival (drop old partitions)
- Better maintenance (vacuum individual partitions)

---

## 10. Database Monitoring & Maintenance

### Performance Monitoring

**Metrics to Track:**
- Query execution time (p50, p95, p99)
- Active connections
- Database size growth rate
- Cache hit ratio
- Slow query log (queries > 500ms)

**Supabase Dashboard:**
- Built-in metrics for all above
- Alerts for high load, slow queries
- Weekly performance reports

**Custom Monitoring:**
```sql
-- Track slow queries
SELECT
  query,
  mean_exec_time,
  calls
FROM pg_stat_statements
WHERE mean_exec_time > 500
ORDER BY mean_exec_time DESC;
```

---

### Maintenance Schedule

| Task | Frequency | Purpose |
|------|-----------|---------|
| VACUUM ANALYZE | Weekly | Reclaim space, update statistics |
| Index Rebuild | Monthly | Fix index bloat |
| Backup Verification | Weekly | Ensure backups are valid |
| Data Cleanup | Monthly | Delete old records per retention policy |
| Query Performance Review | Monthly | Identify slow queries, add indexes |
| Security Audit | Quarterly | Review RLS policies, user permissions |
| Database Upgrade | Annually | Update PostgreSQL version |

**Automated Maintenance Script (Supabase Edge Function):**
```typescript
// Run every Sunday at 2 AM
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from '@supabase/supabase-js';

serve(async (req) => {
  const supabase = createClient(Deno.env.get('SUPABASE_URL'), Deno.env.get('SUPABASE_SERVICE_KEY'));

  // 1. VACUUM ANALYZE
  await supabase.rpc('execute_sql', {
    query: 'VACUUM ANALYZE contact_submissions;'
  });

  // 2. Data cleanup
  await supabase.rpc('execute_sql', {
    query: `
      DELETE FROM contact_submissions
      WHERE created_at < NOW() - INTERVAL '2 years';
    `
  });

  // 3. Index rebuild (if bloated)
  await supabase.rpc('execute_sql', {
    query: 'REINDEX INDEX idx_contact_submissions_created_at;'
  });

  return new Response('Maintenance complete', { status: 200 });
});
```

---

## 11. Phase 2 Implementation Timeline

### Week 1: Database Setup
- [ ] Create Supabase project
- [ ] Run schema creation SQL scripts
- [ ] Configure RLS policies
- [ ] Set up Supabase Storage buckets (for gallery images, attachments)
- [ ] Test database connection from Next.js

### Week 2: Data Migration
- [ ] Write migration scripts (gallery images, static content)
- [ ] Run migration in staging environment
- [ ] Verify data integrity
- [ ] Test queries and performance
- [ ] Document migration process

### Week 3: Code Refactoring
- [ ] Update contact form API route (dual submission: email + DB)
- [ ] Refactor gallery component (fetch from DB)
- [ ] Build admin authentication (NextAuth.js)
- [ ] Create admin dashboard UI
- [ ] Implement form submission viewer

### Week 4: Testing & Deployment
- [ ] Full QA testing (functionality, performance, security)
- [ ] Load testing (simulate 1000 concurrent users)
- [ ] Deploy to staging
- [ ] User acceptance testing (UAT)
- [ ] Deploy to production
- [ ] Monitor for issues (first 48 hours)

---

## Appendix

### A. SQL Quick Reference

**Connect to Supabase DB:**
```bash
psql "postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

**Common Queries:**
```sql
-- Count total submissions
SELECT COUNT(*) FROM contact_submissions;

-- Count by status
SELECT status, COUNT(*)
FROM contact_submissions
GROUP BY status;

-- Average response time (if tracking)
SELECT AVG(updated_at - created_at) AS avg_response_time
FROM contact_submissions
WHERE status = 'contacted';

-- Top service types
SELECT service_type, COUNT(*) AS count
FROM contact_submissions
GROUP BY service_type
ORDER BY count DESC;
```

---

### B. TypeScript Supabase Client Setup

**Installation:**
```bash
npm install @supabase/supabase-js
```

**Client Setup:**
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type-safe client (auto-generated types)
import { Database } from '@/types/database.types';
export const supabaseTyped = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

**Usage Example:**
```typescript
// Fetch gallery images
const { data, error } = await supabase
  .from('gallery_images')
  .select('*')
  .order('order_index', { ascending: true });

// Insert contact submission
const { error } = await supabase
  .from('contact_submissions')
  .insert({
    name: 'Jan Kowalski',
    email: 'jan@example.com',
    phone: '600123456',
    service_type: 'bramy',
    message: 'Potrzebuję bramy przesuwnej 4m',
    gdpr_consent: true,
  });
```

---

### C. Environment Variables (.env.local)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... # Server-side only

# Database (Direct connection, if needed)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres

# Authentication (NextAuth.js)
NEXTAUTH_URL=https://radexmetal.com
NEXTAUTH_SECRET=your-secret-key-here

# Email Service (still needed in Phase 2)
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=radexmetal.com@gmail.com
```

---

### D. Database Schema Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-11-11 | Initial schema design for Phase 2 | Database Architect |

---

**Document Status:** Complete - Ready for Phase 2 Implementation
**Next Steps:** Begin Supabase project setup when transitioning to Phase 2
**Owner:** Radex Metal Development Team
**Contact:** bangla84 (GitHub)

---

**End of Database Schema Documentation**
