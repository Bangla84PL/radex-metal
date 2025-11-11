import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

// Note: Using system fonts for now. Google Fonts will be added during deployment.
// For now, we use font-family fallbacks defined in globals.css

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://radexmetal.com'),
  title: {
    default: 'Radex Metal - Stal nierdzewna TIG i Stal węglowa MIG | Słupsk',
    template: '%s | Radex Metal',
  },
  description:
    'Pomorskie centrum spawalnicze z 41-letnim doświadczeniem (od 1985). Produkcja bram przesuwnych i uchylnych, balustrad balkonowych i schodowych, ogrodzeń metalowych oraz okuć jachtowych ze stali nierdzewnej. Słupsk, ul. Cecorska 10.',
  keywords: [
    'bramy Słupsk',
    'bramy przesuwne Słupsk',
    'bramy uchylne',
    'balustrady Słupsk',
    'balustrady balkonowe',
    'balustrady schodowe',
    'ogrodzenia metalowe Słupsk',
    'okucia jachtowe',
    'spawanie TIG Słupsk',
    'spawanie MIG',
    'stal nierdzewna Słupsk',
    'stal węglowa',
    'konstrukcje stalowe',
    'centrum spawalnicze Pomorze',
  ],
  authors: [{ name: 'Radex Metal' }],
  creator: 'Radex Metal',
  publisher: 'Radex Metal',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://radexmetal.com',
    siteName: 'Radex Metal',
    title: 'Radex Metal - Bramy, Balustrady, Ogrodzenia | Słupsk',
    description:
      'Pomorskie centrum spawalnicze z 41-letnim doświadczeniem. Produkcja bram, balustrad, ogrodzeń i okuć jachtowych. Stal nierdzewna TIG i węglowa MIG.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Radex Metal - Centrum Spawalnicze Słupsk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Radex Metal - Bramy, Balustrady, Ogrodzenia | Słupsk',
    description:
      'Pomorskie centrum spawalnicze z 41-letnim doświadczeniem. Produkcja bram, balustrad, ogrodzeń.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://radexmetal.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://radexmetal.com',
    name: 'Radex Metal',
    description:
      'Pomorskie centrum spawalnicze z 41-letnim doświadczeniem. Produkcja bram, balustrad, ogrodzeń i okuć jachtowych.',
    url: 'https://radexmetal.com',
    telephone: '+48600656747',
    email: 'radexmetal.com@gmail.com',
    foundingDate: '1985',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ul. Cecorska 10',
      addressLocality: 'Słupsk',
      postalCode: '76-200',
      addressCountry: 'PL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 54.4641,
      longitude: 17.0285,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '16:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/radexmetal',
      'https://maps.app.goo.gl/ornSRoVhrXrX2VzK6',
    ],
    priceRange: '$$',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 54.4641,
        longitude: 17.0285,
      },
      geoRadius: '100000',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Usługi spawalnicze i metalowe',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Balustrady balkonowe i schodowe',
            description: 'Balustrady ze stali nierdzewnej i węglowej z możliwością montażu szyb',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Bramy przesuwne i uchylne',
            description: 'Bramy pod indywidualne zamówienie z bogatym wyborem wzorów',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Ogrodzenia metalowe',
            description: 'Kompletny system ogrodzeniowy z wypełnieniem drewnem lub blachą',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Okucia jachtowe',
            description: 'Profesjonalne okucia ze stali nierdzewnej dla jachtów motorowych',
          },
        },
      ],
    },
  };

  return (
    <html lang="pl">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
