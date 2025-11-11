# Deployment Guide: Radex Metal Website

**Project:** radex-metal
**Version:** 1.0.0 (MVP)
**Target:** Vercel
**Domain:** radexmetal.com

---

## Pre-Deployment Checklist

### 1. Required Assets

Before deploying, ensure all image assets are in place:

#### Hero Section
- [ ] `public/images/hero/hero-bg.jpg` (1920x1080px, optimized WebP + JPEG fallback)
  - Subject: Welding, steel work, or industrial scene
  - File size: < 500KB

#### Services Section
- [ ] `public/images/services/balustrady.jpg` (1200x800px)
- [ ] `public/images/services/bramy.jpg` (1200x800px)
- [ ] `public/images/services/ogrodzenia.jpg` (1200x800px)
- [ ] `public/images/services/jachty.jpg` (1200x800px)
  - Each < 300KB optimized

#### Gallery Section
- [ ] `public/images/gallery/project-01.jpg` through `project-08.jpg` (8-12 images)
  - Dimensions: 1200x800px (landscape) or 800x1200px (portrait)
  - Mix of all 4 service categories
  - Each < 200KB optimized

#### Social/SEO
- [ ] `public/images/og-image.jpg` (1200x630px for Open Graph)
  - Radex Metal branding with text overlay
  - File size: < 200KB

**Total Images Needed:** 13-17 high-quality photos

See individual README files in each image directory for detailed specifications.

---

### 2. Environment Variables

Create `.env.local` file with the following variables:

```bash
# SMTP Email Configuration (Choose one option)

# Option 1: Gmail SMTP (Recommended for MVP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=radexmetal.com@gmail.com
SMTP_PASSWORD=your_gmail_app_password_here

# Option 2: Resend (Alternative)
# RESEND_API_KEY=re_xxxxxxxxxxxxx

# Contact Email Recipient
CONTACT_EMAIL=radexmetal.com@gmail.com

# Site URL (Production)
NEXT_PUBLIC_SITE_URL=https://radexmetal.com

# Optional: Google Analytics (Phase 2)
# NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Gmail App Password Setup:**
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to App Passwords
4. Create new app password for "Mail"
5. Copy the 16-character password to `SMTP_PASSWORD`

---

### 3. Google Fonts Configuration

**Current Status:** Using system fonts due to development environment restrictions.

**Before Production Deployment:**

1. Install Google Fonts packages:
```bash
npm install @next/font
```

2. Update `app/layout.tsx`:
```typescript
import { Bebas_Neue, Inter } from 'next/font/google';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

3. Update `app/globals.css`:
```css
/* Replace system fonts with Google Fonts variables */
body {
  font-family: var(--font-inter), sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-bebas), 'Impact', sans-serif;
}
```

---

## Deployment Steps

### Step 1: Vercel Account Setup

1. Create Vercel account at https://vercel.com
2. Connect GitHub/GitLab account
3. Import the `radex-metal` repository

### Step 2: Project Configuration

1. **Framework Preset:** Next.js (auto-detected)
2. **Root Directory:** `./` (default)
3. **Build Command:** `npm run build` (default)
4. **Output Directory:** `.next` (default)
5. **Install Command:** `npm install` (default)

### Step 3: Environment Variables

In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.local`:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASSWORD`
   - `CONTACT_EMAIL`
   - `NEXT_PUBLIC_SITE_URL`

3. Set environment: **Production** (and optionally Preview/Development)

### Step 4: Domain Configuration

1. **Vercel Dashboard → Domains**
2. Add custom domain: `radexmetal.com`
3. Add `www.radexmetal.com` (optional)

4. **DNS Configuration** (at your domain registrar):

   **Option A: Vercel DNS (Recommended)**
   - Point nameservers to Vercel
   - Vercel provides: ns1.vercel-dns.com, ns2.vercel-dns.com

   **Option B: Custom DNS**
   - A Record: `@` → Vercel IP (shown in Vercel dashboard)
   - CNAME Record: `www` → `cname.vercel-dns.com`

5. **Wait for DNS propagation** (5 minutes - 48 hours)

### Step 5: Deploy

1. **Automatic Deployment:**
   - Push to `main` branch → Auto-deploys to production
   - Every commit triggers new deployment

2. **Manual Deployment:**
   - Vercel Dashboard → Deploy
   - Or: `vercel --prod` (if using Vercel CLI)

3. **First Deployment:**
```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Deploy to production
vercel --prod
```

### Step 6: Post-Deployment Verification

1. **Check Live Site:**
   - Visit https://radexmetal.com
   - Test all sections (Hero, About, Services, Gallery, Contact)
   - Verify smooth scrolling navigation
   - Test mobile menu (responsive design)

2. **Test Contact Form:**
   - Fill out form with test data
   - Upload test file (< 5MB, JPG/PNG/PDF)
   - Submit form
   - Verify email received at `radexmetal.com@gmail.com`

3. **Accessibility Check:**
   - Tab through navigation (keyboard accessibility)
   - Test "Skip to main content" link (press Tab on page load)
   - Check screen reader compatibility (NVDA/JAWS/VoiceOver)

4. **Performance Audit:**
```bash
# Run Lighthouse audit (Chrome DevTools)
# Target scores:
# - Performance: > 90
# - Accessibility: > 90
# - Best Practices: > 90
# - SEO: > 90
```

5. **Browser Testing:**
   - Chrome (latest)
   - Firefox (latest)
   - Safari (latest)
   - Edge (latest)
   - Mobile Safari (iOS)
   - Mobile Chrome (Android)

6. **SEO Verification:**
   - Google Search Console: Submit sitemap (https://radexmetal.com/sitemap.xml)
   - Verify robots.txt: https://radexmetal.com/robots.txt
   - Check structured data: Google Rich Results Test (https://search.google.com/test/rich-results)
   - Verify Open Graph tags: Facebook Debugger (https://developers.facebook.com/tools/debug/)

---

## SSL/HTTPS Configuration

**Vercel handles SSL automatically:**
- Free SSL certificate from Let's Encrypt
- Auto-renewal every 90 days
- HTTPS enforced (HTTP redirects to HTTPS)
- HSTS headers enabled

**No manual configuration needed.**

---

## Performance Optimization (Post-Deployment)

### Image Optimization Checklist

1. **Convert to WebP:**
```bash
# Install sharp (already in dependencies)
# Next.js Image component auto-generates WebP

# Manual conversion (if needed):
# Install: npm install -g sharp-cli
sharp input.jpg -o output.webp
```

2. **Compression:**
   - Use TinyPNG (https://tinypng.com) or ImageOptim
   - Target: < 200KB per gallery image
   - Hero image: < 500KB

3. **Responsive Images:**
   - Next.js Image component handles this automatically
   - Generates multiple sizes (640w, 750w, 828w, 1080w, 1200w, 1920w)

### CDN Configuration

**Vercel Edge Network** (automatic):
- 100+ global edge locations
- Automatic caching for static assets
- Cache-Control headers optimized
- Brotli compression enabled

### Monitoring

**Vercel Analytics** (built-in):
- Real User Monitoring (RUM)
- Core Web Vitals tracking
- Geographic performance insights

**Access:**
- Vercel Dashboard → Analytics
- View performance metrics, errors, traffic

---

## Rollback Procedure

If issues occur after deployment:

1. **Instant Rollback (Vercel Dashboard):**
   - Go to Deployments
   - Find previous working deployment
   - Click "..." → Promote to Production

2. **Git Rollback:**
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push origin main --force
```

3. **Vercel CLI Rollback:**
```bash
vercel rollback <deployment-url>
```

---

## Maintenance & Updates

### Regular Tasks

**Weekly:**
- Check email inbox for contact form submissions
- Monitor Vercel dashboard for errors

**Monthly:**
- Review Vercel Analytics
- Check for Next.js updates: `npm outdated`
- Update dependencies if needed: `npm update`

**Quarterly:**
- Review and update gallery images
- Update service descriptions (if needed)
- Review contact information accuracy

### Updating Content

**Static Content Changes:**
1. Edit files in `constants/` directory
2. Commit and push to `main` branch
3. Vercel auto-deploys changes (~2 minutes)

**Image Updates:**
1. Replace images in `public/images/` directories
2. Keep same filenames OR update `constants/gallery.ts`
3. Commit and push to trigger deployment

**Phase 2 (CMS):**
- Content updates via admin panel (no code deployment needed)

---

## Troubleshooting

### Build Failures

**Error: "Module not found"**
- Solution: `npm install` and commit `package-lock.json`

**Error: "Type error"**
- Solution: Run `npm run build` locally, fix TypeScript errors

**Error: "Failed to fetch font"**
- Solution: Ensure Google Fonts configuration is correct (see Step 3 above)

### Email Not Sending

**Symptom:** Contact form submits but no email received

**Solutions:**
1. Check Vercel logs: Dashboard → Functions → Logs
2. Verify environment variables are set in Vercel
3. Check SMTP credentials (Gmail App Password)
4. Verify sender email in Gmail (may be in Spam folder)
5. Check rate limiting (max 5 submissions/hour per IP)

### Slow Performance

**Symptom:** Lighthouse score < 90

**Solutions:**
1. Optimize images (compress, convert to WebP)
2. Check for large bundle size: `npm run build` (check output)
3. Remove unused dependencies
4. Enable Vercel Analytics to identify bottlenecks

### Domain Not Working

**Symptom:** radexmetal.com not loading

**Solutions:**
1. Check DNS propagation: https://dnschecker.org
2. Verify DNS records in domain registrar
3. Wait up to 48 hours for DNS propagation
4. Check Vercel dashboard for domain status
5. Try clearing browser cache

---

## Security Checklist

Before going live:
- [ ] All environment variables in Vercel (not committed to Git)
- [ ] `.env.local` in `.gitignore`
- [ ] HTTPS enforced (Vercel default)
- [ ] Rate limiting enabled on contact form API
- [ ] Input sanitization implemented (already done)
- [ ] GDPR consent checkbox present
- [ ] Privacy policy link in footer (optional, recommended)

---

## Phase 2 Preparation

When ready to implement Phase 2 features:

### Database Setup (Supabase)
1. Create Supabase project
2. Run schema SQL from `docs/db-schema.md`
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_KEY` (server-side only)

### Analytics Integration
1. Create Google Analytics 4 property
2. Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` to Vercel
3. Create Microsoft Clarity project
4. Add Clarity script to `app/layout.tsx`
5. Implement cookie consent banner

### Live Chat
1. Create Tawk.to account (or Crisp/LiveChat)
2. Get embed script
3. Add to `app/layout.tsx`
4. Configure chat settings and availability

---

## Support & Documentation

**Documentation:**
- Full PRD: `PRD.md`
- Architecture: `docs/architecture.md`
- API Docs: `docs/API.md`
- Database Schema: `docs/db-schema.md`
- Features: `docs/features.md`

**Vercel Resources:**
- Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
- Support: https://vercel.com/support

**Contact:**
- Project Owner: Radex Metal
- Email: radexmetal.com@gmail.com
- Phone: +48 600 656 747

---

**Deployment Date:** _________
**Deployed By:** _________
**Production URL:** https://radexmetal.com
**Vercel Project:** _________

---

**Version:** 1.0
**Last Updated:** 2025-01-11
**Status:** Ready for Deployment
