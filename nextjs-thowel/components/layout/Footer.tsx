'use client';

import { motion } from 'framer-motion';

const hexagons = [
  { left: '5%', top: '20%', size: 60, opacity: 0.1 },
  { left: '15%', top: '60%', size: 80, opacity: 0.15 },
  { left: '25%', top: '30%', size: 50, opacity: 0.08 },
  { left: '70%', top: '45%', size: 70, opacity: 0.12 },
  { left: '85%', top: '25%', size: 65, opacity: 0.1 },
  { left: '90%', top: '70%', size: 55, opacity: 0.09 },
];

const Hexagon = ({ size, className }: { size: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
    fill="currentColor"
  >
    <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-red-brand text-white overflow-hidden py-6 md:py-8">
      {/* Decorative Hexagons */}
      {hexagons.map((hex, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none"
          style={{
            left: hex.left,
            top: hex.top,
            opacity: hex.opacity,
          }}
          initial={{ scale: 0, rotate: 0 }}
          whileInView={{ scale: 1, rotate: 360 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.5,
            delay: index * 0.1,
            ease: 'easeOut',
          }}
        >
          <Hexagon size={hex.size} className="text-white" />
        </motion.div>
      ))}

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm md:text-base"
        >
          © {currentYear} Thowel. Todos los derechos reservados.
        </motion.p>
      </div>
    </footer>
  );
}
