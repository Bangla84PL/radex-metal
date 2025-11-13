'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ABOUT_CONTENT } from '@/constants/content';
import { TextReveal } from '@/components/animations/TextReveal';
import { Magnetic } from '@/components/animations/Magnetic';
import { ParallaxScroll } from '@/components/animations/ParallaxScroll';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="o-firmie"
      ref={ref}
      className="section-padding bg-primary-darkGray"
    >
      <div className="container-padding mx-auto max-w-7xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <TextReveal
            text={ABOUT_CONTENT.title}
            as="h2"
            className="font-bebas text-4xl text-text-white sm:text-5xl md:text-6xl"
          />
        </motion.div>

        {/* Content Grid */}
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-4 text-text-lightGray">
              {ABOUT_CONTENT.content.split('\n\n').map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="text-base leading-relaxed md:text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Stats */}
          <ParallaxScroll speed={20} direction="up" className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full"
            >
              <div className="grid w-full gap-8 sm:grid-cols-2">
                {ABOUT_CONTENT.stats.map((stat, index) => (
                  <Magnetic key={index} strength={0.2}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={
                        isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
                      }
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      className="group relative overflow-hidden rounded-lg border-2 border-steel-gray bg-primary-medGray p-8 text-center transition-all duration-300 hover:border-metallic-silver hover:shadow-lg hover:shadow-metallic-silver/20"
                    >
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-steel-gray/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative z-10">
                    {/* Stat Value */}
                    <motion.div
                      className="font-bebas text-6xl text-accent-orange md:text-7xl"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                    >
                      {stat.value}
                    </motion.div>

                    {/* Stat Label */}
                    <p className="mt-2 text-lg font-medium text-metallic-lightSilver">
                      {stat.label}
                    </p>
                  </div>
                    </motion.div>
                  </Magnetic>
                ))}
              </div>
            </motion.div>
          </ParallaxScroll>
        </div>
      </div>
    </section>
  );
}
