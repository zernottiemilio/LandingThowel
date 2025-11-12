'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  onClick?: () => void;
  className?: string;
}

export default function ScrollIndicator({ onClick, className = '' }: ScrollIndicatorProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`cursor-pointer ${className}`}
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
        width={50}
        height={50}
        className="w-10 h-10 md:w-12 md:h-12 opacity-80 hover:opacity-100 transition-opacity"
      />
    </motion.button>
  );
}
