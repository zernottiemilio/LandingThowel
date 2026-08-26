import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative z-[101] bg-thowel-red text-white py-4">
      <div className="relative max-w-full w-full h-full flex items-center justify-center">
        <div className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <a
            href="mailto:info@thowel.com"
            title="Email"
            className="w-8 h-8 flex items-center justify-center transition-transform hover:scale-110"
          >
            <img
              src="/assets/MAIL.png"
              alt="Email"
              className="w-full h-full object-contain hex-clip"
              loading="lazy"
              decoding="async"
            />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            className="w-8 h-8 flex items-center justify-center transition-transform hover:scale-110"
          >
            <img
              src="/assets/INSTAGRAM.png"
              alt="Instagram"
              className="w-full h-full object-contain hex-clip"
              loading="lazy"
              decoding="async"
            />
          </a>
        </div>
        <p className="text-center text-sm font-medium m-0 px-24">
          {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
