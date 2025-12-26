// ============================================
// NAVBAR - ESCONDER AL HACER SCROLL
// ============================================

let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const navbar = document.querySelector('.navbar');

  if (!navbar) return;

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
});

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

// Inicializar menú móvil
let mobileMenuInstance;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    mobileMenuInstance = new MobileMenu();
  });
} else {
  mobileMenuInstance = new MobileMenu();
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
