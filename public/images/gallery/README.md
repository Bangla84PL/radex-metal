# Gallery Images

This folder contains gallery images for the Radex Metal website.

## Required Images

According to `constants/gallery.ts`, the following images are needed:

### Images List (8 total)

1. **project-1.jpg** - Nowoczesna brama przesuwna ze stali węglowej (Category: bramy)
2. **project-2.jpg** - Balustrada balkonowa ze stali nierdzewnej (Category: balustrady)
3. **project-3.jpg** - Ogrodzenie metalowe z wypełnieniem drewnianym (Category: ogrodzenia)
4. **project-4.jpg** - Okucia ze stali nierdzewnej dla jachtu motorowego (Category: jachty)
5. **project-5.jpg** - Brama uchylna dwuskrzydłowa (Category: bramy)
6. **project-6.jpg** - Balustrada schodowa nowoczesna (Category: balustrady)
7. **project-7.jpg** - System ogrodzeniowy kompletny (Category: ogrodzenia)
8. **project-8.jpg** - Balustrady i uchwyty jachtowe (Category: jachty)

## Image Specifications

- **Format**: JPG or WebP (Next.js will auto-optimize)
- **Recommended Size**: 800x600px minimum (will be responsive)
- **Aspect Ratio**: Square (1:1) preferred for grid layout
- **File Size**: Aim for <500KB per image (will be optimized during build)
- **Quality**: High quality to showcase craftsmanship

## Sources

Images should be sourced from:
1. Radex Metal's existing project portfolio
2. Facebook page photos
3. High-quality photos taken specifically for the website

## Temporary Placeholders

For development, you can use placeholder images from:
- https://placeholder.com/
- https://picsum.photos/

Example: `https://picsum.photos/800/800?random=1`

## Next.js Image Optimization

Next.js automatically optimizes images:
- Converts to WebP/AVIF
- Generates responsive sizes
- Lazy loads below-fold images
- Prevents Cumulative Layout Shift (CLS)

No manual optimization needed before upload (but smaller source files are better).
