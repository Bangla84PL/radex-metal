import { HeroContent, AboutContent } from '@/types';

export const HERO_CONTENT: HeroContent = {
  title: 'Radex Metal',
  subtitle: '41 lat doświadczenia | Pomorskie Centrum Spawalnicze',
  ctaPrimary: 'Zobacz Ofertę',
  ctaSecondary: 'Skontaktuj się',
  backgroundImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80',
};

export const ABOUT_CONTENT: AboutContent = {
  title: 'Witaj w Pomorskim Centrum Spawalniczym RADEX METAL!',
  content: `Firma RADEXMETAL.COM zajmuje się produkcją, montażem i serwisowaniem: bram wjazdowych, ogrodzeń, furtek wejściowych, balustrad, krat zabezpieczających, konstrukcji stalowych oraz zbrojeń budowlanych.

Dzięki wieloletniemu doświadczeniu oraz współpracy z wybitnym architektem nasze wyroby charakteryzują się wytrzymałością oraz estetyką wykonania, każdego nawet najdrobniejszego elementu.

Wykonujemy indywidualne zamówienia według pomysłu klienta, służąc swoim doradztwem i doświadczeniem. Zapewniamy bardzo wysoką jakość naszych produktów i najniższą cenę względem jakości do produktu.

Prowadzimy również prace związane z rekonstrukcją starych wyrobów ślusarsko-kowalskich: renowacja bram wjazdowych, balustrad, ogrodzeń, krat, mebli ogrodowych oraz różnego rodzaju konstrukcji stalowych.`,
  stats: [
    {
      label: 'Lat doświadczenia',
      value: '41',
    },
    {
      label: 'Od roku',
      value: '1985',
    },
  ],
  image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
};

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#hero' },
  { id: 'about', label: 'O Firmie', href: '#o-firmie' },
  { id: 'services', label: 'Oferta', href: '#oferta' },
  { id: 'gallery', label: 'Galeria', href: '#galeria' },
  { id: 'contact', label: 'Kontakt', href: '#kontakt' },
];
