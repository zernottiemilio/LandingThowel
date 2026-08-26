import { useTranslation } from "react-i18next";

export function CatalogHeader() {
  const { t } = useTranslation();
  return (
    <section
      id="catalogo"
      className="relative z-[100] bg-thowel-bg pt-12 md:pt-16 pb-10 md:pb-14 overflow-hidden"
    >
      {/* Barra vertical azul (alineada con el centro visible del círculo cortado) */}
      <div
        aria-hidden
        className="absolute left-[-2px] md:left-[1px] top-0 bottom-0 w-[10px] md:w-[14px] bg-thowel-blue-deep"
      />

      {/* Círculo azul con chevron cortado a la izquierda */}
      <div
        aria-hidden
        className="absolute -left-7 md:-left-8 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-thowel-blue-deep flex items-center justify-end pr-2 md:pr-3 shadow-soft z-10"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pl-14 md:pl-20 lg:pl-24 pr-6 md:pr-16 lg:pr-24">
        {/* Título CATÁLOGO con tooltip "Ver catálogo" en hover */}
        <a
          href="/assets/catalogo-thowel-2026.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-block"
        >
          <span className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-thowel-blue-deep text-white text-sm font-semibold px-4 py-1.5 rounded-md whitespace-nowrap shadow-soft">
            Ver catálogo
            <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-thowel-blue-deep" />
          </span>
          <h2 className="uppercase font-black tracking-tight text-thowel-blue-deep leading-none text-[clamp(1.75rem,3.5vw,3rem)] transition-colors group-hover:text-thowel-blue">
            {t("home.catalog.title")}
          </h2>
        </a>

        {/* Descripción a la derecha */}
        <p className="md:max-w-md text-left md:text-right text-[15px] md:text-base text-thowel-text-soft leading-relaxed pb-1">
          {t("home.catalog.description")}
        </p>
      </div>
    </section>
  );
}
