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
// CAROUSEL - PRODUCTOS SIMILARES (ROBUSTO)
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Referencias seguras
    const track = document.getElementById('catalogTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slides = document.querySelectorAll('.catalog-slide');
    const indicators = Array.from(document.querySelectorAll('.indicator'));

    if (!track) {
        console.warn('Carousel: no se encontró #catalogTrack. Revisa el HTML.');
        return;
    }
    if (slides.length === 0) {
        console.warn('Carousel: no se encontraron elementos con la clase .catalog-slide.');
        return;
    }

    // Número de "páginas" del track
    const totalSlides = slides.length;
    let currentSlide = 0;

    // Calcula el porcentaje que debe moverse el track
    function getTranslatePercent(slideIndex) {
        return slideIndex * (100 / totalSlides);
    }

    // Aplica la transformación con 'translateX'
    function goToSlide(slideIndex) {
        if (!track) return;
        
        if (slideIndex < 0) slideIndex = 0;
        if (slideIndex >= totalSlides) slideIndex = totalSlides - 1;

        currentSlide = slideIndex;
        const percent = getTranslatePercent(slideIndex);
        track.style.transform = `translateX(-${percent}%)`;

        // Actualizar indicadores
        if (indicators.length) {
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === slideIndex);
            });
        }
    }

    // Conexión de botones
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const nextIndex = (currentSlide - 1 + totalSlides) % totalSlides;
            goToSlide(nextIndex);
        });
    } else {
        console.warn('Carousel: no se encontró #prevBtn.');
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const nextIndex = (currentSlide + 1) % totalSlides;
            goToSlide(nextIndex);
        });
    } else {
        console.warn('Carousel: no se encontró #nextBtn.');
    }

    // Indicadores clickeables
    if (indicators.length) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });
    }

    // Soporte táctil/swipe para móviles
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    const catalogCarousel = document.querySelector('.catalog-carousel');
    
    if (catalogCarousel) {
        catalogCarousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        catalogCarousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const horizontalSwipe = Math.abs(touchEndX - touchStartX);
            const verticalSwipe = Math.abs(touchEndY - touchStartY);
            
            // Solo procesar si el swipe es más horizontal que vertical
            if (horizontalSwipe > verticalSwipe && horizontalSwipe > swipeThreshold) {
                if (touchEndX < touchStartX) {
                    // Swipe hacia la izquierda
                    const nextIndex = (currentSlide + 1) % totalSlides;
                    goToSlide(nextIndex);
                } else if (touchEndX > touchStartX) {
                    // Swipe hacia la derecha
                    const nextIndex = (currentSlide - 1 + totalSlides) % totalSlides;
                    goToSlide(nextIndex);
                }
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
            if (e.key === 'ArrowLeft') {
                const nextIndex = (currentSlide - 1 + totalSlides) % totalSlides;
                goToSlide(nextIndex);
            } else if (e.key === 'ArrowRight') {
                const nextIndex = (currentSlide + 1) % totalSlides;
                goToSlide(nextIndex);
            }
        }
    });

    // Inicia en el slide 0
    goToSlide(0);
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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar secciones para animaciones
    const sections = document.querySelectorAll('.producto-section');
    sections.forEach(section => {
        observer.observe(section);
    });
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