'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { GALLERY_IMAGES } from '@/constants/gallery';
import { Lightbox } from '@/components/ui/Lightbox';
import { TextReveal } from '@/components/animations/TextReveal';
import { Magnetic } from '@/components/animations/Magnetic';

export function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
    );
  };

  return (
    <>
      <section id="galeria" ref={ref} className="section-padding bg-primary-darkGray">
        <div className="container-padding mx-auto max-w-7xl">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center md:mb-16"
          >
            <TextReveal
              text="Nasze Realizacje"
              as="h2"
              className="font-bebas text-4xl text-text-white sm:text-5xl md:text-6xl"
            />
            <p className="mt-4 text-lg text-steel-gray md:text-xl">
              Zobacz przykłady naszych prac
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {GALLERY_IMAGES.map((image, index) => (
              <Magnetic key={image.id} strength={0.15}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => openLightbox(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                {/* Image */}
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Hover Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {/* Magnifying Glass Icon */}
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent-orange/90 backdrop-blur-sm">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  {/* Image Title */}
                  <p className="text-center text-sm font-medium text-white">
                    {image.alt}
                  </p>
                </div>

                {/* Metallic Shimmer on Hover */}
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-metallic-silver/20 to-transparent"
                       style={{
                         backgroundSize: '200% 100%',
                         animation: 'shimmer 2s infinite'
                       }}
                  />
                </motion.div>

                {/* Border on Hover */}
                <div className="absolute inset-0 border-2 border-transparent transition-colors duration-300 group-hover:border-accent-orange/50" />
                </motion.div>
              </Magnetic>
            ))}
          </div>

          {/* View More Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-steel-gray">
              Kliknij na zdjęcie, aby je powiększyć
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={GALLERY_IMAGES}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={goToNext}
        onPrevious={goToPrevious}
      />
    </>
  );
}
