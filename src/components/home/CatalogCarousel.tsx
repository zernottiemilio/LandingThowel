import { useRef } from "react";
import { Link } from "react-router-dom";
import { assetUrl } from "@/lib/asset";

type CarouselItem = {
  slug: string;
  image: string;
  label: string;
};

const ITEMS: CarouselItem[] = [
  { slug: "bisagra-cazoleta-155", image: "/assets/bisagra angulos especiales/BISAGRAANGULOSESPECIALES135.png", label: "BISAGRA ÁNGULOS ESPECIALES 135" },
  { slug: "bisagra-cazoleta-155", image: "/assets/bisagra angulos especiales/BISAGRAANGULOSESPECIALES175.png", label: "BISAGRAS ÁNGULOS ESPECIALES 175" },
  { slug: "bisagra-cazoleta-estandar", image: "/assets/bisagra cazoleta estandar/BISAGRACAZOLETAESTANDAR.png", label: "BISAGRA CAZOLETA ESTÁNDAR" },
  { slug: "bisagra-clip-3d", image: "/assets/bisagra clip 3D/BISAGRACLIP.png", label: "BISAGRA CLIP" },
  { slug: "bisagra-push-open", image: "/assets/bisagra push open/BISAGRAPUSHOPEN.png", label: "BISAGRA PUSH OPEN" },
  { slug: "bisagra-soft-closing", image: "/assets/bisagra soft closing/BSC.png", label: "BISAGRA SOFT CLOSING" },
  { slug: "thowel-box-cristal", image: "/assets/thowel box cristal/THOWELBOXCRISTAL.png", label: "THOWELBOX CRISTAL" },
  { slug: "thowel-box-plus", image: "/assets/thowel box plus/THOWELBOXPLUS.png", label: "THOWELBOX PLUS" },
  { slug: "guia-oculta-3d-soft-closing", image: "/assets/Guia oculta push Open/GUIA OCULTA.JPG", label: "GUÍA OCULTA 3D SOFT CLOSING" },
  { slug: "guia-oculta-push-open", image: "/assets/Guia oculta push Open/GUIA OCULTA (2).JPG", label: "GUÍA OCULTA PUSH OPEN" },
  { slug: "corredera-telescopica-soft-closing", image: "/assets/corredera telescopica estandar H35/CORREDERA TELESCOPICA ESTANDAR H35 (2).JPG", label: "CORREDERA TELESCÓPICA SOFT CLOSING" },
  { slug: "corredera-telescopica-push-open", image: "/assets/corredera telescopica estandar H45/CORREDERA TELESCOPICA ESTANDAR H45 (2).JPG", label: "CORREDERA TELESCÓPICA PUSH OPEN" },
  { slug: "corredera-telescopica-h45", image: "/assets/corredera telescopica estandar H45/CORREDERA TELESCOPICA ESTANDAR H45.JPG", label: "CORREDERA TELESCÓPICA H45" },
  { slug: "corredera-telescopica-h35", image: "/assets/corredera telescopica estandar H35/CORREDERA TELESCOPICA ESTANDAR H35.JPG", label: "CORREDERA TELESCÓPICA H35" },
  { slug: "corredera-z", image: "/assets/corredera Z/CORREDERA Z.JPG", label: "CORREDERA Z" },
  { slug: "manijas", image: "/assets/manija barral/MANIJA BARRAL.JPG", label: "MANIJAS" },
  { slug: "sistemas-de-apoyo", image: "/assets/pata plastica/PATA PLASTICA.JPG", label: "SISTEMAS DE APOYO" },
  { slug: "piston-a-gas", image: "/assets/piston a gas/PISTONAGAS.png", label: "PISTÓN A GAS" },
  { slug: "reten-expulsor", image: "/assets/reten expulsor/RetenesExpulsor.png", label: "RETÉN EXPULSOR" },
];

export function CatalogCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (delta: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="relative z-[10] bg-thowel-bg overflow-hidden">
      <div className="relative w-full">
        <button
          type="button"
          onClick={() => scrollBy(-320)}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-thowel-blue/80 hover:bg-thowel-blue text-white w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-soft"
          aria-label="Anterior"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollBy(320)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-thowel-blue/80 hover:bg-thowel-blue text-white w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-soft"
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
          {ITEMS.map((item, i) => (
            <Link
              key={`${item.slug}-${i}`}
              to={`/producto/${item.slug}`}
              className="group relative flex-none snap-center sm:snap-start w-screen sm:w-[280px] md:w-[360px] h-[70vh] md:h-[85vh] overflow-hidden bg-thowel-bg-alt"
            >
              <img
                src={assetUrl(item.image)}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:-translate-y-4 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-x-0 -bottom-full group-hover:bottom-0 bg-thowel-blue/90 text-white text-center px-4 py-4 transition-all duration-300 font-bold text-sm uppercase leading-tight">
                {item.label}
              </div>
              <div className="absolute inset-0 border-[10px] border-thowel-blue opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
