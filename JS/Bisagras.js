// ========================================
// NAVBAR - ESCONDER AL HACER SCROLL
// ========================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar && navbar.classList.remove('hidden');
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scroll hacia abajo - esconder navbar
        navbar && navbar.classList.add('hidden');
    } else {
        // Scroll hacia arriba - mostrar navbar
        navbar && navbar.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// CAROUSEL - PRODUCTOS SIMILARES
// ========================================
class CatalogCarousel {
    constructor() {
        this.currentPosition = 0;
        this.scrollAmount = 300; // Píxeles que se desplaza cada vez
        this.isTransitioning = false;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Navigation arrows
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.scrollLeft());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.scrollRight());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isInViewport()) {
                if (e.key === 'ArrowLeft') {
                    this.scrollLeft();
                } else if (e.key === 'ArrowRight') {
                    this.scrollRight();
                }
            }
        });

        // Touch/Swipe support
        this.addTouchSupport();
    }

    scrollRight() {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        const track = document.getElementById('catalogTrack');

        if (track) {
            this.currentPosition -= this.scrollAmount;

            // Limitar el scroll para no pasarse del contenido
            const maxScroll = -(track.scrollWidth - track.parentElement.offsetWidth);
            if (this.currentPosition < maxScroll) {
                this.currentPosition = maxScroll;
            }

            track.style.transform = `translateX(${this.currentPosition}px)`;
        }

        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }

    scrollLeft() {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        const track = document.getElementById('catalogTrack');

        if (track) {
            this.currentPosition += this.scrollAmount;

            // No permitir scroll más allá del inicio
            if (this.currentPosition > 0) {
                this.currentPosition = 0;
            }

            track.style.transform = `translateX(${this.currentPosition}px)`;
        }

        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }

    isInViewport() {
        const catalogSection = document.querySelector('.productos-similares');
        if (!catalogSection) return false;

        const rect = catalogSection.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    addTouchSupport() {
        const catalogCarousel = document.querySelector('.catalog-carousel');
        if (!catalogCarousel) return;

        let startX = 0;
        let startY = 0;
        let distX = 0;
        let distY = 0;
        let threshold = 50; // Minimum distance for swipe
        let restraint = 100; // Maximum distance perpendicular to swipe direction
        let allowedTime = 500; // Maximum time allowed to travel distance
        let startTime = 0;

        catalogCarousel.addEventListener('touchstart', (e) => {
            const touchObj = e.changedTouches[0];
            startX = touchObj.pageX;
            startY = touchObj.pageY;
            startTime = new Date().getTime();
        }, { passive: true });

        catalogCarousel.addEventListener('touchend', (e) => {
            const touchObj = e.changedTouches[0];
            distX = touchObj.pageX - startX;
            distY = touchObj.pageY - startY;
            const elapsedTime = new Date().getTime() - startTime;

            if (elapsedTime <= allowedTime && Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                if (distX > 0) {
                    // Swipe hacia la derecha = scroll hacia la izquierda
                    this.scrollLeft();
                } else {
                    // Swipe hacia la izquierda = scroll hacia la derecha
                    this.scrollRight();
                }
            }
        }, { passive: true });
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CatalogCarousel();
});

// ========================================
// SMOOTH SCROLL PARA ENLACES DEL NAVBAR
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ========================================
// ANIMACIÓN DE FADE IN AL HACER SCROLL
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animación a TODAS las secciones de texto, excepto la primera
    const textSections = document.querySelectorAll('.text-section');
    textSections.forEach((section, index) => {
        if (index === 0) {
            // La primera sección se muestra inmediatamente
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        } else {
            // Las demás secciones empiezan ocultas
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        fadeObserver.observe(section);
    });

    // ========================================
    // CAMBIO DE IMÁGENES CON SCROLL
    // ========================================

    // Asegurar que la primera imagen esté visible desde el inicio
    const firstImage = document.querySelector('.image-sticky-container img:first-child');
    if (firstImage) {
        firstImage.style.opacity = '1';
        firstImage.classList.add('active');
    }

    const allImages = document.querySelectorAll('.image-sticky-container img');
    const imageChangeOptions = {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: '-10% 0px -10% 0px'
    };

    const activateImageBySection = (sectionId) => {
        if (!sectionId) return;
        allImages.forEach(img => {
            img.classList.remove('active');
            img.style.opacity = '0';
        });

        const activeImage = document.querySelector(`.image-sticky-container img[data-section="${sectionId}"]`);
        if (activeImage) {
            activeImage.classList.add('active');
            activeImage.style.opacity = '1';
        }
    };

    const updateActiveSectionByViewport = () => {
        let bestSection = null;
        let bestDistance = Infinity;
        const viewportCenter = window.innerHeight * 0.45;

        textSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
            if (!isVisible) return;

            const sectionCenter = rect.top + (rect.height / 2);
            const distance = Math.abs(sectionCenter - viewportCenter);

            if (distance < bestDistance) {
                bestDistance = distance;
                bestSection = section;
            }
        });

        if (bestSection) {
            activateImageBySection(bestSection.getAttribute('data-section'));
        }
    };

    const imageObserver = new IntersectionObserver(() => {
        updateActiveSectionByViewport();
    }, imageChangeOptions);

    textSections.forEach(section => {
        imageObserver.observe(section);
    });

    let ticking = false;
    const onScrollOrResize = () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(() => {
            updateActiveSectionByViewport();
            ticking = false;
        });
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    updateActiveSectionByViewport();
});
