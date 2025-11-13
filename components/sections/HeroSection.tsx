'use client';

import { motion } from 'framer-motion';
import { HERO_CONTENT } from '@/constants/content';
import { scrollToElement } from '@/lib/utils';
import { Magnetic } from '@/components/animations/Magnetic';
import { ShimmerButton } from '@/components/animations/ShimmerButton';
import { TextReveal } from '@/components/animations/TextReveal';
import { ParallaxScroll } from '@/components/animations/ParallaxScroll';

export function HeroSection() {
  const handleScrollTo = (sectionId: string) => {
    scrollToElement(sectionId);
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary-black"
    >
      {/* Background Image with Parallax Effect */}
      <ParallaxScroll speed={30} direction="down" className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{
            backgroundImage: `url(${HERO_CONTENT.backgroundImage})`,
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
      </ParallaxScroll>

      {/* Content */}
      <div className="relative z-10 container-padding max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Main Title with Text Reveal */}
          <TextReveal
            text={HERO_CONTENT.title}
            as="h1"
            className="font-bebas text-6xl text-text-white sm:text-7xl md:text-8xl lg:text-9xl leading-tight"
          />

          {/* Subtitle with Tagline and Shine Effect */}
          <motion.p
            className="mt-4 text-lg text-metallic-lightSilver sm:text-xl md:mt-6 md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-metallic-silver via-text-white to-metallic-silver bg-[length:200%_auto] animate-shimmer"
            style={{
              backgroundImage: 'linear-gradient(90deg, #C0C0C0 0%, #FFFFFF 50%, #C0C0C0 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            Stal nierdzewna TIG i Stal węglowa MIG
          </motion.p>

          {/* Experience Badge */}
          <motion.p
            className="mt-4 text-base text-steel-gray sm:text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {HERO_CONTENT.subtitle}
          </motion.p>

          {/* CTA Buttons with Magnetic Effect */}
          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {/* Primary CTA with Shimmer */}
            <Magnetic strength={0.15}>
              <ShimmerButton
                onClick={() => handleScrollTo('oferta')}
                className="rounded-md bg-accent-orange px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-accent-orange/50 transition-shadow duration-300 hover:shadow-xl hover:shadow-accent-orange/70"
              >
                {HERO_CONTENT.ctaPrimary}
              </ShimmerButton>
            </Magnetic>

            {/* Secondary CTA with Magnetic Effect */}
            <Magnetic strength={0.15}>
              <motion.button
                onClick={() => handleScrollTo('kontakt')}
                className="group relative overflow-hidden rounded-md border-2 border-metallic-silver px-8 py-4 text-lg font-semibold text-metallic-silver transition-all duration-300 hover:border-text-white hover:bg-text-white hover:text-primary-black"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{HERO_CONTENT.ctaSecondary}</span>
                {/* Metallic shine on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
              </motion.button>
            </Magnetic>
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
