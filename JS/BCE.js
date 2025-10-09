// ========================================
// NAVBAR - ESCONDER AL HACER SCROLL
// ========================================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('hidden');
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scroll hacia abajo - esconder navbar
        navbar.classList.add('hidden');
    } else {
        // Scroll hacia arriba - mostrar navbar
        navbar.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// CAROUSEL - PRODUCTOS SIMILARES
// ========================================

let currentSlide = 0;
const track = document.getElementById('catalogTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = document.querySelectorAll('.catalog-slide').length;

// Función para ir a un slide específico
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    // Cada slide ocupa el 50% del ancho total del track
    track.style.transform = `translateX(-${slideIndex * 50}%)`;
    
    // Actualizar indicadores
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === slideIndex);
    });
}

// Botón anterior
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    });
}

// Botón siguiente
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    });
}

// Indicadores clickeables
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        goToSlide(index);
    });
});

// Auto-rotate carousel (opcional - descomenta para activar)
/*
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
}, 5000); // Cambia cada 5 segundos
*/

// ========================================
// SMOOTH SCROLL PARA ENLACES DEL NAVBAR
// ========================================

document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});