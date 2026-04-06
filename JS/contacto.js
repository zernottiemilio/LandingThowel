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
        const targetSection = document.querySelector('.contacto-section');
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// ========================================
// VALIDACIÓN Y ENVÍO DEL FORMULARIO CON FORMSUBMIT
// ========================================

const contactoForm = document.getElementById('contactoForm');

if (contactoForm) {
    contactoForm.addEventListener('submit', function(e) {
        // Obtener valores del formulario
        const formData = {
            nombre: this.nombre.value.trim(),
            numero: this.numero.value.trim(),
            mail: this.mail.value.trim(),
            mensaje: this.mensaje.value.trim()
        };

        // Validación básica
        if (!formData.nombre || !formData.numero || !formData.mail || !formData.mensaje) {
            e.preventDefault();
            mostrarMensaje('Por favor, completa todos los campos.', 'error');
            return false;
        }

        // Validar email
        if (!validarEmail(formData.mail)) {
            e.preventDefault();
            mostrarMensaje('Por favor, ingresa un email válido.', 'error');
            return false;
        }

        // Validar teléfono (solo números y espacios)
        if (!validarTelefono(formData.numero)) {
            e.preventDefault();
            mostrarMensaje('Por favor, ingresa un número de teléfono válido.', 'error');
            return false;
        }

        // Si todo está bien, mostrar mensaje de envío y permitir el submit
        const submitBtn = document.querySelector('.form-submit');
        submitBtn.textContent = 'ENVIANDO...';
        submitBtn.disabled = true;

        // FormSubmit manejará el envío y redirigirá automáticamente
        return true;
    });
}

// Función para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para validar teléfono
function validarTelefono(telefono) {
    const regex = /^[\d\s\-\+\(\)]+$/;
    return regex.test(telefono) && telefono.replace(/\D/g, '').length >= 8;
}

// Función para mostrar mensajes
function mostrarMensaje(texto, tipo) {
    // Eliminar mensaje anterior si existe
    const mensajeAnterior = document.querySelector('.form-mensaje');
    if (mensajeAnterior) {
        mensajeAnterior.remove();
    }

    // Crear nuevo mensaje
    const mensaje = document.createElement('div');
    mensaje.className = `form-mensaje ${tipo}`;
    mensaje.textContent = texto;

    // Estilos del mensaje
    mensaje.style.cssText = `
        padding: 15px 25px;
        margin-top: 20px;
        border-radius: 25px;
        text-align: center;
        font-weight: 500;
        animation: slideIn 0.3s ease;
        ${tipo === 'success'
            ? 'background: #4CAF50; color: white;'
            : 'background: #f44336; color: white;'}
    `;

    // Insertar mensaje
    contactoForm.appendChild(mensaje);

    // Remover mensaje después de 5 segundos
    setTimeout(() => {
        mensaje.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => mensaje.remove(), 300);
    }, 5000);
}

// Agregar animaciones CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);

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
// ANIMACIÓN DE FADE IN PARA EL FORMULARIO
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

// Aplicar animación al formulario
const formContainer = document.querySelector('.contacto-container');
if (formContainer) {
    formContainer.style.opacity = '0';
    formContainer.style.transform = 'translateY(30px)';
    formContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(formContainer);
}