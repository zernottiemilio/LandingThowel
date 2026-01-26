#!/usr/bin/env python3
# Script para refactorizar automáticamente los archivos de cajones

import re
import os

# Template base similar a bisagraSoftClosing.html
TEMPLATE = '''<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - THOWEL</title>
    <link rel="icon" type="image/png" href="/assets/LOGO-11.png">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/CSS/{css_file}">
    <script src="https://cdn.jsdelivr.net/npm/i18next@23.7.6/i18next.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
    <link rel="stylesheet" href="/CSS/responsive.css">
</head>
<body>
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
                            <a href="/HTML/bisagraCazoletaEstandar.html">BISAGRA CAZOLETA ESTANDAR</a>
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
                </div>
            </li>
            <li><a href="/index.html" class="logo"><img src="/assets/logoHeader.png" alt="THOWEL"></a></li>
            <li><a href="/HTML/sobreNosotros.html">SOBRE NOSOTROS</a></li>
            <a href="/HTML/contacto.html">CONTACTOS</a></li>        </ul>
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
{section3_content}
                </div>
            </div>
        </div>
    </section>

    <!-- Sección 5: Productos Similares (Carousel) -->
    <section class="productos-similares">
        <h2 class="similares-titulo">PRODUCTOS SIMILARES</h2>
        <div class="catalog-carousel">
            <!-- Navigation Arrows -->
            <button class="carousel-nav prev-btn" id="prevBtn">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="carousel-nav next-btn" id="nextBtn">
                <i class="fas fa-chevron-right"></i>
            </button>

            <!-- Carousel Track -->
            <div class="catalog-track" id="catalogTrack">
                <div class="catalog-item">
                    <img src="/assets/bisagra angulos especiales/BISAGRAANGULOSESPECIALES135.png" alt="Bisagra Ángulos Especiales 135">
                    <div class="catalog-overlay">
                        <div class="catalog-overlay-text">BISAGRA ANGULOS ESPECIALES 135</div>
                    </div>
                </div>
                <div class="catalog-item">
                    <img src="/assets/bisagra angulos especiales/BISAGRAANGULOSESPECIALES175.png" alt="Bisagra Ángulos Especiales 175">
                    <div class="catalog-overlay">
                        <div class="catalog-overlay-text">BISAGRAS ANGULOS ESPECIALES 175</div>
                    </div>
                </div>
                <div class="catalog-item">
                    <img src="/assets/bisagra cazoleta estandar/BISAGRACAZOLETAESTANDAR.png" alt="Bisagra Cazoleta Estandar">
                    <div class="catalog-overlay">
                        <div class="catalog-overlay-text">BISAGRA CAZOLETA ESTANDAR</div>
                    </div>
                </div>
                <div class="catalog-item">
                    <img src="/assets/bisagra clip 3D/BISAGRACLIP.png" alt="Bisagra Clip">
                    <div class="catalog-overlay">
                        <div class="catalog-overlay-text">BISAGRA CLIP</div>
                    </div>
                </div>
                <div class="catalog-item">
                    <img src="/assets/bisagra push open/BISAGRAPUSHOPEN.png" alt="Bisagra Push Open">
                    <div class="catalog-overlay">
                        <div class="catalog-overlay-text">BISAGRA PUSH OPEN</div>
                    </div>
                </div>
                <div class="catalog-item">
                    <img src="/assets/bisagra soft closing/BSC.png" alt="Bisagra Soft Closing">
                    <div class="catalog-overlay">
                        <div class="catalog-overlay-text">BISAGRA SOFT CLOSING</div>
                    </div>
                </div>
                <div class="catalog-item">
                    <img src="/assets/thowel box cristal/THOWELBOXCRISTAL.png" alt="Thowel Box Cristal">
                    <div class="catalog-overlay">
                        <div class="catalog-overlay-text">THOWEL BOX CRISTAL</div>
                    </div>
                </div>
                <div class="catalog-item">
                    <img src="/assets/thowel box plus/THOWELBOXPLUS.png" alt="Thowel Box Plus">
                    <div class="catalog-overlay">
                        <div class="catalog-overlay-text">THOWEL BOX PLUS</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer-red">
    <div class="footer-container">
        <!-- Hexágonos decorativos -->
        <div class="footer-hexagons">
            <a href="mailto:info@thowel.com" class="hexagon hex-mail" title="Email"><img src="/assets/MAIL.png" alt="Email"></a>
            <a href="#" class="hexagon hex-instagram" title="Instagram" target="_blank"><img src="/assets/INSTAGRAM.png" alt="Instagram"></a>
        </div>

        <!-- Contenido del footer -->
        <div class="footer-content">
            <p>&copy; 2025 THOWEL. Todos los derechos reservados.</p>
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
    match = re.search(r'<section class="producto-section section-1">.*?<div class="right-content">(.*?)</div>\s*</div>\s*</section>', content, re.DOTALL)
    if match:
        return match.group(1).strip()
    return ""

def extract_section2(content):
    """Extrae el contenido de especificaciones de la sección 2"""
    match = re.search(r'<section class="producto-section section-2">.*?<div class="right-content">(.*?)</div>\s*</div>\s*</section>', content, re.DOTALL)
    if match:
        return match.group(1).strip()
    return ""

def extract_section3(content):
    """Extrae el contenido de la sección 3"""
    match = re.search(r'<section class="producto-section section-3">.*?<div class="right-content">(.*?)</div>\s*</div>\s*</section>', content, re.DOTALL)
    if match:
        return match.group(1).strip()
    return ""

# Datos específicos de cada producto
productos = {
    'ThowelBoxCristal.html': {
        'title': 'ThoweBox Cristal',
        'css_file': 'ThowelBoxCristal.css',
        'img1': '/assets/thowel box cristal/THOWELBOXCRISTAL.png',
        'img2': '/assets/thowel box cristal/cristalambiente.JPG',
        'img3': '/assets/thowel box cristal/ThowelBoxCristalAmbiente.png',
    },
    'thowelBoxPlus.html': {
        'title': 'ThowelBox Plus',
        'css_file': 'ThowelBoxPlus.css',
        'img1': '/assets/thowel box plus/THOWELBOXPLUS.png',
        'img2': '/assets/thowel box plus/ambientethowelboxplus.JPG',
        'img3': '/assets/thowel box/Escena 39.png',
    },
    'thowelBox.html': {
        'title': 'ThowelBox',
        'css_file': 'thowelBox.css',
        'img1': '/assets/thowel box/THOWELBOX.JPG',
        'img2': '/assets/thowel box/ambienteThowelbox.JPG',
        'img3': '/assets/thowel box plus/ThowelBoxPlus (1).png',
    }
}

# Procesar cada archivo
base_path = '/Users/dev-zernotti/Documents/LandingThowel/HTML'
for filename, data in productos.items():
    print(f"Procesando {filename}...")

    # Leer archivo original
    with open(os.path.join(base_path, filename), 'r', encoding='utf-8') as f:
        content = f.read()

    # Extraer secciones
    section1 = extract_section1(content)
    section2 = extract_section2(content)
    section3 = extract_section3(content)

    # Generar nuevo HTML
    new_content = TEMPLATE.format(
        title=data['title'],
        css_file=data['css_file'],
        img1=data['img1'],
        img2=data['img2'],
        img3=data['img3'],
        section1_content=section1,
        section2_content=section2,
        section3_content=section3
    )

    # Escribir nuevo archivo
    with open(os.path.join(base_path, filename), 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"✓ {filename} refactorizado")

print("\n✅ Todos los archivos de cajones han sido refactorizados!")
