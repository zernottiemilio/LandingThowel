# 🏗️ Thowel - Next.js Migration

Migración moderna del sitio web de Thowel de HTML/CSS/JS a Next.js 14 con TypeScript, Tailwind CSS y Framer Motion.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Abrir en el navegador
# http://localhost:3000
```

## 📦 Stack Tecnológico

- **Next.js 14**: Framework React con App Router
- **TypeScript**: Tipado estático
- **Tailwind CSS v4**: Estilos utility-first
- **Framer Motion**: Animaciones fluidas y modernas
- **Next/Image**: Optimización automática de imágenes
- **Next/Font**: Carga optimizada de fuentes (Montserrat)

## ✨ Características Implementadas

### ✅ Completado

- [x] Proyecto Next.js 14 con TypeScript
- [x] Configuración de Tailwind CSS v4 con paleta personalizada
- [x] Fuente Montserrat optimizada con next/font
- [x] Migración de 199 assets (imágenes y fuentes)
- [x] Navbar responsive con dropdown multinivel y menú hamburger móvil
- [x] Footer con hexágonos decorativos animados
- [x] Layout principal con Navbar y Footer
- [x] Componente HeroSection reutilizable
- [x] Componente DualContent para layouts 50/50
- [x] Carrusel completo con navegación, indicadores y touch support
- [x] ProductCard con animaciones hover
- [x] TechBadge para tecnologías (Smooth/Touch/Estándar)
- [x] ProductShowcase con scroll-triggered transitions
- [x] Página landing completa (Hero + Showcase + Catálogo)
- [x] Animaciones Framer Motion integradas

### 🚧 Pendiente

- [ ] Template dinámico para páginas de productos
- [ ] Migración de las 23 páginas de productos
- [ ] Página "Sobre Nosotros"
- [ ] Página "Contacto" con formulario funcional
- [ ] Testing responsive exhaustivo
- [ ] Optimización SEO (meta tags por página)
- [ ] Performance audit y optimizaciones finales

## 🎨 Paleta de Colores

```css
/* Blues */
--blue-navy: #1e3a8a;
--blue-accent: #003399;

/* Reds */
--red-brand: #e74c3c;

/* Grays */
--gray-dark: #666666;
--gray-light: #f5f5f5;
--gray-medium: #d4d4d4;
```

## 🔧 Comandos Disponibles

```bash
# Desarrollo
npm run dev           # Inicia servidor en localhost:3000

# Producción
npm run build         # Build optimizado para producción
npm start             # Inicia servidor de producción

# Utilidades
npm run lint          # Ejecuta ESLint
```

## 📝 Notas

- El código HTML/CSS/JS original se mantiene intacto en la raíz del repo
- Todos los assets fueron copiados (no movidos) a `/public`
- Las rutas siguen la estructura semántica: `/productos/[categoria]/[producto]`

---

**Desarrollado con Next.js 14, TypeScript y Tailwind CSS**
