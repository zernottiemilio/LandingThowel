// Product Showcase Controller - EFECTO PERSIANA
class ProductShowcase {
    constructor() {
        this.products = ['smooth', 'touch', 'estandar'];
        this.currentProduct = 0;
        this.isTransitioning = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateShowcase();
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            this.updateShowcase();
        }, { passive: true });

        // Dot navigation
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToProduct(index);
            });
        });
    }

    updateShowcase() {
        const showcase = document.querySelector('.unified-product-section');
        if (!showcase) return;

        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Solo activar productos después del header (100vh)
        if (scrollY < windowHeight) {
            return; // No mostrar nada hasta salir del header
        }

        const showcaseRect = showcase.getBoundingClientRect();
        const showcaseTop = showcaseRect.top + scrollY;
        const showcaseHeight = showcaseRect.height;

        // Calculate progress through the showcase (0 to 1)
        const progress = Math.max(0, Math.min(1, 
            (scrollY - showcaseTop + windowHeight * 0.3) / 
            (showcaseHeight - windowHeight * 0.6)
        ));

        // Determine target product
        const targetProduct = Math.min(2, Math.floor(progress * 3));

        if (targetProduct !== this.currentProduct && !this.isTransitioning) {
            this.transitionToProduct(targetProduct);
        }

        // Update progress bar
        this.updateProgressBar(progress);
    }

    transitionToProduct(newProduct) {
        if (newProduct < 0 || newProduct >= this.products.length) return;
        
        this.isTransitioning = true;
        this.currentProduct = newProduct;

        // Hide current content
        document.querySelectorAll('.product-info').forEach(info => {
            info.classList.remove('active');
        });
        document.querySelectorAll('.product-section').forEach(section => {
            section.classList.remove('active');
        });
        document.querySelectorAll('.dot').forEach(dot => {
            dot.classList.remove('active');
        });

        // Show new content with delay
        setTimeout(() => {
            document.querySelector(`[data-product="${this.products[newProduct]}"].product-info`)?.classList.add('active');
            document.querySelector(`[data-product="${this.products[newProduct]}"].product-section`)?.classList.add('active');
            document.querySelectorAll('.dot')[newProduct]?.classList.add('active');
            
            setTimeout(() => {
                this.isTransitioning = false;
            }, 400);
        }, 100);
    }

    updateProgressBar(progress) {
        const transformValue = progress * 200; // 200% to cover all 3 sections
        document.documentElement.style.setProperty('--progress-transform', `${transformValue}%`);
    }

    goToProduct(index) {
        if (this.isTransitioning) return;
        
        const showcase = document.querySelector('.unified-product-section');
        const targetScroll = showcase.offsetTop + (index * window.innerHeight);
        
        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    }
}

// Catalog Carousel Controller
class CatalogCarousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 2; // Ajusta según el número de slides que tengas
        this.isTransitioning = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateIndicators();
    }

    bindEvents() {
        // Navigation arrows
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Indicators
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isInViewport()) {
                if (e.key === 'ArrowLeft') {
                    this.prevSlide();
                } else if (e.key === 'ArrowRight') {
                    this.nextSlide();
                }
            }
        });

        // Touch/Swipe support
        this.addTouchSupport();
    }

    nextSlide() {
        if (this.isTransitioning) return;
        
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        if (this.isTransitioning) return;
        
        const prevIndex = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
        this.goToSlide(prevIndex);
    }

    goToSlide(index) {
        if (index === this.currentSlide || this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.currentSlide = index;
        
        const track = document.getElementById('catalogTrack');
        if (track) {
            // Cada slide ocupa 50% del ancho (para 2 slides)
            const translateX = -index * 50;
            track.style.transform = `translateX(${translateX}%)`;
        }
        
        this.updateIndicators();
        
        // Reset transition flag
        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }

    updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }

    isInViewport() {
        const catalogSection = document.querySelector('.catalog-section');
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
        let threshold = 100; // Minimum distance for swipe
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
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
            }
        }, { passive: true });
    }
}

// Variables globales
let lastScrollTop = 0;
let productShowcaseInstance;
let catalogCarouselInstance;

// Parallax effect for main text and navbar hide functionality
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.main-text');
    const navbar = document.querySelector('.navbar');
    
    // Parallax effect
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
    
    // Navbar hide/show functionality
    if (navbar) {
        if (scrolled > lastScrollTop && scrolled > 100) {
            // Scrolling down and past header
            navbar.classList.add('hidden');
        } else {
            // Scrolling up or at top
            navbar.classList.remove('hidden');
            const opacity = scrolled > 50 ? 0.98 : 0.95;
            navbar.style.background = `rgba(255, 255, 255, ${opacity})`;
        }
        lastScrollTop = scrolled;
    }
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Auto-advance carousel (opcional)
function startAutoAdvance() {
    return setInterval(() => {
        if (catalogCarouselInstance && catalogCarouselInstance.isInViewport() && !catalogCarouselInstance.isTransitioning) {
            catalogCarouselInstance.nextSlide();
        }
    }, 5000); // Cambia cada 5 segundos
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize product showcase
    productShowcaseInstance = new ProductShowcase();
    
    // Initialize catalog carousel
    catalogCarouselInstance = new CatalogCarousel();
    
    // Initialize arrow click functionality
    const scrollIndicator = document.querySelector('.flecha-img');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const firstProductSection = document.querySelector('.unified-product-section');
            if (firstProductSection) {
                firstProductSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Opcional: Auto-advance del carousel (descomenta si lo deseas)
    // const autoAdvanceInterval = startAutoAdvance();
    
    // Para pausar el auto-advance cuando el usuario interactúa
    // document.addEventListener('visibilitychange', () => {
    //     if (document.hidden) {
    //         clearInterval(autoAdvanceInterval);
    //     } else {
    //         autoAdvanceInterval = startAutoAdvance();
    //     }
    // });
});