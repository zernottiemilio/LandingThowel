import { useTranslation } from "react-i18next";
import { assetUrl } from "@/lib/asset";

const CONTACT_EMAIL = "info@thowel.com";

export function Contacto() {
  const { t } = useTranslation();

  return (
    <>
      {/* Header con portada full-screen + título + scroll indicator */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <img
          src={assetUrl("/assets/PORTADA CONTACTOS.png")}
          alt="Portada Contactos"
          className="absolute inset-0 w-full h-full object-cover z-[1]"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/20 z-[2]" />
        <h1 className="relative z-[3] text-center text-white uppercase font-bold text-shadow-hero tracking-wide text-[clamp(2rem,5vw,4rem)] px-6">
          {t("contact.title")}
        </h1>
        <div className="absolute bottom-0 left-0 w-full z-10 animate-bounce">
          <img
            src="/assets/FLECHAINICIO.png"
            alt=""
            className="w-full h-auto block object-cover"
            loading="eager"
            decoding="async"
          />
        </div>
      </section>

      {/* Formulario de contacto — replica el layout del original */}
      <section className="bg-thowel-bg py-16 md:py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="uppercase font-black text-thowel-text-soft tracking-tight mb-10 md:mb-14 text-[clamp(2rem,5vw,4rem)] leading-none">
            {t("contact.title")}
          </h2>

          <form
            action={`https://formsubmit.co/${CONTACT_EMAIL}`}
            method="POST"
            className="space-y-6"
          >
            {/* Config FormSubmit.co */}
            <input type="hidden" name="_subject" value="Nuevo contacto desde THOWEL" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value={typeof window !== "undefined" ? `${window.location.origin}/contacto?sent=1` : ""} />
            {/* Honeypot antispam */}
            <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

            <input
              type="text"
              name="nombre"
              placeholder={t("contact.form.name")}
              required
              className="w-full bg-white rounded-full px-8 py-5 text-thowel-text-soft text-[15px] md:text-base focus:outline-none focus:ring-2 focus:ring-thowel-blue-deep/40 transition-all shadow-card border-0"
            />
            <input
              type="tel"
              name="numero"
              placeholder={t("contact.form.phone")}
              required
              className="w-full bg-white rounded-full px-8 py-5 text-thowel-text-soft text-[15px] md:text-base focus:outline-none focus:ring-2 focus:ring-thowel-blue-deep/40 transition-all shadow-card border-0"
            />
            <input
              type="email"
              name="mail"
              placeholder={t("contact.form.email")}
              required
              className="w-full bg-white rounded-full px-8 py-5 text-thowel-text-soft text-[15px] md:text-base focus:outline-none focus:ring-2 focus:ring-thowel-blue-deep/40 transition-all shadow-card border-0"
            />
            <textarea
              name="mensaje"
              placeholder={t("contact.form.message")}
              rows={6}
              required
              className="w-full bg-white rounded-3xl px-8 py-5 text-thowel-text-soft text-[15px] md:text-base focus:outline-none focus:ring-2 focus:ring-thowel-blue-deep/40 transition-all shadow-card border-0 resize-y"
            />

            <button
              type="submit"
              className="w-full py-5 rounded-full bg-thowel-blue-deep text-white font-bold uppercase text-base tracking-[0.15em] hover:bg-thowel-blue transition-all shadow-card"
            >
              {t("contact.form.submit")}
            </button>
          </form>

          {typeof window !== "undefined" && new URLSearchParams(window.location.search).get("sent") === "1" && (
            <p className="mt-8 text-center text-green-600 font-medium">
              ¡Mensaje enviado! Te vamos a responder a la brevedad.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
