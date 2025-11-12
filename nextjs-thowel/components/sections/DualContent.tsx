'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';

interface DualContentProps {
  leftContent: ReactNode;
  rightContent: ReactNode;
  reverse?: boolean;
  className?: string;
  animate?: boolean;
}

export default function DualContent({
  leftContent,
  rightContent,
  reverse = false,
  className = '',
  animate = true,
}: DualContentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [animate]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className={`w-full py-12 md:py-16 lg:py-20 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
            reverse ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Left Content */}
          <motion.div
            variants={itemVariants}
            className={reverse ? 'lg:order-2' : ''}
          >
            {leftContent}
          </motion.div>

          {/* Right Content */}
          <motion.div
            variants={itemVariants}
            className={reverse ? 'lg:order-1' : ''}
          >
            {rightContent}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
