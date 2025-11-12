'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  {
    label: 'BISAGRAS',
    dropdown: [
      { label: 'Bisagra Soft Closing', href: '/productos/bisagras/soft-closing' },
      { label: 'Bisagra Clip 3D', href: '/productos/bisagras/clip-3d' },
      { label: 'Bisagra Push Open', href: '/productos/bisagras/push-open' },
      { label: 'Bisagra Cazoleta Estándar', href: '/productos/bisagras/cazoleta-estandar' },
      { label: 'Bisagra Cazoleta 155°', href: '/productos/bisagras/cazoleta-155' },
    ],
  },
  {
    label: 'CAJONES',
    dropdown: [
      { label: 'Thowel Box', href: '/productos/cajones/thowel-box' },
      { label: 'Thowel Box Plus', href: '/productos/cajones/thowel-box-plus' },
      { label: 'Thowel Box Cristal', href: '/productos/cajones/thowel-box-cristal' },
    ],
  },
  {
    label: 'CORREDERAS',
    dropdown: [
      { label: 'Corredera Telescópica Soft Closing', href: '/productos/correderas/telescopica-soft-closing' },
      { label: 'Corredera Telescópica Push Open', href: '/productos/correderas/telescopica-push-open' },
      { label: 'Corredera Telescópica Estándar H35', href: '/productos/correderas/telescopica-estandar-h35' },
      { label: 'Corredera Telescópica Estándar H45', href: '/productos/correderas/telescopica-estandar-h45' },
      { label: 'Guía Oculta 3D Soft Closing', href: '/productos/correderas/guia-oculta-3d-soft-closing' },
      { label: 'Guía Oculta Push Open', href: '/productos/correderas/guia-oculta-push-open' },
    ],
  },
  {
    label: 'MANIJAS',
    dropdown: [
      { label: 'Manijas', href: '/productos/manijas/general' },
      { label: 'Manijas Barral', href: '/productos/manijas/barral' },
      { label: 'Manijas Botón', href: '/productos/manijas/boton' },
      { label: 'Manijas Oval', href: '/productos/manijas/oval' },
      { label: 'Manijas Rueda', href: '/productos/manijas/rueda' },
      { label: 'Manijas Plática', href: '/productos/manijas/platica' },
    ],
  },
  {
    label: 'OTROS',
    dropdown: [
      { label: 'Pistón a Gas', href: '/productos/otros/piston-a-gas' },
      { label: 'Retén Expulsor', href: '/productos/otros/reten-expulsor' },
      { label: 'Sistemas de Apoyo', href: '/productos/otros/sistemas-apoyo' },
    ],
  },
  {
    label: 'SOBRE NOSOTROS',
    href: '/sobre-nosotros',
  },
  {
    label: 'CONTACTO',
    href: '/contacto',
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div
            className={`bg-white/95 backdrop-blur-sm rounded-[50px] shadow-md px-6 lg:px-12 py-3 flex items-center justify-between transition-all duration-300 ${
              isScrolled ? 'shadow-lg' : ''
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logoHeader.png"
                alt="Thowel Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-12">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-gray-800 hover:text-blue-accent hover:bg-red-hover px-4 py-2 rounded-full transition-all duration-200"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button className="text-sm font-medium text-gray-800 hover:text-blue-accent hover:bg-red-hover px-4 py-2 rounded-full transition-all duration-200">
                      {item.label}
                    </button>
                  )}

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-xl py-3 min-w-[260px] overflow-hidden"
                        >
                          {item.dropdown.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              className="block px-6 py-3 text-sm text-gray-700 hover:bg-blue-accent hover:text-white transition-colors duration-150"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-gray-800 rounded-full"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-gray-800 rounded-full"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-gray-800 rounded-full"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-white z-50 overflow-y-auto shadow-2xl lg:hidden"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <Image
                  src="/assets/logoHeader.png"
                  alt="Thowel Logo"
                  width={100}
                  height={33}
                  className="h-7 w-auto"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Items */}
              <div className="py-4">
                {navItems.map((item, index) => (
                  <div key={index}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            setActiveDropdown(activeDropdown === index ? null : index)
                          }
                          className="w-full flex items-center justify-between px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100"
                        >
                          {item.label}
                          <motion.svg
                            animate={{ rotate: activeDropdown === index ? 180 : 0 }}
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </motion.svg>
                        </button>

                        {/* Mobile Dropdown */}
                        <AnimatePresence>
                          {activeDropdown === index && item.dropdown && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden bg-gray-50"
                            >
                              {item.dropdown.map((subItem, subIndex) => (
                                <Link
                                  key={subIndex}
                                  href={subItem.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block px-10 py-2.5 text-sm text-gray-600 hover:bg-gray-200"
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
