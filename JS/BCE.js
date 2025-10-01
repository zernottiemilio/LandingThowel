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

const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.indicator');

let currentIndex = 1; // Comienza en el segundo item (el destacado)
const totalItems = carouselItems.length;

// Función para actualizar el carousel
function updateCarousel(index) {
    // Remover clase active de todos los items e indicators
    carouselItems.forEach(item => item.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Agregar clase active al item e indicator actual
    carouselItems[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentIndex = index;
}

// Event listeners para los indicadores
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        updateCarousel(index);
    });
});

// Auto-rotate carousel (opcional)
// Descomenta las siguientes líneas si quieres que el carousel rote automáticamente
/*
setInterval(() => {
    let nextIndex = (currentIndex + 1) % totalItems;
    updateCarousel(nextIndex);
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