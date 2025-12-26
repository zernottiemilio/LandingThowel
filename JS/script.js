// Product Showcase Controller - EFECTO PERSIANA
class ProductShowcase {
    constructor() {
        this.products = ['smooth', 'touch', 'estandar'];
        this.currentProduct = 0;
        this.isTransitioning = false;
        this.init();
        this.initAnimeScrollEffects();
    }

    init() {
        this.bindEvents();
        this.updateShowcase();
    }

    initAnimeScrollEffects() {
        // No necesitamos ocultar las imágenes aquí porque las secciones
        // ya tienen opacity: 0 cuando no están activas
        // Las animaciones se aplicarán cuando una sección se active
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            this.updateShowcase();
            this.updateParallaxEffect();
        }, { passive: true });

        // Dot navigation
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToProduct(index);
            });
        });
    }

    updateParallaxEffect() {
        const activeSection = document.querySelector('.product-section.active');
        if (!activeSection) return;

        const scrollY = window.pageYOffset;
        const sectionRect = activeSection.getBoundingClientRect();
        const sectionTop = sectionRect.top + scrollY;

        // Calcular el offset de parallax basado en la posición del scroll
        const offset = (scrollY - sectionTop) * 0.15;

        const leftImage = activeSection.querySelector('.split-image.left-image img');
        const rightImage = activeSection.querySelector('.split-image.right-image img');

        if (leftImage && rightImage) {
            // Aplicar efecto parallax sutil
            leftImage.style.transform = `translateY(${offset}px)`;
            rightImage.style.transform = `translateY(${-offset}px)`;
        }
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
        if (newProduct === this.currentProduct) return;

        this.isTransitioning = true;
        const oldProduct = this.currentProduct;
        this.currentProduct = newProduct;

        // Obtener la sección actual (que se va a ocultar)
        const oldSection = document.querySelector(`[data-product="${this.products[oldProduct]}"].product-section`);
        const newSection = document.querySelector(`[data-product="${this.products[newProduct]}"].product-section`);

        // PASO 1: Animar salida de la sección anterior
        if (oldSection && typeof anime !== 'undefined') {
            const oldLeftImage = oldSection.querySelector('.split-image.left-image');
            const oldRightImage = oldSection.querySelector('.split-image.right-image');

            // Determinar dirección de salida (izquierda si vamos hacia adelante, derecha si retrocedemos)
            const direction = newProduct > oldProduct ? -1 : 1;

            // Animar salida de imágenes
            anime({
                targets: oldLeftImage,
                translateX: direction * -150 + 'px',
                scale: 0.85,
                opacity: 0,
                duration: 600,
                easing: 'easeInExpo'
            });

            anime({
                targets: oldRightImage,
                translateX: direction * 150 + 'px',
                scale: 0.85,
                opacity: 0,
                duration: 600,
                easing: 'easeInExpo'
            });
        }

        // PASO 2: Actualizar clases después de la animación de salida
        setTimeout(() => {
            // Remover clases activas
            document.querySelectorAll('.product-info').forEach(info => {
                info.classList.remove('active');
            });
            document.querySelectorAll('.product-section').forEach(section => {
                section.classList.remove('active');
            });
            document.querySelectorAll('.dot').forEach(dot => {
                dot.classList.remove('active');
            });

            // Activar nueva sección
            document.querySelector(`[data-product="${this.products[newProduct]}"].product-info`)?.classList.add('active');
            newSection?.classList.add('active');
            document.querySelectorAll('.dot')[newProduct]?.classList.add('active');

            // PASO 3: Animar entrada de la nueva sección
            if (newSection && typeof anime !== 'undefined') {
                const leftImage = newSection.querySelector('.split-image.left-image');
                const rightImage = newSection.querySelector('.split-image.right-image');

                // Determinar dirección de entrada (opuesta a la salida)
                const direction = newProduct > oldProduct ? 1 : -1;

                // Reset estilos inline
                if (leftImage) {
                    leftImage.style.opacity = '';
                    leftImage.style.transform = '';
                }
                if (rightImage) {
                    rightImage.style.opacity = '';
                    rightImage.style.transform = '';
                }

                // Animar entrada imagen izquierda
                anime({
                    targets: leftImage,
                    translateX: [direction * -120 + 'px', '0px'],
                    scale: [0.9, 1],
                    opacity: [0, 1],
                    duration: 1000,
                    easing: 'easeOutExpo',
                    delay: 50
                });

                // Animar entrada imagen derecha
                anime({
                    targets: rightImage,
                    translateX: [direction * 120 + 'px', '0px'],
                    scale: [0.9, 1],
                    opacity: [0, 1],
                    duration: 1000,
                    easing: 'easeOutExpo',
                    delay: 150
                });
            }

            setTimeout(() => {
                this.isTransitioning = false;
            }, 1000);
        }, 650);
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

// Variables globales
let lastScrollTop = 0;
let productShowcaseInstance;
let catalogCarouselInstance;

// ============================================
// MENÚ HAMBURGUESA - MOBILE
// ============================================

class MobileMenu {
  constructor() {
    this.hamburger = null;
    this.navMenu = null;
    this.dropdownItems = [];
    this.init();
  }

  init() {
    // Crear el botón hamburguesa si no existe
    this.createHamburgerButton();

    // Obtener elementos
    this.hamburger = document.querySelector('.hamburger');
    this.navMenu = document.querySelector('.navbar ul');
    this.dropdownItems = document.querySelectorAll('.dropdown-item');

    if (!this.hamburger || !this.navMenu) return;

    // Event listeners
    this.hamburger.addEventListener('click', () => this.toggleMenu());

    // Cerrar menú al hacer click en un enlace (excepto los que tienen dropdown)
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
      // Solo cerrar si no es un dropdown parent
      if (!link.parentElement.classList.contains('dropdown-item') ||
          !link.parentElement.querySelector('.dropdown, .subdropdown')) {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            this.closeMenu();
          }
        });
      }
    });

    // Toggle dropdowns en mobile
    this.dropdownItems.forEach(item => {
      const link = item.querySelector('a');
      if (link && item.querySelector('.dropdown, .subdropdown')) {
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            this.toggleDropdown(item);
          }
        });
      }
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 &&
          this.navMenu.classList.contains('active') &&
          !e.target.closest('.navbar')) {
        this.closeMenu();
      }
    });

    // Cerrar menú al cambiar de tamaño
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.navMenu.classList.contains('active')) {
        this.closeMenu();
      }
    });
  }

  createHamburgerButton() {
    // Verificar si ya existe
    if (document.querySelector('.hamburger')) return;

    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;

    // Insertar el botón hamburguesa al final del navbar
    navbar.appendChild(hamburger);
  }

  toggleMenu() {
    this.hamburger.classList.toggle('active');
    this.navMenu.classList.toggle('active');

    // Prevenir scroll del body cuando el menú está abierto
    if (this.navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Cerrar todos los dropdowns al cerrar el menú
      this.dropdownItems.forEach(item => {
        item.classList.remove('active');
      });
    }
  }

  closeMenu() {
    this.hamburger.classList.remove('active');
    this.navMenu.classList.remove('active');
    document.body.style.overflow = '';

    // Cerrar todos los dropdowns
    this.dropdownItems.forEach(item => {
      item.classList.remove('active');
    });
  }

  toggleDropdown(item) {
    const wasActive = item.classList.contains('active');

    // Cerrar todos los dropdowns del mismo nivel
    const siblings = Array.from(item.parentElement.children).filter(
      child => child.classList.contains('dropdown-item')
    );
    siblings.forEach(sibling => {
      if (sibling !== item) {
        sibling.classList.remove('active');
      }
    });

    // Toggle el dropdown actual
    if (wasActive) {
      item.classList.remove('active');
    } else {
      item.classList.add('active');
    }
  }
}

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
        // No esconder el navbar si el menú móvil está abierto
        const navMenu = document.querySelector('.navbar ul');
        if (navMenu && navMenu.classList.contains('active')) {
            return;
        }

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
            catalogCarouselInstance.scrollRight();
        }
    }, 5000); // Desplaza hacia la derecha cada 5 segundos
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile menu
    new MobileMenu();

    // Initialize product showcase
    productShowcaseInstance = new ProductShowcase();

    // Animar la primera sección activa al cargar
    setTimeout(() => {
        const firstSection = document.querySelector('.product-section.active');
        if (firstSection && typeof anime !== 'undefined') {
            const leftImage = firstSection.querySelector('.split-image.left-image');
            const rightImage = firstSection.querySelector('.split-image.right-image');

            // Reset estilos inline antes de animar
            if (leftImage) {
                leftImage.style.opacity = '';
                leftImage.style.transform = '';
            }
            if (rightImage) {
                rightImage.style.opacity = '';
                rightImage.style.transform = '';
            }

            anime({
                targets: leftImage,
                translateX: ['-100px', '0px'],
                scale: [0.9, 1],
                opacity: [0, 1],
                duration: 1200,
                easing: 'easeOutExpo',
                delay: 300
            });

            anime({
                targets: rightImage,
                translateX: ['100px', '0px'],
                scale: [0.9, 1],
                opacity: [0, 1],
                duration: 1200,
                easing: 'easeOutExpo',
                delay: 400
            });
        }
    }, 500);

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