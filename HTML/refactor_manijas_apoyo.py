#!/usr/bin/env python3
"""
Script para refactorizar manijas.html y sistemasApoyo.html con estructura sticky
"""

from bs4 import BeautifulSoup
import re

def refactor_manijas():
    """Refactoriza manijas.html con estructura sticky para cada producto"""

    with open('manijas.html', 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    # Encontrar todas las secciones de producto
    sections = soup.find_all('section', class_='producto-section')

    for section in sections:
        # Skip carousel section
        if 'productos-similares' in section.get('class', []):
            continue

        # Cambiar la clase a producto-section-unified
        section['class'] = ['producto-section', 'producto-section-unified']

        # Encontrar dual-content
        dual_content = section.find('div', class_='dual-content')
        if not dual_content:
            continue

        # Obtener left-content (imagen)
        left_content = dual_content.find('div', class_='left-content')
        if not left_content:
            continue

        # Obtener todas las imágenes del left-content
        images = left_content.find_all('img')

        # Si solo hay una imagen, necesitamos crear las 3 imágenes para el sticky effect
        if len(images) == 1:
            img_src = images[0].get('src', '')
            img_alt = images[0].get('alt', '')

            # Crear el contenedor sticky con 3 imágenes
            new_left_content = f'''<div class="left-content">
                <div class="image-sticky-container">
                    <img src="{img_src}" alt="{img_alt}" class="active" data-section="descripcion">
                    <img src="{img_src}" alt="{img_alt}" data-section="especificaciones">
                    <img src="{img_src}" alt="{img_alt}" data-section="codazos">
                </div>
            </div>'''

            # Reemplazar left-content
            left_soup = BeautifulSoup(new_left_content, 'html.parser')
            left_content.replace_with(left_soup.find('div'))

        # Ahora necesitamos reorganizar right-content
        # Obtener todos los right-content (puede haber múltiples incorrectamente)
        right_contents = dual_content.find_all('div', class_='right-content')

        if len(right_contents) > 0:
            # Crear un nuevo right-content unificado con 3 secciones
            new_right_content = soup.new_tag('div', **{'class': 'right-content'})

            # Sección 1: Descripción (badge, título, descripciones)
            section1 = soup.new_tag('div', **{'class': 'text-section', 'data-section': 'descripcion'})

            # Buscar badge, título y descripciones en el primer right-content
            first_right = right_contents[0]
            badge = first_right.find('div', class_='badge-thowel')
            titulo = first_right.find('h1', class_='producto-titulo')
            descripciones = first_right.find_all('p', class_='producto-descripcion')

            if badge:
                section1.append(badge.extract())
            if titulo:
                section1.append(titulo.extract())
            for desc in descripciones:
                section1.append(desc.extract())

            new_right_content.append(section1)

            # Sección 2: Especificaciones
            section2 = soup.new_tag('div', **{'class': 'text-section', 'data-section': 'especificaciones'})

            # Buscar specs-intro
            specs_intro = None
            diagrama = None
            for rc in right_contents:
                if not specs_intro:
                    specs_intro = rc.find('p', class_='specs-intro')
                if not diagrama:
                    diagrama = rc.find('div', class_='diagrama-tecnico')
                    if not diagrama:
                        diagrama = rc.find('div', class_='imagenes-lado-a-lado')

            if specs_intro:
                section2.append(specs_intro.extract())
            if diagrama:
                section2.append(diagrama.extract())

            new_right_content.append(section2)

            # Sección 3: Detalles adicionales
            section3 = soup.new_tag('div', **{'class': 'text-section', 'data-section': 'codazos'})

            # Agregar cualquier contenido restante o un párrafo placeholder
            section3_p = soup.new_tag('p', **{'class': 'specs-intro'})
            section3_p.string = 'Solución completa para la industria del mueble.'
            section3.append(section3_p)

            new_right_content.append(section3)

            # Eliminar todos los right-content antiguos
            for rc in right_contents:
                rc.decompose()

            # Agregar el nuevo right-content
            dual_content.append(new_right_content)

    # Guardar el archivo
    with open('manijas.html', 'w', encoding='utf-8') as f:
        f.write(str(soup.prettify()))

    print("✅ manijas.html refactorizado")


def refactor_sistemasApoyo():
    """Refactoriza sistemasApoyo.html con estructura sticky para cada producto"""

    with open('sistemasApoyo.html', 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    # Encontrar todas las secciones de producto
    sections = soup.find_all('section', class_='producto-section')

    for section in sections:
        # Skip carousel section
        if 'productos-similares' in section.get('class', []):
            continue

        # Cambiar la clase a producto-section-unified
        section['class'] = ['producto-section', 'producto-section-unified']

        # Encontrar dual-content
        dual_content = section.find('div', class_='dual-content')
        if not dual_content:
            continue

        # Obtener left-content (imagen)
        left_content = dual_content.find('div', class_='left-content')
        if not left_content:
            continue

        # Obtener todas las imágenes del left-content
        images = left_content.find_all('img')

        # Si solo hay una imagen, necesitamos crear las 3 imágenes para el sticky effect
        if len(images) == 1:
            img_src = images[0].get('src', '')
            img_alt = images[0].get('alt', '')

            # Crear el contenedor sticky con 3 imágenes
            new_left_content = f'''<div class="left-content">
                <div class="image-sticky-container">
                    <img src="{img_src}" alt="{img_alt}" class="active" data-section="descripcion">
                    <img src="{img_src}" alt="{img_alt}" data-section="especificaciones">
                    <img src="{img_src}" alt="{img_alt}" data-section="codazos">
                </div>
            </div>'''

            # Reemplazar left-content
            left_soup = BeautifulSoup(new_left_content, 'html.parser')
            left_content.replace_with(left_soup.find('div'))

        # Ahora necesitamos reorganizar right-content
        # Obtener todos los right-content (puede haber múltiples incorrectamente)
        right_contents = dual_content.find_all('div', class_='right-content')

        if len(right_contents) > 0:
            # Crear un nuevo right-content unificado con 3 secciones
            new_right_content = soup.new_tag('div', **{'class': 'right-content'})

            # Sección 1: Descripción (badge, título, descripciones)
            section1 = soup.new_tag('div', **{'class': 'text-section', 'data-section': 'descripcion'})

            # Buscar badge, título y descripciones en el primer right-content
            first_right = right_contents[0]
            badge = first_right.find('div', class_='badge-thowel')
            titulo = first_right.find('h1', class_='producto-titulo')
            descripciones = first_right.find_all('p', class_='producto-descripcion')
            diagrama_first = first_right.find('div', class_='diagrama-tecnico')

            if badge:
                section1.append(badge.extract())
            if titulo:
                section1.append(titulo.extract())
            for desc in descripciones:
                section1.append(desc.extract())
            if diagrama_first:
                section1.append(diagrama_first.extract())

            new_right_content.append(section1)

            # Sección 2: Especificaciones
            section2 = soup.new_tag('div', **{'class': 'text-section', 'data-section': 'especificaciones'})

            # Buscar specs-intro y specs-table-image
            specs_intro = None
            specs_table = None
            for rc in right_contents:
                if not specs_intro:
                    specs_intro = rc.find('p', class_='specs-intro')
                if not specs_table:
                    specs_table = rc.find('div', class_='specs-table-image')

            if specs_intro:
                section2.append(specs_intro.extract())
            if specs_table:
                section2.append(specs_table.extract())

            new_right_content.append(section2)

            # Sección 3: Detalles adicionales
            section3 = soup.new_tag('div', **{'class': 'text-section', 'data-section': 'codazos'})

            # Agregar un párrafo placeholder
            section3_p = soup.new_tag('p', **{'class': 'specs-intro'})
            section3_p.string = 'Sistema de apoyo confiable para todo tipo de mobiliario.'
            section3.append(section3_p)

            new_right_content.append(section3)

            # Eliminar todos los right-content antiguos
            for rc in right_contents:
                rc.decompose()

            # Agregar el nuevo right-content
            dual_content.append(new_right_content)

    # Guardar el archivo
    with open('sistemasApoyo.html', 'w', encoding='utf-8') as f:
        f.write(str(soup.prettify()))

    print("✅ sistemasApoyo.html refactorizado")


if __name__ == '__main__':
    print("🔧 Refactorizando manijas y sistemas de apoyo...")
    refactor_manijas()
    refactor_sistemasApoyo()
    print("\n✅ Refactorización completada")
