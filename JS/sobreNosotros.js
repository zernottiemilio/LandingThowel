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

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (!hamburger || !navMenu) {
        console.error('No se encontraron elementos del menú');
        return;
    }

    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Toggle dropdown de PRODUCTOS (funciona en mobile y desktop)
    const productosLink = navMenu.querySelector('.productos-link');
    if (productosLink) {
        productosLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const parentLi = this.closest('li');
            if (parentLi) {
                const wasOpen = parentLi.classList.contains('dropdown-open');

                // Cerrar todos los subdropdowns dentro
                parentLi.querySelectorAll('.dropdown-item').forEach(item => {
                    item.classList.remove('active');
                    item.classList.remove('subdropdown-open');
                });

                // Toggle el dropdown principal
                if (wasOpen) {
                    parentLi.classList.remove('dropdown-open');
                    parentLi.classList.remove('active');
                } else {
                    parentLi.classList.add('dropdown-open');
                    parentLi.classList.add('active');
                }
            }
        });
    }

    // Toggle subdropdowns (categorías) - funciona en mobile y desktop
    const dropdownItems = navMenu.querySelectorAll('.dropdown-item > a');
    dropdownItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const parentItem = this.parentElement;
            if (parentItem) {
                // Cerrar siblings
                const siblings = parentItem.parentElement.querySelectorAll('.dropdown-item');
                siblings.forEach(sibling => {
                    if (sibling !== parentItem) {
                        sibling.classList.remove('active');
                        sibling.classList.remove('subdropdown-open');
                    }
                });

                // Toggle este item
                parentItem.classList.toggle('active');
                parentItem.classList.toggle('subdropdown-open');
            }
        });
    });

    // Cerrar menú al hacer click en enlaces de productos finales
    const finalLinks = navMenu.querySelectorAll('.subdropdown a');
    finalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const parentLi = navMenu.querySelector('li.dropdown-open');
            if (parentLi) {
                parentLi.classList.remove('dropdown-open');
                parentLi.classList.remove('active');
                parentLi.querySelectorAll('.dropdown-item').forEach(item => {
                    item.classList.remove('active');
                    item.classList.remove('subdropdown-open');
                });
            }

            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            // Cerrar dropdown en desktop
            const openDropdown = navMenu.querySelector('li.dropdown-open');
            if (openDropdown) {
                openDropdown.classList.remove('dropdown-open');
                openDropdown.classList.remove('active');
                openDropdown.querySelectorAll('.dropdown-item').forEach(item => {
                    item.classList.remove('active');
                    item.classList.remove('subdropdown-open');
                });
            }

            // Cerrar menú en mobile
            if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Cerrar menú al redimensionar
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            navMenu.querySelectorAll('li').forEach(li => li.classList.remove('active'));
            navMenu.querySelectorAll('.dropdown-item').forEach(item => item.classList.remove('active'));
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
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

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a TODAS las secciones de texto, excepto la primera
const textSections = document.querySelectorAll('.text-section');
textSections.forEach((section, index) => {
    if (index === 0) {
        // La primera sección se muestra inmediatamente
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    } else {
        // Las demás secciones empiezan ocultas
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    fadeObserver.observe(section);
});

// ========================================
// CAMBIO DE IMÁGENES CON SCROLL
// ========================================

// Asegurar que la primera imagen esté visible desde el inicio
const firstImage = document.querySelector('.image-sticky-container img:first-child');
if (firstImage) {
    firstImage.style.opacity = '1';
    firstImage.classList.add('active');
}

const imageChangeOptions = {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: '-20% 0px -20% 0px'
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Solo cambiar cuando la sección esté al menos 50% visible
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const sectionId = entry.target.getAttribute('data-section');

            // Remover clase active de todas las imágenes
            const allImages = document.querySelectorAll('.image-sticky-container img');
            allImages.forEach(img => {
                img.classList.remove('active');
                img.style.opacity = '0';
            });

            // Agregar clase active a la imagen correspondiente
            const activeImage = document.querySelector(`.image-sticky-container img[data-section="${sectionId}"]`);
            if (activeImage) {
                activeImage.classList.add('active');
                activeImage.style.opacity = '1';
            }
        }
    });
}, imageChangeOptions);

// Observar todas las secciones de texto para cambiar imágenes
textSections.forEach(section => {
    imageObserver.observe(section);
});