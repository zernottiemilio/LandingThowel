// NAVBAR - ESCONDER AL HACER SCROLL
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
        navbar.classList.remove('hidden');
        return;
    }
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    lastScroll = currentScroll;
});

// CAROUSEL - PRODUCTOS SIMILARES
let currentSlide = 0;
const track = document.getElementById('catalogTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = document.querySelectorAll('.catalog-slide').length;

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    track.style.transform = `translateX(-${slideIndex * 50}%)`;
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === slideIndex);
    });
}

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide === 0) ? totalSlides - 1 : currentSlide - 1;
    goToSlide(currentSlide);
});

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
});
