import { useTranslation } from "react-i18next";

export function Hero() {
  const { t } = useTranslation();

  const scrollToShowcase = () => {
    const el = document.getElementById("products-showcase");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden z-[100]">
      <img
        src="/assets/portada.png"
        alt="Portada"
        className="absolute inset-0 w-full h-full object-cover z-[1]"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white z-10 w-[92%] max-w-[1400px]">
        <h1 className="font-bold uppercase text-shadow-hero mb-3 leading-[1.05] tracking-tight whitespace-nowrap text-[clamp(1.5rem,4vw,3rem)]">
          {t("home.hero.title")}
        </h1>
        <p className="font-normal leading-snug max-w-2xl mx-auto text-[clamp(0.95rem,1.2vw,1.25rem)]">
          {t("home.hero.subtitle")}
        </p>
      </div>

      <button
        type="button"
        onClick={scrollToShowcase}
        className="absolute bottom-0 left-0 w-full z-10 cursor-pointer block animate-bounce"
        aria-label="Ver productos"
      >
        <img
          src="/assets/FLECHAINICIO.png"
          alt=""
          className="w-full h-auto block object-cover"
          loading="eager"
          decoding="async"
        />
      </button>
    </section>
  );
}
