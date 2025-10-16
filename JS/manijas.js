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