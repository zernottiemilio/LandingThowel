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
    const items = document.querySelectorAll('.catalog-item');

    if (!track) {
        console.warn('Carousel: no se encontró #catalogTrack. Revisa el HTML.');
        return;
    }
    if (items.length === 0) {
        console.warn('Carousel: no se encontraron elementos con la clase .catalog-item.');
        return;
    }

    let currentIndex = 0;
    const itemWidth = items[0].offsetWidth;
    const itemsPerView = 4; // Mostrar 4 items a la vez
    const maxIndex = Math.max(0, items.length - itemsPerView);

    // Función para mover el carousel
    function updateCarousel() {
        const offset = currentIndex * itemWidth;
        track.style.transform = `translateX(-${offset}px)`;
    }

    // Botón anterior
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    } else {
        console.warn('Carousel: no se encontró #prevBtn.');
    }

    // Botón siguiente
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });
    } else {
        console.warn('Carousel: no se encontró #nextBtn.');
    }

    // Actualizar en resize
    window.addEventListener('resize', () => {
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