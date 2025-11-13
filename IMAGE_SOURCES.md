# Free Placeholder Images for Radex Metal Website

This document provides curated free image sources for the Radex Metal website.

---

## 📸 Image Requirements

### 1. Hero Background (1920x1080px)
**Location:** `public/images/hero/hero-bg.jpg`
**Theme:** Welding, steel work, industrial scene with sparks
**Recommended Sources:**
- [Unsplash - Welding](https://unsplash.com/s/photos/welding)
- [Pexels - Industrial Welding](https://www.pexels.com/search/welding/)
- [Pixabay - Metalwork](https://pixabay.com/images/search/metalwork/)

**Direct Image Suggestions:**
```
https://unsplash.com/photos/person-using-welding-machine-N5B2sKJVZCA
https://unsplash.com/photos/person-welding-gray-metal-S_eu4NqJt5Y
https://unsplash.com/photos/person-in-black-jacket-and-black-pants-sitting-on-black-and-yellow-floor-polisher-PypjzKTUqLo
```

---

### 2. About Section (1200x800px)
**Location:** `public/images/hero/workshop.jpg`
**Theme:** Workshop, metalwork facility, craftsmen at work
**Recommended Sources:**
- [Unsplash - Workshop](https://unsplash.com/s/photos/metal-workshop)
- [Pexels - Metal Workshop](https://www.pexels.com/search/metal%20workshop/)

**Direct Image Suggestions:**
```
https://unsplash.com/photos/a-factory-filled-with-lots-of-metal-objects-iUBgeNeyVq4
https://unsplash.com/photos/assorted-handheld-tools-in-tool-rack-lRoX0shwjUQ
```

---

### 3. Service Images (800x600px each)

#### Balustrady (Railings)
**Location:** `public/images/services/balustrady.jpg`
**Theme:** Stainless steel railings, balcony railings, staircase railings
**Sources:**
```
https://unsplash.com/s/photos/metal-railing
https://www.pexels.com/search/metal%20railing/
```

**Suggested Images:**
- Modern stainless steel balcony railing
- Spiral staircase with metal railing
- Glass-mounted railing system

#### Bramy (Gates)
**Location:** `public/images/services/bramy.jpg`
**Theme:** Metal gates, sliding gates, entrance gates
**Sources:**
```
https://unsplash.com/s/photos/metal-gate
https://www.pexels.com/search/metal%20gate/
```

**Suggested Images:**
- Modern sliding gate
- Ornamental iron gate
- Industrial entrance gate

#### Ogrodzenia (Fences)
**Location:** `public/images/services/ogrodzenia.jpg`
**Theme:** Metal fences, decorative fencing, perimeter fencing
**Sources:**
```
https://unsplash.com/s/photos/metal-fence
https://www.pexels.com/search/metal%20fence/
```

**Suggested Images:**
- Modern metal panel fence
- Wrought iron decorative fence
- Steel security fencing

#### Jachty (Yacht Fittings)
**Location:** `public/images/services/jachty.jpg`
**Theme:** Marine hardware, stainless steel yacht fittings, boat railings
**Sources:**
```
https://unsplash.com/s/photos/yacht-hardware
https://unsplash.com/s/photos/boat-railing
https://www.pexels.com/search/yacht/
```

**Suggested Images:**
- Stainless steel yacht railing
- Marine hardware and fittings
- Boat deck with metal fixtures

---

### 4. Gallery Images (1200x900px, 12 images)
**Location:** `public/images/gallery/project-{01-12}.jpg`
**Theme:** Mix of completed projects - gates, railings, fences, yacht fittings

**Recommended Distribution:**
- 3 images: Gates (modern, traditional, industrial)
- 3 images: Railings (balcony, staircase, glass-mounted)
- 3 images: Fences (decorative, security, residential)
- 3 images: Yacht fittings (railings, hardware, deck furniture)

**Curated Gallery Sources:**

**Gates:**
```
https://unsplash.com/s/photos/modern-gate
https://unsplash.com/s/photos/entrance-gate
https://unsplash.com/s/photos/industrial-gate
```

**Railings:**
```
https://unsplash.com/s/photos/balcony-railing
https://unsplash.com/s/photos/staircase-railing
https://unsplash.com/s/photos/glass-railing
```

**Fences:**
```
https://unsplash.com/s/photos/metal-fence
https://unsplash.com/s/photos/decorative-fence
https://unsplash.com/s/photos/security-fence
```

**Yacht/Marine:**
```
https://unsplash.com/s/photos/yacht-deck
https://unsplash.com/s/photos/boat-railing
https://unsplash.com/s/photos/marine-hardware
```

---

## 🎨 Free Stock Photo Platforms

### Unsplash
- **URL:** https://unsplash.com
- **License:** Free for commercial use, no attribution required
- **Quality:** Very high (professional photography)
- **Best For:** Hero images, gallery showcase

### Pexels
- **URL:** https://www.pexels.com
- **License:** Free for commercial use, attribution appreciated
- **Quality:** High (curated collection)
- **Best For:** Service images, gallery variety

### Pixabay
- **URL:** https://pixabay.com
- **License:** Free for commercial use under Pixabay License
- **Quality:** Good to high
- **Best For:** Supplemental images, backgrounds

### Vecteezy
- **URL:** https://www.vecteezy.com
- **License:** Free with attribution, Premium without
- **Quality:** High (vectors and photos)
- **Best For:** Icons, decorative elements

---

## 📥 How to Download Images

### Manual Download
1. Visit the recommended sources above
2. Search for keywords (welding, metal gate, railing, etc.)
3. Download high-resolution versions (min 1920px width for hero)
4. Save to appropriate directories

### Using the Download Script
We've created a helper script to download placeholder images:

```bash
# Run the download script (see download-images.sh)
chmod +x download-images.sh
./download-images.sh
```

---

## 🖼️ Image Optimization

After downloading, optimize images for web:

### Using ImageMagick (Recommended)
```bash
# Install ImageMagick
brew install imagemagick  # macOS
sudo apt install imagemagick  # Linux

# Convert to WebP (better compression)
cd public/images/hero
convert hero-bg.jpg -quality 85 -resize 1920x1080^ -gravity center -extent 1920x1080 hero-bg.webp

# Optimize JPG
convert hero-bg.jpg -quality 85 -strip -interlace Plane hero-bg-optimized.jpg
```

### Using Online Tools
- **TinyPNG:** https://tinypng.com (PNG/JPG compression)
- **Squoosh:** https://squoosh.app (Modern format conversion)
- **Compressor.io:** https://compressor.io (Drag & drop optimization)

---

## 🎯 Image Specifications

| Location | Dimensions | Format | Max Size | Purpose |
|----------|------------|--------|----------|---------|
| Hero Background | 1920x1080 | WebP/JPG | 300KB | Full-viewport hero image |
| About Image | 1200x800 | WebP/JPG | 200KB | About section visual |
| Service Images (4) | 800x600 | WebP/JPG | 150KB each | Service card backgrounds |
| Gallery Images (12) | 1200x900 | WebP/JPG | 200KB each | Project showcase |

---

## ✅ Checklist

Before deploying, ensure:

- [ ] All images downloaded and placed in correct directories
- [ ] Images optimized for web (< 300KB each)
- [ ] WebP versions created with JPG fallbacks
- [ ] Alt text descriptive and in Polish
- [ ] Images match industrial/metallic theme
- [ ] Aspect ratios correct (no distortion)
- [ ] Copyright-free or properly licensed

---

## 📝 Alternative: AI-Generated Placeholders

If you prefer AI-generated industrial imagery:

### Midjourney
- Prompt: "industrial metal welding workshop, sparks flying, dark moody lighting, professional photography --ar 16:9"

### DALL-E 3 (via ChatGPT Plus)
- Prompt: "Professional photograph of metal welding work, industrial steel fabrication, dramatic lighting with welding sparks"

### Stable Diffusion (Free)
- Use prompts similar to above on platforms like:
  - DreamStudio (https://beta.dreamstudio.ai)
  - Lexica (https://lexica.art)

---

## 📧 Contact

If you need help finding specific images or have questions:
- Email: radexmetal.com@gmail.com
- Phone: 600 656 747

---

**Last Updated:** 2025-11-13
**Next Step:** Run `./download-images.sh` to automatically download placeholder images
