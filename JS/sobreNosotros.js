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

    // No esconder el navbar si el menú móvil está abierto
    const navMenu = document.querySelector('.navbar ul');
    if (navMenu && navMenu.classList.contains('active')) {
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

    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
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

    navbar.appendChild(hamburger);
  }

  toggleMenu() {
    this.hamburger.classList.toggle('active');
    this.navMenu.classList.toggle('active');

    if (this.navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      this.dropdownItems.forEach(item => {
        item.classList.remove('active');
      });
    }
  }

  closeMenu() {
    this.hamburger.classList.remove('active');
    this.navMenu.classList.remove('active');
    document.body.style.overflow = '';

    this.dropdownItems.forEach(item => {
      item.classList.remove('active');
    });
  }

  toggleDropdown(item) {
    const wasActive = item.classList.contains('active');

    const siblings = Array.from(item.parentElement.children).filter(
      child => child.classList.contains('dropdown-item')
    );
    siblings.forEach(sibling => {
      if (sibling !== item) {
        sibling.classList.remove('active');
      }
    });

    if (wasActive) {
      item.classList.remove('active');
    } else {
      item.classList.add('active');
    }
  }
}

// Inicializar menú móvil
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();
  });
} else {
  new MobileMenu();
}

// ========================================
// SMOOTH SCROLL PARA LA FLECHA
// ========================================

const scrollIndicator = document.querySelector('.flecha-img');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const targetSection = document.querySelector('.sobre-nosotros-section');
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

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

// ========================================
// ANIMACIÓN DE FADE IN AL HACER SCROLL
// ========================================

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a la sección de contenido
const contentSection = document.querySelector('.right-content');
if (contentSection) {
    contentSection.style.opacity = '0';
    contentSection.style.transform = 'translateY(30px)';
    contentSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(contentSection);
}