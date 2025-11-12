'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProductCardProps {
  title: string;
  image: string;
  href: string;
  className?: string;
}

export default function ProductCard({ title, image, href, className = '' }: ProductCardProps) {
  return (
    <Link href={href} className={`group block ${className}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-2xl border-2 border-gray-medium hover:border-blue-accent transition-all duration-300 shadow-md hover:shadow-xl"
      >
        {/* Image Container */}
        <div className="relative aspect-square bg-gray-light">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-accent/90 via-blue-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-white font-bold text-base md:text-lg text-center">
                {title}
              </h3>
            </div>
          </div>
        </div>

        {/* Title (visible by default on mobile, hidden on hover on desktop) */}
        <div className="p-3 md:p-4 bg-white group-hover:bg-blue-accent transition-colors duration-300">
          <h3 className="text-gray-800 group-hover:text-white font-medium text-sm md:text-base text-center transition-colors duration-300">
            {title}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
}
