import type { Metadata } from 'next';
import './globals.css';

// Note: Using system fonts for now. Google Fonts will be added during deployment.
// For now, we use font-family fallbacks defined in globals.css

export const metadata: Metadata = {
  title: 'Radex Metal - Stal nierdzewna TIG i Stal węglowa MIG',
  description:
    'Pomorskie centrum spawalnicze z 41-letnim doświadczeniem. Produkcja bram, balustrad, ogrodzeń i okuć jachtowych. Stal nierdzewna TIG i węglowa MIG. Słupsk.',
  keywords: [
    'bramy Słupsk',
    'balustrady Słupsk',
    'ogrodzenia metalowe',
    'okucia jachtowe',
    'spawanie TIG',
    'stal nierdzewna Słupsk',
  ],
  authors: [{ name: 'Radex Metal' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://radexmetal.com',
    siteName: 'Radex Metal',
    title: 'Radex Metal - Bramy, Balustrady, Ogrodzenia | Słupsk',
    description:
      'Pomorskie centrum spawalnicze z 41-letnim doświadczeniem. Produkcja bram, balustrad, ogrodzeń.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Radex Metal',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="antialiased">{children}</body>
    </html>
  );
}
