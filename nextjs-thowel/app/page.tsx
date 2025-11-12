'use client';

import HeroSection from '@/components/sections/HeroSection';
import ProductShowcase from '@/components/sections/ProductShowcase';
import ProductCard from '@/components/ui/ProductCard';
import Carousel from '@/components/ui/Carousel';
import Image from 'next/image';
import { motion } from 'framer-motion';

const catalogProducts = [
  {
    title: 'BISAGRA CLIP 3D',
    image: '/assets/BISAGRACLIP.png',
    href: '/productos/bisagras/clip-3d',
  },
  {
    title: 'BISAGRA SOFT CLOSING',
    image: '/assets/BISAGRASOFTCLOSING.png',
    href: '/productos/bisagras/soft-closing',
  },
  {
    title: 'BISAGRA CAZOLETA ESTÁNDAR',
    image: '/assets/BISAGRACAZOLETAESTANDAR.png',
    href: '/productos/bisagras/cazoleta-estandar',
  },
  {
    title: 'BISAGRA PUSH OPEN',
    image: '/assets/BISAGRAPUSHOPEN.png',
    href: '/productos/bisagras/push-open',
  },
  {
    title: 'BISAGRA ÁNGULOS ESPECIALES 135°',
    image: '/assets/BISAGRAANGULOSESPECIALES135.png',
    href: '/productos/bisagras/cazoleta-155',
  },
  {
    title: 'BISAGRA ÁNGULOS ESPECIALES 175°',
    image: '/assets/BISAGRAANGULOSESPECIALES175.png',
    href: '/productos/bisagras/cazoleta-155',
  },
  {
    title: 'GUÍAS PREMIUM',
    image: '/assets/guias-premium.jpg',
    href: '/productos/correderas/guia-oculta-3d-soft-closing',
  },
  {
    title: 'CORREDERAS TELESCÓPICAS',
    image: '/assets/correderas.jpg',
    href: '/productos/correderas/telescopica-soft-closing',
  },
  {
    title: 'THOWEL BOX',
    image: '/assets/ThowelBox.png',
    href: '/productos/cajones/thowel-box',
  },
  {
    title: 'THOWEL BOX PLUS',
    image: '/assets/THOWELBOXPLUS.png',
    href: '/productos/cajones/thowel-box-plus',
  },
  {
    title: 'THOWEL BOX CRISTAL',
    image: '/assets/ThowelBoxCristal.png',
    href: '/productos/cajones/thowel-box-cristal',
  },
  {
    title: 'MANIJAS Y TIRADORES',
    image: '/assets/manijasytiradoresambiente.png',
    href: '/productos/manijas/general',
  },
  {
    title: 'SISTEMAS DE APOYO',
    image: '/assets/patarueda.png',
    href: '/productos/otros/sistemas-apoyo',
  },
  {
    title: 'PISTÓN A GAS',
    image: '/assets/pistondealtura.png',
    href: '/productos/otros/piston-a-gas',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        backgroundImage="/assets/portada.png"
        showScrollIndicator={true}
        overlayOpacity={0.4}
      >
        <div className="text-center text-white max-w-4xl mx-auto py-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 drop-shadow-lg"
          >
            Explorá nuestra línea de productos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl font-light drop-shadow-md"
          >
            y encontrá la solución perfecta para cada necesidad
          </motion.p>
        </div>
      </HeroSection>

      {/* Product Showcase (Smooth/Touch/Estándar) */}
      <ProductShowcase />

      {/* Catalog Section */}
      <section className="py-16 md:py-24 bg-gray-light" id="catalogo">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 md:mb-16">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 lg:gap-6"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-blue-navy">
                CATÁLOGO
              </h2>
              <Image
                src="/assets/FLECHACATALOGO.png"
                alt="Arrow"
                width={80}
                height={80}
                className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
              />
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center"
            >
              <p className="text-gray-dark text-base md:text-lg leading-relaxed">
                Descubre nuestros herrajes creados para ofrecer funcionalidad,
                estilo y durabilidad en cada proyecto. Con tecnología de
                vanguardia y diseños innovadores, cada producto está diseñado
                para superar las expectativas más exigentes.
              </p>
            </motion.div>
          </div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Carousel itemsPerSlide={7} className="px-8 md:px-16">
              {catalogProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  title={product.title}
                  image={product.image}
                  href={product.href}
                />
              ))}
            </Carousel>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
