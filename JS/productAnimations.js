// Animaciones para páginas de productos - THOWEL
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
            console.error('anime.js no está cargado');
            return;
        }

        // Animar la primera sección al cargar
        this.animateFirstSection();

        // Configurar observer para animar al hacer scroll
        this.setupScrollAnimations();

        // Configurar efecto parallax
        this.setupParallax();
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
                translateY: ['-30px', '0px'],
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
                translateY: ['-30px', '0px'],
                opacity: [0, 1],
                duration: 1000,
                easing: 'easeOutExpo',
                delay: 300
            });
        }

        // Animar elementos hijos individuales con stagger
        const childElements = section.querySelectorAll('.producto-titulo, .producto-descripcion, .specs-intro, .diagrama-tecnico, .specs-table-image, .badge-thowel');
        if (childElements.length > 0) {
            anime({
                targets: childElements,
                translateY: ['20px', '0px'],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo',
                delay: anime.stagger(150, {start: 400})
            });
        }

        // Marcar como animada
        section.classList.add('animated');
    }

    setupParallax() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    updateParallax() {
        this.sections.forEach(section => {
            if (!section.classList.contains('animated')) return;

            const rect = section.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;

            if (!isInView) return;

            // Calcular offset basado en la posición del scroll
            const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            const offset = (scrollProgress - 0.5) * 50; // Efecto sutil

            const leftImages = section.querySelectorAll('.left-content img');
            const rightImages = section.querySelectorAll('.right-content img');

            leftImages.forEach(img => {
                img.style.transform = `translateY(${offset}px)`;
            });

            rightImages.forEach(img => {
                img.style.transform = `translateY(${-offset}px)`;
            });
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ProductPageAnimations();
});
