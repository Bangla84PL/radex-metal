'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CONTACT_INFO } from '@/constants/contact';
import { SERVICE_TYPE_LABELS } from '@/constants/services';
import { FileUpload } from '@/components/ui/FileUpload';
import { validateContactForm } from '@/lib/validation';
import { ContactFormData } from '@/types';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState<Partial<ContactFormData>>({
    name: '',
    email: '',
    phone: '',
    serviceType: undefined,
    message: '',
    gdprConsent: false,
    attachments: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    // Validate form
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      const errorMap: Record<string, string> = {};
      validation.errors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('name', formData.name || '');
      submitData.append('email', formData.email || '');
      submitData.append('phone', formData.phone || '');
      submitData.append('serviceType', formData.serviceType || '');
      submitData.append('message', formData.message || '');
      submitData.append('gdprConsent', formData.gdprConsent ? 'true' : 'false');

      // Add files
      formData.attachments?.forEach((file) => {
        submitData.append('attachments', file);
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceType: undefined,
          message: '',
          gdprConsent: false,
          attachments: [],
        });
      } else {
        setSubmitStatus('error');
        if (result.details) {
          const errorMap: Record<string, string> = {};
          result.details.forEach((msg: string) => {
            errorMap['general'] = msg;
          });
          setErrors(errorMap);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrors({
        general:
          'Wystąpił błąd podczas wysyłania formularza. Prosimy spróbować później lub zadzwonić pod numer 600 656 747.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontakt" ref={ref} className="section-padding bg-primary-black">
      <div className="container-padding mx-auto max-w-7xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <h2 className="font-bebas text-4xl text-text-white sm:text-5xl md:text-6xl">
            Skontaktuj się z nami
          </h2>
          <p className="mt-4 text-lg text-steel-gray md:text-xl">
            Zapytaj o wycenę lub umów się na konsultację
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-text-lightGray">
                  Imię i nazwisko <span className="text-accent-orange">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full rounded-lg border bg-primary-medGray px-4 py-3 text-text-white placeholder-steel-gray transition-colors focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-steel-gray focus:border-accent-orange focus:ring-accent-orange'
                  }`}
                  placeholder="Jan Kowalski"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              {/* Email & Phone */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-lightGray">
                    Adres email <span className="text-accent-orange">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full rounded-lg border bg-primary-medGray px-4 py-3 text-text-white placeholder-steel-gray transition-colors focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-steel-gray focus:border-accent-orange focus:ring-accent-orange'
                    }`}
                    placeholder="jan@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-text-lightGray">
                    Telefon <span className="text-accent-orange">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full rounded-lg border bg-primary-medGray px-4 py-3 text-text-white placeholder-steel-gray transition-colors focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-steel-gray focus:border-accent-orange focus:ring-accent-orange'
                    }`}
                    placeholder="600 656 747"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label htmlFor="serviceType" className="mb-2 block text-sm font-medium text-text-lightGray">
                  Rodzaj usługi <span className="text-accent-orange">*</span>
                </label>
                <select
                  id="serviceType"
                  value={formData.serviceType || ''}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as any })}
                  className={`w-full rounded-lg border bg-primary-medGray px-4 py-3 text-text-white transition-colors focus:outline-none focus:ring-2 ${
                    errors.serviceType
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-steel-gray focus:border-accent-orange focus:ring-accent-orange'
                  }`}
                >
                  <option value="">Wybierz rodzaj usługi</option>
                  {Object.entries(SERVICE_TYPE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                {errors.serviceType && <p className="mt-1 text-sm text-red-500">{errors.serviceType}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-text-lightGray">
                  Wiadomość <span className="text-accent-orange">*</span>
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full resize-none rounded-lg border bg-primary-medGray px-4 py-3 text-text-white placeholder-steel-gray transition-colors focus:outline-none focus:ring-2 ${
                    errors.message
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-steel-gray focus:border-accent-orange focus:ring-accent-orange'
                  }`}
                  placeholder="Opisz swoje potrzeby, wymiary, preferowane materiały..."
                />
                <div className="mt-1 flex items-center justify-between">
                  {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                  <p className="ml-auto text-xs text-steel-gray">
                    {formData.message?.length || 0} / 2000 znaków
                  </p>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="mb-2 block text-sm font-medium text-text-lightGray">
                  Załączniki (opcjonalnie)
                </label>
                <FileUpload
                  files={formData.attachments || []}
                  onChange={(files) => setFormData({ ...formData, attachments: files })}
                  error={errors.attachments}
                />
              </div>

              {/* GDPR Consent */}
              <div>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={formData.gdprConsent}
                    onChange={(e) => setFormData({ ...formData, gdprConsent: e.target.checked })}
                    className="mt-1 h-5 w-5 flex-shrink-0 rounded border-steel-gray bg-primary-medGray text-accent-orange focus:ring-2 focus:ring-accent-orange"
                  />
                  <span className="text-sm text-text-lightGray">
                    Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z{' '}
                    <a href="#" className="text-accent-orange hover:underline">
                      polityką prywatności
                    </a>
                    . <span className="text-accent-orange">*</span>
                  </span>
                </label>
                {errors.gdprConsent && <p className="mt-1 text-sm text-red-500">{errors.gdprConsent}</p>}
              </div>

              {/* General Error */}
              {errors.general && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/50 p-4">
                  <p className="text-sm text-red-500">{errors.general}</p>
                </div>
              )}

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="rounded-lg bg-green-500/10 border border-green-500/50 p-4">
                  <p className="text-sm text-green-500">
                    ✓ Dziękujemy za wiadomość! Skontaktujemy się w ciągu 24 godzin.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-accent-orange px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-accent-orange/90 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Wysyłanie...' : 'Wyślij zapytanie'}
              </button>

              <p className="text-center text-xs text-steel-gray">
                Pola oznaczone <span className="text-accent-orange">*</span> są wymagane
              </p>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8 lg:col-span-2"
          >
            {/* Contact Details */}
            <div className="rounded-lg border border-steel-gray bg-primary-darkGray p-6">
              <h3 className="font-bebas text-2xl text-text-white mb-4">Dane kontaktowe</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 flex-shrink-0 text-accent-orange"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-text-lightGray">{CONTACT_INFO.address}</p>
                    <p className="text-text-lightGray">
                      {CONTACT_INFO.postalCode} {CONTACT_INFO.city}
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 flex-shrink-0 text-accent-orange"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <a
                      href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                      className="text-text-lightGray hover:text-accent-orange transition-colors"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 flex-shrink-0 text-accent-orange"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div className="space-y-1">
                    {CONTACT_INFO.emails.map((email, idx) => (
                      <a
                        key={idx}
                        href={`mailto:${email}`}
                        className="block text-text-lightGray hover:text-accent-orange transition-colors"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </li>
              </ul>
            </div>

            {/* Google Maps */}
            <div className="overflow-hidden rounded-lg border border-steel-gray">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2316.9!2d17.0285!3d54.4641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTTCsDI3JzUwLjgiTiAxN8KwMDEnNDIuNiJF!5e0!3m2!1spl!2spl!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokalizacja Radex Metal"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
