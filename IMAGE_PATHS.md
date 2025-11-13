# Image Paths Reference for Radex Metal Website

Quick reference for using images in React/Next.js components.

---

## 📁 Directory Structure

```
public/images/
├── hero/
│   ├── hero-bg.jpg          # 1920x1080 - Hero background
│   ├── hero-bg.webp         # WebP version
│   ├── workshop.jpg         # 1200x800 - About section
│   └── workshop.webp        # WebP version
├── services/
│   ├── balustrady.jpg       # 800x600 - Railings service
│   ├── balustrady.webp
│   ├── bramy.jpg            # 800x600 - Gates service
│   ├── bramy.webp
│   ├── ogrodzenia.jpg       # 800x600 - Fences service
│   ├── ogrodzenia.webp
│   ├── jachty.jpg           # 800x600 - Yacht fittings
│   └── jachty.webp
└── gallery/
    ├── project-01.jpg       # 1200x900 - Gallery images
    ├── project-01.webp
    ├── project-02.jpg
    ├── project-02.webp
    └── ... (12 images total)
```

---

## 🖼️ Usage in Components

### Next.js Image Component (Recommended)

```typescript
import Image from 'next/image';

// Hero Background
<Image
  src="/images/hero/hero-bg.jpg"
  alt="Spawanie metalu - Radex Metal"
  width={1920}
  height={1080}
  priority  // For above-fold images
  placeholder="blur"
  blurDataURL="/images/hero/hero-bg-blur.jpg"  // Optional
/>

// About Section
<Image
  src="/images/hero/workshop.jpg"
  alt="Warsztat metalowy Radex Metal"
  width={1200}
  height={800}
  loading="lazy"  // For below-fold images
/>
```

### Service Images

```typescript
// In constants/services.ts or component
const services = [
  {
    id: 'balustrady',
    title: 'Balustrady Radex Metal',
    image: '/images/services/balustrady.jpg',
    // ...
  },
  {
    id: 'bramy',
    title: 'Bramy Radex Metal',
    image: '/images/services/bramy.jpg',
    // ...
  },
  {
    id: 'ogrodzenia',
    title: 'Ogrodzenia Radex Metal',
    image: '/images/services/ogrodzenia.jpg',
    // ...
  },
  {
    id: 'jachty',
    title: 'Jachty Motorowe',
    image: '/images/services/jachty.jpg',
    // ...
  }
];
```

### Gallery Images

```typescript
// In constants/gallery.ts
const galleryImages = [
  {
    id: 'project-1',
    src: '/images/gallery/project-01.jpg',
    alt: 'Nowoczesna brama przesuwna ze stali',
    category: 'bramy',
    width: 1200,
    height: 900
  },
  {
    id: 'project-2',
    src: '/images/gallery/project-02.jpg',
    alt: 'Balustrada balkonowa stal nierdzewna',
    category: 'balustrady',
    width: 1200,
    height: 900
  },
  // ... 10 more images
];
```

---

## 🎨 Background Images (CSS)

### Hero Section with Parallax

```tsx
// HeroSection.tsx
<div
  className="relative h-screen bg-cover bg-center bg-fixed"
  style={{ backgroundImage: 'url(/images/hero/hero-bg.jpg)' }}
>
  {/* Or use Next.js Image as background */}
  <Image
    src="/images/hero/hero-bg.jpg"
    alt=""
    fill
    className="object-cover"
    priority
  />
</div>
```

### Service Cards

```tsx
// ServiceCard.tsx
<div className="relative h-64 overflow-hidden">
  <Image
    src={service.image}
    alt={service.title}
    fill
    className="object-cover hover:scale-110 transition-transform duration-300"
  />
  <div className="absolute inset-0 bg-black/70 hover:bg-black/50 transition" />
  <div className="relative z-10 p-6">
    <h3>{service.title}</h3>
    <p>{service.description}</p>
  </div>
</div>
```

---

## 📱 Responsive Images

### Using Next.js Image with Sizes

```typescript
<Image
  src="/images/hero/hero-bg.jpg"
  alt="Hero image"
  width={1920}
  height={1080}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1920px"
  priority
/>
```

### Picture Element for WebP

```tsx
<picture>
  <source srcSet="/images/hero/hero-bg.webp" type="image/webp" />
  <source srcSet="/images/hero/hero-bg.jpg" type="image/jpeg" />
  <img
    src="/images/hero/hero-bg.jpg"
    alt="Radex Metal - Spawanie"
    width={1920}
    height={1080}
  />
</picture>
```

---

## 🔧 Image Optimization

### next.config.js Configuration

```javascript
// next.config.js
module.exports = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      // If using external images in the future
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};
```

---

## ✅ Alt Text Guidelines

### Polish Alt Text Examples

```typescript
// Hero
alt="Spawanie metalu - iskry podczas pracy TIG"

// About
alt="Warsztat metalowy Radex Metal - obróbka stali"

// Services
alt="Balustrada balkonowa ze stali nierdzewnej"
alt="Brama przesuwna nowoczesna"
alt="Ogrodzenie metalowe z blachą"
alt="Okucia jachtowe ze stali nierdzewnej"

// Gallery
alt="Realizacja - brama przesuwna 4m szerokości"
alt="Projekt - balustrada schodowa z montażem szyb"
```

---

## 📊 Performance Tips

### 1. Priority Loading
```typescript
// Above the fold - use priority
<Image src="/images/hero/hero-bg.jpg" priority />

// Below the fold - use lazy
<Image src="/images/gallery/project-01.jpg" loading="lazy" />
```

### 2. Blur Placeholder
```typescript
// Generate blur data URL (use sharp or online tool)
<Image
  src="/images/hero/hero-bg.jpg"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
/>
```

### 3. WebP Conversion
```bash
# Convert all JPG to WebP
cd public/images
find . -name "*.jpg" -exec sh -c 'cwebp -q 85 "$1" -o "${1%.jpg}.webp"' _ {} \;
```

---

## 🎯 Complete Example: HeroSection Component

```typescript
// components/sections/HeroSection.tsx
import Image from 'next/image';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt="Spawanie metalu - Radex Metal Pomorskie Centrum Spawalnicze"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-white"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Radex Metal
          </h1>
          <p className="text-2xl md:text-3xl mb-4">
            Stal nierdzewna TIG i Stal węglowa MIG
          </p>
          <p className="text-xl mb-8">
            41 lat doświadczenia | Pomorskie Centrum Spawalnicze
          </p>

          <div className="flex gap-4">
            <button className="btn-primary">Zobacz Ofertę</button>
            <button className="btn-secondary">Skontaktuj się</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 🔄 Update Checklist

Before deploying:

- [ ] All images downloaded to correct paths
- [ ] WebP versions created
- [ ] Alt text in Polish for all images
- [ ] Image dimensions correct
- [ ] No broken image references
- [ ] Priority set for hero image
- [ ] Lazy loading for below-fold images
- [ ] Images optimized (< 300KB each)
- [ ] Tested on mobile, tablet, desktop

---

**Last Updated:** 2025-11-13
**Next Step:** Download images using `./download-images.sh`
