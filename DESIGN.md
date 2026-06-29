# Design

## Theme

Light. Alto contraste en texto sobre fondos blancos/grises claros; imágenes de producto a full bleed. La marca usa rojo (#e74c3c) como único acento de color sobre fondo neutro. No dark mode.

## Color Palette

| Token | Value | Use |
|---|---|---|
| `--color-brand` | `#e74c3c` (oklch 0.54 0.21 29) | Acento principal, hover, CTA |
| `--color-ink` | `#1a1a1a` | Texto principal |
| `--color-ink-muted` | `#333333` | Texto nav, labels |
| `--color-ink-subtle` | `#666666` | Texto secundario, dropdown |
| `--color-surface` | `#ffffff` | Fondos de cards, navbar, dropdowns |
| `--color-surface-alt` | `#f8f9fa` | Fondos alternativos, dropdown mobile |
| `--color-border` | `rgba(0,0,0,0.05)` | Separadores sutiles |
| `--color-brand-hover` | `rgba(231, 76, 60, 0.1)` | Hover state nav links |
| `--color-shadow` | `rgba(0,0,0,0.1)` | Box shadows |

> **Issue detectado:** #666 sobre blanco da ratio ~4.5:1 (justo en WCAG AA). Texto muted en dropdowns en riesgo.

## Typography

Font stack: `'Montserrat', sans-serif` — pesos 200/300/400/500/700/900 cargados localmente desde `/fonts/`.

| Role | Size | Weight | Notes |
|---|---|---|---|
| Hero H1 | responsive / full-bleed | 700–900 | Superpuesto a imagen portada |
| Section H2 | ~2rem | 700 | `text-transform: uppercase` |
| Body | ~1rem | 400 | Líneas largas sin cap de ch |
| Nav links | 14px | 500 | uppercase |
| Dropdown | 13-14px | 500 | uppercase |

> **Issues detectados:** Body sin `max-width` en ch — líneas muy largas. Falta `text-wrap: balance` en H1–H3.

## Layout & Spacing

- Navbar: pill flotante centrado, `border-radius: 50px`, `padding: 5px 100px`
- Secciones: full-width, scroll vertical
- Producto showcase: split full-bleed con imágenes izq/der + overlay de contenido
- Carrusel de catálogo: scroll horizontal con nav buttons
- Mobile: navbar full-width sin pill, menú hamburguesa slide-in

> **Issues:** z-index arbitrarios (1000, 1001, 1002). Sin escala semántica.

## Components

### Navbar
Pill glassmorphism flotante, backdrop-filter blur. Hide on scroll down, show on scroll up. Dropdowns anidados (2 niveles) activados por click. Mobile: hamburger + full-screen overlay.

### Product Showcase (unified-product-section)
Full-viewport section con transición entre SMOOTH / TOUCH / ESTÁNDAR. Split-image (izq background + der producto) + content overlay + progress dots.

### Catalog Carousel
Horizontal scroll con items de imagen + overlay de nombre. Flechas prev/next.

### Calidad Section
Layout 2 columnas: texto izquierda + ícono derecha.

### Catalog Header
Layout 2 columnas: título enlazado al PDF + descripción.

## Motion

- Navbar hide/show: `transition: all 0.3s ease` — ⚠️ animar `all` es anti-patrón
- Dropdown appear: `opacity + transform translateY(-10px→0)` con `0.3s ease` — OK
- Hamburger lines: transform + opacity `0.3s ease`
- No `@media (prefers-reduced-motion)` declarado en ningún archivo

> **Issues:** Falta `prefers-reduced-motion`. Uso de `transition: all`. Sin ease-out exponencial.

## Responsive

- Breakpoints: 1200px / 1024px / 768px / 480px
- Mobile-first: no — desktop-first con media queries hacia abajo
- Uso excesivo de `!important` en mobile (>30 declaraciones)
