# Feature Breakdown: Radex Metal Website Redesign

**Document Version**: 1.0
**Last Updated**: 2025-11-11
**Status**: Planning Phase
**Project**: Radex Metal Website Redesign - MVP to Phase 3

---

## Table of Contents

1. [MVP Features (Phase 1 - Must-Have)](#mvp-features-phase-1---must-have)
2. [Phase 2 Features (Nice-to-Have)](#phase-2-features-nice-to-have)
3. [Phase 3 Features (Future)](#phase-3-features-future)
4. [Feature Dependencies](#feature-dependencies)
5. [Critical Path & Build Order](#critical-path--build-order)
6. [Effort Estimation Summary](#effort-estimation-summary)

---

## MVP Features (Phase 1 - Must-Have)

### Feature 1: Hero Section

#### User Story
```
As a potential customer visiting the site
I want to immediately understand what Radex Metal does and how experienced they are
So that I can quickly decide if they can help me with my metalwork needs
```

#### Acceptance Criteria
- [ ] **Given** I land on the homepage
  **When** the page loads
  **Then** I see a full-viewport hero section with industrial aesthetic

- [ ] **Given** I'm viewing the hero section
  **When** I read the content
  **Then** I see the main headline "Radex Metal - Stal nierdzewna TIG i Stal węglowa MIG"

- [ ] **Given** I'm viewing the hero section
  **When** I look below the headline
  **Then** I see the subtitle showing "41 lat doświadczenia | Pomorskie Centrum Spawalnicze"

- [ ] **Given** I want to take action
  **When** I look for CTA buttons
  **Then** I see two buttons: "Zobacz Ofertę" (primary) and "Skontaktuj się" (secondary)

- [ ] **Given** I click "Zobacz Ofertę"
  **When** the button is clicked
  **Then** the page smoothly scrolls to the Services/Oferta section

- [ ] **Given** I click "Skontaktuj się"
  **When** the button is clicked
  **Then** the page smoothly scrolls to the Contact Form section

- [ ] **Given** I scroll down the page
  **When** I scroll past the hero
  **Then** I see a parallax effect on the background image/video

#### Technical Requirements

**Frontend Components:**
- `HeroSection.tsx` - Main hero component
- `ParallaxBackground.tsx` - Parallax effect wrapper
- `CTAButton.tsx` - Reusable CTA button component

**Assets Needed:**
- Hero background image (welding/steel work, high resolution)
- Or hero background video (MP4, WebM formats, max 10MB)

**Styling:**
- Full viewport height (100vh)
- Dark overlay (rgba(0,0,0,0.6)) over background
- Centered text alignment
- Responsive typography (48-64px H1 desktop, 32-40px mobile)

**Animations:**
- Fade-in on page load (0.8s duration)
- Parallax scroll effect (transform: translateY)
- Button hover effects (scale, color transition)

**API Dependencies:** None

**Database Tables:** None (static content)

#### Edge Cases

1. **Slow Connection**
   - Test: Load on throttled 3G connection
   - Expected: Background image loads progressively (blur-up technique)
   - Solution: Provide low-quality placeholder image

2. **Video Not Supported**
   - Test: View on browser without video codec support
   - Expected: Fallback to static image
   - Solution: Implement `<video>` with `<img>` fallback

3. **JavaScript Disabled**
   - Test: Disable JS and view hero
   - Expected: Static hero visible, anchor links still work
   - Solution: Use CSS for basic layout, JS for enhancements

4. **Very Small Mobile (320px)**
   - Test: View on iPhone SE (320px width)
   - Expected: Text readable, buttons not cut off
   - Solution: Fluid typography, padding adjustments

5. **Landscape Mobile Orientation**
   - Test: Rotate phone to landscape
   - Expected: Hero adjusts to shorter viewport (70vh)
   - Solution: Media query for landscape orientation

#### Test Scenarios

**Happy Path:**
1. Load homepage → Hero displays with all content
2. Click "Zobacz Ofertę" → Smooth scroll to Services
3. Click "Skontaktuj się" → Smooth scroll to Contact
4. Scroll down → Parallax effect works smoothly

**Edge Cases:**
1. Load on 3G → Hero loads within 3 seconds
2. Disable images → Alt text and gradient background shown
3. Keyboard navigation → Tab to buttons, Enter activates scroll
4. Screen reader → All content announced correctly

**Performance:**
1. Lighthouse Performance > 90
2. LCP (Largest Contentful Paint) < 2.5s
3. CLS (Cumulative Layout Shift) < 0.1

#### Status Tracking
- [ ] Not Started
- [ ] Design approved
- [ ] Component structure created
- [ ] Content integrated
- [ ] Animations implemented
- [ ] Responsive design tested
- [ ] Accessibility verified
- [ ] Performance optimized
- [ ] Cross-browser tested
- [ ] Completed

**Priority:** P0 (Critical)
**Complexity:** Medium
**Estimated Effort:** 8-12 hours

---

### Feature 2: About Section

#### User Story
```
As a potential customer researching metalwork companies
I want to learn about Radex Metal's history and expertise
So that I can trust them with my project
```

#### Acceptance Criteria
- [ ] **Given** I scroll past the hero section
  **When** I reach the About section
  **Then** I see the headline "Witaj w Pomorskim Centrum Spawalniczym RADEX METAL!"

- [ ] **Given** I'm reading the About section
  **When** I view the content
  **Then** I see the full company description from the PRD (production, assembly, service details)

- [ ] **Given** I'm viewing the About section
  **When** I look for key statistics
  **Then** I see "41 lat doświadczenia" and "Od 1985 roku" prominently displayed

- [ ] **Given** I'm on desktop
  **When** I view the About section
  **Then** I see a two-column layout: text on left, image/stats on right

- [ ] **Given** I'm on mobile
  **When** I view the About section
  **Then** I see a single-column stacked layout

- [ ] **Given** the About section enters the viewport
  **When** I scroll to it
  **Then** I see content fade-in with animation

#### Technical Requirements

**Frontend Components:**
- `AboutSection.tsx` - Main about component
- `StatCounter.tsx` - Animated number counter component
- `FadeIn.tsx` - Scroll-triggered fade-in animation

**Content Data:**
```typescript
interface AboutContent {
  title: string;
  paragraphs: string[];
  stats: Array<{
    label: string;
    value: string | number;
    suffix?: string;
  }>;
  image: string;
}
```

**Assets Needed:**
- About section image (workshop, welding, or finished products)
- Icon for stats (optional)

**Styling:**
- Two-column grid (desktop: 60/40 split, mobile: 1 column)
- Section padding: 120px top/bottom (desktop), 80px (mobile)
- Typography: H2 (36-48px), body text (16-18px)
- Dark background with light text

**Animations:**
- Fade-in on scroll (Intersection Observer API)
- Counter animation for "41 lat" stat (count up from 0)
- Stagger animation for paragraphs (0.2s delay between)

**API Dependencies:** None

**Database Tables:** None (static content in `constants/content.ts`)

#### Edge Cases

1. **Long Content Text**
   - Test: Add extra paragraphs to content
   - Expected: Section expands vertically, maintains readability
   - Solution: Max-width container (1200px), proper line-height

2. **Missing Image**
   - Test: Remove image file
   - Expected: Placeholder or gradient shown, layout doesn't break
   - Solution: Image error handling, fallback background

3. **Intersection Observer Not Supported**
   - Test: View on IE11 (not officially supported, but test anyway)
   - Expected: Content visible without animation
   - Solution: Polyfill or CSS fallback

4. **Print Stylesheet**
   - Test: Print the page
   - Expected: Content readable in black/white
   - Solution: Print-specific CSS

#### Test Scenarios

**Happy Path:**
1. Scroll to About section → Content fades in smoothly
2. View stats → Counter animates from 0 to 41
3. Resize window → Layout switches between desktop/mobile gracefully

**Edge Cases:**
1. Fast scroll past section → Animation still triggers
2. View on tablet (768px) → Layout adapts appropriately
3. Screen reader → All content announced in logical order
4. Slow connection → Text loads before image (progressive enhancement)

**Accessibility:**
1. Heading hierarchy: H1 (Hero) → H2 (About) → H3 (Sub-sections if any)
2. Alt text for about image describes the content
3. Stats have aria-labels with full values
4. Color contrast: WCAG AA compliant (4.5:1 minimum)

#### Status Tracking
- [ ] Not Started
- [ ] Content finalized and approved
- [ ] Component structure created
- [ ] Stats data integrated
- [ ] Image added and optimized
- [ ] Animations implemented
- [ ] Responsive design tested
- [ ] Accessibility verified
- [ ] Completed

**Priority:** P0 (Critical)
**Complexity:** Low
**Estimated Effort:** 6-8 hours

---

### Feature 3: Services/Oferta Section

#### User Story
```
As a potential customer looking for specific metalwork services
I want to see all service categories at a glance with clear descriptions
So that I can quickly identify if Radex Metal offers what I need
```

#### Acceptance Criteria
- [ ] **Given** I scroll to the Services section
  **When** I view the section
  **Then** I see 4 service categories displayed in a 2x2 grid (desktop)

- [ ] **Given** I'm viewing the service cards
  **When** I look at each card
  **Then** each card shows: icon, title, short description, and background image

- [ ] **Given** I want to see service details
  **When** I read each card
  **Then** I see specific details for:
  - Balustrady (balustrades: balcony, staircase, steel types, glass mounting)
  - Bramy (gates: sliding, hinged, custom sizes, rich design selection)
  - Ogrodzenia (fencing: wood/metal fill, artistic blacksmithing, complete system)
  - Jachty Motorowe (marine hardware: stainless steel, railings, handles, furniture)

- [ ] **Given** I hover over a service card (desktop)
  **When** my cursor enters the card
  **Then** I see a scale animation and lighter overlay

- [ ] **Given** I'm on mobile
  **When** I view the Services section
  **Then** I see cards stacked in a single column

- [ ] **Given** I scroll into the Services section
  **When** cards enter viewport
  **Then** I see staggered fade-in animation (one card at a time)

#### Technical Requirements

**Frontend Components:**
- `ServicesSection.tsx` - Main services section
- `ServiceCard.tsx` - Individual service card component
- `ServiceIcon.tsx` - Custom SVG icon component

**Content Data:**
```typescript
interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: string; // SVG icon name
  image: string; // Background image path
  category: 'balustrady' | 'bramy' | 'ogrodzenia' | 'jachty';
}

// Data stored in: constants/services.ts
const services: Service[] = [
  {
    id: 'balustrady',
    title: 'Balustrady Radex Metal',
    description: 'Balustrady balkonowe i schodowe...',
    details: [
      'Balkonowe i schodowe',
      'Stal nierdzewna i węglowa',
      'Montaż szyb',
      'Indywidualne projekty'
    ],
    icon: 'railing',
    image: '/images/services/balustrady.jpg',
    category: 'balustrady'
  },
  // ... 3 more services
];
```

**Assets Needed:**
- 4 service background images (high quality, 1200x800px minimum)
- 4 custom SVG icons (welding, gate, railing, boat anchor)

**Styling:**
- Grid layout: 2x2 (desktop), 2x1 (tablet), 1x4 (mobile)
- Card aspect ratio: 4:3 or 16:9
- Dark overlay on images (rgba(0,0,0,0.7))
- Hover: overlay lightens to rgba(0,0,0,0.5), scale(1.05)

**Animations:**
- Stagger fade-in: 0.2s delay between each card
- Hover scale: 0.3s ease transition
- Icon subtle rotation on hover (optional)

**API Dependencies:** None

**Database Tables:** None (static content)

#### Edge Cases

1. **Missing Service Image**
   - Test: Remove one service image file
   - Expected: Fallback gradient background, card still functional
   - Solution: Error boundary, CSS gradient fallback

2. **Very Long Service Description**
   - Test: Add 500+ words to one description
   - Expected: Card height adjusts, maintains readability
   - Solution: Max-height with overflow scroll, or truncate with "read more"

3. **Tablet Breakpoint (768px-1024px)**
   - Test: View at 900px width
   - Expected: Grid shows 2 columns, cards remain readable
   - Solution: Responsive grid with media queries

4. **Touch Device Hover States**
   - Test: Tap card on iPad
   - Expected: Hover effect applied, stays until tap elsewhere
   - Solution: Use @media (hover: hover) for hover-only devices

5. **High-Contrast Mode**
   - Test: Enable Windows High Contrast mode
   - Expected: Text remains visible, borders appear
   - Solution: Test in high-contrast mode, adjust if needed

#### Test Scenarios

**Happy Path:**
1. Scroll to Services section → 4 cards fade in with stagger
2. Hover over "Bramy" card → Card scales up, overlay lightens
3. Read all service descriptions → All content visible and readable
4. Resize to mobile → Cards stack, all content accessible

**Edge Cases:**
1. View on 1024px width → 2x2 grid displays correctly
2. View on 768px width → 2 columns or 1 column (design decision)
3. Fast scroll past section → Animation still completes
4. Print page → Cards layout in readable format

**Accessibility:**
1. Each card has semantic HTML (article or div with role)
2. Icons have aria-hidden="true" (decorative)
3. Service titles use H3 tags
4. Keyboard navigation: Tab through cards
5. Focus indicator visible on each card

#### Status Tracking
- [ ] Not Started
- [ ] Service content finalized (all 4 descriptions)
- [ ] Service images collected and optimized
- [ ] Icons designed (SVG format)
- [ ] Component structure created
- [ ] Data structure defined
- [ ] Grid layout implemented
- [ ] Hover animations added
- [ ] Stagger animation implemented
- [ ] Responsive design tested (320px, 768px, 1024px, 1920px)
- [ ] Accessibility verified
- [ ] Cross-browser tested
- [ ] Completed

**Priority:** P0 (Critical)
**Complexity:** Medium
**Estimated Effort:** 10-14 hours

---

### Feature 4: Gallery Section with Lightbox

#### User Story
```
As a potential customer evaluating Radex Metal's work quality
I want to view high-quality photos of completed projects
So that I can assess whether their craftsmanship meets my standards
```

#### Acceptance Criteria
- [ ] **Given** I scroll to the Gallery section
  **When** I view the gallery
  **Then** I see 8-12 high-quality project photos in a grid layout

- [ ] **Given** I'm viewing the gallery on desktop
  **When** I see the grid
  **Then** photos are arranged in 3-4 columns with equal spacing

- [ ] **Given** I'm viewing the gallery on mobile
  **When** I see the grid
  **Then** photos are arranged in 2 columns

- [ ] **Given** I want to see a photo in detail
  **When** I click on any gallery image
  **Then** the image opens in a full-screen lightbox overlay

- [ ] **Given** the lightbox is open
  **When** I view the interface
  **Then** I see: full-size image (centered), close button (X), prev/next navigation arrows, dark background overlay

- [ ] **Given** I'm in the lightbox
  **When** I click the right arrow or press Right Arrow key
  **Then** I navigate to the next image

- [ ] **Given** I'm in the lightbox
  **When** I click the left arrow or press Left Arrow key
  **Then** I navigate to the previous image

- [ ] **Given** I'm in the lightbox
  **When** I click the X button, press ESC key, or click outside the image
  **Then** the lightbox closes and I return to the gallery view

- [ ] **Given** I'm at the last image in the lightbox
  **When** I click next
  **Then** I loop back to the first image (or next button is disabled - design decision)

- [ ] **Given** images are below the fold
  **When** I scroll toward the gallery
  **Then** images lazy-load as they approach the viewport

#### Technical Requirements

**Frontend Components:**
- `GallerySection.tsx` - Main gallery section
- `GalleryGrid.tsx` - Grid layout component
- `Lightbox.tsx` - Full-screen image viewer
- `LazyImage.tsx` - Lazy-loading image component

**Content Data:**
```typescript
interface GalleryImage {
  id: string;
  src: string; // Full-size image path
  thumbnail: string; // Smaller version for grid
  alt: string; // Descriptive alt text
  category: 'bramy' | 'balustrady' | 'ogrodzenia' | 'jachty'; // For Phase 2 filtering
  width: number; // Original dimensions
  height: number;
}

// Data stored in: constants/gallery.ts
const galleryImages: GalleryImage[] = [
  {
    id: 'project-1',
    src: '/images/gallery/gate-modern-1-full.jpg',
    thumbnail: '/images/gallery/gate-modern-1-thumb.jpg',
    alt: 'Nowoczesna brama przesuwna ze stali węglowej',
    category: 'bramy',
    width: 1920,
    height: 1280
  },
  // ... 11 more images
];
```

**Assets Needed:**
- 8-12 high-quality project photos
- Thumbnail versions (400x300px, optimized)
- Full-size versions (1920px max width, WebP + JPEG)

**Styling:**
- Grid layout: CSS Grid or Flexbox
- Desktop: 4 columns (gap: 16px)
- Tablet: 3 columns
- Mobile: 2 columns
- Aspect ratio: Maintain original, crop to fit if needed
- Lightbox: Full-screen (z-index: 9999), background rgba(0,0,0,0.95)

**Animations:**
- Grid images: Fade-in on scroll
- Lightbox open: Fade in + scale image from thumbnail position
- Lightbox close: Fade out + scale back
- Image navigation: Crossfade between images (0.3s)

**Keyboard Interactions:**
- Arrow Left: Previous image
- Arrow Right: Next image
- ESC: Close lightbox
- Tab: Focus on nav buttons and close button
- Enter/Space on focused button: Activate

**API Dependencies:** None

**Database Tables:** None (static images in MVP)

#### Edge Cases

1. **First Image in Lightbox**
   - Test: Open first image, click previous
   - Expected: Loop to last image OR prev button disabled
   - Solution: Implement circular navigation or disable button with visual indicator

2. **Last Image in Lightbox**
   - Test: Open last image, click next
   - Expected: Loop to first image OR next button disabled
   - Solution: Same as above

3. **Portrait vs Landscape Images**
   - Test: Add mix of portrait (9:16) and landscape (16:9) images
   - Expected: Lightbox scales images appropriately, no distortion
   - Solution: CSS object-fit: contain, max-height/max-width 90vh/90vw

4. **Very Large Images (5MB+)**
   - Test: Add high-res 8K image
   - Expected: Image loads progressively, doesn't block UI
   - Solution: Optimize images during build, max 1MB per image

5. **Slow Connection**
   - Test: Throttle to 3G, open lightbox
   - Expected: Loading spinner shown, image loads progressively
   - Solution: Show skeleton loader, blur-up technique

6. **Missing Image File**
   - Test: Delete one gallery image
   - Expected: Placeholder shown, grid doesn't break
   - Solution: Error boundary, fallback image

7. **Screen Reader Navigation**
   - Test: Navigate with NVDA/JAWS
   - Expected: Images announced with alt text, lightbox controls accessible
   - Solution: Proper ARIA labels, focus management

8. **Mobile Pinch Zoom in Lightbox**
   - Test: Open lightbox on mobile, try to pinch zoom
   - Expected: Pinch zoom works OR intentionally disabled with pan option
   - Solution: Implement touch gestures or allow native zoom

#### Status Tracking
- [ ] Not Started
- [ ] Gallery images collected (8-12 photos)
- [ ] Images optimized (thumbnails + full-size)
- [ ] WebP versions created
- [ ] Gallery data structure defined
- [ ] Grid layout implemented
- [ ] Lazy loading working
- [ ] Lightbox component created
- [ ] Lightbox navigation (arrows, keyboard) working
- [ ] Lightbox close functionality working
- [ ] Animations implemented (open/close/navigate)
- [ ] Body scroll lock implemented
- [ ] Responsive design tested
- [ ] Touch gestures tested (mobile)
- [ ] Accessibility verified (keyboard, screen reader)
- [ ] Performance optimized
- [ ] Cross-browser tested
- [ ] Completed

**Priority:** P0 (Critical)
**Complexity:** High
**Estimated Effort:** 14-18 hours

---

### Feature 5: Contact Form with File Upload

#### User Story
```
As a potential customer wanting a quote
I want to submit my contact details, project description, and photos
So that Radex Metal can provide me with an accurate estimate
```

#### Acceptance Criteria
- [ ] **Given** I scroll to the Contact section
  **When** I view the form
  **Then** I see all required fields: Name, Email, Phone, Service Type, Message, File Upload, RODO Consent

- [ ] **Given** I try to submit without filling required fields
  **When** I click "Wyślij zapytanie"
  **Then** I see error messages under each missing field in Polish

- [ ] **Given** I filled all required fields correctly
  **When** I click "Wyślij zapytanie"
  **Then** the button shows loading state (spinner) and becomes disabled

- [ ] **Given** my form submitted successfully
  **When** the email is sent
  **Then** I see a success message: "Dziękujemy za wiadomość! Skontaktujemy się w ciągu 24h"

- [ ] **Given** I want to attach photos
  **When** I click the file upload area
  **Then** I can browse and select 1-3 files (JPG, PNG, or PDF, max 5MB each)

- [ ] **Given** I try to upload an invalid file
  **When** I select a .exe or .zip file
  **Then** I see an error: "Dozwolone formaty: JPG, PNG, PDF"

- [ ] **Given** I try to upload a file over 5MB
  **When** I select a large file
  **Then** I see an error: "Maksymalny rozmiar pliku: 5MB"

#### Technical Requirements

**Frontend Components:**
- `ContactSection.tsx` - Main contact section
- `ContactForm.tsx` - Form component with validation
- `FormInput.tsx` - Reusable text input
- `FormTextarea.tsx` - Reusable textarea
- `FormSelect.tsx` - Reusable dropdown
- `FileUpload.tsx` - File upload with drag-drop
- `FormCheckbox.tsx` - RODO consent checkbox

**Form Data Structure:**
```typescript
interface ContactFormData {
  name: string; // Required, min 2 chars
  email: string; // Required, valid email format
  phone: string; // Required, Polish phone format
  serviceType: ServiceType; // Required, dropdown selection
  message: string; // Required, min 20 chars
  attachments: File[]; // Optional, max 3 files, 5MB each
  gdprConsent: boolean; // Required, must be true
}

type ServiceType =
  | 'balustrady'
  | 'bramy'
  | 'ogrodzenia'
  | 'jachty'
  | 'konstrukcje'
  | 'zbrojenia'
  | 'renowacja'
  | 'inne';
```

**Backend API:**
- **Endpoint**: `POST /api/contact`
- **Location**: `src/app/api/contact/route.ts`
- **Request**: multipart/form-data
- **Response**: JSON

**Email Service:**
- Option 1: Nodemailer with Gmail SMTP
- Option 2: Resend
- Option 3: SendGrid

**Environment Variables:**
```bash
SMTP_USER=radexmetal.com@gmail.com
SMTP_PASSWORD=your_app_password_here
CONTACT_EMAIL=radexmetal.com@gmail.com
```

**API Dependencies:** Nodemailer or email service

**Database Tables:** None (MVP - email only)

#### Edge Cases

1. **Spam Submissions**
   - Test: Submit form 10 times rapidly
   - Expected: Rate limiting blocks after 5 submissions per hour
   - Solution: Implement rate limiting middleware (IP-based)

2. **Malicious File Upload**
   - Test: Upload .exe file renamed to .jpg
   - Expected: Server validates actual file type, rejects
   - Solution: Check file magic numbers, not just extension

3. **XSS Attack in Message Field**
   - Test: Submit `<script>alert('XSS')</script>` in message
   - Expected: Script tags escaped, not executed
   - Solution: React auto-escapes, but sanitize before email sending

4. **Email Service Down**
   - Test: Invalid SMTP credentials
   - Expected: User sees error message, can retry
   - Solution: Try-catch in API route, return 500 error

#### Status Tracking
- [ ] Not Started
- [ ] Form UI designed and approved
- [ ] Form components created
- [ ] Form validation logic implemented (frontend)
- [ ] File upload component with drag-drop working
- [ ] Email service configured (Nodemailer + Gmail)
- [ ] API route created (/api/contact)
- [ ] Backend validation implemented
- [ ] Email template designed
- [ ] Attachment handling working
- [ ] Error handling implemented (frontend + backend)
- [ ] Loading states implemented
- [ ] Success/error messages implemented
- [ ] Rate limiting implemented
- [ ] Responsive design tested
- [ ] Accessibility verified (WCAG AA)
- [ ] Cross-browser tested
- [ ] Email delivery tested
- [ ] Completed

**Priority:** P0 (Critical)
**Complexity:** High
**Estimated Effort:** 18-24 hours

---

### Feature 6: Navigation (Sticky + Mobile)

#### User Story
```
As a user browsing the one-page website
I want to easily navigate between sections and always have access to the menu
So that I can quickly jump to the section I'm interested in
```

#### Acceptance Criteria
- [ ] **Given** I'm on the homepage
  **When** I view the top of the page
  **Then** I see a navigation bar with logo and menu items

- [ ] **Given** I'm viewing the navigation
  **When** I see the menu
  **Then** I see menu items: Home, O Firmie, Oferta, Galeria, Kontakt

- [ ] **Given** I want to navigate
  **When** I click any menu item
  **Then** the page smoothly scrolls to that section

- [ ] **Given** I scroll down the page
  **When** I scroll past the hero section
  **Then** the navigation bar sticks to the top (sticky position)

- [ ] **Given** I'm on mobile (< 768px)
  **When** I view the navigation
  **Then** I see a logo and a hamburger menu icon

- [ ] **Given** I tap the hamburger icon on mobile
  **When** the icon is tapped
  **Then** a full-screen or slide-in menu appears with all menu items

#### Technical Requirements

**Frontend Components:**
- `Header.tsx` - Main header component
- `Navigation.tsx` - Desktop navigation
- `MobileMenu.tsx` - Mobile hamburger menu
- `Logo.tsx` - Clickable logo component

**Navigation Data:**
```typescript
interface NavItem {
  id: string;
  label: string;
  href: string; // Anchor link (e.g., "#o-firmie")
  ariaLabel?: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', href: '#hero' },
  { id: 'about', label: 'O Firmie', href: '#o-firmie' },
  { id: 'services', label: 'Oferta', href: '#oferta' },
  { id: 'gallery', label: 'Galeria', href: '#galeria' },
  { id: 'contact', label: 'Kontakt', href: '#kontakt' }
];
```

**Styling:**
- Header height: 80px (desktop), 64px (mobile)
- Background: rgba(0, 0, 0, 0.9) with backdrop-blur
- Logo: 120px width (desktop), 100px (mobile)
- Menu items: 16px font, 24px spacing, white text
- Active item: Underline or different color
- Hamburger icon: 3 lines, 24x24px touch target

**API Dependencies:** None

**Database Tables:** None

#### Status Tracking
- [ ] Not Started
- [ ] Navigation data structure defined
- [ ] Header component created
- [ ] Desktop navigation implemented
- [ ] Logo component created and clickable
- [ ] Menu items render correctly
- [ ] Smooth scroll working
- [ ] Sticky header working
- [ ] Active section detection working
- [ ] Mobile hamburger icon designed
- [ ] Mobile menu component created
- [ ] Mobile menu open/close working
- [ ] Responsive design tested
- [ ] Accessibility verified
- [ ] Cross-browser tested
- [ ] Completed

**Priority:** P0 (Critical)
**Complexity:** Medium
**Estimated Effort:** 10-12 hours

---

### Feature 7: Footer

#### User Story
```
As a user at the bottom of the page
I want to see contact information and quick links
So that I can easily find essential information without scrolling back up
```

#### Acceptance Criteria
- [ ] **Given** I scroll to the bottom of the page
  **When** I view the footer
  **Then** I see footer with 3 sections: Company Info, Quick Links, Contact Info

- [ ] **Given** I'm viewing the Company Info section
  **When** I read the content
  **Then** I see: Logo, tagline, and short description of Radex Metal

- [ ] **Given** I'm viewing the Contact Info section
  **When** I read the details
  **Then** I see: Address, Phone (clickable), Emails (clickable)

- [ ] **Given** I'm on mobile
  **When** I view the footer
  **Then** sections stack vertically in a single column

#### Technical Requirements

**Frontend Components:**
- `Footer.tsx` - Main footer component
- `FooterColumn.tsx` - Reusable column component
- `ContactInfo.tsx` - Contact details display

**Styling:**
- Background: Black (#000000)
- Text: White (#FFFFFF) and gray (#A0A0A0)
- Padding: 80px top/bottom (desktop), 60px (mobile)
- 3-column grid (desktop), 1 column (mobile)

**API Dependencies:** None

**Database Tables:** None

#### Status Tracking
- [ ] Not Started
- [ ] Footer data structure defined
- [ ] Footer component created
- [ ] 3-column layout implemented
- [ ] Company info section completed
- [ ] Quick links section completed
- [ ] Contact info section completed
- [ ] Copyright section completed
- [ ] Phone/email links working
- [ ] Responsive design tested
- [ ] Accessibility verified
- [ ] Cross-browser tested
- [ ] Completed

**Priority:** P0 (Critical)
**Complexity:** Low
**Estimated Effort:** 4-6 hours

---

### Feature 8: Google Maps Integration

#### User Story
```
As a potential customer wanting to visit Radex Metal
I want to see their location on a map
So that I can easily navigate to their workshop
```

#### Acceptance Criteria
- [ ] **Given** I'm viewing the Contact section
  **When** I scroll to the map area
  **Then** I see an embedded Google Map showing Radex Metal's location

- [ ] **Given** I want to get directions
  **When** I click on the map
  **Then** the full Google Maps opens in a new tab/window with the location

#### Technical Requirements

**Implementation: Embed Iframe (Recommended for MVP)**
```typescript
const GoogleMap = () => {
  const embedUrl = 'https://maps.app.goo.gl/ornSRoVhrXrX2VzK6';

  return (
    <div className="map-container">
      <iframe
        src={embedUrl}
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        title="Radex Metal - Lokalizacja na mapie"
      />
    </div>
  );
};
```

**Location Details:**
- Address: ul. Cecorska 10, 76-200 Słupsk
- Place name: "Bramy Słupsk Radex Metal 43"
- Map link: https://maps.app.goo.gl/ornSRoVhrXrX2VzK6

**API Dependencies:** None (iframe embed is free)

**Database Tables:** None

#### Status Tracking
- [ ] Not Started
- [ ] Google Maps embed URL obtained
- [ ] Map component created
- [ ] Iframe implemented
- [ ] Lazy loading configured
- [ ] Fallback for map failure implemented
- [ ] Styling applied
- [ ] Responsive design tested
- [ ] Mobile interaction tested
- [ ] Accessibility verified
- [ ] Cross-browser tested
- [ ] Completed

**Priority:** P0 (Critical)
**Complexity:** Low
**Estimated Effort:** 2-3 hours

---

### Feature 9: RODO Compliance

#### User Story
```
As the website owner
I want to comply with GDPR/RODO regulations
So that I avoid legal issues and respect user privacy
```

#### Acceptance Criteria
- [ ] **Given** I'm filling out the contact form
  **When** I view the RODO consent checkbox
  **Then** I see clear text: "Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z polityką prywatności"

- [ ] **Given** I want to learn about data privacy
  **When** I click "polityką prywatności" link
  **Then** I see a privacy policy page or modal explaining data handling

- [ ] **Given** I want to submit the form
  **When** I haven't checked the RODO checkbox
  **Then** I see an error: "Zgoda jest wymagana" and cannot submit

#### Technical Requirements

**Privacy Policy Page:**
Create `/polityka-prywatnosci` page with:

1. **Administrator Danych**
   - Radex Metal
   - ul. Cecorska 10, 76-200 Słupsk
   - Email: radexmetal.com@gmail.com

2. **Jakie Dane Zbieramy**
   - Imię i nazwisko
   - Adres email
   - Numer telefonu
   - Treść wiadomości
   - Opcjonalnie: załączone pliki

3. **Cel Przetwarzania**
   - Odpowiedź na zapytanie ofertowe
   - Przygotowanie wyceny

4. **Prawa Użytkownika**
   - Prawo dostępu do danych
   - Prawo do usunięcia
   - Prawo do wycofania zgody

**API Dependencies:** None

**Database Tables:** None (MVP)

#### Status Tracking
- [ ] Not Started
- [ ] RODO checkbox component created
- [ ] Checkbox validation implemented
- [ ] Privacy policy content written (Polish)
- [ ] Privacy policy page created
- [ ] Privacy policy link added to footer
- [ ] Data deletion process documented
- [ ] Compliance checklist verified
- [ ] Legal review completed (optional)
- [ ] Accessibility verified
- [ ] Completed

**Priority:** P0 (Critical - Legal Requirement)
**Complexity:** Low
**Estimated Effort:** 4-6 hours

---

## Phase 2 Features (Nice-to-Have)

### Feature 10: Gallery Filtering

#### User Story
```
As a user interested in a specific type of metalwork
I want to filter gallery images by category
So that I can see only relevant projects
```

#### Acceptance Criteria
- [ ] **Given** I'm viewing the gallery section
  **When** I see the top of the gallery
  **Then** I see filter buttons: Wszystkie, Bramy, Balustrady, Ogrodzenia, Jachty

- [ ] **Given** I want to see only gates
  **When** I click "Bramy" filter button
  **Then** only images tagged as "bramy" are displayed

- [ ] **Given** I apply a filter
  **When** the gallery updates
  **Then** I see a smooth transition animation

**Priority:** P1 (Nice-to-Have)
**Complexity:** Low-Medium
**Estimated Effort:** 6-8 hours

---

### Feature 11: Multi-Step Quote Form

#### User Story
```
As a customer wanting a detailed quote
I want a guided form that asks specific questions step-by-step
So that I can provide all necessary information without feeling overwhelmed
```

#### Acceptance Criteria
- [ ] Multi-step wizard with 6 steps: Product Type → Dimensions → Material → Options → Photos → Contact
- [ ] Progress bar showing current step
- [ ] Data preserved when going back
- [ ] Validation per step

**Priority:** P1 (Nice-to-Have)
**Complexity:** High
**Estimated Effort:** 20-24 hours

---

### Feature 12: Price Calculator

#### User Story
```
As a customer planning my budget
I want to get an instant price estimate
So that I know if Radex Metal's services fit my budget
```

#### Acceptance Criteria
- [ ] Interactive calculator with sliders for dimensions
- [ ] Real-time price range updates
- [ ] Disclaimer: "Cena orientacyjna"

**Priority:** P1 (Nice-to-Have)
**Complexity:** Medium
**Estimated Effort:** 12-16 hours

---

### Feature 13: Live Chat Integration

#### User Story
```
As a customer with quick questions
I want to chat with Radex Metal in real-time
So that I can get immediate answers
```

#### Acceptance Criteria
- [ ] Chat widget icon in bottom-right corner
- [ ] Auto-greeting message
- [ ] Offline mode with message form

**Priority:** P1 (Nice-to-Have)
**Complexity:** Low (Integration)
**Estimated Effort:** 4-6 hours

---

### Feature 14: Analytics Integration (GA4 + Clarity)

#### User Story
```
As the website owner
I want to understand how users interact with my site
So that I can make data-driven improvements
```

#### Acceptance Criteria
- [ ] Google Analytics 4 tracking
- [ ] Microsoft Clarity heatmaps and recordings
- [ ] Cookie consent banner (GDPR)

**Priority:** P1 (Nice-to-Have)
**Complexity:** Medium
**Estimated Effort:** 8-10 hours

---

### Feature 15: Consultation Booking System

#### User Story
```
As a customer wanting professional advice
I want to book a consultation appointment online
So that I can discuss my project at a convenient time
```

#### Acceptance Criteria
- [ ] Calendar with available time slots
- [ ] Confirmation email with calendar invite
- [ ] Cancel/reschedule functionality

**Priority:** P2 (Nice-to-Have)
**Complexity:** Medium-High
**Estimated Effort:** 12-16 hours (custom) or 4-6 hours (Calendly)

---

### Feature 16: Testimonials/Reviews System

#### User Story
```
As a potential customer
I want to read reviews from past clients
So that I can trust Radex Metal's quality
```

#### Acceptance Criteria
- [ ] Testimonials section with 3-5 reviews
- [ ] Carousel that rotates every 5 seconds
- [ ] Optional: Google Reviews integration

**Priority:** P2 (Nice-to-Have)
**Complexity:** Medium
**Estimated Effort:** 10-14 hours

---

## Phase 3 Features (Future)

### Feature 17: Admin Panel

#### User Story
```
As the website owner
I want a secure admin dashboard
So that I can manage website content without touching code
```

**Priority:** P3 (Future)
**Complexity:** High
**Estimated Effort:** 30-40 hours

---

### Feature 18: CMS Integration

#### User Story
```
As the website owner
I want a content management system
So that I can update text, images, and services easily
```

**Priority:** P3 (Future)
**Complexity:** High
**Estimated Effort:** 40-50 hours

---

### Feature 19: Database Implementation

#### User Story
```
As the system
I want to store form submissions and gallery images in a database
So that data is persistent and manageable
```

**Priority:** P3 (Future)
**Complexity:** High
**Estimated Effort:** 24-32 hours

---

### Feature 20: User Management

#### User Story
```
As the system administrator
I want to manage admin users
So that multiple staff can access the admin panel securely
```

**Priority:** P3 (Future)
**Complexity:** High
**Estimated Effort:** 20-28 hours

---

## Feature Dependencies

### Dependency Graph

```
MVP (Phase 1):
Setup & Configuration
└─> All features depend on initial setup

Hero Section (no dependencies)
About Section (no dependencies)
Services Section (no dependencies)

Gallery Section
└─> Dependencies: LazyImage component

Contact Form
├─> Dependencies: Email service setup
├─> Depends on: RODO Compliance (checkbox)
└─> Depends on: Form validation library

Navigation
└─> Depends on: All sections (for smooth scroll links)

Footer
└─> Depends on: Navigation data (quick links)

Google Maps (no dependencies)

RODO Compliance
└─> Depends on: Privacy Policy page

Phase 2:
Gallery Filtering → Depends on: Gallery Section (MVP)
Multi-Step Quote Form → Depends on: Contact Form logic (MVP)
Analytics → Depends on: Cookie Consent Banner, RODO update

Phase 3:
Database Implementation → Prerequisite for all Phase 3 features
Admin Panel → Depends on: Database, User Management
CMS Integration → Depends on: Database, Admin Panel
User Management → Depends on: Database, Authentication
```

---

## Critical Path & Build Order

### Recommended Build Order for MVP (Phase 1)

**Week 1:**

**Sprint 1: Foundation (Days 1-2)**
1. Project setup (Next.js, Tailwind, Git)
2. Configure theme colors
3. Set up fonts
4. Create component folder structure
5. Set up environment variables

**Sprint 2: Core Sections (Days 3-5)**
6. Build Hero Section
7. Build About Section
8. Build Services Section

**Sprint 3: Interactive Features (Days 6-7)**
9. Build Navigation
10. Build Footer

**Week 2:**

**Sprint 4: Gallery (Days 1-2)**
11. Collect and optimize gallery images
12. Build Gallery Section with grid
13. Build Lightbox component

**Sprint 5: Contact & Compliance (Days 3-5)**
14. Build Privacy Policy page
15. Build Contact Form UI
16. Implement form validation
17. Set up email service
18. Build API route
19. Test email delivery
20. Embed Google Maps

**Sprint 6: Polish & Deploy (Days 6-7)**
21. Cross-browser testing
22. Mobile responsiveness check
23. Performance optimization
24. Accessibility audit
25. SEO optimization
26. Deploy to Vercel
27. Configure domain
28. Final testing

---

## Effort Estimation Summary

### MVP (Phase 1) - Total: 94-130 hours

| Feature | Priority | Complexity | Hours |
|---------|----------|------------|-------|
| 1. Hero Section | P0 | Medium | 8-12 |
| 2. About Section | P0 | Low | 6-8 |
| 3. Services Section | P0 | Medium | 10-14 |
| 4. Gallery + Lightbox | P0 | High | 14-18 |
| 5. Contact Form | P0 | High | 18-24 |
| 6. Navigation | P0 | Medium | 10-12 |
| 7. Footer | P0 | Low | 4-6 |
| 8. Google Maps | P0 | Low | 2-3 |
| 9. RODO Compliance | P0 | Low | 4-6 |
| Setup & Config | P0 | Medium | 6-8 |
| Testing & QA | P0 | - | 8-12 |
| Deployment | P0 | Low | 4-6 |

**Total MVP:** 94-130 hours (2-3 weeks, 1 developer)

### Phase 2 - Total: 72-94 hours

| Feature | Priority | Complexity | Hours |
|---------|----------|------------|-------|
| 10. Gallery Filtering | P1 | Low-Medium | 6-8 |
| 11. Multi-Step Form | P1 | High | 20-24 |
| 12. Price Calculator | P1 | Medium | 12-16 |
| 13. Live Chat | P1 | Low | 4-6 |
| 14. Analytics | P1 | Medium | 8-10 |
| 15. Booking System | P2 | Medium-High | 12-16 |
| 16. Testimonials | P2 | Medium | 10-14 |

**Total Phase 2:** 72-94 hours (2-3 weeks)

### Phase 3 - Total: 114-150 hours

| Feature | Priority | Complexity | Hours |
|---------|----------|------------|-------|
| 17. Admin Panel | P3 | High | 30-40 |
| 18. CMS Integration | P3 | High | 40-50 |
| 19. Database | P3 | High | 24-32 |
| 20. User Management | P3 | High | 20-28 |

**Total Phase 3:** 114-150 hours (3-4 weeks)

---

## Overall Project Status

### MVP (Phase 1) Status: Not Started
- [ ] 0 of 9 features completed
- [ ] Estimated completion: 2-3 weeks (1 developer)
- [ ] Target launch date: TBD

### Phase 2 Status: Not Started
- [ ] 0 of 7 features completed
- [ ] Start after MVP launch + 1 week

### Phase 3 Status: Not Started
- [ ] 0 of 4 features completed
- [ ] Start after Phase 2 evaluation

---

## Notes

- All effort estimates assume 1 full-time developer
- Estimates include development, testing, and documentation
- Does not include content creation (photos, copy) - client responsibility
- Phase 2 and 3 features are optional and can be prioritized based on business needs
- Legal review of Privacy Policy recommended but not included in estimates

---

**Document Status:** Ready for implementation
**Next Steps:**
1. Approve feature breakdown
2. Prioritize any Phase 2 features to include in MVP (if desired)
3. Collect gallery images and finalize content
4. Begin Sprint 1: Project setup

---

**Version:** 1.0
**Last Updated:** 2025-11-11
