// ============================================
// EFECTO FADE-IN PARA IMÁGENES DUALES
// Mantiene el estilo original, solo agrega efecto de aparición
// ============================================

class DualImageFadeIn {
  constructor() {
    this.init();
  }

  init() {
    // Configurar estilos iniciales
    this.setupInitialStyles();

    // Crear el observer
    this.createObserver();
  }

  setupInitialStyles() {
    // Agregar SOLO el efecto de fade-in sin cambiar otros estilos
    const style = document.createElement('style');
    style.textContent = `
      /* Solo agregar opacidad y transición, sin cambiar position, size, etc */
      .dual-content .left-content,
      .dual-content .right-content {
        opacity: 0;
        transition: opacity 0.8s ease-in-out;
      }

      .dual-content .left-content.fade-in-visible,
      .dual-content .right-content.fade-in-visible {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }

  createObserver() {
    // Opciones del IntersectionObserver
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.1 // 10% del elemento visible
    };

    // Callback cuando el elemento entra/sale del viewport
    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Elemento está visible, aplicar fade-in
          const leftContent = entry.target.querySelector('.left-content');
          const rightContent = entry.target.querySelector('.right-content');

          if (leftContent) {
            leftContent.classList.add('fade-in-visible');
          }
          if (rightContent) {
            rightContent.classList.add('fade-in-visible');
          }
        } else {
          // Remover la clase cuando sale del viewport
          const leftContent = entry.target.querySelector('.left-content');
          const rightContent = entry.target.querySelector('.right-content');

          if (leftContent) {
            leftContent.classList.remove('fade-in-visible');
          }
          if (rightContent) {
            rightContent.classList.remove('fade-in-visible');
          }
        }
      });
    };

    // Crear el observer
    const observer = new IntersectionObserver(callback, options);

    // Observar todas las secciones dual-content
    const dualSections = document.querySelectorAll('.dual-content');
    dualSections.forEach(section => {
      observer.observe(section);
    });
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new DualImageFadeIn();
  });
} else {
  // DOM ya está listo
  new DualImageFadeIn();
}
