import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { assetUrl } from "@/lib/asset";

export type ScrollytellSection = {
  key: string;
  image: { src: string; alt: string };
  content: React.ReactNode;
};

/**
 * Layout dual-content con imagen sticky a la izquierda y secciones de texto apiladas
 * a la derecha. Detecta qué sección está activa según la posición del scroll y
 * hace fade a la imagen correspondiente.
 *
 * Replica el patrón `.producto-section-unified` + `.image-sticky-container` del
 * proyecto original. En mobile (<lg) se apila columna: imagen sobre texto.
 */
export function ScrollytellDual({
  sections,
  imageSide = "left",
}: {
  sections: ScrollytellSection[];
  imageSide?: "left" | "right";
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const onScroll = () => {
      // La sección activa es aquella cuyo rango vertical CONTIENE el centro
      // del viewport. Así, secciones cortas duran poco scroll y secciones
      // largas duran proporcionalmente más — la imagen izquierda cambia
      // en función de la altura REAL de cada sección de contenido.
      const viewportMid = window.innerHeight / 2;
      let current = 0;
      let foundActive = false;
      sectionRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportMid && rect.bottom > viewportMid) {
          current = i;
          foundActive = true;
        }
      });
      // Fallback: si ninguna cubre el centro (scroll fuera del container),
      // usar la última cuyo top ya cruzó el centro.
      if (!foundActive) {
        let bestTop = -Infinity;
        sectionRefs.current.forEach((el, i) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportMid && rect.top > bestTop) {
            bestTop = rect.top;
            current = i;
          }
        });
      }
      setActiveIndex(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-white">
      <div
        className={cn(
          "flex flex-col lg:flex-row w-full",
          imageSide === "right" && "lg:flex-row-reverse",
        )}
      >
        {/* Sticky image side */}
        <div className="lg:flex-1 relative">
          <div className="lg:sticky lg:top-0 h-[60vh] lg:h-screen w-full overflow-hidden bg-thowel-bg-alt">
            {/* Fallback: primera imagen siempre renderizada abajo para evitar flash blanco */}
            {sections[0]?.image?.src && (
              <img
                src={assetUrl(sections[0].image.src)}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover z-[0]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            )}
            {sections.map((s, i) => (
              <img
                key={s.key}
                src={assetUrl(s.image.src)}
                alt={s.image.alt}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
                  i === activeIndex ? "opacity-100 z-[3]" : "opacity-0 z-[1]",
                )}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.visibility =
                    "hidden";
                }}
              />
            ))}
          </div>
        </div>

        {/* Text sections column */}
        <div className="lg:flex-1 min-w-0 bg-thowel-bg">
          {sections.map((s, i) => (
            <div
              key={s.key}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
              className={cn(
                "min-h-fit flex flex-col justify-start px-6 md:px-12 lg:px-16 xl:px-20 pb-4",
                i === 0 ? "pt-24" : "pt-8",
              )}
              data-section={s.key}
            >
              {s.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
