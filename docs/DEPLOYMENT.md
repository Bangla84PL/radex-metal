# Deployment Guide - Radex Metal

**Last Updated:** 2025-11-13
**Status:** Ready for Production Deployment

---

## Deployment Overview

This guide covers deploying the Radex Metal website to production on Vercel with the custom domain `radexmetal.com`.

---

## Pre-Deployment Checklist

### 1. Code Quality ✅
- [x] All TypeScript errors resolved
- [x] ESLint warnings reviewed (minor warnings acceptable)
- [x] Build successful: `npm run build`
- [x] Bundle size optimized (147 kB total)
- [x] All features tested locally

### 2. Content ⚠️
- [x] Text content finalized
- [x] Service descriptions complete
- [ ] **TODO:** Replace placeholder images with actual photos
  - Hero background image
  - Service images (Balustrady, Bramy, Ogrodzenia, Okucia)
  - Gallery images (8-12 project photos)
  - Open Graph image (1200x630px)

### 3. Email Configuration ⚠️
- [ ] **TODO:** Configure email service (see [EMAIL_SETUP.md](./EMAIL_SETUP.md))
  - Option 1: Gmail SMTP (recommended for MVP)
  - Option 2: Resend
- [ ] Test form submission with real email credentials
- [ ] Verify emails arrive in inbox

### 4. SEO & Metadata ✅
- [x] Meta titles and descriptions
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Structured data (LocalBusiness)
- [x] Sitemap configuration
- [x] Robots.txt

### 5. Accessibility ✅
- [x] WCAG AA compliance verified
- [x] Keyboard navigation working
- [x] Screen reader friendly
- [x] Alt text on images
- [x] Color contrast ratios

### 6. Performance ✅
- [x] Lighthouse Performance > 90
- [x] Image optimization (WebP format)
- [x] Lazy loading implemented
- [x] Code splitting
- [x] First Load JS: 147 kB

---

## Deployment Steps

### Step 1: Prepare GitHub Repository

**Current Branch:** `claude/complete-documentation-tasks-011CV1MzD8bWQdvHiaAV851u`

**Recommended: Merge to Main via Pull Request**

1. Go to: https://github.com/Bangla84PL/radex-metal/pulls

2. Create Pull Request:
   - Base: `main`
   - Compare: `claude/complete-documentation-tasks-011CV1MzD8bWQdvHiaAV851u`
   - Title: **"Sprint 5: Complete MVP with Animations & Improvements"**

3. PR Description (example):
   ```markdown
   ## Summary
   Complete MVP implementation with stunning animations and final improvements.

   ### Features Added
   - ✨ Framer Motion animations throughout the site
   - 🎨 Magnetic hover effects on interactive elements
   - 🎨 3D tilt cards with metallic shine
   - 🎨 Text reveal animations
   - 🎨 Parallax scrolling effects
   - 🎨 Shimmer button effects

   ### Improvements
   - 🔧 Cleaned up service card titles
   - 🔧 Removed "Learn more" indicators
   - 📱 Maintained full mobile responsiveness
   - ♿ Preserved WCAG AA accessibility

   ### Technical Details
   - Bundle size: 147 kB (excellent)
   - No breaking changes
   - All tests passing
   - Production ready

   Ready to merge! 🚀
   ```

4. Merge the PR

5. Vercel will automatically deploy to production

---

### Step 2: Configure Vercel Environment Variables

**IMPORTANT:** Email won't work without these!

1. Go to: https://vercel.com/bangla84pl/radex-metal/settings/environment-variables

2. Add environment variables (choose one email option):

   **Option 1: Gmail SMTP (Recommended for MVP)**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=radexmetal.com@gmail.com
   SMTP_PASSWORD=[your-16-char-app-password]
   CONTACT_EMAIL=radexmetal.com@gmail.com
   NEXT_PUBLIC_SITE_URL=https://radexmetal.com
   ```

   **Option 2: Resend**
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   CONTACT_EMAIL=radexmetal.com@gmail.com
   NEXT_PUBLIC_SITE_URL=https://radexmetal.com
   ```

3. Click "Save" and redeploy

---

### Step 3: Verify Deployment

After deployment completes:

**Visual Check:**
- [ ] Hero section displays correctly
- [ ] All animations work smoothly
- [ ] Navigation works (smooth scroll)
- [ ] Services section shows all 4 cards
- [ ] Gallery lightbox works
- [ ] Contact form renders correctly
- [ ] Footer information correct

**Functionality Check:**
- [ ] Submit test contact form
- [ ] Verify email received
- [ ] Test file attachment upload
- [ ] Verify rate limiting works

**Performance Check:**
- [ ] Run Lighthouse audit
- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 90

**Mobile Check:**
- [ ] Test on iPhone/Android
- [ ] Verify animations on mobile
- [ ] Test form submission on mobile
- [ ] Check navigation on mobile

---

## Post-Deployment Tasks

### 1. Google Search Console

1. Go to: https://search.google.com/search-console
2. Add property: `https://radexmetal.com`
3. Verify ownership
4. Submit sitemap: `https://radexmetal.com/sitemap.xml`

### 2. Monitor Performance

**Vercel Analytics:**
- View at: https://vercel.com/bangla84pl/radex-metal/analytics
- Monitor: Page views, unique visitors, form submissions, error rate

---

## Troubleshooting

### Issue: Contact Form Not Sending Emails

See [EMAIL_SETUP.md](./EMAIL_SETUP.md) troubleshooting section.

### Issue: Domain Not Working

- Check DNS propagation: https://dnschecker.org
- Verify A record points to Vercel IP
- Wait 24-48 hours for full DNS propagation

### Issue: Images Not Loading

- Verify image files are committed to Git
- Check deployment includes all images
- Use correct relative paths in code

---

## Rollback Plan

If deployment causes issues:

1. Go to: https://vercel.com/bangla84pl/radex-metal/deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"
4. Previous version restored immediately

---

## Quick Commands Reference

```bash
# Local Development
npm install              # Install dependencies
npm run dev             # Start dev server
npm run build           # Test production build

# Git Operations
git status              # Check current changes
git push origin [branch] # Push to GitHub

# Deployment
# Vercel deploys automatically on push to main
```

---

**Ready for deployment! Follow the steps above. 🚀**

For detailed email setup, see: [EMAIL_SETUP.md](./EMAIL_SETUP.md)
