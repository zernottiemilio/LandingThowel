import { useTranslation } from "react-i18next";

export function CalidadSection() {
  const { t } = useTranslation();
  return (
    <section
      className="relative z-[100] py-16 md:py-24 px-6 md:px-10 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #003399 0%, #0044bb 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
        <div className="flex-1 max-w-2xl">
          <h2 className="uppercase text-white font-bold mb-5 text-[clamp(1.75rem,3.5vw,3rem)] leading-none tracking-wide">
            {t("home.quality.title")}
          </h2>
          <p className="text-white/90 font-light leading-relaxed text-[15px] md:text-base">
            {t("home.quality.description")}
          </p>
        </div>
        <div
          aria-hidden
          className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 bg-white opacity-30"
          style={{
            WebkitMaskImage: "url(/assets/calidad.png)",
            maskImage: "url(/assets/calidad.png)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
      </div>
    </section>
  );
}
