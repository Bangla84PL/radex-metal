'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { SERVICES } from '@/constants/services';
import { TiltCard } from '@/components/animations/TiltCard';
import { TextReveal } from '@/components/animations/TextReveal';

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="oferta" ref={ref} className="section-padding bg-primary-black">
      <div className="container-padding mx-auto max-w-7xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <TextReveal
            text="Nasza Oferta"
            as="h2"
            className="font-bebas text-4xl text-text-white sm:text-5xl md:text-6xl"
          />
          <p className="mt-4 text-lg text-steel-gray md:text-xl">
            Profesjonalne usługi spawalnicze i obróbka metalu
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {SERVICES.sort((a, b) => a.order - b.order).map((service, index) => (
            <TiltCard key={service.id} tiltAmount={10} className="group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg"
              >
              {/* Background Image */}
              <div className="absolute inset-0">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${service.image})`,
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/70" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex min-h-[400px] flex-col justify-end p-6 md:p-8">
                {/* Icon Placeholder - Will be replaced with actual icons */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-orange/20 backdrop-blur-sm">
                  <div className="h-6 w-6 rounded-full bg-accent-orange" />
                </div>

                {/* Title */}
                <h3 className="font-bebas text-3xl text-text-white transition-colors duration-300 group-hover:text-accent-orange md:text-4xl">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-base text-text-lightGray md:text-lg">
                  {service.description}
                </p>

                {/* Details List */}
                <ul className="mt-4 space-y-2">
                  {service.details.slice(0, 3).map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-metallic-silver"
                    >
                      <svg
                        className="mt-1 h-4 w-4 flex-shrink-0 text-accent-orange"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Border Effect on Hover */}
              <div className="absolute inset-0 border-2 border-transparent transition-colors duration-300 group-hover:border-accent-orange/50" />
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
