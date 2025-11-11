'use client';

import { motion } from 'framer-motion';
import { HERO_CONTENT } from '@/constants/content';
import { scrollToElement } from '@/lib/utils';

export function HeroSection() {
  const handleScrollTo = (sectionId: string) => {
    scrollToElement(sectionId);
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary-black"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${HERO_CONTENT.backgroundImage})`,
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-padding max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Main Title */}
          <h1 className="font-bebas text-6xl text-text-white sm:text-7xl md:text-8xl lg:text-9xl">
            {HERO_CONTENT.title}
          </h1>

          {/* Subtitle with Tagline */}
          <p className="mt-4 text-lg text-metallic-lightSilver sm:text-xl md:mt-6 md:text-2xl">
            Stal nierdzewna TIG i Stal węglowa MIG
          </p>

          {/* Experience Badge */}
          <motion.p
            className="mt-4 text-base text-steel-gray sm:text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {HERO_CONTENT.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {/* Primary CTA */}
            <button
              onClick={() => handleScrollTo('oferta')}
              className="group relative overflow-hidden rounded-md bg-accent-orange px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-orange/50"
            >
              <span className="relative z-10">{HERO_CONTENT.ctaPrimary}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-orange to-accent-red opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => handleScrollTo('kontakt')}
              className="group rounded-md border-2 border-metallic-silver px-8 py-4 text-lg font-semibold text-metallic-silver transition-all duration-300 hover:scale-105 hover:border-text-white hover:bg-text-white hover:text-primary-black"
            >
              {HERO_CONTENT.ctaSecondary}
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="mt-16 flex justify-center md:mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="flex flex-col items-center gap-2 text-steel-gray">
              <span className="text-sm uppercase tracking-wider">Przewiń w dół</span>
              <motion.svg
                className="h-6 w-6"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </motion.svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
