// i18n.js - Sistema de internacionalización para THOWEL
(function() {
    'use strict';

    // Esperar a que i18next esté disponible
    function waitForI18next(callback) {
        if (typeof i18next !== 'undefined') {
            callback();
        } else {
            setTimeout(() => waitForI18next(callback), 50);
        }
    }

    // Función para cargar archivos JSON de traducción
    async function loadTranslations() {
        try {
            const esResponse = await fetch('/locales/es.json');
            const esTranslations = await esResponse.json();

            const enResponse = await fetch('/locales/en.json');
            const enTranslations = await enResponse.json();

            const ptResponse = await fetch('/locales/pt.json');
            const ptTranslations = await ptResponse.json();

            return {
                es: { translation: esTranslations },
                en: { translation: enTranslations },
                pt: { translation: ptTranslations }
            };
        } catch (error) {
            console.error('Error loading translations:', error);
            return null;
        }
    }

    // Función para traducir todos los elementos de la página
    function translatePage() {
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = i18next.t(key);

            // Evitar re-traducir si el contenido es el mismo
            if (element.hasAttribute('data-i18n-html')) {
                if (element.innerHTML !== translation) {
                    element.innerHTML = translation;
                }
            } else {
                // Para inputs y textareas, usar placeholder
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (element.placeholder !== translation) {
                        element.placeholder = translation;
                    }
                } else {
                    if (element.textContent !== translation) {
                        element.textContent = translation;
                    }
                }
            }
        });
    }

    // Función para actualizar el estado visual de los botones de idioma
    function updateLanguageButtons(currentLang) {
        const buttons = document.querySelectorAll('.language-btn');
        buttons.forEach(btn => {
            const btnLang = btn.getAttribute('data-lang');
            if (btnLang === currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Función para cambiar el idioma
    function changeLanguage(lang) {
        i18next.changeLanguage(lang, (err) => {
            if (err) {
                console.error('Error changing language:', err);
                return;
            }

            localStorage.setItem('language', lang);
            document.documentElement.lang = lang;
            translatePage();
            updateLanguageButtons(lang);
        });
    }

    // Función para inicializar i18next
    async function initI18n() {
        const resources = await loadTranslations();
        if (!resources) {
            console.error('Failed to load translations');
            return;
        }

        const savedLang = localStorage.getItem('language') || 'es';

        i18next.init({
            lng: savedLang,
            fallbackLng: 'es',
            debug: false,
            resources: resources
        }, function(err, t) {
            if (err) {
                console.error('Error initializing i18next:', err);
                return;
            }

            translatePage();
            document.documentElement.lang = i18next.language;

            // Configurar botones de idioma
            const buttons = document.querySelectorAll('.language-btn');
            buttons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lang = btn.getAttribute('data-lang');
                    changeLanguage(lang);
                });
            });

            updateLanguageButtons(i18next.language);
        });
    }

    // Inicializar cuando esté todo listo
    waitForI18next(() => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initI18n);
        } else {
            initI18n();
        }
    });

    // Exportar función global
    window.changeLanguage = changeLanguage;
})();
