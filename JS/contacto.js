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
// VALIDACIÓN Y ENVÍO DEL FORMULARIO
// ========================================

const contactoForm = document.getElementById('contactoForm');

if (contactoForm) {
    contactoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const formData = {
            nombre: this.nombre.value.trim(),
            numero: this.numero.value.trim(),
            mail: this.mail.value.trim(),
            mensaje: this.mensaje.value.trim()
        };
        
        // Validación básica
        if (!formData.nombre || !formData.numero || !formData.mail || !formData.mensaje) {
            mostrarMensaje('Por favor, completa todos los campos.', 'error');
            return;
        }
        
        // Validar email
        if (!validarEmail(formData.mail)) {
            mostrarMensaje('Por favor, ingresa un email válido.', 'error');
            return;
        }
        
        // Validar teléfono (solo números y espacios)
        if (!validarTelefono(formData.numero)) {
            mostrarMensaje('Por favor, ingresa un número de teléfono válido.', 'error');
            return;
        }
        
        // Aquí puedes agregar la lógica para enviar el formulario
        // Por ejemplo, usando fetch() para enviar a un servidor
        enviarFormulario(formData);
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

// Función para enviar el formulario
function enviarFormulario(data) {
    // Mostrar mensaje de envío
    const submitBtn = document.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'ENVIANDO...';
    submitBtn.disabled = true;
    
    // Simular envío (aquí deberías implementar tu lógica real de envío)
    setTimeout(() => {
        // Aquí va tu código para enviar los datos al servidor
        console.log('Datos del formulario:', data);
        
        // Ejemplo con fetch (descomentar y ajustar según tu backend):
        /*
        fetch('/api/contacto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            mostrarMensaje('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
            contactoForm.reset();
        })
        .catch(error => {
            mostrarMensaje('Error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
        });
        */
        
        // Simulación de éxito
        mostrarMensaje('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
        contactoForm.reset();
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
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