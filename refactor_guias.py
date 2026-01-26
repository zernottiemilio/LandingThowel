#!/usr/bin/env python3
# Script para refactorizar automáticamente los archivos de guías y correderas

import re
import os

# Template base - similar a bisagraSoftClosing.html
TEMPLATE = '''<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - THOWEL</title>
    <link rel="icon" type="image/png" href="/assets/LOGO-11.png">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/CSS/guiasCorrederas.css">
    <script src="https://cdn.jsdelivr.net/npm/i18next@23.7.6/i18next.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
    <link rel="stylesheet" href="/CSS/responsive.css">
</head>
<body{body_class}>
  <!-- Navbar flotante -->
  <nav class="navbar">
        <!-- Logo mobile (solo visible en mobile, arriba a la izquierda) -->
        <a href="/index.html" class="logo-mobile"><img src="/assets/logoHeader.png" alt="THOWEL"></a>

        <!-- Botón hamburguesa (solo visible en mobile) -->
        <button class="hamburger" id="hamburger" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
        </button>

        <ul class="nav-menu" id="navMenu">
        <li><a href="/index.html">INICIO</a></li>
        <li>
            <a href="#productos" class="productos-link">PRODUCTOS</a>
            <div class="dropdown">
                <div class="dropdown-item">
                    <a href="#cajones">CAJONES</a>
                    <div class="subdropdown">
                        <a href="/HTML/ThowelBoxCristal.html">THOWEL BOX CRISTAL</a>
                        <a href="/HTML/thowelBoxPlus.html">THOWEL BOX PLUS</a>
                        <a href="/HTML/thowelBox.html">THOWEL BOX</a>
                    </div>
                </div>
                <div class="dropdown-item">
                    <a href="#bisagras">BISAGRAS</a>
                    <div class="subdropdown">
                        <a href="/HTML/bisagraClip3D.html">BISAGRA CLIP 3D</a>
                        <a href="/HTML/bisagraSoftClosing.html">BISAGRA SOFT CLOSING</a>
                        <a href="/HTML/bisagraCazoletaEstandar.html">BISAGRA CAZOLETA</a>
                        <a href="/HTML/bisagraPushOpen.html">BISAGRA PUSH OPEN</a>
                        <a href="/HTML/bisagraCazoleta155.html">BISAGRA ANGULOS ESPECIALES</a>
                        <a href="/HTML/retenExpulsor.html">RETÉN EXPULSOR</a>
                        <a href="/HTML/PistonAGAS.html">PISTÓN A GAS</a>
                    </div>
                </div>
                <div class="dropdown-item">
                    <a href="#guias">GUÍAS Y CORREDERAS</a>
                    <div class="subdropdown">
                        <a href="/HTML/guiaOculta3DSoftClosing.html">GUÍA OCULTA 3D SOFT CLOSING</a>
                        <a href="/HTML/guiaOcultaPushOpen.html">GUÍA OCULTA PUSH OPEN</a>
                        <a href="/HTML/correderaTelescopicaSoftClosing.html">CORREDERA TELESCÓPICA SOFT CLOSING</a>
                        <a href="/HTML/correderaTelescopicaPushOpen.html">CORREDERA TELESCÓPICA PUSH OPEN</a>
                        <a href="/HTML/correderaTelescopicaEstandarH45.html">CORREDERA TELESCÓPICA ESTÁNDAR H45</a>
                        <a href="/HTML/correderaTelescopicaEstandarH35.html">CORREDERA TELESCÓPICA ESTÁNDAR H35</a>
                        <a href="/HTML/correderaZ.html">CORREDERA Z</a>
                    </div>
                </div>
                <div class="dropdown-item">
                    <a href="#tiradores">TIRADORES, MANIJAS Y SISTEMAS DE APOYO</a>
                    <div class="subdropdown">
                        <a href="/HTML/manijas.html">MANIJAS</a>
                        <a href="/HTML/sistemasApoyo.html">SISTEMAS DE APOYO</a>
                    </div>
                </div>
        </li>
        <li><a href="/index.html" class="logo"><img src="/assets/logoHeader.png" alt="THOWEL"></a></li>
        <li><a href="/HTML/sobreNosotros.html">SOBRE NOSOTROS</a></li>
        <li><a href="/HTML/contacto.html">CONTACTOS</a></li>    </ul>
</nav>

    <!-- Sección Unificada con Efecto Scroll -->
    <section class="producto-section producto-section-unified">
        <div class="dual-content">
            <!-- Contenedor de imágenes sticky -->
            <div class="left-content">
                <div class="image-sticky-container">
                    <img src="{img1}" alt="{title}" class="active" data-section="descripcion">
                    <img src="{img2}" alt="Ambiente {title}" data-section="especificaciones">
                    <img src="{img3}" alt="Detalles {title}" data-section="detalles">
                </div>
            </div>

            <!-- Contenedor de textos -->
            <div class="right-content">
                <!-- Sección 1: Descripción -->
                <div class="text-section" data-section="descripcion">
{section1_content}
                </div>

                <!-- Sección 2: Especificaciones -->
                <div class="text-section" data-section="especificaciones">
{section2_content}
                </div>

                <!-- Sección 3: Detalles adicionales -->
                <div class="text-section" data-section="detalles">
                    <p class="specs-intro">
                        {detalles_text}
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Sección 5: Productos Similares (Carousel) -->
    <section class="productos-similares">
        <h2 class="similares-titulo" data-i18n="productPage.similarProducts">PRODUCTOS SIMILARES</h2>
        <div class="catalog-carousel">
            <button class="carousel-nav prev-btn" id="prevBtn"><i class="fas fa-chevron-left"></i></button>
            <button class="carousel-nav next-btn" id="nextBtn"><i class="fas fa-chevron-right"></i></button>
            <div class="catalog-track" id="catalogTrack">
                <!-- CAJONES -->
                <a href="/HTML/ThowelBoxCristal.html" class="catalog-item">
                    <img src="/assets/thowel box cristal/THOWELBOXCRISTAL.png" alt="Thowel Box Cristal">
                    <div class="catalog-overlay"><div class="catalog-overlay-text">THOWEL BOX CRISTAL</div></div>
                </a>
                <a href="/HTML/thowelBoxPlus.html" class="catalog-item">
                    <img src="/assets/thowel box plus/THOWELBOXPLUS.png" alt="Thowel Box Plus">
                    <div class="catalog-overlay"><div class="catalog-overlay-text">THOWEL BOX PLUS</div></div>
                </a>

                <!-- BISAGRAS -->
                <a href="/HTML/bisagraClip3D.html" class="catalog-item">
                    <img src="/assets/bisagra clip 3D/BISAGRACLIP.png" alt="Bisagra Clip 3D">
                    <div class="catalog-overlay"><div class="catalog-overlay-text">BISAGRA CLIP 3D</div></div>
                </a>
                <a href="/HTML/bisagraSoftClosing.html" class="catalog-item">
                    <img src="/assets/bisagra soft closing/BSC.png" alt="Bisagra Soft Closing">
                    <div class="catalog-overlay"><div class="catalog-overlay-text">BISAGRA SOFT CLOSING</div></div>
                </a>
                <a href="/HTML/bisagraCazoletaEstandar.html" class="catalog-item">
                    <img src="/assets/bisagra cazoleta estandar/BISAGRACAZOLETAESTANDAR.png" alt="Bisagra Cazoleta">
                    <div class="catalog-overlay"><div class="catalog-overlay-text">BISAGRA CAZOLETA</div></div>
                </a>
                <a href="/HTML/bisagraPushOpen.html" class="catalog-item">
                    <img src="/assets/bisagra push open/BISAGRAPUSHOPEN.png" alt="Bisagra Push Open">
                    <div class="catalog-overlay"><div class="catalog-overlay-text">BISAGRA PUSH OPEN</div></div>
                </a>
                <a href="/HTML/PistonAGAS.html" class="catalog-item">
                    <img src="/assets/piston a gas/PISTONAGAS.png" alt="Pistón a Gas">
                    <div class="catalog-overlay"><div class="catalog-overlay-text">PISTÓN A GAS</div></div>
                </a>
                <a href="/HTML/guiaOculta3DSoftClosing.html" class="catalog-item">
                    <img src="/assets/Guia oculta push Open/GUIA OCULTA.JPG" alt="Guía Oculta 3D">
                    <div class="catalog-overlay"><div class="catalog-overlay-text">GUÍA OCULTA 3D SOFT CLOSING</div></div>
                </a>
                <a href="/HTML/guiaOcultaPushOpen.html" class="catalog-item">
                    <img src="/assets/Guia oculta push Open/GUIA OCULTA.JPG" alt="Guía Oculta Push">
                    <div class="catalog-overlay"><div class="catalog-overlay-text">GUÍA OCULTA PUSH OPEN</div></div>
                </a>
                <a href="/HTML/correderaTelescopicaSoftClosing.html" class="catalog-item">
                    <img src="/assets/corredera telescópica estándar H35/CORREDERA TELESCOPICA ESTANDAR H35 (2).JPG" alt="Corredera Telescópica Soft">
                    <div class="catalog-overlay"><div class="catalog-overlay-text">CORREDERA TELESCÓPICA SOFT CLOSING</div></div>
                </a>
                <a href="/HTML/correderaTelescopicaPushOpen.html" class="catalog-item">
                    <img src="/assets/corredera telescópica estándar H45/CORREDERA TELESCOPICA ESTANDAR H45 (2).JPG" alt="Corredera Telescópica Push">
                    <div class="catalog-overlay"><div class="catalog-overlay-text">CORREDERA TELESCÓPICA PUSH OPEN</div></div>
                </a>
                <a href="/HTML/correderaTelescopicaEstandarH45.html" class="catalog-item">
                    <img src="/assets/corredera telescópica estándar H45/CORREDERA TELESCOPICA ESTANDAR H45 (2).JPG" alt="Corredera H45">
                    <div class="catalog-overlay"><div class="catalog-overlay-text">CORREDERA TELESCÓPICA H45</div></div>
                </a>
                <a href="/HTML/correderaTelescopicaEstandarH35.html" class="catalog-item">
                    <img src="/assets/corredera telescópica estándar H35/CORREDERA TELESCOPICA ESTANDAR H35 (2).JPG" alt="Corredera H35">
                    <div class="catalog-overlay"><div class="catalog-overlay-text">CORREDERA TELESCÓPICA H35</div></div>
                </a>
                <a href="/HTML/correderaZ.html" class="catalog-item">
                    <img src="/assets/corredera Z/CORREDERA Z (2).JPG" alt="Corredera Z">
                    <div class="catalog-overlay"><div class="catalog-overlay-text">CORREDERA Z</div></div>
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer-red">
        <div class="footer-container">
            <div class="footer-hexagons">
                <a href="mailto:info@thowel.com" class="hexagon hex-mail" title="Email"><img src="/assets/MAIL.png" alt="Email"></a>
                <a href="#" class="hexagon hex-instagram" title="Instagram" target="_blank"><img src="/assets/INSTAGRAM.png" alt="Instagram"></a>
            </div>
            <div class="footer-content">
                <p data-i18n="footer.copyright">&copy; 2025 THOWEL. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>

    <script src="/JS/common.js"></script>
    <script src="/JS/Bisagras.js"></script>
    <script src="/JS/i18n.js"></script>
</body>
</html>
'''

def extract_section1(content):
    """Extrae el contenido de la sección 1 (descripción)"""
    match = re.search(r'<div class="right-content">(.*?)</div>\s*</div>\s*</section>', content, re.DOTALL)
    if match:
        return match.group(1).strip()
    return ""

def extract_section2_specs(content):
    """Extrae el contenido de especificaciones de la sección 2"""
    match = re.search(r'<section class="producto-section section-2">.*?<div class="right-content">(.*?)</div>\s*</div>\s*</section>', content, re.DOTALL)
    if match:
        return match.group(1).strip()
    return ""

# Datos específicos de cada producto
productos = {
    'guiaOcultaPushOpen.html': {
        'title': 'Guía Oculta Push Open',
        'body_class': '',
        'img1': '/assets/Guia oculta push Open/dibujo de plano.png',
        'img2': '/assets/Guia oculta push Open/GUIA OCULTA (2).JPG',
        'img3': '/assets/Guia oculta push Open/dibujo de plano.png',
        'detalles_text': 'Sistema de guía oculta con apertura por presión, ideal para muebles sin manijas con diseño minimalista.'
    },
    'correderaTelescopicaSoftClosing.html': {
        'title': 'Corredera Telescópica Soft Closing',
        'body_class': '',
        'img1': '/assets/Guia oculta push Open/GUIA OCULTA.JPG',
        'img2': '/assets/ambiente.png',
        'img3': '/assets/Guia oculta push Open/GUIA OCULTA.JPG',
        'detalles_text': 'Corredera telescópica con cierre amortiguado que proporciona deslizamiento suave y extensión completa.'
    },
    'correderaTelescopicaPushOpen.html': {
        'title': 'Corredera Telescópica Push Open',
        'body_class': ' class="page-corredera-push"',
        'img1': '/assets/corredera telescópica push Open/dibujo del plano.png',
        'img2': '/assets/ambiente.png',
        'img3': '/assets/corredera telescópica push Open/dibujo del plano.png',
        'detalles_text': 'Corredera telescópica con sistema push open para apertura sin manijas, ideal para diseños modernos.'
    },
    'correderaTelescopicaEstandarH45.html': {
        'title': 'Corredera Telescópica Estandar H45',
        'body_class': '',
        'img1': '/assets/corredera telescópica estándar H45/CORREDERA TELESCOPICA ESTANDAR H45 (2).JPG',
        'img2': '/assets/ambiente.png',
        'img3': '/assets/corredera telescópica estándar H45/CORREDERA TELESCOPICA ESTANDAR H45 (2).JPG',
        'detalles_text': 'Corredera telescópica estándar H45 con excelente capacidad de carga y durabilidad.'
    },
    'correderaTelescopicaEstandarH35.html': {
        'title': 'Corredera Telescópica Estándar H35',
        'body_class': '',
        'img1': '/assets/corredera telescópica estándar H35/CORREDERA TELESCOPICA ESTANDAR H35 (2).JPG',
        'img2': '/assets/corredera telescópica estándar H35/CORREDERA TELESCOPICA ESTANDAR H35.JPG',
        'img3': '/assets/corredera telescópica estándar H35/CORREDERA TELESCOPICA ESTANDAR H35 (2).JPG',
        'detalles_text': 'Corredera telescópica estándar H35 con 80,000 ciclos de uso y capacidad de carga de 20 unidades.'
    },
    'correderaZ.html': {
        'title': 'Corredera Z',
        'body_class': '',
        'img1': '/assets/corredera Z/CORREDERA Z (2).JPG',
        'img2': '/assets/corredera Z/CORREDERA Z.JPG',
        'img3': '/assets/corredera Z/CORREDERA Z (2).JPG',
        'detalles_text': 'Corredera tipo Z ideal para instalaciones específicas con espacio reducido.'
    }
}

# Procesar cada archivo
base_path = '/Users/dev-zernotti/Documents/LandingThowel/HTML'
for filename, data in productos.items():
    print(f"Procesando {filename}...")

    # Leer archivo original
    with open(os.path.join(base_path, filename), 'r', encoding='utf-8') as f:
        content = f.read()

    # Extraer sección 1 y 2
    section1 = extract_section1(content)
    section2 = extract_section2_specs(content)

    # Generar nuevo HTML
    new_content = TEMPLATE.format(
        title=data['title'],
        body_class=data['body_class'],
        img1=data['img1'],
        img2=data['img2'],
        img3=data['img3'],
        section1_content=section1,
        section2_content=section2,
        detalles_text=data['detalles_text']
    )

    # Escribir nuevo archivo
    with open(os.path.join(base_path, filename), 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"✓ {filename} refactorizado")

print("\n✅ Todos los archivos de guías/correderas han sido refactorizados!")
