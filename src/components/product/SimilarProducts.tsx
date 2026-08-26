import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Product } from "@/data/products";
import { getSimilarProducts, productHero } from "@/data/products";
import { assetUrl } from "@/lib/asset";

export function SimilarProducts({ product }: { product: Product }) {
  const { t } = useTranslation();
  const similar = getSimilarProducts(product, 12);
  const trackRef = useRef<HTMLDivElement>(null);

  if (similar.length === 0) return null;

  const scrollBy = (delta: number) => {
    trackRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="relative bg-white pt-14 md:pt-16 pb-0">
      <h2 className="text-center font-black uppercase text-thowel-blue tracking-wide mb-6 md:mb-8 px-6 text-[clamp(1.5rem,2.5vw,2.25rem)]">
        {t("productPage.similarProducts")}
      </h2>

      <div className="relative w-full">
        <button
          type="button"
          onClick={() => scrollBy(-380)}
          className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-30 bg-thowel-blue/80 hover:bg-thowel-blue text-white w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-soft"
          aria-label="Anterior"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollBy(380)}
          className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-30 bg-thowel-blue/80 hover:bg-thowel-blue text-white w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-soft"
          aria-label="Siguiente"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <div
          ref={trackRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          {similar.map((p) => {
            const src = productHero(p);
            const label = t(p.nameKey);
            return (
              <Link
                key={p.slug}
                to={`/producto/${p.slug}`}
                className="group relative flex-none snap-center sm:snap-start w-screen sm:w-[300px] md:w-[370px] h-[70vh] md:h-[80vh] overflow-hidden bg-thowel-bg-alt"
              >
                <img
                  src={assetUrl(src)}
                  alt={label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:-translate-y-4 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-x-0 -bottom-full group-hover:bottom-0 bg-thowel-blue/90 text-white text-center px-4 py-5 transition-all duration-300 font-bold text-sm md:text-base uppercase leading-tight">
                  {label}
                </div>
                <div className="absolute inset-0 border-[10px] border-thowel-blue opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
