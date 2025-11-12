'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ShowcaseSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  backgroundImage: string;
  badge: string;
}

const sections: ShowcaseSection[] = [
  {
    id: 'smooth',
    title: 'SMOOTH',
    subtitle: 'Cierre Suave',
    description:
      'Tecnología de amortiguación que garantiza un cierre suave y silencioso. Perfecta para aplicaciones premium que requieren el máximo confort.',
    image: '/assets/TecnologiaSmooth.png',
    backgroundImage: '/assets/FondoSmooth.png',
    badge: '/assets/S.png',
  },
  {
    id: 'touch',
    title: 'TOUCH',
    subtitle: 'Apertura por Presión',
    description:
      'Sistema Push to Open que permite abrir cajones y puertas con un simple toque. Ideal para diseños modernos y minimalistas sin tiradores.',
    image: '/assets/touch.png',
    backgroundImage: '/assets/FondoTouch.png',
    badge: '/assets/T.png',
  },
  {
    id: 'standard',
    title: 'ESTÁNDAR',
    subtitle: 'Calidad Confiable',
    description:
      'Herrajes tradicionales de alta calidad con excelente relación precio-rendimiento. Soluciones duraderas para todo tipo de proyectos.',
    image: '/assets/bisagra.png',
    backgroundImage: '/assets/FondoEstandar.png',
    badge: '/assets/E.png',
  },
];

export default function ProductShowcase() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || isScrolling) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height / sections.length;
      const scrollProgress = -rect.top;

      // Calculate which section should be active based on scroll position
      const newActiveSection = Math.min(
        Math.max(0, Math.floor(scrollProgress / sectionHeight)),
        sections.length - 1
      );

      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, isScrolling]);

  const goToSection = (index: number) => {
    setIsScrolling(true);
    setActiveSection(index);

    // Smooth scroll to the section
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height / sections.length;
      const targetScroll = window.scrollY + rect.top + sectionHeight * index;

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }

    setTimeout(() => setIsScrolling(false), 1000);
  };

  return (
    <section ref={sectionRef} className="relative w-full min-h-[300vh]">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={sections[activeSection].backgroundImage}
              alt={sections[activeSection].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`image-${activeSection}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6 }}
                className="relative aspect-square max-w-md mx-auto"
              >
                <Image
                  src={sections[activeSection].image}
                  alt={sections[activeSection].title}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Right: Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${activeSection}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="text-white space-y-6"
              >
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Image
                    src={sections[activeSection].badge}
                    alt={sections[activeSection].title}
                    width={100}
                    height={100}
                    className="drop-shadow-lg"
                  />
                </motion.div>

                {/* Title */}
                <div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-lg">
                    {sections[activeSection].title}
                  </h2>
                  <h3 className="text-2xl md:text-3xl font-light text-white/90 mt-2">
                    {sections[activeSection].subtitle}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl">
                  {sections[activeSection].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-6">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => goToSection(index)}
              className="group flex flex-col items-center gap-2"
              aria-label={`Go to ${section.title}`}
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSection === index
                    ? 'bg-white w-4 h-4 shadow-lg'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
              <span className="text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {section.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
