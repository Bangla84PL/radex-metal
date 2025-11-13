# Email Service Setup Guide

**Project:** Radex Metal
**Last Updated:** 2025-11-13
**Status:** Email service configured but needs credentials

---

## Current Status

✅ Contact form fully implemented
✅ Email template designed
✅ Rate limiting configured (5 submissions/hour)
✅ File attachment support (3 files, 5MB each)
⚠️ Email credentials need to be configured

---

## Quick Start (Development Mode)

**Good News:** The contact form works in development mode without email credentials!

In development, when you submit the form:
1. ✅ Form validation works
2. ✅ Data is logged to console
3. ✅ Success message shows to user
4. ⚠️ No actual email sent (until you configure credentials)

**To test locally:**
```bash
npm run dev
# Open http://localhost:3000
# Scroll to contact form
# Fill out and submit
# Check terminal for logged data
```

---

## Email Service Options

### Option 1: Gmail SMTP (Free, Recommended for MVP)

**Pros:**
- ✅ Completely free
- ✅ No external service needed
- ✅ Already implemented in code

**Steps to Configure:**

1. **Enable 2-Step Verification on your Gmail account:**
   - Go to: https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Follow setup instructions

2. **Generate App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Select "Other" as device, enter "Radex Metal Website"
   - Click "Generate"
   - **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

3. **Update `.env.local`:**
   ```bash
   # Gmail SMTP Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=radexmetal.com@gmail.com
   SMTP_PASSWORD=abcd efgh ijkl mnop  # Your app password (remove spaces)

   # Where emails should be sent
   CONTACT_EMAIL=radexmetal.com@gmail.com
   ```

4. **Test:**
   ```bash
   npm run dev
   # Submit test form
   # Check radexmetal.com@gmail.com inbox
   ```

**Limits:**
- 500 emails per day (more than enough for a business site)
- May occasionally hit spam filters (ask recipients to mark as "Not Spam")

---

### Option 2: Resend (Modern, Great Developer Experience)

**Pros:**
- ✅ Better deliverability (less likely to hit spam)
- ✅ Modern API, excellent documentation
- ✅ Free tier: 100 emails/day, 3,000/month

**Steps to Configure:**

1. **Create Resend Account:**
   - Go to: https://resend.com
   - Sign up (free)
   - Verify your email

2. **Get API Key:**
   - Dashboard → API Keys
   - Click "Create API Key"
   - Name it "Radex Metal Production"
   - Copy the key (starts with `re_`)

3. **Verify Domain (Recommended for Production):**
   - Dashboard → Domains
   - Add `radexmetal.com`
   - Add DNS records (provided by Resend)
   - Wait for verification (~5 minutes)

4. **Update Code:**

   Create `lib/email-resend.ts`:
   ```typescript
   import { Resend } from 'resend';

   const resend = new Resend(process.env.RESEND_API_KEY);

   export async function sendContactEmail(data: any, attachments: any[]) {
     return await resend.emails.send({
       from: 'kontakt@radexmetal.com', // After domain verification
       to: process.env.CONTACT_EMAIL!,
       replyTo: data.email,
       subject: `Nowe zapytanie: ${data.serviceType}`,
       html: generateEmailTemplate(data),
       attachments: attachments.map(att => ({
         filename: att.filename,
         content: att.content,
       })),
     });
   }
   ```

5. **Update `.env.local`:**
   ```bash
   RESEND_API_KEY=re_xxxxxxxxxxxxx  # Your API key
   CONTACT_EMAIL=radexmetal.com@gmail.com
   ```

6. **Install Resend:**
   ```bash
   npm install resend
   ```

**Limits:**
- Free tier: 100 emails/day (3,000/month)
- Paid plan: $20/month for 50,000 emails/month

---

## Testing Checklist

### Local Testing (Development)

- [ ] Start dev server: `npm run dev`
- [ ] Navigate to http://localhost:3000
- [ ] Scroll to contact form
- [ ] Fill out all required fields:
  - [ ] Name: Test User
  - [ ] Email: test@example.com
  - [ ] Phone: 600123456
  - [ ] Service Type: Bramy
  - [ ] Message: (at least 20 characters)
  - [ ] RODO checkbox: Checked
- [ ] Click "Wyślij zapytanie"
- [ ] Verify success message shows
- [ ] Check terminal for logged data

### Email Testing (After Configuration)

- [ ] Configure email credentials (Gmail or Resend)
- [ ] Restart dev server
- [ ] Submit test form
- [ ] Check inbox for email
- [ ] Verify email formatting
- [ ] Verify reply-to address works
- [ ] Test with attachment (upload small image)
- [ ] Verify attachment received

### Rate Limiting Test

- [ ] Submit form 5 times rapidly
- [ ] On 6th submission, verify error: "Zbyt wiele prób"
- [ ] Wait 1 hour OR restart server
- [ ] Verify can submit again

### Error Handling Test

- [ ] Submit with empty name → Verify error shown
- [ ] Submit with invalid email → Verify error shown
- [ ] Submit with message < 20 chars → Verify error shown
- [ ] Submit without RODO consent → Verify error shown
- [ ] Upload file > 5MB → Verify error shown
- [ ] Upload .exe file → Verify error shown

---

## Production Deployment Checklist

### Before Deploying to Vercel:

- [ ] Choose email service (Gmail or Resend)
- [ ] Configure credentials in `.env.local` (test locally)
- [ ] Verify emails are being sent successfully
- [ ] Test all form validations
- [ ] Test rate limiting

### Vercel Environment Variables:

1. Go to: https://vercel.com/bangla84pl/radex-metal/settings/environment-variables

2. Add the following (based on your choice):

   **For Gmail SMTP:**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=radexmetal.com@gmail.com
   SMTP_PASSWORD=your_app_password_here
   CONTACT_EMAIL=radexmetal.com@gmail.com
   NEXT_PUBLIC_SITE_URL=https://radexmetal.com
   ```

   **For Resend:**
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   CONTACT_EMAIL=radexmetal.com@gmail.com
   NEXT_PUBLIC_SITE_URL=https://radexmetal.com
   ```

3. Redeploy the application

### Post-Deployment Testing:

- [ ] Visit https://radexmetal.com
- [ ] Submit test form on live site
- [ ] Verify email received
- [ ] Test from different browsers
- [ ] Test from mobile device

---

## Troubleshooting

### Issue: "Email service not configured" in logs

**Cause:** Missing SMTP credentials or RESEND_API_KEY

**Solution:**
- Add credentials to `.env.local` for local development
- Add to Vercel environment variables for production
- Restart dev server after adding credentials

---

### Issue: Gmail SMTP authentication failed

**Possible Causes:**
1. 2-Step Verification not enabled
2. Using regular Gmail password instead of App Password
3. Incorrect App Password

**Solution:**
- Verify 2-Step Verification is enabled
- Generate new App Password
- Use the 16-character app password (remove spaces)
- Update `.env.local` with correct password
- Restart dev server

---

### Issue: Emails going to spam

**For Gmail SMTP:**
- Ask recipients to mark as "Not Spam"
- Set up SPF record for your domain (advanced)

**For Resend:**
- Verify your domain with Resend
- Use verified domain as "from" address
- Better deliverability than Gmail SMTP

---

### Issue: Rate limit hit during testing

**Solution:**
- Restart dev server (resets in-memory rate limit)
- Or wait 1 hour
- In production, rate limit persists across deployments

---

### Issue: Attachments not received

**Check:**
- File size < 5MB
- File type: JPG, PNG, or PDF only
- Max 3 files
- Check email spam folder
- Verify email service supports attachments

---

## Contact Form Features

### Current Implementation:

✅ **Validation:**
- Name: Required, min 2 characters
- Email: Required, valid format
- Phone: Required, 9 digits (Polish format)
- Service Type: Required, dropdown
- Message: Required, min 20 characters
- RODO Consent: Required checkbox

✅ **Security:**
- Rate limiting (5 submissions/hour per IP)
- XSS prevention (input sanitization)
- CSRF protection (Next.js built-in)
- File type validation
- File size validation

✅ **User Experience:**
- Real-time validation
- Polish error messages
- Loading states during submission
- Success/error notifications
- Mobile-responsive design

✅ **Email Features:**
- HTML formatted email
- Reply-to set to user's email
- Professional template
- File attachments (up to 3, 5MB each)
- Polish language

---

## Email Template Preview

When a user submits the form, the email looks like:

```
┌─────────────────────────────────────────┐
│ 📧 Nowe zapytanie z formularza kontaktowego │
├─────────────────────────────────────────┤
│                                         │
│ Imię i nazwisko: Jan Kowalski          │
│ Email: jan@example.com                 │
│ Telefon: 600123456                     │
│ Rodzaj usługi: Bramy                   │
│                                         │
│ Wiadomość:                             │
│ ┌─────────────────────────────────┐    │
│ │ Potrzebuję bramy przesuwnej     │    │
│ │ 4m szerokości...                │    │
│ └─────────────────────────────────┘    │
│                                         │
│ Data wysłania: 2025-11-13 14:30       │
│                                         │
│ ─────────────────────────────────────  │
│ Ta wiadomość została wysłana przez     │
│ formularz kontaktowy na radexmetal.com │
└─────────────────────────────────────────┘
```

---

## Next Steps

1. **Choose your email service:**
   - Gmail SMTP (free, quick setup) ← Recommended for MVP
   - Resend (better deliverability, modern API)

2. **Configure credentials** following the guide above

3. **Test locally** using the testing checklist

4. **Deploy to Vercel** with environment variables

5. **Test on production** after deployment

---

## Support

If you need help with email setup:
- Gmail SMTP: https://support.google.com/accounts/answer/185833
- Resend: https://resend.com/docs
- Vercel Environment Variables: https://vercel.com/docs/environment-variables

---

**Document Status:** Complete
**Last Updated:** 2025-11-13
**Author:** Claude (AI Assistant)
