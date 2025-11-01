// ========================================
// CONFIGURACIÓN GLOBAL
// ========================================
const CONFIG = {
    navbar: {
        scrollThreshold: 100,
        hideDelay: 300
    },
    carousel: {
        autoRotate: false,
        rotateInterval: 5000,
        transitionSpeed: 600,
        itemsToShow: 7 // Número de items visibles a la vez
    },
    animations: {
        observerThreshold: 0.15,
        staggerDelay: 100
    }
};

// ========================================
// NAVBAR - SCROLL INTELIGENTE
// ========================================
class NavbarController {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScroll = 0;
        this.ticking = false;
        this.init();
    }

    init() {
        if (!this.navbar) return;
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    handleScroll() {
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.updateNavbar();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    updateNavbar() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            this.navbar.classList.remove('hidden', 'scrolled');
            this.lastScroll = currentScroll;
            return;
        }

        if (currentScroll > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        if (currentScroll > this.lastScroll && currentScroll > CONFIG.navbar.scrollThreshold) {
            this.navbar.classList.add('hidden');
        } else if (currentScroll < this.lastScroll) {
            this.navbar.classList.remove('hidden');
        }
        
        this.lastScroll = currentScroll;
    }
}

// ========================================
// CAROUSEL INFINITO - ITEM POR ITEM
// ========================================
class ProductCarousel {
    constructor(trackId = 'catalogTrack') {
        this.track = document.getElementById(trackId);
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.container = this.track?.parentElement;
        
        // Obtener TODOS los items directamente del track (sin importar slides)
        this.originalItems = Array.from(this.track?.querySelectorAll('.catalog-item') || []);
        
        this.currentIndex = 0;
        this.isAnimating = false;
        this.autoRotateTimer = null;
        
        this.init();
    }

    init() {
        if (!this.track || this.originalItems.length === 0) {
            console.warn('Carousel: elementos no encontrados');
            return;
        }

        this.setupInfiniteCarousel();
        this.setupEventListeners();
        this.setupItemHoverEffects();
        this.goToIndex(this.originalItems.length, 'instant'); // Empezar en el primer item real
        
        if (CONFIG.carousel.autoRotate) {
            this.startAutoRotate();
        }
    }

    setupInfiniteCarousel() {
        // Limpiar el track y eliminar estructura de slides
        this.track.innerHTML = '';
        this.track.style.display = 'flex';
        
        // Clonar items al inicio y al final para loop infinito
        const clonesBefore = this.originalItems.map(item => {
            const clone = item.cloneNode(true);
            clone.classList.add('clone');
            return clone;
        });
        
        const clonesAfter = this.originalItems.map(item => {
            const clone = item.cloneNode(true);
            clone.classList.add('clone');
            return clone;
        });
        
        // Agregar: clones + originales + clones
        [...clonesBefore, ...this.originalItems, ...clonesAfter].forEach(item => {
            this.track.appendChild(item);
        });
        
        // Obtener todos los items (incluyendo clones)
        this.allItems = Array.from(this.track.querySelectorAll('.catalog-item'));
        this.totalItems = this.allItems.length;
        
        // Configurar estilos
        this.allItems.forEach(item => {
            item.style.flex = `0 0 ${100 / CONFIG.carousel.itemsToShow}%`;
            item.style.minWidth = '0';
        });
    }

    setupEventListeners() {
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());

        // Eliminar indicadores ya que ahora es continuo
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach(indicator => indicator.style.display = 'none');

        document.addEventListener('keydown', (e) => {
            if (this.isInViewport()) {
                if (e.key === 'ArrowLeft') this.prev();
                if (e.key === 'ArrowRight') this.next();
            }
        });

        this.setupSwipeGestures();

        // Detectar cuando termina la transición
        this.track.addEventListener('transitionend', () => {
            this.handleTransitionEnd();
        });

        if (this.track) {
            this.track.addEventListener('mouseenter', () => this.stopAutoRotate());
            this.track.addEventListener('mouseleave', () => {
                if (CONFIG.carousel.autoRotate) this.startAutoRotate();
            });
        }
    }

    setupSwipeGestures() {
        let startX = 0;
        let startY = 0;

        this.track?.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        this.track?.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = Math.abs(startY - endY);

            if (Math.abs(diffX) > 50 && diffY < 100) {
                if (diffX > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        }, { passive: true });
    }

    setupItemHoverEffects() {
        this.allItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                this.onItemHover(e.currentTarget);
            });

            item.addEventListener('mouseleave', () => {
                this.onItemLeave();
            });

            item.addEventListener('click', (e) => {
                this.createRipple(e, item);
            });
        });
    }

    onItemHover(item) {
        this.allItems.forEach(otherItem => {
            if (otherItem !== item && !otherItem.classList.contains('clone')) {
                otherItem.style.transition = 'all 0.3s ease';
                otherItem.style.opacity = '0.6';
                otherItem.style.filter = 'grayscale(40%)';
            }
        });
    }

    onItemLeave() {
        this.allItems.forEach(item => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.filter = 'grayscale(0%)';
        });
    }

    createRipple(event, item) {
        const ripple = document.createElement('div');
        const rect = item.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            z-index: 1000;
        `;

        item.style.position = 'relative';
        item.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    next() {
        if (this.isAnimating) return;
        this.goToIndex(this.currentIndex + 1, 'next');
    }

    prev() {
        if (this.isAnimating) return;
        this.goToIndex(this.currentIndex - 1, 'prev');
    }

    goToIndex(index, direction = 'next') {
        if (this.isAnimating && direction !== 'instant') return;

        this.isAnimating = true;
        this.currentIndex = index;

        // Calcular el desplazamiento
        const itemWidth = 100 / CONFIG.carousel.itemsToShow;
        const translatePercent = this.currentIndex * itemWidth;

        if (direction === 'instant') {
            this.track.style.transition = 'none';
        } else {
            this.track.style.transition = `transform ${CONFIG.carousel.transitionSpeed}ms cubic-bezier(0.4, 0.0, 0.2, 1)`;
        }

        this.track.style.transform = `translateX(-${translatePercent}%)`;

        if (direction === 'instant') {
            this.isAnimating = false;
        }
    }

    handleTransitionEnd() {
        const originalCount = this.originalItems.length;
        
        // Si llegamos al final de los items reales, saltar al inicio
        if (this.currentIndex >= originalCount * 2) {
            this.currentIndex = originalCount;
            this.goToIndex(this.currentIndex, 'instant');
        }
        // Si llegamos al inicio de los clones, saltar al final de los items reales
        else if (this.currentIndex < originalCount) {
            this.currentIndex = originalCount * 2 - (originalCount - this.currentIndex);
            this.goToIndex(this.currentIndex, 'instant');
        }

        this.isAnimating = false;
    }

    isInViewport() {
        if (!this.track) return false;
        const rect = this.track.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    startAutoRotate() {
        this.stopAutoRotate();
        this.autoRotateTimer = setInterval(() => {
            this.next();
        }, CONFIG.carousel.rotateInterval);
    }

    stopAutoRotate() {
        if (this.autoRotateTimer) {
            clearInterval(this.autoRotateTimer);
            this.autoRotateTimer = null;
        }
    }
}

// ========================================
// EFECTO PERSIANA - SECCIONES DE PRODUCTO
// ========================================
class PersianaEffect {
    constructor() {
        this.sections = document.querySelectorAll('.producto-section');
        this.animatedSections = new Set();
        this.init();
    }

    init() {
        if (!('IntersectionObserver' in window)) {
            return;
        }

        const options = {
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
            rootMargin: '0px 0px -20% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedSections.has(entry.target)) {
                    this.animatePersiana(entry.target);
                    this.animatedSections.add(entry.target);
                }
            });
        }, options);

        this.sections.forEach(section => {
            // Preparar sección para animación
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            observer.observe(section);
        });
    }

    animatePersiana(section) {
        // Animar la sección principal
        section.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';

        const elements = section.querySelectorAll(
            '.producto-titulo, .producto-descripcion, .diagrama-tecnico, ' +
            '.specs-intro, .specs-table-image, .codazos-imagenes img, ' +
            '.badge-thowel, .video-container'
        );
        
        elements.forEach((el, index) => {
            // Estado inicial
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            // Animar con delay escalonado
            setTimeout(() => {
                el.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });
    }
}

// ========================================
// SMOOTH SCROLL
// ========================================
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (!href || href === '#') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();
                
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                
                window.scrollTo({
                    top: offsetTop - navbarHeight - 20,
                    behavior: 'smooth'
                });
            });
        });
    }
}

// ========================================
// PARALLAX SUAVE
// ========================================
class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('.left-content img');
        this.ticking = false;
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;
        
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.updateParallax();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        }, { passive: true });
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        
        this.elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.1;
                const yPos = -(rect.top * speed);
                el.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
}

// ========================================
// INICIALIZACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    new NavbarController();
    new ProductCarousel();
    new PersianaEffect();
    new SmoothScroll();
    new ParallaxEffect();
    
    addAnimationStyles();
});

// ========================================
// ESTILOS DINÁMICOS
// ========================================
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        .catalog-item {
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .catalog-item img {
            transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .carousel-nav {
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .carousel-nav:active {
            transform: translateY(-50%) scale(0.95);
        }

        .catalog-track {
            display: flex !important;
            transition: transform 600ms cubic-bezier(0.4, 0.0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);
}