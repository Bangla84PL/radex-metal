import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { validateContactForm, sanitizeInput } from '@/lib/validation';
import { SERVICE_TYPE_LABELS } from '@/constants/services';
import type { ServiceType } from '@/types';

// Rate limiting map (in-memory, resets on deployment)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT = {
  maxRequests: 5,
  windowMs: 3600000, // 1 hour
};

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetAt) {
    rateLimitMap.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT.windowMs,
    });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT.maxRequests) {
    return false;
  }

  userLimit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Zbyt wiele prób. Spróbuj ponownie za 1 godzinę.',
          code: 'RATE_LIMIT_EXCEEDED',
        },
        { status: 429 }
      );
    }

    // Parse form data
    const formData = await request.formData();

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
          details: validation.errors.map((e) => e.message),
        },
        { status: 400 }
      );
    }

    // Process attachments
    const attachments = [];
    const files = formData.getAll('attachments');

    for (const file of files) {
      if (file instanceof File && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        attachments.push({
          filename: file.name,
          content: buffer,
          contentType: file.type,
        });
      }
    }

    // Send email
    await sendEmail(data, attachments);

    return NextResponse.json({
      success: true,
      message: 'Dziękujemy za wiadomość! Skontaktujemy się w ciągu 24 godzin.',
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

async function sendEmail(
  data: {
    name: string;
    email: string;
    phone: string;
    serviceType: string;
    message: string;
  },
  attachments: Array<{ filename: string; content: Buffer; contentType: string }>
) {
  // Check if SMTP credentials are configured
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn('Email service not configured. Email would have been sent to:', process.env.CONTACT_EMAIL);
    console.log('Form data:', JSON.stringify(data, null, 2));
    // In development, just log and return success
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const emailHtml = generateEmailTemplate(data);

  await transporter.sendMail({
    from: `"Formularz Radex Metal" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL,
    replyTo: data.email,
    subject: `Nowe zapytanie: ${SERVICE_TYPE_LABELS[data.serviceType] || data.serviceType}`,
    html: emailHtml,
    attachments: attachments.map((att) => ({
      filename: att.filename,
      content: att.content,
      contentType: att.contentType,
    })),
  });
}

function generateEmailTemplate(data: {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
}): string {
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
          white-space: pre-wrap;
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
          <span class="value">${SERVICE_TYPE_LABELS[data.serviceType] || escapeHtml(data.serviceType)}</span>
        </div>

        <div class="field">
          <span class="label">Wiadomość:</span>
          <div class="message-box">${escapeHtml(data.message)}</div>
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
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
