import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/cn";

type ShowcaseItem = {
  key: "smooth" | "touch" | "estandar";
  logo: string;
  logoAlt: string;
  leftImage: string;
  rightImage: string;
  descriptionKey: string;
};

const ITEMS: ShowcaseItem[] = [
  {
    key: "smooth",
    logo: "/assets/S.png",
    logoAlt: "SMOOTH",
    leftImage: "/assets/FondoSmooth.png",
    rightImage: "/assets/CAJONESESPECIAS.png",
    descriptionKey: "home.technology.smooth.description",
  },
  {
    key: "touch",
    logo: "/assets/T.png",
    logoAlt: "TOUCH",
    leftImage: "/assets/FondoTouch.png",
    rightImage: "/assets/touch.png",
    descriptionKey: "home.technology.touch.description",
  },
  {
    key: "estandar",
    logo: "/assets/E.png",
    logoAlt: "ESTÁNDAR",
    leftImage: "/assets/FondoEstandar.png",
    rightImage: "/assets/piston a gas/PISTONAGAS.png",
    descriptionKey: "home.technology.standard.description",
  },
];

export function ProductShowcase() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const totalScrollable = el.offsetHeight - viewportH;
      if (totalScrollable <= 0) return;
      const scrolledInside = Math.min(
        Math.max(-rect.top, 0),
        totalScrollable,
      );
      const p = scrolledInside / totalScrollable;
      setProgress(p);
      const target = Math.min(ITEMS.length - 1, Math.floor(p * ITEMS.length));
      setActive(target);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const targetY = el.offsetTop + index * window.innerHeight;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="products-showcase"
      className="relative z-10"
      style={{ height: `${ITEMS.length * 100}vh` }}
    >
      {/* Sticky background layer */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {ITEMS.map((item, i) => {
          const isActive = i === active;
          return (
            <div
              key={item.key}
              className={cn(
                "absolute inset-0 flex transition-opacity duration-700",
                isActive ? "opacity-100 z-[2]" : "opacity-0 z-[1]",
              )}
              aria-hidden={!isActive}
            >
              <div
                className={cn(
                  "flex-1 relative overflow-hidden transition-all duration-700",
                  isActive
                    ? "translate-x-0 scale-100 opacity-100"
                    : "-translate-x-24 scale-90 opacity-0",
                )}
              >
                <img
                  src={item.leftImage}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div
                className={cn(
                  "flex-1 relative overflow-hidden transition-all duration-700",
                  isActive
                    ? "translate-x-0 scale-100 opacity-100"
                    : "translate-x-24 scale-90 opacity-0",
                )}
              >
                <img
                  src={item.rightImage}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          );
        })}

        {/* Content overlay: text on left half */}
        <div className="pointer-events-none absolute top-0 left-0 w-full md:w-1/2 h-screen flex items-center justify-center text-white text-center px-6 md:px-10 z-[5]">
          {ITEMS.map((item, i) => (
            <div
              key={item.key}
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 max-w-[500px] mx-auto",
                i === active ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={i !== active}
            >
              <div className="flex items-center justify-center mb-6">
                <img
                  src={item.logo}
                  alt={item.logoAlt}
                  className="w-40 md:w-56 h-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="text-fluid-base text-white/85 leading-snug font-normal max-w-md">
                {t(item.descriptionKey)}
              </p>
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-5 pointer-events-auto">
          <div className="w-[2px] h-52 bg-white/30 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-white transition-transform duration-300"
              style={{
                height: `${100 / ITEMS.length}%`,
                transform: `translateY(${progress * ITEMS.length * 100}%)`,
              }}
            />
          </div>
          <div className="flex flex-col gap-4">
            {ITEMS.map((item, i) => (
              <button
                key={item.key}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir a ${item.logoAlt}`}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  i === active
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/80",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
