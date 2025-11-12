'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface TechBadgeProps {
  type: 'smooth' | 'touch' | 'standard';
  size?: number;
  className?: string;
}

const techImages = {
  smooth: '/assets/S.png',
  touch: '/assets/T.png',
  standard: '/assets/E.png',
};

const techLabels = {
  smooth: 'Smooth Technology',
  touch: 'Touch Technology',
  standard: 'Standard Technology',
};

export default function TechBadge({ type, size = 80, className = '' }: TechBadgeProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className={`inline-block ${className}`}
      title={techLabels[type]}
    >
      <Image
        src={techImages[type]}
        alt={techLabels[type]}
        width={size}
        height={size}
        className="drop-shadow-lg"
      />
    </motion.div>
  );
}
