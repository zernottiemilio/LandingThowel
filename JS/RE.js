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

    // Número de "páginas" del track (cada .catalog-slide actúa como una página)
    const totalSlides = slides.length;
    let currentSlide = 0;

    // Calcula el porcentaje que debe moverse el track según cantidad de slides
    function getTranslatePercent(slideIndex) {
        // Si el track contiene N slides y queremos mover N pasos, cada paso = 100 / N
        return slideIndex * (100 / totalSlides);
    }

    // Aplica la transformación con 'translateX' (formato: -X%)
    function goToSlide(slideIndex) {
        if (!track) return;
        // límite seguro
        if (slideIndex < 0) slideIndex = 0;
        if (slideIndex >= totalSlides) slideIndex = totalSlides - 1;

        currentSlide = slideIndex;
        const percent = getTranslatePercent(slideIndex);
        track.style.transform = `translateX(-${percent}%)`;

        // actualizar indicadores (si existen)
        if (indicators.length) {
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === slideIndex);
            });
        }

        // debug
        // console.log(`goToSlide -> index: ${slideIndex}, translate: -${percent}%`);
    }

    // Conexión de botones (con guardas)
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

    // Auto-rotate opcional (descomentar si deseás auto-rotar)
    /*
    setInterval(() => {
        const nextIndex = (currentSlide + 1) % totalSlides;
        goToSlide(nextIndex);
    }, 5000);
    */
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
