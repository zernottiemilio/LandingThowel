import re
import os

# Lista de archivos a refactorizar
archivos_a_refactorizar = [
    'bisagraPushOpen.html',
    'PistonAGAS.html',
    'guiaOculta3DSoftClosing.html',
    'guiaOcultaPushOpen.html',
    'correderaTelescopicaSoftClosing.html',
    'correderaTelescopicaPushOpen.html',
    'correderaTelescopicaEstandarH45.html',
    'correderaTelescopicaEstandarH35.html',
    'correderaZ.html'
]

# Leer bisagraSoftClosing.html como referencia
with open('bisagraSoftClosing.html', 'r', encoding='utf-8') as f:
    template = f.read()

def extraer_imagenes(content):
    """Extrae las imágenes del contenido original"""
    imagenes = []
    # Buscar todas las imágenes en secciones
    img_pattern = r'<img src="([^"]+)"'
    matches = re.findall(img_pattern, content)
    
    # Filtrar solo las imágenes de productos (excluir logos, navbar, etc)
    for img in matches:
        if '/assets/' in img and 'logo' not in img.lower() and 'MAIL' not in img and 'INSTAGRAM' not in img:
            imagenes.append(img)
    
    return imagenes

def extraer_contenido_seccion(content, seccion_num):
    """Extrae el contenido de una sección específica"""
    pattern = rf'<section[^>]*class="producto-section[^"]*section-{seccion_num}"[^>]*>.*?<div class="right-content">(.*?)</div>\s*</div>\s*</section>'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        return match.group(1).strip()
    return ""

def extraer_texto_section(content):
    """Extrae contenido de text-section"""
    pattern = r'<div class="text-section"[^>]*>(.*?)</div>'
    matches = re.findall(pattern, content, re.DOTALL)
    return matches if matches else []

def refactorizar_archivo(filename):
    print(f"\n📝 Procesando {filename}...")
    
    if not os.path.exists(filename):
        print(f"  ⚠️  Archivo no encontrado: {filename}")
        return False
    
    # Leer archivo original
    with open(filename, 'r', encoding='utf-8') as f:
        content_original = f.read()
    
    # Extraer imágenes
    imagenes = extraer_imagenes(content_original)
    if len(imagenes) < 2:
        print(f"  ⚠️  Solo se encontraron {len(imagenes)} imágenes")
        imagenes = imagenes + [imagenes[0]] * (3 - len(imagenes)) if imagenes else ['/assets/ambiente.png'] * 3
    
    img1 = imagenes[0] if len(imagenes) > 0 else '/assets/ambiente.png'
    img2 = imagenes[1] if len(imagenes) > 1 else img1
    img3 = imagenes[2] if len(imagenes) > 2 else img1
    
    print(f"  📷 Imágenes: {len(imagenes)} encontradas")
    
    # Extraer contenido de las secciones
    sections = []
    
    # Intentar extraer desde text-section primero
    text_sections = extraer_texto_section(content_original)
    if text_sections and len(text_sections) >= 2:
        sections = text_sections[:3]
        print(f"  📄 Contenido extraído de text-sections: {len(sections)} secciones")
    else:
        # Intentar extraer de section-1, section-2, section-3
        for i in range(1, 4):
            sec = extraer_contenido_seccion(content_original, i)
            if sec:
                sections.append(sec)
        print(f"  📄 Contenido extraído de secciones numeradas: {len(sections)} secciones")
    
    # Si no hay suficiente contenido, usar placeholder
    while len(sections) < 3:
        sections.append('<p class="specs-intro">Información del producto.</p>')
    
    # Leer template de bisagraSoftClosing
    with open('bisagraSoftClosing.html', 'r', encoding='utf-8') as f:
        nuevo_contenido = f.read()
    
    # Extraer navbar, footer y carousel del archivo original
    navbar_match = re.search(r'(<nav class="navbar">.*?</nav>)', content_original, re.DOTALL)
    footer_match = re.search(r'(<footer.*?</footer>)', content_original, re.DOTALL)
    carousel_match = re.search(r'(<!-- Sección.*?Productos Similares.*?</section>)', content_original, re.DOTALL)
    scripts_match = re.search(r'(<script.*?</body>)', content_original, re.DOTALL)
    title_match = re.search(r'<title>(.*?)</title>', content_original)
    css_match = re.search(r'<link rel="stylesheet" href="(/CSS/[^"]+)"', content_original)
    
    # Si tiene i18next
    has_i18next = 'i18next' in content_original
    
    # Usar navbar del original si existe, sino del template
    navbar = navbar_match.group(1) if navbar_match else re.search(r'(<nav class="navbar">.*?</nav>)', nuevo_contenido, re.DOTALL).group(1)
    footer = footer_match.group(1) if footer_match else re.search(r'(<footer.*?</footer>)', nuevo_contenido, re.DOTALL).group(1)
    carousel = carousel_match.group(1) if carousel_match else re.search(r'(<!-- Sección.*?Productos Similares.*?</section>)', nuevo_contenido, re.DOTALL).group(1)
    
    title = title_match.group(1) if title_match else "Producto - THOWEL"
    css_file = css_match.group(1) if css_match else "/CSS/bisagraSoftClosing.css"
    
    # Construir el HTML final con la estructura EXACTA de bisagraSoftClosing
    html_final = f'''<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <link rel="icon" type="image/png" href="/assets/LOGO-11.png">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{css_file}">'''
    
    if has_i18next:
        html_final += '''
    <script src="https://cdn.jsdelivr.net/npm/i18next@23.7.6/i18next.min.js"></script>'''
    
    html_final += '''
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
    <link rel="stylesheet" href="/CSS/responsive.css">
</head>
<body>
    ''' + navbar + '''

    <!-- Sección Unificada con Efecto Scroll -->
    <section class="producto-section producto-section-unified">
        <div class="dual-content">
            <!-- Contenedor de imágenes sticky -->
            <div class="left-content">
                <div class="image-sticky-container">
                    <img src="''' + img1 + '''" alt="Producto" class="active" data-section="descripcion">
                    <img src="''' + img2 + '''" alt="Ambiente" data-section="especificaciones">
                    <img src="''' + img3 + '''" alt="Detalles" data-section="codazos">
                </div>
            </div>

            <!-- Contenedor de textos -->
            <div class="right-content">
                <!-- Sección 1: Descripción -->
                <div class="text-section" data-section="descripcion">
''' + sections[0] + '''
                </div>

                <!-- Sección 2: Especificaciones -->
                <div class="text-section" data-section="especificaciones">
''' + sections[1] + '''
                </div>

                <!-- Sección 3: Codazos -->
                <div class="text-section" data-section="codazos">
''' + sections[2] + '''
                </div>
            </div>
        </div>
    </section>

    ''' + carousel + '''

    ''' + footer + '''

    <script src="/JS/common.js"></script>
    <script src="/JS/Bisagras.js"></script>'''
    
    if has_i18next:
        html_final += '''
    <script src="/JS/i18n.js"></script>'''
    
    html_final += '''
</body>
</html>
'''
    
    # Escribir archivo
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html_final)
    
    print(f"  ✅ {filename} refactorizado exitosamente")
    return True

# Procesar todos los archivos
exitosos = 0
for archivo in archivos_a_refactorizar:
    if refactorizar_archivo(archivo):
        exitosos += 1

print(f"\n{'='*60}")
print(f"✅ Refactorización completada: {exitosos}/{len(archivos_a_refactorizar)} archivos")
print(f"{'='*60}\n")
