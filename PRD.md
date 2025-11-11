# Product Requirements Document: Radex Metal Website Redesign

## 1. Executive Summary

Radex Metal to pomorskie centrum spawalnicze z 41-letnim doświadczeniem (od 1985 roku) specjalizujące się w produkcji, montażu i serwisowaniu wyrobów stalowych: bram, ogrodzeń, balustrad, konstrukcji stalowych oraz okuć do jachtów. 

Celem projektu jest redesign istniejącej strony radexmetal.com z wykorzystaniem nowoczesnego template'u Odyssey od Vercel, aby zapewnić:
- Nowoczesny, industrialny wygląd kojarzący się z metalem i stalą
- Lepszą prezentację oferty i realizacji firmy
- Responsywną stronę typu one-page z płynną nawigacją
- Profesjonalny formularz kontaktowy z możliwością załączania zdjęć

## 2. Problem Statement

Obecna strona radexmetal.com jest przestarzała wizualnie i funkcjonalnie. Nie oddaje profesjonalizmu i wysokiej jakości usług świadczonych przez firmę. Brak nowoczesnych elementów UX/UI oraz słaba responsywność mobilna może skutkować utratą potencjalnych klientów na rzecz konkurencji.

## 3. Target Users

### Główni użytkownicy:
- **Właściciele domów prywatnych** - szukający bram, ogrodzeń, furtek, balustrad
- **Developerzy i inwestorzy budowlani** - potrzebujący konstrukcji stalowych i zbrojeń
- **Właściciele jachtów motorowych** - szukający okuć ze stali nierdzewnej
- **Firmy remontowe** - potrzebujące renowacji starych wyrobów ślusarsko-kowalskich
- **Architekci i projektanci** - szukający partnera do realizacji indywidualnych projektów

### Charakterystyka:
- Wiek: 30-65 lat
- Lokalizacja: Głównie Pomorze, ale również cała Polska
- Urządzenia: Desktop (50%), Mobile (40%), Tablet (10%)
- Oczekiwania: Profesjonalny wygląd, szybki kontakt, galeria realizacji, łatwy formularz kontaktowy

## 4. Goals & Success Metrics

### Business Objectives:
- Zwiększenie liczby zapytań ofertowych o 30% w ciągu 3 miesięcy od wdrożenia
- Poprawa wizerunku firmy jako nowoczesnego, profesjonalnego partnera
- Zmniejszenie bounce rate o 20%
- Zwiększenie czasu spędzanego na stronie o 40%

### Key Performance Indicators (KPI):
- Liczba wypełnionych formularzy kontaktowych / miesiąc
- Średni czas na stronie
- Bounce rate
- Współczynnik konwersji (odwiedziny → formularz)
- Mobile vs Desktop traffic ratio

### Definition of Success (MVP):
Strona uznana za sukces, gdy:
- ✅ Jest w pełni responsywna na wszystkich urządzeniach
- ✅ Czas ładowania < 3 sekundy
- ✅ Formularz kontaktowy działa poprawnie z załącznikami
- ✅ Wszystkie sekcje są kompletne i zawierają treści z obecnej strony
- ✅ Design jest spójny ze stylem industrialnym/metalowym
- ✅ Jest poprawnie wdrożona na domenie radexmetal.com

## 5. User Stories

### Jako potencjalny klient:
- Chcę zobaczyć portfolio realizacji firmy, aby ocenić jakość ich pracy
- Chcę łatwo znaleźć dane kontaktowe, aby szybko się skontaktować
- Chcę wypełnić formularz kontaktowy i załączyć zdjęcie mojego projektu, aby otrzymać wycenę
- Chcę poznać historię i doświadczenie firmy, aby wiedzieć, czy mogę im zaufać
- Chcę zobaczyć pełną ofertę usług w jednym miejscu, aby sprawdzić czy realizują to, czego potrzebuję
- Chcę móc przeglądać stronę na telefonie tak samo wygodnie jak na komputerze

### Jako właściciel firmy (Radex Metal):
- Chcę, aby strona wyglądała nowocześnie i profesjonalnie, aby przyciągać klientów premium
- Chcę otrzymywać kompletne zapytania z załącznikami, aby móc szybko przygotować wycenę
- Chcę, aby strona była łatwa w utrzymaniu i nie wymagała częstych aktualizacji
- Chcę, aby klienci łatwo znaleźli moją ofertę i formularz kontaktu

### Jako administrator strony:
- Chcę, aby strona była stabilna i nie wymagała stałej obsługi technicznej
- Chcę w przyszłości móc dodawać nowe zdjęcia do galerii (w fazie 2)

## 6. Functional Requirements

### 6.1 Core Features (MVP - Must-Have)

#### 6.1.1 Strona Główna (Hero Section)
- **Cel**: Przyciągnięcie uwagi i natychmiastowe pokazanie profilu firmy
- **Elementy**:
  - Główny nagłówek: "Radex Metal - Stal nierdzewna TIG i Stal węglowa MIG"
  - Podtytuł: "41 lat doświadczenia w obróbce metalu" / "Pomorskie Centrum Spawalnicze"
  - Hero image/video: Industrialne tło (spawanie, konstrukcje stalowe)
  - CTA Button: "Zobacz Ofertę" (scroll do sekcji oferty) + "Skontaktuj się" (scroll do formularza)
  - Animacje: Parallax effect, subtle animations przy scrollu
- **Styl**: Ciemne tło (czarne/ciemnoszare), metaliczne akcenty, industrialny klimat

#### 6.1.2 Sekcja "O Firmie"
- **Lokalizacja**: Druga sekcja po hero
- **Treść**: 
  - Nagłówek: "Witaj w Pomorskim Centrum Spawalniczym RADEX METAL!"
  - Tekst z obecnej strony (pełna treść z sekcji "Witaj"):
    - 41 lat doświadczenia
    - Opis działalności: produkcja, montaż, serwis
    - Współpraca z architektem
    - Indywidualne zamówienia
    - Rekonstrukcja i renowacja
  - Statystyka/liczby: 41 lat, tysiące realizacji (jeśli dostępne)
- **Layout**: Tekst + grafika/zdjęcie (np. warsztatu, spawania)
- **Animacje**: Fade-in przy scrollu

#### 6.1.3 Sekcja "Oferta/Produkty"
- **Lokalizacja**: Trzecia sekcja
- **Struktura**: 4 główne kategorie jako duże kafelki/sekcje
- **Kategorie**:
  
  1. **Balustrady Radex Metal**
     - Ikona/grafika balustrad
     - Krótki opis z obecnej strony
     - Szczegóły: balkonowe, schodowe, stal nierdzewna/węglowa, montaż szyb
  
  2. **Bramy Radex Metal**
     - Ikona/grafika bramy
     - Krótki opis z obecnej strony
     - Szczegóły: przesuwne, uchylne, indywidualne wymiary, bogaty wybór wzorów
  
  3. **Ogrodzenia Radex Metal**
     - Ikona/grafika ogrodzenia
     - Krótki opis z obecnej strony
     - Szczegóły: wypełnienie drewnem/blachą, kowalstwo artystyczne, kompletny system
  
  4. **Jachty Motorowe (Okucia)**
     - Ikona/grafika okuć jachtowych
     - Krótki opis z obecnej strony
     - Szczegóły: stal nierdzewna, balustrady, uchwyty, meble, orurowanie

- **Layout**: Grid 2x2 na desktop, 1 kolumna na mobile
- **Interakcja**: Hover effect z animacją (np. powiększenie, zmiana koloru)
- **Styl**: Każdy kafelek z zdjęciem w tle + ciemny overlay + tekst

#### 6.1.4 Galeria Realizacji
- **Lokalizacja**: Czwarta sekcja
- **Treść**: 
  - Nagłówek: "Nasze Realizacje" / "Galeria Projektów"
  - 8-12 zdjęć zrealizowanych projektów
  - Mix: bramy, balustrady, ogrodzenia, okucia jachtowe
- **Layout**: Masonry grid / równy grid 3-4 kolumny desktop, 2 kolumny tablet, 1 kolumna mobile
- **Funkcjonalność**: 
  - Kliknięcie w zdjęcie → powiększenie w lightbox
  - Navigation w lightbox (prev/next)
  - Zamknięcie lightbox (X lub kliknięcie poza)
- **Źródło zdjęć**: Statyczne w kodzie (ścieżki do plików)
- **Brak filtrowania w MVP** (zostanie dodane w fazie 2)

#### 6.1.5 Formularz Kontaktowy
- **Lokalizacja**: Piąta sekcja (przed stopką)
- **Nagłówek**: "Skontaktuj się z nami" / "Zapytaj o wycenę"
- **Pola formularza**:
  1. **Imię i Nazwisko*** (required, text input)
  2. **Email*** (required, email input, walidacja formatu)
  3. **Telefon*** (required, tel input, format: +48 XXX XXX XXX)
  4. **Rodzaj usługi*** (required, dropdown select):
     - Balustrady
     - Bramy
     - Ogrodzenia
     - Jachty motorowe / Okucia
     - Konstrukcje stalowe
     - Zbrojenia budowlane
     - Renowacja / Rekonstrukcja
     - Inne
  5. **Wiadomość*** (required, textarea, min 20 znaków)
  6. **Załącznik zdjęcia** (optional, file upload):
     - Akceptowane formaty: JPG, JPEG, PNG, PDF
     - Max rozmiar: 5MB
     - Możliwość załączenia 1-3 plików
  7. **Zgoda RODO*** (required, checkbox):
     - "Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z polityką prywatności"

- **Przycisk**: "Wyślij zapytanie"
- **Walidacja**: 
  - Frontend: HTML5 validation + custom JavaScript
  - Wymagane pola oznaczone gwiazdką
  - Komunikaty błędów po polsku
- **Funkcjonalność**:
  - Po kliknięciu "Wyślij" → wysłanie emaila na radexmetal.com@gmail.com
  - Email zawiera wszystkie dane + załączniki
  - Po wysłaniu: Komunikat sukcesu "Dziękujemy za wiadomość! Skontaktujemy się w ciągu 24h"
  - **BRAK automatycznego maila potwierdzającego do klienta**
  - **BRAK osobnego powiadomienia email do właściciela** (tylko formularz przychodzi na wskazany adres)
- **Backend**: 
  - Next.js API Route
  - Nodemailer lub Resend do wysyłki emaili
  - Obsługa załączników

#### 6.1.6 Dane Kontaktowe i Lokalizacja
- **Lokalizacja**: W stopce + sidebar/fixed element (opcjonalnie)
- **Dane kontaktowe**:
  - **Adres**: ul. Cecorska 10, 76-200 Słupsk
  - **Email**: radexmetal.com@gmail.com (główny), radexmetal.pl@gmail.com (dodatkowy)
  - **Telefon**: 600 656 747 (jako klikany link tel:)
- **Mapa Google**:
  - Embedded Google Maps iframe
  - Link: https://maps.app.goo.gl/ornSRoVhrXrX2VzK6
  - Centrowanie na "Bramy Słupsk Radex Metal 43"
- **Godziny pracy** (jeśli dostępne, jeśli nie - pominąć w MVP)

#### 6.1.7 Nawigacja
- **Top Navigation Bar**:
  - Logo: "Radex Metal" (klikalne → scroll na górę)
  - Menu items (smooth scroll):
    - Home
    - O Firmie
    - Oferta
    - Galeria
    - Kontakt
  - Sticky navigation (pozostaje widoczna przy scrollu)
  - Mobile: Hamburger menu
- **Footer Navigation**:
  - Powtórzenie menu links
  - Dane kontaktowe
  - Copyright: "© 2025 Radex Metal - Stal nierdzewna TIG i Stal węglowa MIG"
  - Opcjonalnie: Link do Polityki Prywatności (jeśli wymagane RODO)

#### 6.1.8 Responsywność i Performance
- **Desktop**: 1920px - 1024px
- **Tablet**: 1024px - 768px
- **Mobile**: < 768px
- **Wymagania**:
  - Mobile-first approach
  - Touch-friendly buttons (min 44x44px)
  - Optymalizacja obrazów (WebP, lazy loading)
  - Czas ładowania < 3s
  - Lighthouse Score: Performance > 90, Accessibility > 90

### 6.2 Future Features (Phase 2 - Nice-to-Have)

#### 6.2.1 Formularz Wyceny Online
- Dedykowany wieloetapowy formularz z precyzyjnymi pytaniami:
  - Rodzaj produktu (brama/balustrada/etc.)
  - Wymiary
  - Materiał (stal nierdzewna/węglowa)
  - Dodatkowe opcje (automatyka, malowanie, etc.)
  - Upload zdjęć miejsca montażu
- Automatyczna wstępna wycena lub email z detalami do manualnej wyceny

#### 6.2.2 Galeria z Filtrowaniem
- Filtrowanie projektów po:
  - Kategoria (bramy, balustrady, ogrodzenia, jachty)
  - Materiał (stal nierdzewna, stal węglowa)
  - Styl (nowoczesny, klasyczny, industrialny)
- Search bar do wyszukiwania po słowach kluczowych
- Tagowanie zdjęć

#### 6.2.3 Chat na Żywo
- Integracja z narzędziem typu Tawk.to, Crisp, lub LiveChat
- Dostępność w godzinach pracy
- Automatyczne powitanie: "Witaj! W czym możemy pomóc?"
- Możliwość pozostawienia wiadomości poza godzinami

#### 6.2.4 Kalkulator Cen
- Interaktywny kalkulator do szybkiego oszacowania kosztów:
  - Slider do wyboru wymiarów
  - Checkbox opcji dodatkowych
  - Instant preview ceny (zakres: od X do Y zł)
- Disclaimer: "Cena orientacyjna, dokładna wycena po konsultacji"

#### 6.2.5 Rezerwacja Konsultacji
- Kalendarz z dostępnymi terminami
- Integracja z Calendly lub własny system
- Formularz z podstawowymi info (imię, kontakt, temat)
- Email z potwierdzeniem spotkania
- Google Calendar sync

#### 6.2.6 Analityka
- **Google Analytics 4**: Śledzenie ruchu, źródeł, konwersji
- **Microsoft Clarity**: Nagrania sesji, heatmapy, analiza UX
- Dashboard z metrykami: wizyty, bounce rate, top strony, źródła ruchu

#### 6.2.7 Blog/Aktualności
- Sekcja z artykułami:
  - Porady dotyczące wyboru bram, balustrad
  - Trendy w designie ogrodzeń
  - Case studies projektów
- CMS do łatwego dodawania postów (np. Contentful, Sanity)

#### 6.2.8 System Referencji / Opinie Klientów
- Sekcja "Co mówią nasi klienci"
- Carousel z recenzjami
- Opcjonalna integracja z Google Reviews

#### 6.2.9 Panel Administracyjny
- Prosty CMS do zarządzania:
  - Galeria (dodawanie/usuwanie zdjęć)
  - Oferta (edycja opisów)
  - Ustawienia (dane kontaktowe, godziny)
- Authentication (tylko dla admina)

### 6.3 User Flows

#### Flow 1: Przeglądanie oferty i wysłanie zapytania
1. User wchodzi na stronę (radexmetal.com)
2. Widzi hero section z CTA "Zobacz Ofertę"
3. Klika CTA lub scrolluje do sekcji Oferta
4. Przegląda 4 kategorie produktów (balustrady, bramy, ogrodzenia, jachty)
5. Zainteresowany jedną kategorią, scrolluje dalej do Galerii
6. Klika na zdjęcie realizacji → Lightbox
7. Przegląda kilka zdjęć w lightbox
8. Zamyka lightbox, decyduje się na kontakt
9. Scrolluje do formularza kontaktowego
10. Wypełnia formularz:
    - Imię: Jan Kowalski
    - Email: jan@example.com
    - Telefon: 600123456
    - Rodzaj usługi: Bramy
    - Wiadomość: "Potrzebuję bramy przesuwnej 4m szerokości"
    - Załącza zdjęcie wjazdu (opcjonalne)
11. Akceptuje zgodę RODO
12. Klika "Wyślij zapytanie"
13. Frontend waliduje dane
14. Backend wysyła email na radexmetal.com@gmail.com z danymi + załącznikiem
15. User widzi komunikat: "Dziękujemy! Skontaktujemy się w ciągu 24h"
16. User może przeglądać stronę dalej lub wyjść

#### Flow 2: Szybki kontakt telefoniczny
1. User wchodzi na stronę na mobile
2. Widzi top navigation z numerem telefonu
3. Klika numer telefonu: 600 656 747
4. Uruchamia się dialer na telefonie
5. User dzwoni bezpośrednio

#### Flow 3: Znalezienie lokalizacji firmy
1. User scrolluje do stopki
2. Widzi adres: ul. Cecorska 10, 76-200 Słupsk
3. Klika w embedded Google Maps
4. Otwiera się pełna mapa w nowym oknie/aplikacji Google Maps
5. User może nawigować do lokalizacji

## 7. Technical Requirements

### 7.1 Platform
- **Type**: Web Application (responsive website)
- **Target**: Desktop (1920px-1024px), Tablet (1024px-768px), Mobile (<768px)
- **Browser Support**: 
  - Chrome (latest 2 versions)
  - Firefox (latest 2 versions)
  - Safari (latest 2 versions)
  - Edge (latest 2 versions)
  - Mobile: iOS Safari, Android Chrome

### 7.2 Architecture

#### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Template Base**: Vercel Odyssey Template (https://vercel.com/templates/saas/odyssey)
- **Styling**: 
  - Tailwind CSS (default w Odyssey)
  - Custom industrialny theme:
    - Primary colors: Czarny (#000000), Ciemnoszary (#1A1A1A, #2D2D2D)
    - Accent colors: Metaliczny/Srebrny (#C0C0C0, #E8E8E8), Stal (#4A4A4A)
    - Opcjonalnie: Pomarańczowy/Czerwony akcent dla CTA (#FF6B35, #D64545)
  - Fonts: Industrial/Modern (np. Roboto, Inter, Industry, Bebas Neue)
- **Animacje**: 
  - Framer Motion (dla scroll animations, parallax)
  - Smooth scroll behavior
  - Fade-in animations
  - Hover effects

#### Backend
- **API**: Next.js API Routes (Server Actions w App Router)
- **Email Service**: 
  - Opcja 1: Resend (modern, easy integration)
  - Opcja 2: Nodemailer + SMTP (Gmail SMTP)
  - Opcja 3: SendGrid
- **File Upload**: 
  - Obsługa multipart/form-data
  - Walidacja typów plików (image/jpeg, image/png, application/pdf)
  - Limit rozmiaru: 5MB per file

#### Hosting & Deployment
- **Platform**: Vercel
- **Domain**: radexmetal.com (existing domain, needs DNS update)
- **CI/CD**: Vercel automatic deployments (Git integration)
- **Environment Variables**: 
  - EMAIL_SERVICE credentials
  - SMTP settings (if using Nodemailer)
  - API keys (Resend/SendGrid if applicable)

### 7.3 Integrations

#### Phase 1 (MVP):
- **Google Maps Embed API**: Dla mapy lokalizacji
- **Email Service**: Resend / Nodemailer / SendGrid

#### Phase 2 (Future):
- **Google Analytics 4**: Tracking & analytics
- **Microsoft Clarity**: Session recordings & heatmaps
- **Live Chat**: Tawk.to / Crisp / LiveChat
- **Calendly**: Dla rezerwacji konsultacji
- **CMS**: Sanity / Contentful (dla galerii i treści)

### 7.4 Authentication & Security

#### MVP (Phase 1):
- **BRAK systemu logowania** - wszystko public
- **Security measures**:
  - HTTPS (Vercel automatic SSL)
  - Rate limiting na API routes (prevent spam)
  - CSRF protection (Next.js built-in)
  - Input sanitization (prevent XSS)
  - File upload validation (type, size, malware check)
  - CAPTCHA na formularzu (opcjonalne, jeśli problem ze spamem)
    - reCAPTCHA v3 (invisible) lub Cloudflare Turnstile

#### Phase 2:
- **Admin Panel Authentication**:
  - NextAuth.js
  - Login: email + password
  - Role-based access (tylko admin)

#### RODO Compliance:
- **Checkbox zgody** na przetwarzanie danych w formularzu
- **Polityka Prywatności** (opcjonalna podstrona lub popup)
- **Cookies Notice** (jeśli używane cookies/analytics)
  - W MVP: minimalne cookies
  - W Phase 2 (z GA/Clarity): Cookie consent banner

## 8. Data Model

### MVP (Phase 1) - Minimal Data Storage

**BRAK BAZY DANYCH w MVP** - wszystko statyczne lub przez email.

#### Entities (Static in Code):

**1. Page Content** (Static JSON/MDX)
```typescript
interface PageContent {
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    backgroundImage: string;
  };
  about: {
    title: string;
    content: string;
    stats: { label: string; value: string }[];
    image: string;
  };
  services: Service[];
  gallery: GalleryImage[];
  contact: ContactInfo;
}

interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: string;
  image: string;
}

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'bramy' | 'balustrady' | 'ogrodzenia' | 'jachty';
}

interface ContactInfo {
  address: string;
  phone: string;
  emails: string[];
  mapUrl: string;
}
```

**2. Contact Form Submission** (No storage, direct email)
```typescript
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: 'balustrady' | 'bramy' | 'ogrodzenia' | 'jachty' | 'konstrukcje' | 'zbrojenia' | 'renowacja' | 'inne';
  message: string;
  attachments?: File[]; // max 3 files, 5MB each
  gdprConsent: boolean;
  submittedAt: Date;
}
```

### Phase 2 (Future) - Database Implementation

**Database**: Supabase / PostgreSQL / MongoDB

#### Extended Entities:

**1. Contact Submissions** (Store in DB for admin panel)
```sql
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  service_type VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  attachments JSONB, -- array of file URLs
  gdpr_consent BOOLEAN NOT NULL,
  status VARCHAR(20) DEFAULT 'new', -- new, contacted, closed
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**2. Gallery Images** (CMS-managed)
```sql
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  src VARCHAR(500) NOT NULL,
  alt VARCHAR(255),
  category VARCHAR(50) NOT NULL,
  tags TEXT[],
  order_index INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**3. Consultations** (Booking system)
```sql
CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(20) NOT NULL,
  scheduled_date TIMESTAMP NOT NULL,
  topic VARCHAR(255),
  status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, completed, cancelled
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**4. Users** (Admin access)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 9. UI/UX Requirements

### 9.1 Design Principles

**Visual Style: Industrial Metal Aesthetic**
- **Color Palette**:
  - Primary: Black (#000000), Dark Gray (#1A1A1A, #2D2D2D)
  - Secondary: Steel Gray (#4A4A4A, #6B6B6B)
  - Accents: Metallic Silver (#C0C0C0, #E8E8E8), optional Orange/Red (#FF6B35)
  - Text: White (#FFFFFF), Light Gray (#E0E0E0)
- **Typography**:
  - Headings: Bold, industrial font (Bebas Neue, Industry, Oswald)
  - Body: Clean, readable (Roboto, Inter, Open Sans)
  - Size hierarchy: H1 (48-64px), H2 (36-48px), H3 (24-32px), Body (16-18px)
- **Imagery**:
  - High-quality photos of metal work, welding, finished products
  - Dark, moody aesthetic with metallic highlights
  - Texture overlays (brushed metal, steel patterns)
- **Spacing**: 
  - Generous white/dark space
  - Section padding: 80-120px desktop, 60-80px mobile
  - Element spacing: 16-24px grid system

### 9.2 Key Screens/Sections

#### 9.2.1 Hero Section
- **Layout**: Full viewport height (100vh)
- **Background**: Video/image of welding or steel work (parallax effect)
- **Content**:
  - Centered text overlay
  - Large headline (H1)
  - Subtitle (H3)
  - 2 CTA buttons (primary + secondary)
- **Animation**: Fade-in on load, parallax scroll effect

#### 9.2.2 About Section
- **Layout**: Two-column (desktop) / single column (mobile)
- **Left**: Text content (headline + paragraphs)
- **Right**: Image or stats cards
- **Stats**: Animated counters (41 years, X projects, etc.)
- **Animation**: Fade-in as section enters viewport

#### 9.2.3 Services/Oferta Section
- **Layout**: 2x2 grid (desktop) / 1 column (mobile)
- **Each card**:
  - Background image with dark overlay
  - Icon at top
  - Title (H3)
  - Short description
  - "Dowiedz się więcej" link/button (optional modal or scroll to details)
- **Hover**: Scale animation, lighter overlay
- **Animation**: Stagger fade-in (one card at a time)

#### 9.2.4 Gallery Section
- **Layout**: Masonry grid / equal grid
  - Desktop: 4 columns
  - Tablet: 3 columns
  - Mobile: 2 columns
- **Images**: Aspect ratio maintained, cropped to fit
- **Lightbox**: 
  - Full-screen overlay
  - Image centered
  - Navigation arrows (prev/next)
  - Close button (top-right X)
  - Background: rgba(0,0,0,0.9)
- **Animation**: Fade-in grid items, smooth lightbox open/close

#### 9.2.5 Contact Form Section
- **Layout**: Centered form, max-width 800px
- **Form Design**:
  - Clean, modern inputs
  - Labels above inputs
  - Border-bottom style or outlined inputs
  - Focus state: accent color border
  - Error state: red border + error message below
- **File Upload**:
  - Drag & drop zone
  - "Browse files" button
  - Preview thumbnails of selected files
  - Remove file button
- **Submit Button**: 
  - Full-width or centered
  - Loading state (spinner) while submitting
  - Success state: green checkmark + message
- **Animation**: Smooth form validation feedback

#### 9.2.6 Footer
- **Layout**: 3 columns (desktop) / 1 column (mobile)
  - Column 1: Logo + short tagline
  - Column 2: Quick links (menu items)
  - Column 3: Contact info + map thumbnail
- **Bottom**: Copyright + optional social icons (if added later)
- **Style**: Dark background, light text

### 9.3 Interaction Patterns

**Navigation**:
- Smooth scroll to sections (not instant jump)
- Active menu item highlighted based on scroll position
- Mobile: Slide-in hamburger menu from right/left

**Buttons**:
- Primary CTA: Solid background, hover: lighter shade + scale
- Secondary CTA: Outlined, hover: filled background
- All buttons: Transition 0.3s ease

**Forms**:
- Real-time validation (on blur)
- Clear error messages in Polish
- Success/error toasts (top-right corner, auto-dismiss)

**Images**:
- Lazy loading (below fold)
- Fade-in when loaded
- Hover: slight scale or overlay change

**Animations**:
- Scroll-triggered animations (Intersection Observer API)
- Subtle, not overwhelming
- Respect prefers-reduced-motion

### 9.4 Accessibility Requirements

- **Keyboard Navigation**: All interactive elements accessible via Tab
- **Focus Indicators**: Visible focus outline (not removed)
- **Alt Text**: All images have descriptive alt attributes
- **ARIA Labels**: For icons, buttons without text
- **Color Contrast**: WCAG AA compliance (4.5:1 for text)
- **Form Labels**: Properly associated with inputs
- **Skip to Content**: Link for screen readers
- **Responsive Text**: Scales appropriately, no horizontal scroll
- **Touch Targets**: Min 44x44px for mobile

## 10. Non-Functional Requirements

### 10.1 Performance
- **Page Load Time**: < 3 seconds (3G connection)
- **Time to Interactive (TTI)**: < 5 seconds
- **First Contentful Paint (FCP)**: < 1.5 seconds
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Lighthouse Scores**:
  - Performance: > 90
  - Accessibility: > 90
  - Best Practices: > 90
  - SEO: > 90
- **Image Optimization**:
  - WebP format with JPEG fallback
  - Lazy loading for below-fold images
  - Responsive images (srcset)
  - Max size: 500KB per image
- **Code Optimization**:
  - Code splitting
  - Tree shaking
  - Minification (CSS, JS)
  - Gzip/Brotli compression

### 10.2 Scalability
- **MVP**: Static site, no scalability issues expected
- **Phase 2**: 
  - Database: Scalable cloud DB (Supabase, Vercel Postgres)
  - CDN: Vercel Edge Network
  - API rate limiting: 100 requests/minute per IP
  - Expected traffic: 1000-5000 users/month initially

### 10.3 Security
- **HTTPS**: Enforced (Vercel automatic SSL)
- **Data Protection**:
  - No sensitive data stored in MVP
  - Form data transmitted over HTTPS
  - Email encryption (TLS)
- **Input Validation**:
  - Frontend: HTML5 + custom JS validation
  - Backend: Server-side validation + sanitization
  - SQL Injection: N/A (no DB in MVP), prepared statements in Phase 2
  - XSS Prevention: React escaping + DOMPurify for user content
- **File Upload Security**:
  - Type validation (whitelist: jpg, png, pdf)
  - Size validation (max 5MB)
  - Virus scanning (optional: ClamAV or cloud service)
  - Files not served from same domain (use object storage in Phase 2)
- **Rate Limiting**: 
  - Form submissions: Max 5 per hour per IP
  - API endpoints: 100 req/min per IP
- **CAPTCHA**: Optional (add if spam becomes issue)
- **RODO/GDPR**:
  - Explicit consent checkbox
  - Privacy policy link
  - Data minimization (collect only necessary data)
  - Right to deletion (manual process in MVP, automated in Phase 2)

### 10.4 Browser/Device Compatibility
- **Desktop Browsers**:
  - Chrome 100+ ✅
  - Firefox 100+ ✅
  - Safari 15+ ✅
  - Edge 100+ ✅
- **Mobile Browsers**:
  - iOS Safari 15+ ✅
  - Android Chrome 100+ ✅
  - Samsung Internet ✅
- **Devices**:
  - Desktop: 1920x1080, 1366x768
  - Tablet: iPad (1024x768), Android tablets
  - Mobile: iPhone 12/13/14, Samsung Galaxy, various Android
- **Progressive Enhancement**: Core functionality works without JS

### 10.5 SEO Requirements
- **Meta Tags**:
  - Title: "Radex Metal - Bramy, Balustrady, Ogrodzenia | Słupsk"
  - Description: "Pomorskie centrum spawalnicze z 41-letnim doświadczeniem. Produkcja bram, balustrad, ogrodzeń i okuć jachtowych. Stal nierdzewna TIG i węglowa MIG. Słupsk."
  - Keywords: "bramy Słupsk, balustrady Słupsk, ogrodzenia metalowe, okucia jachtowe, spawanie TIG, stal nierdzewna Słupsk"
  - Open Graph tags (for social sharing)
  - Twitter Card tags
- **Structured Data**: 
  - Schema.org LocalBusiness markup
  - JSON-LD for address, contact, opening hours
- **Sitemap**: XML sitemap (auto-generated by Next.js)
- **Robots.txt**: Allow all
- **Canonical URLs**: Proper canonical tags
- **Alt Text**: All images (SEO + accessibility)
- **Heading Hierarchy**: Proper H1-H6 structure
- **Fast Loading**: As per performance requirements
- **Mobile-Friendly**: Responsive design
- **HTTPS**: Secure connection

## 11. Constraints & Assumptions

### 11.1 Constraints
- **Budget**: No specific budget limit mentioned, but prefer cost-effective solutions
- **Timeline**: No hard deadline, flexible timeline for MVP
- **Technology**: Must use Vercel Odyssey template as base
- **Domain**: Must deploy to existing radexmetal.com domain
- **Content**: Limited photo assets (few images available, static in code)
- **No Database**: MVP intentionally avoids database for simplicity
- **No Admin Panel**: MVP has no backend interface for content management
- **No User Accounts**: No authentication/login system needed in MVP
- **Email Service**: Dependent on email service API limits (Resend: 100 emails/day free tier)

### 11.2 Assumptions
- **User Assumptions**:
  - Users have modern browsers (Chrome, Firefox, Safari, Edge)
  - Users have stable internet connection (3G minimum)
  - Users are primarily from Poland (Polish language sufficient)
  - Users are comfortable with standard web forms
  - Users can provide photos/attachments if needed
- **Business Assumptions**:
  - Email is sufficient for lead management (no CRM integration needed in MVP)
  - Manual response to inquiries is acceptable (no automation needed)
  - Current content from old site is accurate and up-to-date
  - Gallery photos will be provided by client or sourced from Facebook page
  - 5-10 gallery images sufficient for MVP
  - No frequent content updates needed (quarterly at most)
- **Technical Assumptions**:
  - Vercel hosting is reliable and sufficient for traffic
  - Odyssey template is customizable enough for industrial design
  - Email service (Resend/Nodemailer) will handle attachments reliably
  - No need for complex state management (React Context sufficient)
  - Next.js App Router is stable for production
  - Vercel provides adequate free tier for initial launch
- **Legal Assumptions**:
  - Basic RODO compliance (consent checkbox) is sufficient
  - No need for complex privacy policy in MVP (can add later)
  - Business has necessary legal documentation offline
  - No special industry regulations apply to website

## 12. Out of Scope

The following features are **explicitly NOT included** in MVP and may be considered for future phases:

### 12.1 User Features (Not in MVP)
- ❌ User registration/login system
- ❌ User accounts/profiles
- ❌ Saved projects or favorites
- ❌ User dashboard
- ❌ Order tracking system
- ❌ Online payments/e-commerce
- ❌ Customer portal
- ❌ Wishlist functionality

### 12.2 Advanced Form Features (Not in MVP)
- ❌ Multi-step wizard form
- ❌ Automatic price estimation in form
- ❌ 3D configurator for products
- ❌ AR visualization
- ❌ Real-time availability checker
- ❌ Appointment scheduling in form
- ❌ Document signing/contracts

### 12.3 Content Features (Not in MVP)
- ❌ Blog/news section
- ❌ FAQ section with search
- ❌ Video gallery
- ❌ 360° product views
- ❌ Product comparison tool
- ❌ Downloadable catalogs/PDFs
- ❌ Case studies/success stories (detailed)
- ❌ Testimonials/reviews system

### 12.4 Social & Community (Not in MVP)
- ❌ Social media feed integration
- ❌ Social sharing buttons (may add in Phase 2 if requested)
- ❌ User reviews/ratings
- ❌ Forum/community section
- ❌ Newsletter subscription
- ❌ Social login (Facebook, Google)

### 12.5 Advanced Gallery Features (Not in MVP)
- ❌ Gallery filtering by category
- ❌ Gallery search functionality
- ❌ Tags/hashtags
- ❌ Sorting options (date, popularity)
- ❌ Infinite scroll
- ❌ Gallery comments
- ❌ Before/after sliders
- ❌ Project details pages (individual project pages)

### 12.6 Analytics & Tracking (Not in MVP)
- ❌ Google Analytics integration
- ❌ Microsoft Clarity integration
- ❌ Conversion tracking
- ❌ Heatmaps
- ❌ A/B testing
- ❌ Custom event tracking

### 12.7 Advanced Functionality (Not in MVP)
- ❌ Live chat widget
- ❌ Chatbot/AI assistant
- ❌ Booking/reservation system
- ❌ Online price calculator
- ❌ Quote generator
- ❌ Project management portal
- ❌ Inventory system
- ❌ CRM integration
- ❌ Email marketing integration

### 12.8 Admin/Backend (Not in MVP)
- ❌ Admin panel/dashboard
- ❌ Content Management System (CMS)
- ❌ Gallery management interface
- ❌ Form submission dashboard
- ❌ Analytics dashboard
- ❌ User management
- ❌ Email template editor
- ❌ Settings panel

### 12.9 Localization (Not in MVP)
- ❌ Multi-language support (only Polish in MVP)
- ❌ Currency switcher
- ❌ Region-specific content
- ❌ RTL language support

### 12.10 Advanced Technical (Not in MVP)
- ❌ PWA (Progressive Web App) functionality
- ❌ Offline mode
- ❌ Push notifications
- ❌ Native mobile apps
- ❌ API for third-party integrations
- ❌ Webhook system
- ❌ Advanced caching strategies
- ❌ Multi-tenancy

### 12.11 Marketing Tools (Not in MVP)
- ❌ SEO dashboard
- ❌ Keyword tracking
- ❌ Competitor analysis tools
- ❌ Lead scoring
- ❌ Marketing automation
- ❌ Email campaigns
- ❌ Retargeting pixels (except basic GA in Phase 2)

## 13. Development Phases

### Phase 1: MVP (Priority: MUST-HAVE)
**Timeline Estimate**: 1-2 weeks (60-80 hours)

#### Sprint 1: Setup & Structure (Week 1, Days 1-2)
**Tasks**:
1. Clone Vercel Odyssey template
2. Set up Next.js project structure
3. Configure Tailwind with industrial theme colors
4. Set up fonts (Bebas Neue, Roboto/Inter)
5. Create basic page layout structure
6. Set up component architecture
7. Configure environment variables
8. Set up Git repository

**Deliverables**:
- ✅ Project initialized
- ✅ Basic routing structure
- ✅ Theme configured
- ✅ Component folder structure

#### Sprint 2: Hero & About Sections (Week 1, Days 3-4)
**Tasks**:
1. Build Hero section:
   - Background image/video
   - Headline & subtitle
   - CTA buttons
   - Parallax scroll effect
2. Build About section:
   - Two-column layout
   - Text content from old site
   - Stats/counters animation
   - Image/graphics
3. Implement smooth scroll navigation
4. Add fade-in animations

**Deliverables**:
- ✅ Hero section complete
- ✅ About section complete
- ✅ Animations working
- ✅ Responsive on all devices

#### Sprint 3: Services/Oferta Section (Week 1, Days 5-7)
**Tasks**:
1. Build services grid (2x2)
2. Create service cards:
   - Balustrady
   - Bramy
   - Ogrodzenia
   - Jachty motorowe
3. Add content from old site
4. Implement hover effects
5. Add card icons/images
6. Mobile responsive layout

**Deliverables**:
- ✅ Services section complete
- ✅ All 4 service cards with content
- ✅ Hover animations working
- ✅ Mobile-optimized

#### Sprint 4: Gallery Section (Week 2, Days 1-2)
**Tasks**:
1. Collect/optimize 8-12 gallery images
2. Build masonry/equal grid layout
3. Implement lightbox functionality:
   - Full-screen overlay
   - Image navigation (prev/next)
   - Close button
   - Keyboard controls (ESC, arrows)
4. Add lazy loading
5. Optimize images (WebP + JPEG fallback)

**Deliverables**:
- ✅ Gallery grid working
- ✅ Lightbox fully functional
- ✅ Images optimized
- ✅ Mobile-friendly

#### Sprint 5: Contact Form & Map (Week 2, Days 3-4)
**Tasks**:
1. Build contact form UI:
   - All input fields
   - Dropdown for service type
   - File upload component
   - RODO checkbox
   - Submit button
2. Implement frontend validation
3. Build Next.js API route for email
4. Set up email service (Resend/Nodemailer):
   - Configure SMTP/API
   - Handle attachments
   - Format email template
5. Implement form submission logic
6. Add success/error messages
7. Embed Google Maps
8. Add contact info section

**Deliverables**:
- ✅ Contact form fully functional
- ✅ Email sending working with attachments
- ✅ Validation working
- ✅ Map embedded
- ✅ Contact info displayed

#### Sprint 6: Navigation & Footer (Week 2, Day 5)
**Tasks**:
1. Build sticky top navigation:
   - Logo
   - Menu items
   - Smooth scroll links
   - Active state indicator
2. Implement mobile hamburger menu
3. Build footer:
   - 3 columns layout
   - Menu links
   - Contact info
   - Copyright
4. Test navigation on all devices

**Deliverables**:
- ✅ Navigation complete
- ✅ Mobile menu working
- ✅ Footer complete
- ✅ All links functional

#### Sprint 7: Polish & Optimization (Week 2, Days 6-7)
**Tasks**:
1. Cross-browser testing
2. Mobile responsiveness check
3. Performance optimization:
   - Image compression
   - Code splitting
   - Lazy loading
   - Lighthouse audit
4. Accessibility check (WCAG AA)
5. SEO optimization:
   - Meta tags
   - Schema markup
   - Sitemap
   - Alt text
6. Fix bugs and issues
7. Final content review
8. Prepare for deployment

**Deliverables**:
- ✅ All sections polished
- ✅ Performance > 90 Lighthouse
- ✅ Accessibility compliance
- ✅ SEO optimized
- ✅ Bug-free
- ✅ Ready for deployment

#### Sprint 8: Deployment (Week 2, Day 7)
**Tasks**:
1. Vercel project setup
2. Environment variables configuration
3. Domain DNS configuration (radexmetal.com)
4. Deploy to production
5. SSL certificate verification
6. Final testing on live site
7. Monitor for issues
8. Documentation

**Deliverables**:
- ✅ Site live on radexmetal.com
- ✅ HTTPS working
- ✅ All functionality working in production
- ✅ Deployment documentation

### Phase 2: Enhanced Features (Priority: NICE-TO-HAVE)
**Timeline Estimate**: 2-4 weeks (after MVP launch)

#### Feature Set 1: Analytics Integration (Week 3)
**Tasks**:
1. Set up Google Analytics 4
2. Configure tracking events
3. Set up Microsoft Clarity
4. Implement cookie consent banner
5. Test tracking
6. Create basic analytics dashboard

**Deliverables**:
- ✅ GA4 integrated
- ✅ Clarity heatmaps working
- ✅ Cookie consent compliant
- ✅ Basic tracking operational

#### Feature Set 2: Gallery Filtering (Week 4)
**Tasks**:
1. Add category tags to gallery images
2. Build filter UI (buttons for each category)
3. Implement filtering logic
4. Add search functionality
5. Add sorting options
6. Update URL with query params

**Deliverables**:
- ✅ Gallery filtering working
- ✅ Search operational
- ✅ URL state management
- ✅ Smooth transitions

#### Feature Set 3: Advanced Forms (Week 5)
**Tasks**:
1. Build multi-step quote form
2. Add price calculator logic
3. Implement consultation booking:
   - Calendly integration OR
   - Custom booking system
4. Form analytics tracking
5. Email templates improvement

**Deliverables**:
- ✅ Quote wizard working
- ✅ Calculator functional
- ✅ Booking system live
- ✅ Enhanced email templates

#### Feature Set 4: Live Chat (Week 6)
**Tasks**:
1. Select chat provider (Tawk.to/Crisp)
2. Integrate chat widget
3. Configure chat settings
4. Customize appearance
5. Set up auto-responses
6. Train staff on usage

**Deliverables**:
- ✅ Live chat operational
- ✅ Branded to match site
- ✅ Auto-messages configured
- ✅ Team trained

### Phase 3: Admin & CMS (Priority: FUTURE)
**Timeline Estimate**: 3-4 weeks

#### Feature Set 1: Database Setup
**Tasks**:
1. Set up Supabase/PostgreSQL
2. Create database schema
3. Migrate static content to DB
4. Set up API endpoints
5. Implement data fetching

#### Feature Set 2: Admin Panel
**Tasks**:
1. Implement authentication (NextAuth.js)
2. Build admin dashboard
3. Create gallery management interface
4. Form submissions viewer
5. Content editor for services
6. User management

#### Feature Set 3: CMS Features
**Tasks**:
1. Integrate headless CMS (Sanity/Contentful)
2. Content models setup
3. WYSIWYG editor
4. Media library
5. Preview functionality

### Phase 4: Advanced Features (Priority: FUTURE)
**Timeline Estimate**: Ongoing

#### Potential additions:
- Blog/news section with CMS
- Customer testimonials system
- Before/after project galleries
- 3D product configurator
- AR visualization
- Online payment system
- Customer portal
- Mobile app

## 14. Appendix

### 14.1 Content Inventory

#### Hero Section:
- **Title**: "Radex Metal - Stal nierdzewna TIG i Stal węglowa MIG"
- **Subtitle**: "41 lat doświadczenia | Pomorskie Centrum Spawalnicze"
- **CTA Primary**: "Zobacz Ofertę"
- **CTA Secondary**: "Skontaktuj się"

#### About Section:
**Title**: "Witaj w Pomorskim Centrum Spawalniczym RADEX METAL!"

**Content**:
"Firma RADEXMETAL.COM zajmuję się produkcją, montażem i serwisowaniem: bram wjazdowych, ogrodzeń, furtek wejściowych, balustrad, krat zabezpieczających, konstrukcji stalowych oraz zbrojeń budowlanych.

Dzięki wieloletniemu doświadczeniu oraz współpracy z wybitnym architektem nasze wyroby charakteryzują się wytrzymałością oraz estetyką wykonania, każdego nawet najdrobniejszego elementu.

Wykonujemy indywidualne zamówienia według pomysłu klienta, służąc swoim doradztwem i doświadczeniem. Zapewniamy bardzo wysoką jakość naszych produktów i najniższą cenę względem jakości do produktu.

Prowadzimy również prace związane z rekonstrukcją starych wyrobów ślusarsko-kowalskich: renowacja bram wjazdowych, balustrad, ogrodzeń, krat, mebli ogrodowych oraz różnego rodzaju konstrukcji stalowych."

**Stats**:
- 41 lat doświadczenia
- Od 1985 roku
- (Opcjonalnie: liczba zrealizowanych projektów, jeśli dostępne)

#### Services Section:

**1. Balustrady Radex Metal**
Balustrady balkonowe i schodowe Radex Metal są niezbędnym elementem naszych mieszkań, domów, jak i całej gamy budynków i obiektów przemysłowych oraz innych użyteczności publicznej. Balustrady wykonywane są pod indywidualne zamówienie oraz projekt klienta. Wykonujemy balustrady ze stali nierdzewnej oraz stali węglowej z możliwością montażu szyb.

**2. Bramy Radex Metal**
Bramy przesuwne oraz uchylne Radex Metal to kompletny, rozbudowany system kontroli wejścia na ogradzany teren. Bramy wykonywane są pod indywidualne zamówienie klienta. Wymiary światła przejazdu oraz wysokość bramy dopasowane do sytuacji montażowej danego projektu. Oferujemy bardzo bogaty wachlarz wzorów.

**3. Ogrodzenia Radex Metal**
Ogrodzenia metalowe: wypełnione drewnem lub blachą, bądź też kowalstwo artystyczne. System Ogrodzeniowy: bramy, furtki, segmenty, słupki, czyli wszystkie niezbędne elementy, aby funkcjonalnie ogrodzić teren. Zamawiając kompletny system, zyskujesz ujednolicony wygląd całego ogrodzenia.

**4. Jachty motorowe Radex Metal**
Produkujemy profesjonalne okucia ze stali nierdzewnej, które przystosowane są do wykorzystania w większości popularnych jachtów. Jakość, estetyka i solidne wykonanie to główne atuty naszych produktów. Dostarczamy najwyższej klasy produkty wykonane ze stali nierdzewnej. W naszej ofercie znajdziecie balustrady, uchwyty, meble, orurowanie oraz wiele innych akcesoriów.

#### Contact Information:
- **Company**: Radex Metal
- **Address**: ul. Cecorska 10, 76-200 Słupsk
- **Phone**: 600 656 747
- **Email (Primary)**: radexmetal.com@gmail.com
- **Email (Secondary)**: radexmetal.pl@gmail.com
- **Google Maps**: https://maps.app.goo.gl/ornSRoVhrXrX2VzK6
- **Location Name**: "Bramy Słupsk Radex Metal 43"

#### Footer:
- **About Text**: "Firma powstała w 1985 roku. Nasze główne zasady to solidność, wysoka jakość produktów, elastyczność przy realizacji indywidualnych projektów oraz nieustanny rozwój naszej firmy. Zajmujemy się produkcją bram przesuwnych oraz skrzydłowych, balustrad balkonowych i schodowych, ogrodzeń, furtek, zbrojeń, strzemion, konstrukcji stalowych oraz realizujemy najróżniejsze projekty klientów."
- **Copyright**: "© 2025 Radex Metal - Stal nierdzewna TIG i Stal węglowa MIG"

### 14.2 Technical Stack Summary

**Frontend**:
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Vercel Odyssey Template (base)

**Backend**:
- Next.js API Routes / Server Actions
- Nodemailer / Resend / SendGrid (email)
- File upload handling (multipart/form-data)

**Hosting & Infrastructure**:
- Vercel (hosting & deployment)
- Vercel Edge Network (CDN)
- Vercel SSL (HTTPS)

**Third-Party Services**:
- Google Maps Embed API (map display)
- Email service (Resend/Nodemailer/SendGrid)
- (Phase 2) Google Analytics 4
- (Phase 2) Microsoft Clarity
- (Phase 2) Live chat (Tawk.to/Crisp)
- (Phase 2) Calendly (booking)

**Tools & Development**:
- Git (version control)
- VS Code (IDE)
- ESLint + Prettier (code quality)
- Lighthouse (performance auditing)
- Chrome DevTools (debugging)

### 14.3 URL Structure

```
radexmetal.com/
├── / (homepage - all sections)
│   ├── #hero
│   ├── #o-firmie
│   ├── #oferta
│   ├── #galeria
│   └── #kontakt
├── /polityka-prywatnosci (future)
└── /sitemap.xml (auto-generated)
```

**Note**: MVP is a single-page application (SPA) with anchor links to sections. No separate pages for services/products.

### 14.4 Design References

**Industrial/Metal Design Inspiration**:
- Dark, moody aesthetic
- Metallic textures and gradients
- Bold typography
- High-contrast (dark bg + light text)
- Minimal, clean layouts
- Focus on imagery (welding, steel work, finished products)

**Color Palette** (Hex codes):
- **Black**: #000000
- **Dark Gray**: #1A1A1A, #2D2D2D
- **Steel Gray**: #4A4A4A, #6B6B6B
- **Light Gray/Silver**: #C0C0C0, #E8E8E8
- **White**: #FFFFFF
- **Accent (optional)**: #FF6B35 (orange-red), #D64545 (red)

**Typography**:
- **Headings**: Bebas Neue (free), Oswald, Industry
- **Body**: Roboto, Inter, Open Sans
- **Weights**: Bold (700) for headings, Regular (400) for body, Medium (500) for emphasis

**Icon Library**: 
- Heroicons (for UI icons)
- Lucide Icons (alternative)
- Custom SVG icons for services (welding torch, gate, railing, boat)

### 14.5 File Structure

```
radex-metal/
├── public/
│   ├── images/
│   │   ├── hero-bg.jpg
│   │   ├── about-image.jpg
│   │   ├── services/
│   │   │   ├── balustrady.jpg
│   │   │   ├── bramy.jpg
│   │   │   ├── ogrodzenia.jpg
│   │   │   └── jachty.jpg
│   │   └── gallery/
│   │       ├── project-1.jpg
│   │       ├── project-2.jpg
│   │       └── ... (8-12 images)
│   ├── icons/
│   │   ├── welding.svg
│   │   ├── gate.svg
│   │   ├── railing.svg
│   │   └── boat.svg
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx (root layout)
│   │   ├── page.tsx (homepage)
│   │   ├── globals.css (global styles)
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts (contact form API)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── GallerySection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   └── Lightbox.tsx
│   │   └── animations/
│   │       ├── FadeIn.tsx
│   │       ├── ParallaxSection.tsx
│   │       └── ScrollReveal.tsx
│   ├── lib/
│   │   ├── email.ts (email sending logic)
│   │   ├── validation.ts (form validation)
│   │   └── utils.ts (utility functions)
│   ├── types/
│   │   └── index.ts (TypeScript types)
│   └── constants/
│       ├── content.ts (static content)
│       ├── services.ts (services data)
│       └── gallery.ts (gallery images data)
├── .env.local (environment variables)
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

### 14.6 Environment Variables

```bash
# Email Service (choose one based on service used)

# Option 1: Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Option 2: Nodemailer (Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=radexmetal.com@gmail.com
SMTP_PASSWORD=your_app_password

# Option 3: SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx

# Email Recipient
CONTACT_EMAIL=radexmetal.com@gmail.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://radexmetal.com
NEXT_PUBLIC_SITE_NAME=Radex Metal

# Google Maps (if using API instead of embed)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyxxxxxxxxxxxxx

# (Phase 2) Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxxxxx
```

### 14.7 Testing Checklist

**Functionality**:
- [ ] All navigation links scroll smoothly to sections
- [ ] Contact form validates all fields correctly
- [ ] Contact form sends email successfully
- [ ] File upload accepts JPG, PNG, PDF (max 5MB)
- [ ] File upload rejects invalid types/sizes
- [ ] Gallery images open in lightbox
- [ ] Lightbox navigation (prev/next/close) works
- [ ] Google Maps is embedded and clickable
- [ ] Phone number link opens dialer on mobile
- [ ] All buttons have hover states
- [ ] RODO checkbox is required
- [ ] Form shows success message after submit
- [ ] Form shows error messages for invalid input

**Responsiveness**:
- [ ] Desktop (1920px) - all sections display correctly
- [ ] Laptop (1366px) - no horizontal scroll
- [ ] Tablet landscape (1024px) - grid adjusts properly
- [ ] Tablet portrait (768px) - columns stack
- [ ] Mobile (375px) - hamburger menu works
- [ ] iPhone 12/13/14 - touch targets are adequate
- [ ] Android phones - forms are usable
- [ ] Images scale proportionally on all devices

**Performance**:
- [ ] Lighthouse Performance score > 90
- [ ] Page load time < 3 seconds
- [ ] Images are optimized (WebP + fallback)
- [ ] Lazy loading works for gallery
- [ ] No console errors
- [ ] No broken images/links

**Accessibility**:
- [ ] Lighthouse Accessibility score > 90
- [ ] All images have alt text
- [ ] Focus indicators visible on keyboard navigation
- [ ] Tab order is logical
- [ ] Form labels are associated with inputs
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader can navigate page

**SEO**:
- [ ] Lighthouse SEO score > 90
- [ ] Meta title and description present
- [ ] H1 tag present and unique
- [ ] Heading hierarchy is logical
- [ ] Sitemap.xml is accessible
- [ ] Robots.txt allows indexing
- [ ] Structured data (LocalBusiness) is implemented
- [ ] Canonical URL is set

**Cross-Browser**:
- [ ] Chrome (latest) - all features work
- [ ] Firefox (latest) - all features work
- [ ] Safari (latest) - all features work
- [ ] Edge (latest) - all features work
- [ ] Mobile Safari (iOS 15+) - all features work
- [ ] Android Chrome - all features work

**Security**:
- [ ] HTTPS is enforced
- [ ] Form has CSRF protection
- [ ] File upload validates types/sizes
- [ ] Email content is sanitized
- [ ] No sensitive data in client-side code
- [ ] Rate limiting on contact form works

### 14.8 Deployment Checklist

**Pre-Deployment**:
- [ ] All content finalized and proofread
- [ ] Gallery images collected and optimized
- [ ] Environment variables configured
- [ ] Email service tested (send test email)
- [ ] All tests passed (functionality, performance, accessibility)
- [ ] Code reviewed and cleaned
- [ ] Git repository up to date
- [ ] Documentation complete

**Vercel Setup**:
- [ ] Vercel account created/logged in
- [ ] New project created
- [ ] Git repository connected
- [ ] Build settings configured (Next.js)
- [ ] Environment variables added to Vercel
- [ ] Custom domain (radexmetal.com) added
- [ ] DNS records updated (A, CNAME)
- [ ] SSL certificate provisioned

**Post-Deployment**:
- [ ] Site is live at radexmetal.com
- [ ] HTTPS works (no mixed content warnings)
- [ ] All pages load correctly
- [ ] Contact form sends emails successfully
- [ ] Google Maps displays correctly
- [ ] Images load properly
- [ ] Analytics (if Phase 2) tracking correctly
- [ ] Mobile responsiveness verified on real devices
- [ ] Cross-browser testing completed
- [ ] Performance monitoring set up (Vercel Analytics)

**Monitoring & Maintenance**:
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Monitor Vercel dashboard for errors
- [ ] Check email inbox regularly for form submissions
- [ ] Review analytics weekly (Phase 2)
- [ ] Update content as needed
- [ ] Address any reported bugs/issues

### 14.9 Success Metrics (Post-Launch)

**Week 1-4 After Launch**:
- **Traffic**: Baseline establishment
  - Monitor daily visitors
  - Track traffic sources (direct, Google, referral)
  - Mobile vs desktop ratio
- **Engagement**:
  - Average session duration (target: > 2 minutes)
  - Bounce rate (target: < 60%)
  - Pages per session (target: > 2)
- **Conversions**:
  - Form submissions per week (baseline)
  - Form completion rate (target: > 30%)
  - Phone calls (if trackable)

**Month 2-3 After Launch**:
- **Growth**:
  - 20-30% increase in organic traffic
  - 5-10 form submissions per month
  - Reduced bounce rate by 10%
- **User Behavior**:
  - Identify most popular services
  - Track gallery engagement
  - Monitor form abandonment rate
- **Business Impact**:
  - Track quotes to conversions (offline)
  - Client feedback on new site
  - Competitor comparison

**Ongoing (Month 4+)**:
- **Optimization**:
  - A/B test CTA buttons (Phase 2)
  - Refine form fields based on feedback
  - Add/remove gallery images based on popularity
  - Content updates based on client needs
- **Expansion**:
  - Evaluate Phase 2 features priority
  - Consider adding testimonials
  - Explore blog/news section
  - Implement advanced analytics

---

## Document Version Control

- **Version**: 1.0
- **Date**: 2025-01-11
- **Author**: PRD Creator AI (Claude)
- **Stakeholder**: Bangla / Radex Metal
- **Status**: Final - Ready for Development
- **Next Review**: After MVP Launch

---

## Approval & Sign-Off

**Reviewed by**: _____________________ (Bangla)  
**Date**: _____________________  
**Approved for Development**: ☐ Yes  ☐ No (specify changes needed)

---

**End of Product Requirements Document**

*This PRD is a living document and may be updated as requirements evolve or new information becomes available.*