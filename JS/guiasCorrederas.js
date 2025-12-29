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
// CAROUSEL - PRODUCTOS SIMILARES (HORIZONTAL SCROLL)
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('catalogTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const catalogItems = document.querySelectorAll('.catalog-item');

    if (!track) {
        console.warn('Carousel: no se encontró #catalogTrack. Revisa el HTML.');
        return;
    }
    if (catalogItems.length === 0) {
        console.warn('Carousel: no se encontraron elementos con la clase .catalog-item.');
        return;
    }

    let currentIndex = 0;
    const itemWidth = 300; // Ancho de cada item en px
    const visibleItems = window.innerWidth < 768 ? 1 : (window.innerWidth < 1024 ? 2 : 3);
    const maxScroll = Math.max(0, catalogItems.length - visibleItems);

    function updateCarousel() {
        const translateX = -(currentIndex * itemWidth);
        track.style.transform = `translateX(${translateX}px)`;
    }

    // Botón anterior
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }

    // Botón siguiente
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < maxScroll) {
                currentIndex++;
                updateCarousel();
            }
        });
    }

    // Soporte táctil/swipe para móviles
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < maxScroll) {
                // Swipe left - next
                currentIndex++;
                updateCarousel();
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right - prev
                currentIndex--;
                updateCarousel();
            }
        }
    }

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        const carouselSection = document.querySelector('.productos-similares');
        if (!carouselSection) return;

        const rect = carouselSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            } else if (e.key === 'ArrowRight' && currentIndex < maxScroll) {
                currentIndex++;
                updateCarousel();
            }
        }
    });

    // Ajustar en resize
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateCarousel();
    });

    // Inicializar
    updateCarousel();
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
// SCROLL REVEAL - ANIMACIÓN AL HACER SCROLL
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    // Observar todas las secciones de producto
    const sections = document.querySelectorAll('.producto-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observar sección de productos similares
    const productosSimilares = document.querySelector('.productos-similares');
    if (productosSimilares) {
        observer.observe(productosSimilares);
    }
});

// ========================================
// AUTO-ADVANCE DEL CAROUSEL (OPCIONAL)
// ========================================
// Descomenta el siguiente código si quieres que el carousel avance automáticamente

/*
let autoAdvanceInterval;

function startAutoAdvance() {
    autoAdvanceInterval = setInterval(() => {
        const track = document.getElementById('catalogTrack');
        const nextBtn = document.getElementById('nextBtn');
        
        if (track && nextBtn) {
            // Verificar si el carousel está visible
            const carouselSection = document.querySelector('.productos-similares');
            const rect = carouselSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                nextBtn.click();
            }
        }
    }, 5000); // Cambia cada 5 segundos
}

function stopAutoAdvance() {
    if (autoAdvanceInterval) {
        clearInterval(autoAdvanceInterval);
    }
}

// Iniciar auto-advance cuando la página carga
document.addEventListener('DOMContentLoaded', () => {
    startAutoAdvance();
    
    // Pausar cuando el usuario interactúa con el carousel
    const carousel = document.querySelector('.catalog-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoAdvance);
        carousel.addEventListener('mouseleave', startAutoAdvance);
        
        // También pausar cuando la pestaña no está activa
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoAdvance();
            } else {
                startAutoAdvance();
            }
        });
    }
});
*/

console.log('✅ Guías y Correderas JS cargado correctamente');