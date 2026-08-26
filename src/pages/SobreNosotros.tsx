import { useTranslation, Trans } from "react-i18next";
import { ScrollytellDual } from "@/components/shared/ScrollytellDual";
import { assetUrl } from "@/lib/asset";

export function SobreNosotros() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero fullscreen con overlay + título */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <img
          src={assetUrl("/assets/PORTADA SOBRE NOSOTROS.png")}
          alt="Portada"
          className="absolute inset-0 w-full h-full object-cover z-[1]"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/15 z-[2]" />
        <h1 className="relative z-[3] text-center text-white leading-[1.4] text-shadow-hero max-w-[1500px] mx-auto px-6 md:px-10 text-[clamp(1.5rem,2.4vw,2.8rem)] font-normal">
          <Trans
            i18nKey="about.headerTitle"
            components={{
              span: <span className="font-bold" />,
              br: <br />,
            }}
          />
        </h1>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[10] text-white animate-bounce">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-md"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* Sección scrollytelling: 2 text-sections + imagen sticky */}
      <ScrollytellDual
        sections={[
          {
            key: "acerca",
            image: { src: "/assets/ambiente.png", alt: "Acerca de Nosotros" },
            content: (
              <>
                <h2 className="text-[clamp(2rem,3vw+1rem,3rem)] font-black uppercase text-thowel-text-soft mb-8 tracking-tight leading-none">
                  {t("about.sectionTitle")}
                </h2>
                <div className="max-w-xl space-y-5 text-thowel-text-soft leading-[1.8] text-base md:text-[1rem]">
                  <p>{t("about.paragraph1")}</p>
                  <p>{t("about.paragraph2")}</p>
                  <p>{t("about.paragraph3")}</p>
                </div>
              </>
            ),
          },
          {
            key: "mision",
            image: { src: "/assets/ambienteSN.png", alt: "Misión y Visión" },
            content: (
              <>
                <h2 className="text-[clamp(2rem,3vw+1rem,3rem)] font-black uppercase text-thowel-text-soft mb-8 tracking-tight leading-none">
                  {t("about.mission.title")}
                </h2>
                <div className="max-w-xl text-thowel-text-soft leading-[1.8] text-base md:text-[1rem] mb-14">
                  <p>{t("about.mission.description")}</p>
                </div>

                <h2 className="text-[clamp(2rem,3vw+1rem,3rem)] font-black uppercase text-thowel-text-soft mb-8 tracking-tight leading-none">
                  {t("about.vision.title")}
                </h2>
                <div className="max-w-xl space-y-5 text-thowel-text-soft leading-[1.8] text-base md:text-[1rem]">
                  <p>{t("about.vision.paragraph1")}</p>
                  <p>{t("about.vision.paragraph2")}</p>
                </div>
              </>
            ),
          },
        ]}
      />
    </>
  );
}
