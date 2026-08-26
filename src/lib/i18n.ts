import i18n from "i18next";
import { initReactI18next } from "react-i18next";

/**
 * i18n fijo en español. El sitio ya no tiene selector de idioma.
 * Mantengo react-i18next para no tener que reescribir todos los t() de las páginas,
 * pero cargo únicamente el diccionario `es`.
 */
async function loadEs() {
  const res = await fetch("/locales/es.json");
  if (!res.ok) throw new Error("No se pudo cargar el diccionario en español");
  return res.json();
}

export async function initI18n() {
  const es = await loadEs().catch((err) => {
    console.warn("i18n: fallo al cargar es.json", err);
    return {};
  });

  await i18n.use(initReactI18next).init({
    resources: { es: { translation: es } },
    lng: "es",
    fallbackLng: "es",
    supportedLngs: ["es"],
    interpolation: { escapeValue: false },
  });

  return i18n;
}

export default i18n;
