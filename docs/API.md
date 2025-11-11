# API Documentation: Radex Metal Website

**Version:** 1.0
**Last Updated:** 2025-11-11
**Base URL:** `https://radexmetal.com`
**Status:** MVP Phase 1

---

## Table of Contents

1. [API Overview](#api-overview)
2. [Architecture](#architecture)
3. [Authentication](#authentication)
4. [Endpoints](#endpoints)
   - [Contact Form](#post-apicontact)
5. [Request/Response Schemas](#requestresponse-schemas)
6. [Data Validation](#data-validation)
7. [File Upload Specifications](#file-upload-specifications)
8. [Email Integration](#email-integration)
9. [Error Handling](#error-handling)
10. [Security Measures](#security-measures)
11. [Rate Limiting](#rate-limiting)
12. [Testing & Monitoring](#testing--monitoring)
13. [Phase 2 API Endpoints](#phase-2-api-endpoints-future)

---

## API Overview

The Radex Metal website uses **Next.js API Routes** (Server-Side API) built with the Next.js 14+ App Router architecture. All endpoints are RESTful and follow standard HTTP conventions.

### Key Characteristics

- **Type:** RESTful API
- **Data Format:** JSON (application/json) for responses, multipart/form-data for file uploads
- **Framework:** Next.js 14+ API Routes
- **Runtime:** Node.js (Vercel Serverless Functions)
- **HTTPS Only:** All requests must use HTTPS
- **CORS:** Same-origin policy (no external API access in MVP)

### Design Principles

1. **RESTful conventions** - Proper HTTP methods and status codes
2. **Clear error messages** - Polish language user-facing errors
3. **Secure by default** - Input validation, sanitization, rate limiting
4. **Stateless** - No session management in MVP
5. **Performance** - Efficient file handling, minimal processing time

---

## Architecture

### Next.js App Router Structure

```
src/
└── app/
    └── api/
        └── contact/
            └── route.ts    # POST /api/contact
```

### Server Actions vs API Routes

**MVP uses API Routes** (not Server Actions) for the following reasons:
- File upload handling (multipart/form-data)
- Better control over request/response
- Email service integration
- Rate limiting implementation

### Request Flow

```
Client (Form)
    ↓ (POST multipart/form-data)
Next.js API Route (/api/contact)
    ↓ (Validate & Sanitize)
Email Service (Resend/Nodemailer/SendGrid)
    ↓ (Send email with attachments)
Client (Success/Error Response)
```

---

## Authentication

### MVP (Phase 1)

**No authentication required** - All endpoints are public.

- Contact form submissions are anonymous
- No user accounts or sessions
- No API keys for client requests

### Phase 2 (Future)

Admin endpoints will use **NextAuth.js** with email/password authentication:

```typescript
// Future implementation
POST /api/auth/signin
POST /api/auth/signout
GET  /api/auth/session
```

**Authentication headers** (Phase 2):
```http
Authorization: Bearer <session_token>
```

---

## Endpoints

### POST /api/contact

Submit contact form with optional file attachments.

#### Request

**URL:** `/api/contact`
**Method:** `POST`
**Content-Type:** `multipart/form-data`

**TypeScript Interface:**

```typescript
interface ContactFormRequest {
  name: string;              // Full name (required)
  email: string;             // Email address (required, validated)
  phone: string;             // Phone number (required, format: +48 XXX XXX XXX or 9 digits)
  serviceType: ServiceType;  // Service category (required)
  message: string;           // Message text (required, min 20 chars)
  gdprConsent: boolean;      // RODO consent (required, must be true)
  attachments?: File[];      // Optional files (max 3, 5MB each)
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

**Form Fields:**

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `name` | string | Yes | 2-100 chars | Full name |
| `email` | string | Yes | Valid email format | Email address |
| `phone` | string | Yes | +48XXXXXXXXX or 9 digits | Phone number |
| `serviceType` | enum | Yes | One of allowed values | Service category |
| `message` | string | Yes | Min 20 chars, max 2000 | Message text |
| `gdprConsent` | boolean | Yes | Must be `true` | RODO consent |
| `attachments` | File[] | No | Max 3 files, 5MB each, JPG/PNG/PDF | File attachments |

**Example Request (using Fetch API):**

```typescript
const formData = new FormData();
formData.append('name', 'Jan Kowalski');
formData.append('email', 'jan@example.com');
formData.append('phone', '+48600123456');
formData.append('serviceType', 'bramy');
formData.append('message', 'Potrzebuję bramy przesuwnej o szerokości 4 metry.');
formData.append('gdprConsent', 'true');
formData.append('attachments', fileInput.files[0]); // Optional

const response = await fetch('/api/contact', {
  method: 'POST',
  body: formData,
  // Note: Don't set Content-Type header manually (browser sets it with boundary)
});

const result = await response.json();
```

**Example cURL:**

```bash
curl -X POST https://radexmetal.com/api/contact \
  -F "name=Jan Kowalski" \
  -F "email=jan@example.com" \
  -F "phone=+48600123456" \
  -F "serviceType=bramy" \
  -F "message=Potrzebuję bramy przesuwnej o szerokości 4 metry. Mam działkę 20m szerokości." \
  -F "gdprConsent=true" \
  -F "attachments=@/path/to/photo.jpg"
```

#### Response

**Success Response (200 OK):**

```typescript
interface ContactFormSuccessResponse {
  success: true;
  message: string;
  messageId?: string; // Email service message ID (if available)
}
```

**Example:**

```json
{
  "success": true,
  "message": "Dziękujemy za wiadomość! Skontaktujemy się w ciągu 24 godzin.",
  "messageId": "msg_abc123xyz"
}
```

**Error Response (4xx/5xx):**

```typescript
interface ContactFormErrorResponse {
  success: false;
  error: string;           // User-facing error message (Polish)
  code?: string;           // Error code for debugging
  details?: string[];      // Validation errors (field-specific)
}
```

**Example Validation Error (400 Bad Request):**

```json
{
  "success": false,
  "error": "Formularz zawiera błędy. Sprawdź poprawność danych.",
  "code": "VALIDATION_ERROR",
  "details": [
    "Pole 'email' zawiera nieprawidłowy adres email.",
    "Wiadomość musi zawierać minimum 20 znaków."
  ]
}
```

**Example File Error (413 Payload Too Large):**

```json
{
  "success": false,
  "error": "Plik jest za duży. Maksymalny rozmiar to 5MB.",
  "code": "FILE_TOO_LARGE"
}
```

**Example Rate Limit Error (429 Too Many Requests):**

```json
{
  "success": false,
  "error": "Zbyt wiele prób. Spróbuj ponownie za 1 godzinę.",
  "code": "RATE_LIMIT_EXCEEDED"
}
```

**Example Server Error (500 Internal Server Error):**

```json
{
  "success": false,
  "error": "Wystąpił błąd podczas wysyłania wiadomości. Prosimy spróbować później lub zadzwonić pod numer 600 656 747.",
  "code": "EMAIL_SEND_ERROR"
}
```

#### HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Email sent successfully |
| 400 | Bad Request | Validation error (missing/invalid fields) |
| 413 | Payload Too Large | File size exceeds limit |
| 415 | Unsupported Media Type | Invalid file type (not JPG/PNG/PDF) |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Email service failure or server error |
| 503 | Service Unavailable | Email service temporarily unavailable |

---

## Request/Response Schemas

### TypeScript Types (Full Definition)

```typescript
// src/types/api.ts

// ---------- REQUEST TYPES ----------

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: ServiceType;
  message: string;
  gdprConsent: boolean;
  attachments?: File[];
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

export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  balustrady: 'Balustrady',
  bramy: 'Bramy',
  ogrodzenia: 'Ogrodzenia',
  jachty: 'Jachty motorowe / Okucia',
  konstrukcje: 'Konstrukcje stalowe',
  zbrojenia: 'Zbrojenia budowlane',
  renowacja: 'Renowacja / Rekonstrukcja',
  inne: 'Inne',
};

// ---------- RESPONSE TYPES ----------

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  code?: ErrorCode;
  details?: string[];
  messageId?: string;
}

export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'MISSING_FIELD'
  | 'INVALID_EMAIL'
  | 'INVALID_PHONE'
  | 'INVALID_SERVICE_TYPE'
  | 'MESSAGE_TOO_SHORT'
  | 'GDPR_CONSENT_REQUIRED'
  | 'FILE_TOO_LARGE'
  | 'FILE_TYPE_NOT_ALLOWED'
  | 'TOO_MANY_FILES'
  | 'RATE_LIMIT_EXCEEDED'
  | 'EMAIL_SEND_ERROR'
  | 'SERVER_ERROR';

// ---------- EMAIL TYPES ----------

export interface EmailPayload {
  from: string;
  to: string;
  subject: string;
  html: string;
  text?: string;
  attachments?: EmailAttachment[];
}

export interface EmailAttachment {
  filename: string;
  content: Buffer;
  contentType: string;
  size: number;
}

// ---------- VALIDATION TYPES ----------

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: ErrorCode;
}

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  code?: ErrorCode;
}
```

---

## Data Validation

### Frontend Validation

**HTML5 Validation:**

```html
<input
  type="text"
  name="name"
  required
  minlength="2"
  maxlength="100"
  pattern="^[A-Za-zÀ-ÿ\s'-]+$"
/>

<input
  type="email"
  name="email"
  required
/>

<input
  type="tel"
  name="phone"
  required
  pattern="^(\+48)?[0-9]{9}$"
/>

<textarea
  name="message"
  required
  minlength="20"
  maxlength="2000"
></textarea>

<input
  type="checkbox"
  name="gdprConsent"
  required
/>
```

**JavaScript Validation (Client-Side):**

```typescript
// src/lib/validation.ts

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: ValidationError[] = [];

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.push({
      field: 'name',
      message: 'Imię i nazwisko musi zawierać minimum 2 znaki.',
      code: 'VALIDATION_ERROR',
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push({
      field: 'email',
      message: 'Podaj poprawny adres email.',
      code: 'INVALID_EMAIL',
    });
  }

  // Phone validation (Polish format)
  const phoneRegex = /^(\+48)?[0-9]{9}$/;
  if (!data.phone || !phoneRegex.test(data.phone.replace(/\s/g, ''))) {
    errors.push({
      field: 'phone',
      message: 'Podaj poprawny numer telefonu (9 cyfr lub +48XXXXXXXXX).',
      code: 'INVALID_PHONE',
    });
  }

  // Service type validation
  const validServiceTypes: ServiceType[] = [
    'balustrady', 'bramy', 'ogrodzenia', 'jachty',
    'konstrukcje', 'zbrojenia', 'renowacja', 'inne'
  ];
  if (!data.serviceType || !validServiceTypes.includes(data.serviceType)) {
    errors.push({
      field: 'serviceType',
      message: 'Wybierz rodzaj usługi.',
      code: 'INVALID_SERVICE_TYPE',
    });
  }

  // Message validation
  if (!data.message || data.message.trim().length < 20) {
    errors.push({
      field: 'message',
      message: 'Wiadomość musi zawierać minimum 20 znaków.',
      code: 'MESSAGE_TOO_SHORT',
    });
  }

  // GDPR consent validation
  if (!data.gdprConsent) {
    errors.push({
      field: 'gdprConsent',
      message: 'Musisz wyrazić zgodę na przetwarzanie danych osobowych.',
      code: 'GDPR_CONSENT_REQUIRED',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
```

### Backend Validation

**Server-Side Validation (API Route):**

```typescript
// src/app/api/contact/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { validateContactForm, sanitizeInput } from '@/lib/validation';
import { sendContactEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract and sanitize data
    const data = {
      name: sanitizeInput(formData.get('name') as string),
      email: sanitizeInput(formData.get('email') as string),
      phone: sanitizeInput(formData.get('phone') as string),
      serviceType: formData.get('serviceType') as ServiceType,
      message: sanitizeInput(formData.get('message') as string),
      gdprConsent: formData.get('gdprConsent') === 'true',
    };

    // Validate data
    const validation = validateContactForm(data);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Formularz zawiera błędy.',
          code: 'VALIDATION_ERROR',
          details: validation.errors.map(e => e.message),
        },
        { status: 400 }
      );
    }

    // Process attachments
    const attachments = await processAttachments(formData);

    // Send email
    const result = await sendContactEmail(data, attachments);

    return NextResponse.json({
      success: true,
      message: 'Dziękujemy za wiadomość! Skontaktujemy się w ciągu 24 godzin.',
      messageId: result.messageId,
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Wystąpił błąd. Prosimy spróbować później.',
        code: 'SERVER_ERROR',
      },
      { status: 500 }
    );
  }
}
```

### Input Sanitization

**Sanitization Function:**

```typescript
// src/lib/validation.ts

import DOMPurify from 'isomorphic-dompurify';

export function sanitizeInput(input: string | null): string {
  if (!input) return '';

  // Remove HTML tags and dangerous characters
  const sanitized = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });

  // Trim whitespace
  return sanitized.trim();
}

export function sanitizeHtml(html: string): string {
  // Allow basic formatting for email templates
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [],
  });
}
```

### CSRF Protection

**Next.js Built-in Protection:**

Next.js automatically provides CSRF protection for API routes through:
- SameSite cookie policy
- Origin header validation
- HTTPS-only in production

**No additional implementation required in MVP.**

---

## File Upload Specifications

### Accepted File Types

| Extension | MIME Type | Description |
|-----------|-----------|-------------|
| `.jpg`, `.jpeg` | `image/jpeg` | JPEG images |
| `.png` | `image/png` | PNG images |
| `.pdf` | `application/pdf` | PDF documents |

### File Size Limits

- **Per file:** 5MB maximum
- **Total files:** Maximum 3 files per submission
- **Total size:** 15MB maximum (3 × 5MB)

### File Validation

**Validation Function:**

```typescript
// src/lib/fileValidation.ts

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'application/pdf',
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 3;

export function validateFile(file: File): FileValidationResult {
  // Check file type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: `Nieprawidłowy typ pliku "${file.name}". Dozwolone: JPG, PNG, PDF.`,
      code: 'FILE_TYPE_NOT_ALLOWED',
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `Plik "${file.name}" jest za duży (${formatFileSize(file.size)}). Maksymalny rozmiar: 5MB.`,
      code: 'FILE_TOO_LARGE',
    };
  }

  return { isValid: true };
}

export function validateFiles(files: File[]): FileValidationResult {
  // Check number of files
  if (files.length > MAX_FILES) {
    return {
      isValid: false,
      error: `Możesz załączyć maksymalnie ${MAX_FILES} pliki.`,
      code: 'TOO_MANY_FILES',
    };
  }

  // Validate each file
  for (const file of files) {
    const result = validateFile(file);
    if (!result.isValid) {
      return result;
    }
  }

  return { isValid: true };
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
```

### File Processing (Server-Side)

```typescript
// src/lib/fileProcessing.ts

export async function processAttachments(
  formData: FormData
): Promise<EmailAttachment[]> {
  const attachments: EmailAttachment[] = [];
  const files = formData.getAll('attachments') as File[];

  if (files.length === 0 || (files.length === 1 && !files[0].name)) {
    return attachments;
  }

  // Validate files
  const validation = validateFiles(files);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  // Process each file
  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());

    attachments.push({
      filename: file.name,
      content: buffer,
      contentType: file.type,
      size: file.size,
    });
  }

  return attachments;
}
```

### Security Measures

1. **File Type Validation:**
   - Whitelist approach (only JPG, PNG, PDF allowed)
   - MIME type checking
   - File extension verification

2. **File Size Limits:**
   - Per-file limit (5MB)
   - Total upload limit (15MB)
   - Prevents DoS attacks

3. **Virus Scanning (Phase 2):**
   - Integration with ClamAV or cloud service
   - Scan files before email attachment

4. **Storage Security:**
   - Files are **NOT stored** on server (MVP)
   - Directly attached to email
   - No public file URLs

---

## Email Integration

### Email Service Options

#### Option 1: Resend (Recommended for MVP)

**Pros:**
- Modern API, easy integration
- Free tier: 100 emails/day
- Great developer experience
- Built for Next.js/React

**Setup:**

```bash
npm install resend
```

```typescript
// src/lib/email/resend.ts

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(
  data: ContactFormData,
  attachments: EmailAttachment[]
) {
  const emailHtml = generateEmailTemplate(data);

  const result = await resend.emails.send({
    from: 'kontakt@radexmetal.com', // Verified domain
    to: 'radexmetal.com@gmail.com',
    subject: `Nowe zapytanie: ${SERVICE_TYPE_LABELS[data.serviceType]}`,
    html: emailHtml,
    attachments: attachments.map(att => ({
      filename: att.filename,
      content: att.content,
    })),
  });

  return { messageId: result.id };
}
```

**.env.local:**

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=radexmetal.com@gmail.com
```

#### Option 2: Nodemailer (Gmail SMTP)

**Pros:**
- Free (using Gmail SMTP)
- No external service dependency
- Full control

**Cons:**
- Gmail daily limit: 500 emails/day
- Requires app password setup

**Setup:**

```bash
npm install nodemailer
```

```typescript
// src/lib/email/nodemailer.ts

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD, // Gmail App Password
  },
});

export async function sendContactEmail(
  data: ContactFormData,
  attachments: EmailAttachment[]
) {
  const emailHtml = generateEmailTemplate(data);

  const info = await transporter.sendMail({
    from: `"Formularz Radex Metal" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL,
    subject: `Nowe zapytanie: ${SERVICE_TYPE_LABELS[data.serviceType]}`,
    html: emailHtml,
    attachments: attachments.map(att => ({
      filename: att.filename,
      content: att.content,
      contentType: att.contentType,
    })),
  });

  return { messageId: info.messageId };
}
```

**.env.local:**

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=radexmetal.com@gmail.com
SMTP_PASSWORD=your_app_password_here
CONTACT_EMAIL=radexmetal.com@gmail.com
```

#### Option 3: SendGrid

**Pros:**
- Free tier: 100 emails/day
- Reliable delivery
- Email analytics

**Setup:**

```bash
npm install @sendgrid/mail
```

```typescript
// src/lib/email/sendgrid.ts

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendContactEmail(
  data: ContactFormData,
  attachments: EmailAttachment[]
) {
  const emailHtml = generateEmailTemplate(data);

  const msg = {
    to: process.env.CONTACT_EMAIL!,
    from: 'kontakt@radexmetal.com', // Verified sender
    subject: `Nowe zapytanie: ${SERVICE_TYPE_LABELS[data.serviceType]}`,
    html: emailHtml,
    attachments: attachments.map(att => ({
      filename: att.filename,
      content: att.content.toString('base64'),
      type: att.contentType,
      disposition: 'attachment',
    })),
  };

  const [response] = await sgMail.send(msg);
  return { messageId: response.headers['x-message-id'] };
}
```

### Email Template

**HTML Email Template:**

```typescript
// src/lib/email/template.ts

import { ContactFormData } from '@/types/api';
import { SERVICE_TYPE_LABELS } from '@/types/api';

export function generateEmailTemplate(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html lang="pl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nowe zapytanie - Radex Metal</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .container {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          background-color: #1a1a1a;
          color: #ffffff;
          padding: 20px;
          border-radius: 8px 8px 0 0;
          margin: -30px -30px 30px -30px;
        }
        h1 {
          margin: 0;
          font-size: 24px;
        }
        .field {
          margin-bottom: 20px;
        }
        .label {
          font-weight: bold;
          color: #1a1a1a;
          display: block;
          margin-bottom: 5px;
        }
        .value {
          color: #4a4a4a;
        }
        .message-box {
          background-color: #f9f9f9;
          padding: 15px;
          border-left: 4px solid #1a1a1a;
          margin: 20px 0;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
          font-size: 12px;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 Nowe zapytanie z formularza kontaktowego</h1>
        </div>

        <div class="field">
          <span class="label">Imię i nazwisko:</span>
          <span class="value">${escapeHtml(data.name)}</span>
        </div>

        <div class="field">
          <span class="label">Email:</span>
          <span class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></span>
        </div>

        <div class="field">
          <span class="label">Telefon:</span>
          <span class="value"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></span>
        </div>

        <div class="field">
          <span class="label">Rodzaj usługi:</span>
          <span class="value">${SERVICE_TYPE_LABELS[data.serviceType]}</span>
        </div>

        <div class="field">
          <span class="label">Wiadomość:</span>
          <div class="message-box">
            ${escapeHtml(data.message).replace(/\n/g, '<br>')}
          </div>
        </div>

        <div class="field">
          <span class="label">Data wysłania:</span>
          <span class="value">${new Date().toLocaleString('pl-PL')}</span>
        </div>

        <div class="footer">
          <p>Ta wiadomość została wysłana przez formularz kontaktowy na stronie radexmetal.com</p>
          <p>Odpowiedz na ten email, aby skontaktować się z klientem.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
```

### Email Delivery Confirmation

**No automatic confirmation email to user** (per PRD requirement).

**Email sent to:** `radexmetal.com@gmail.com`

**Reply-To:** Set to user's email for easy response

```typescript
replyTo: data.email, // User can receive reply directly
```

### Attachment Handling

**Attachments are:**
- Validated before sending (type, size)
- Base64 encoded (if required by service)
- Included in email as inline attachments
- **Not stored on server** (MVP)

---

## Error Handling

### Error Response Structure

**Standard Error Response:**

```typescript
interface ErrorResponse {
  success: false;
  error: string;        // User-facing message (Polish)
  code?: ErrorCode;     // Machine-readable error code
  details?: string[];   // Validation errors (optional)
}
```

### Error Codes & Messages

| Code | HTTP Status | Polish Message |
|------|-------------|----------------|
| `VALIDATION_ERROR` | 400 | Formularz zawiera błędy. Sprawdź poprawność danych. |
| `MISSING_FIELD` | 400 | Wszystkie wymagane pola muszą być wypełnione. |
| `INVALID_EMAIL` | 400 | Podaj poprawny adres email. |
| `INVALID_PHONE` | 400 | Podaj poprawny numer telefonu. |
| `INVALID_SERVICE_TYPE` | 400 | Wybierz rodzaj usługi. |
| `MESSAGE_TOO_SHORT` | 400 | Wiadomość musi zawierać minimum 20 znaków. |
| `GDPR_CONSENT_REQUIRED` | 400 | Musisz wyrazić zgodę na przetwarzanie danych. |
| `FILE_TOO_LARGE` | 413 | Plik jest za duży. Maksymalny rozmiar to 5MB. |
| `FILE_TYPE_NOT_ALLOWED` | 415 | Nieprawidłowy typ pliku. Dozwolone: JPG, PNG, PDF. |
| `TOO_MANY_FILES` | 400 | Możesz załączyć maksymalnie 3 pliki. |
| `RATE_LIMIT_EXCEEDED` | 429 | Zbyt wiele prób. Spróbuj ponownie za 1 godzinę. |
| `EMAIL_SEND_ERROR` | 500 | Wystąpił błąd podczas wysyłania wiadomości. |
| `SERVER_ERROR` | 500 | Wystąpił błąd serwera. Prosimy spróbować później. |

### Logging Strategy

**Server-Side Logging:**

```typescript
// src/lib/logger.ts

export function logError(error: Error, context?: Record<string, unknown>) {
  console.error('[ERROR]', {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    ...context,
  });

  // Phase 2: Send to monitoring service (Sentry, LogRocket, etc.)
}

export function logInfo(message: string, data?: Record<string, unknown>) {
  console.log('[INFO]', {
    message,
    timestamp: new Date().toISOString(),
    ...data,
  });
}
```

**Usage in API Route:**

```typescript
try {
  // ... email sending logic
  logInfo('Contact form submitted', {
    email: data.email,
    serviceType: data.serviceType,
  });
} catch (error) {
  logError(error as Error, {
    endpoint: '/api/contact',
    formData: { email: data.email }, // Don't log sensitive data
  });
  throw error;
}
```

### Client-Side Error Display

**Toast Notification:**

```typescript
// Example with react-hot-toast

import toast from 'react-hot-toast';

const handleSubmit = async (formData: ContactFormData) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: createFormData(formData),
    });

    const result = await response.json();

    if (result.success) {
      toast.success(result.message, { duration: 5000 });
      resetForm();
    } else {
      toast.error(result.error, { duration: 7000 });

      // Show validation errors
      if (result.details) {
        result.details.forEach((detail: string) => {
          toast.error(detail, { duration: 5000 });
        });
      }
    }
  } catch (error) {
    toast.error(
      'Wystąpił błąd. Prosimy spróbować później lub zadzwonić pod numer 600 656 747.',
      { duration: 10000 }
    );
  }
};
```

---

## Security Measures

### 1. Rate Limiting

**Implementation (using Upstash Redis or in-memory):**

```typescript
// src/lib/rateLimit.ts

import { NextRequest } from 'next/server';

const rateLimit = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT = {
  maxRequests: 5,        // Max 5 submissions
  windowMs: 3600000,     // Per hour (1 hour in ms)
};

export function checkRateLimit(request: NextRequest): boolean {
  const ip = request.headers.get('x-forwarded-for') ||
             request.headers.get('x-real-ip') ||
             'unknown';

  const now = Date.now();
  const userLimit = rateLimit.get(ip);

  if (!userLimit || now > userLimit.resetAt) {
    // First request or window expired
    rateLimit.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT.windowMs,
    });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT.maxRequests) {
    // Rate limit exceeded
    return false;
  }

  // Increment count
  userLimit.count++;
  return true;
}

export function getRateLimitResetTime(request: NextRequest): number {
  const ip = request.headers.get('x-forwarded-for') ||
             request.headers.get('x-real-ip') ||
             'unknown';

  const userLimit = rateLimit.get(ip);
  return userLimit ? userLimit.resetAt : Date.now();
}
```

**Usage in API Route:**

```typescript
export async function POST(request: NextRequest) {
  // Check rate limit
  if (!checkRateLimit(request)) {
    const resetAt = getRateLimitResetTime(request);
    const resetIn = Math.ceil((resetAt - Date.now()) / 60000); // minutes

    return NextResponse.json(
      {
        success: false,
        error: `Zbyt wiele prób. Spróbuj ponownie za ${resetIn} minut.`,
        code: 'RATE_LIMIT_EXCEEDED',
      },
      { status: 429 }
    );
  }

  // ... rest of the logic
}
```

### 2. Input Sanitization

**XSS Prevention:**

```typescript
import DOMPurify from 'isomorphic-dompurify';

// Remove all HTML tags
const sanitized = DOMPurify.sanitize(userInput, {
  ALLOWED_TAGS: [],
  ALLOWED_ATTR: [],
});
```

**SQL Injection Prevention:**

- **Not applicable in MVP** (no database)
- **Phase 2:** Use ORM (Prisma) with parameterized queries

### 3. File Upload Security

**Validation:**
- Whitelist file types (MIME + extension)
- File size limits
- File count limits

**Virus Scanning (Phase 2):**

```typescript
// Example with ClamAV
import NodeClam from 'clamscan';

const clam = new NodeClam().init({
  clamdscan: { host: 'localhost', port: 3310 },
});

export async function scanFile(buffer: Buffer): Promise<boolean> {
  const { isInfected } = await clam.scanBuffer(buffer);
  return !isInfected;
}
```

### 4. HTTPS Enforcement

**Automatic on Vercel:**
- All HTTP requests redirected to HTTPS
- Strict-Transport-Security header
- TLS 1.2+ only

### 5. CORS Policy

**Same-Origin Policy (MVP):**

```typescript
// API routes only accept requests from same domain
// No CORS headers needed

// Phase 2: If external API access needed
export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const allowedOrigins = ['https://radexmetal.com'];

  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }

  // ... rest of logic
}
```

### 6. Environment Variables Security

**Never commit to Git:**

```gitignore
.env.local
.env*.local
```

**Use Vercel Environment Variables:**
- Production secrets stored in Vercel dashboard
- Never exposed to client-side code

---

## Rate Limiting

### Configuration

| Parameter | Value | Description |
|-----------|-------|-------------|
| **Max Requests** | 5 | Maximum submissions per IP |
| **Time Window** | 1 hour | Rate limit window |
| **Penalty** | 1 hour cooldown | Wait time after limit exceeded |

### Implementation Details

**Per IP Address:**
- Tracked by `X-Forwarded-For` or `X-Real-IP` headers
- Vercel provides accurate IP forwarding

**Storage:**
- **MVP:** In-memory Map (resets on deployment)
- **Phase 2:** Redis (Upstash) for persistent limits

**Rate Limit Headers (Phase 2):**

```http
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 3
X-RateLimit-Reset: 1704067200
```

### Bypassing Rate Limits (Admin, Phase 2)

```typescript
// Whitelist IPs (admin, office)
const WHITELISTED_IPS = [
  '192.168.1.1',
  // ... office IPs
];

if (WHITELISTED_IPS.includes(ip)) {
  // Skip rate limit check
  return true;
}
```

---

## Testing & Monitoring

### API Testing

**Unit Tests (Jest):**

```typescript
// __tests__/api/contact.test.ts

import { POST } from '@/app/api/contact/route';
import { NextRequest } from 'next/server';

describe('/api/contact', () => {
  it('should return 400 if name is missing', async () => {
    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('phone', '600123456');
    formData.append('serviceType', 'bramy');
    formData.append('message', 'Test message with enough characters');
    formData.append('gdprConsent', 'true');

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.success).toBe(false);
    expect(result.code).toBe('VALIDATION_ERROR');
  });

  it('should send email successfully with valid data', async () => {
    // ... test implementation
  });
});
```

**Integration Tests (Playwright):**

```typescript
// e2e/contact-form.spec.ts

import { test, expect } from '@playwright/test';

test('should submit contact form successfully', async ({ page }) => {
  await page.goto('/');

  // Scroll to contact section
  await page.locator('#kontakt').scrollIntoViewIfNeeded();

  // Fill form
  await page.fill('input[name="name"]', 'Jan Kowalski');
  await page.fill('input[name="email"]', 'jan@example.com');
  await page.fill('input[name="phone"]', '600123456');
  await page.selectOption('select[name="serviceType"]', 'bramy');
  await page.fill('textarea[name="message"]', 'Potrzebuję bramy przesuwnej 4m.');
  await page.check('input[name="gdprConsent"]');

  // Submit
  await page.click('button[type="submit"]');

  // Wait for success message
  await expect(page.locator('.success-message')).toBeVisible();
  await expect(page.locator('.success-message')).toContainText('Dziękujemy');
});
```

### Error Monitoring

**Vercel Analytics (Built-in):**
- Automatic error tracking
- Performance monitoring
- Real-time alerts

**Phase 2: Sentry Integration:**

```typescript
// src/lib/sentry.ts

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

export function captureError(error: Error, context?: Record<string, unknown>) {
  Sentry.captureException(error, {
    extra: context,
  });
}
```

### Performance Metrics

**Key Metrics to Monitor:**

| Metric | Target | Tool |
|--------|--------|------|
| API Response Time | < 500ms | Vercel Analytics |
| Email Send Time | < 2s | Custom logging |
| File Upload Time | < 3s | Custom logging |
| Error Rate | < 1% | Sentry |
| Success Rate | > 99% | Custom analytics |

**Custom Analytics (Phase 2):**

```typescript
// Track form submissions
await analytics.track('contact_form_submitted', {
  serviceType: data.serviceType,
  hasAttachments: attachments.length > 0,
  timestamp: new Date(),
});
```

---

## Phase 2 API Endpoints (Future)

### Gallery Management

#### GET /api/gallery

Retrieve all gallery images.

**Query Parameters:**
- `category` (optional): Filter by category
- `limit` (optional): Number of images
- `offset` (optional): Pagination offset

**Response:**

```typescript
interface GalleryResponse {
  success: true;
  data: GalleryImage[];
  total: number;
  offset: number;
  limit: number;
}
```

#### POST /api/gallery

Upload new gallery image (admin only).

**Request:** `multipart/form-data`
- `image`: Image file
- `alt`: Alt text
- `category`: Category
- `tags`: Tags (optional)

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "src": "https://cdn.radexmetal.com/gallery/image.jpg",
    "alt": "Brama przesuwna...",
    "category": "bramy"
  }
}
```

#### DELETE /api/gallery/[id]

Delete gallery image (admin only).

---

### Admin Authentication

#### POST /api/auth/signin

Admin login.

**Request:**

```json
{
  "email": "admin@radexmetal.com",
  "password": "secure_password"
}
```

**Response:**

```json
{
  "success": true,
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "email": "admin@radexmetal.com",
    "role": "admin"
  }
}
```

#### POST /api/auth/signout

Logout admin.

#### GET /api/auth/session

Get current session.

---

### Contact Submissions (Admin)

#### GET /api/admin/submissions

Get all contact form submissions (admin only).

**Query Parameters:**
- `status`: Filter by status (new, contacted, closed)
- `limit`: Number of results
- `offset`: Pagination

**Response:**

```typescript
interface SubmissionsResponse {
  success: true;
  data: ContactSubmission[];
  total: number;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: ServiceType;
  message: string;
  attachments: string[]; // URLs
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
  updatedAt: string;
}
```

#### PATCH /api/admin/submissions/[id]

Update submission status.

**Request:**

```json
{
  "status": "contacted"
}
```

---

### Analytics

#### GET /api/analytics/summary

Get analytics summary (admin only).

**Response:**

```typescript
interface AnalyticsSummary {
  success: true;
  data: {
    totalVisits: number;
    totalSubmissions: number;
    conversionRate: number;
    averageSessionDuration: number;
    topServices: { serviceType: string; count: number }[];
    recentSubmissions: ContactSubmission[];
  };
}
```

---

### Booking System

#### GET /api/bookings/availability

Get available consultation slots.

**Query Parameters:**
- `date`: Date (YYYY-MM-DD)

**Response:**

```json
{
  "success": true,
  "data": {
    "date": "2025-01-15",
    "slots": [
      { "time": "10:00", "available": true },
      { "time": "11:00", "available": false },
      { "time": "14:00", "available": true }
    ]
  }
}
```

#### POST /api/bookings

Book consultation.

**Request:**

```json
{
  "name": "Jan Kowalski",
  "email": "jan@example.com",
  "phone": "600123456",
  "date": "2025-01-15",
  "time": "10:00",
  "topic": "Wycena bramy"
}
```

---

## Versioning Strategy

### API Versioning (Phase 2+)

**URL-based versioning:**

```
/api/v1/contact
/api/v2/contact
```

**Version Header (alternative):**

```http
X-API-Version: 2
```

### Backward Compatibility

- **v1 (MVP):** Current implementation
- **v2 (Phase 2):** Enhanced features, maintains v1 compatibility
- **Deprecation:** 6-month notice before removing old versions

### Changelog

**Version 1.0 (Current - MVP):**
- POST /api/contact - Contact form submission

**Version 2.0 (Planned - Phase 2):**
- GET /api/gallery - Gallery management
- POST /api/gallery - Upload images (admin)
- DELETE /api/gallery/[id] - Delete images (admin)
- POST /api/auth/signin - Admin authentication
- GET /api/admin/submissions - View submissions
- PATCH /api/admin/submissions/[id] - Update status
- GET /api/analytics/summary - Analytics data
- GET /api/bookings/availability - Booking availability
- POST /api/bookings - Create booking

---

## Summary

This API documentation covers the **MVP Phase 1** implementation for the Radex Metal website redesign. The primary endpoint (`POST /api/contact`) handles contact form submissions with file attachments and email delivery.

### Key Features:
- RESTful API design
- TypeScript type safety
- Comprehensive validation (frontend + backend)
- File upload support (JPG, PNG, PDF, max 5MB)
- Email integration (Resend/Nodemailer/SendGrid)
- Rate limiting (5 submissions/hour)
- Security measures (XSS, CSRF, file validation)
- Polish error messages
- Detailed logging

### Next Steps:
- Implement contact form API route
- Set up email service (Resend recommended)
- Configure environment variables
- Add rate limiting middleware
- Write unit and integration tests
- Deploy to Vercel and test in production

---

**Document Version:** 1.0
**Last Updated:** 2025-11-11
**Maintained By:** API Architect
**Next Review:** After MVP deployment

---

**End of API Documentation**
