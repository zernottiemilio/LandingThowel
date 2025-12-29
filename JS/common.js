// ============================================
// NAVBAR - ESCONDER AL HACER SCROLL
// ============================================

let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const navbar = document.querySelector('.navbar');

  if (!navbar) return;

  // No esconder el navbar si el menú móvil está abierto
  const navMenu = document.getElementById('navMenu');
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
});

// ============================================
// MENÚ HAMBURGUESA - MOBILE
// ============================================

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    console.log('Inicializando menú mobile...', {hamburger, navMenu});

    if (!hamburger || !navMenu) {
        console.error('No se encontraron elementos del menú');
        return;
    }

    if (hamburger && navMenu) {
        // Click en el botón hamburguesa
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Prevenir scroll cuando el menú está abierto
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Cerrar menú al hacer click en enlaces (excepto PRODUCTOS y dropdown-items)
        const navLinks = navMenu.querySelectorAll('a:not(.productos-link)');
        navLinks.forEach(link => {
            // Solo cerrar si el link no está dentro de un dropdown-item
            if (!link.closest('.dropdown-item')) {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
            }
        });

        // Toggle dropdown de productos en mobile
        const productosLink = navMenu.querySelector('.productos-link');
        if (productosLink) {
            productosLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();

                    const parentLi = this.closest('li');
                    if (parentLi) {
                        const wasActive = parentLi.classList.contains('active');

                        // Cerrar todos los subdropdowns dentro
                        parentLi.querySelectorAll('.dropdown-item').forEach(item => {
                            item.classList.remove('active');
                        });

                        // Toggle el dropdown principal
                        if (wasActive) {
                            parentLi.classList.remove('active');
                        } else {
                            parentLi.classList.add('active');
                        }
                    }
                }
            });
        }

        // Toggle subdropdowns (categorías)
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            const link = item.querySelector(':scope > a');
            if (link) {
                link.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        e.stopPropagation();

                        // Cerrar otros subdropdowns del mismo nivel
                        const siblings = Array.from(item.parentElement.children).filter(
                            child => child.classList.contains('dropdown-item') && child !== item
                        );
                        siblings.forEach(sibling => {
                            sibling.classList.remove('active');
                        });

                        // Toggle el actual
                        item.classList.toggle('active');
                    }
                });
            }
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });

        // Cerrar menú al cambiar tamaño de ventana
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    console.log('Menú mobile inicializado correctamente');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}

// ============================================
// EFECTO DE ANIMACIÓN PARA IMÁGENES DUALES
// Similar al efecto del index.html usando anime.js
// ============================================

class ProductPageAnimations {
  constructor() {
    this.sections = document.querySelectorAll('.producto-section');
    this.observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };
    this.init();
  }

  init() {
    // Verificar que anime.js esté cargado
    if (typeof anime === 'undefined') {
      console.warn('anime.js no está cargado, usando animación simple');
      this.useFallbackAnimation();
      return;
    }

    // Animar la primera sección al cargar
    this.animateFirstSection();

    // Configurar observer para animar al hacer scroll
    this.setupScrollAnimations();
  }

  animateFirstSection() {
    const firstSection = this.sections[0];
    if (!firstSection) return;

    const leftContent = firstSection.querySelector('.left-content');
    const rightContent = firstSection.querySelector('.right-content');

    // Animar contenido izquierdo
    if (leftContent) {
      anime({
        targets: leftContent,
        translateX: ['-100px', '0px'],
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeOutExpo',
        delay: 300
      });
    }

    // Animar contenido derecho
    if (rightContent) {
      anime({
        targets: rightContent,
        translateX: ['100px', '0px'],
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeOutExpo',
        delay: 500
      });
    }

    // Marcar como animada
    firstSection.classList.add('animated');
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          this.animateSection(entry.target);
        }
      });
    }, this.observerOptions);

    // Observar todas las secciones excepto la primera (ya animada)
    this.sections.forEach((section, index) => {
      if (index > 0) {
        observer.observe(section);
      }
    });
  }

  animateSection(section) {
    const leftContent = section.querySelector('.left-content');
    const rightContent = section.querySelector('.right-content');

    // Determinar dirección de animación alterna
    const sectionIndex = Array.from(this.sections).indexOf(section);
    const isEven = sectionIndex % 2 === 0;

    // Animar contenido izquierdo
    if (leftContent) {
      anime({
        targets: leftContent,
        translateX: [isEven ? '-80px' : '80px', '0px'],
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 100
      });
    }

    // Animar contenido derecho
    if (rightContent) {
      anime({
        targets: rightContent,
        translateX: [isEven ? '80px' : '-80px', '0px'],
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 300
      });
    }

    // Marcar como animada
    section.classList.add('animated');
  }

  useFallbackAnimation() {
    // Fallback si anime.js no está disponible
    const style = document.createElement('style');
    style.textContent = `
      .dual-content .left-content,
      .dual-content .right-content {
        opacity: 0;
        transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
      }

      .dual-content .left-content.fade-in-visible,
      .dual-content .right-content.fade-in-visible {
        opacity: 1;
        transform: translateX(0);
      }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const leftContent = entry.target.querySelector('.left-content');
          const rightContent = entry.target.querySelector('.right-content');

          if (leftContent) {
            leftContent.classList.add('fade-in-visible');
          }
          if (rightContent) {
            rightContent.classList.add('fade-in-visible');
          }
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.dual-content').forEach(section => {
      observer.observe(section);
    });
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ProductPageAnimations();
  });
} else {
  // DOM ya está listo
  new ProductPageAnimations();
}
