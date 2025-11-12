'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  backgroundImage: string;
  children?: ReactNode;
  showScrollIndicator?: boolean;
  minHeight?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

export default function HeroSection({
  backgroundImage,
  children,
  showScrollIndicator = false,
  minHeight = '100vh',
  overlay = true,
  overlayOpacity = 0.3,
}: HeroSectionProps) {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ minHeight }}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {overlay && (
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-7xl mx-auto"
        >
          {children}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <motion.button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 1,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.5,
          }}
          aria-label="Scroll down"
        >
          <Image
            src="/assets/FLECHAINICIO.png"
            alt="Scroll down"
            width={40}
            height={40}
            className="w-10 h-10 md:w-12 md:h-12 opacity-80 hover:opacity-100 transition-opacity"
          />
        </motion.button>
      )}
    </section>
  );
}
