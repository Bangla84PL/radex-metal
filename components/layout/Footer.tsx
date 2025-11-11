'use client';

import { CONTACT_INFO } from '@/constants/contact';
import { NAV_ITEMS } from '@/constants/content';
import { scrollToElement } from '@/lib/utils';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    scrollToElement(id);
  };

  return (
    <footer className="bg-primary-black border-t border-steel-gray">
      <div className="container-padding mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid gap-12 py-12 md:grid-cols-3 md:py-16 lg:gap-16">
          {/* Column 1: Company Info */}
          <div>
            <h3 className="font-bebas text-2xl text-text-white md:text-3xl">
              {CONTACT_INFO.companyName}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-text-lightGray">
              Firma powstała w 1985 roku. Nasze główne zasady to solidność, wysoka
              jakość produktów, elastyczność przy realizacji indywidualnych projektów
              oraz nieustanny rozwój naszej firmy.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-steel-gray">
              <p className="text-metallic-silver">
                Spawanie TIG i MIG | Konstrukcje stalowe
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bebas text-xl text-text-white md:text-2xl">
              Szybkie linki
            </h4>
            <ul className="mt-4 space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-sm text-text-lightGray transition-colors duration-300 hover:text-accent-orange"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="font-bebas text-xl text-text-white md:text-2xl">Kontakt</h4>
            <ul className="mt-4 space-y-3 text-sm text-text-lightGray">
              <li className="flex flex-col gap-1">
                <span className="text-xs text-steel-gray">Adres:</span>
                <span>{CONTACT_INFO.address}</span>
                <span>
                  {CONTACT_INFO.postalCode} {CONTACT_INFO.city}
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-xs text-steel-gray">Telefon:</span>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                  className="transition-colors duration-300 hover:text-accent-orange"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-xs text-steel-gray">Email:</span>
                {CONTACT_INFO.emails.map((email, index) => (
                  <a
                    key={index}
                    href={`mailto:${email}`}
                    className="transition-colors duration-300 hover:text-accent-orange"
                  >
                    {email}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-steel-gray/30 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-steel-gray md:flex-row">
            <p>
              © {currentYear} Radex Metal - Stal nierdzewna TIG i Stal węglowa MIG
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleNavClick('#kontakt')}
                className="transition-colors duration-300 hover:text-accent-orange"
              >
                Polityka prywatności
              </button>
              <span className="text-steel-gray/50">|</span>
              <span>Wszelkie prawa zastrzeżone</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
