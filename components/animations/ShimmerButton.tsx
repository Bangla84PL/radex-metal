'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface ShimmerButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ShimmerButton({ children, className = '', onClick }: ShimmerButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          translateX: isHovered ? ['0%', '200%'] : '-100%',
        }}
        transition={{
          duration: 0.6,
          ease: 'easeInOut',
          repeat: isHovered ? Infinity : 0,
          repeatDelay: 0.5,
        }}
      />

      {/* Metallic glow effect */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-metallic-silver/10 to-transparent blur-xl" />
      </div>

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
