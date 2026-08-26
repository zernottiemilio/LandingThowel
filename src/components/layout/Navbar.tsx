import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { navCategories } from "@/data/navigation";
import { cn } from "@/lib/cn";

export function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const lastScroll = useRef(0);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (mobileOpen) return;
      setScrolled(y > 50);
      if (y > lastScroll.current && y > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setOpenCategory(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
        setOpenCategory(null);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const linkBase =
    "px-4 py-2 rounded-chip text-xs font-medium uppercase tracking-wide text-thowel-text hover:text-thowel-red hover:bg-thowel-red-soft transition-colors whitespace-nowrap";

  const mobileLinkClass =
    "block w-full text-left px-5 py-4 text-[15px] font-semibold uppercase";

  const closeAll = () => {
    setMobileOpen(false);
    setProductsOpen(false);
    setOpenCategory(null);
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed z-[1000] transition-all duration-300",
        "md:top-5 md:left-16 md:right-16 lg:left-24 lg:right-24 md:w-auto md:rounded-pill md:shadow-soft md:px-8 lg:px-16 md:py-3 lg:py-4",
        "md:backdrop-blur-navbar",
        "top-0 left-0 w-full flex items-center justify-between md:justify-center",
        "px-4 py-3 md:py-2",
        hidden && !mobileOpen && !productsOpen
          ? "md:-translate-y-[150%] -translate-y-full opacity-0"
          : "translate-y-0 opacity-100",
      )}
      style={{
        background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.95)",
      }}
    >
      {/* Logo mobile */}
      <Link to="/" className="md:hidden" onClick={closeAll}>
        <img
          src="/assets/logoHeader.png"
          alt="THOWEL"
          className="h-9 w-auto"
          loading="eager"
          decoding="async"
        />
      </Link>

      {/* Hamburger mobile */}
      <button
        type="button"
        onClick={() => setMobileOpen((v) => !v)}
        className="md:hidden relative z-[1002] p-2 flex flex-col gap-1.5"
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
      >
        <span
          className={cn(
            "block w-6 h-[3px] bg-thowel-text rounded transition-transform duration-300",
            mobileOpen && "rotate-45 translate-y-[9px]",
          )}
        />
        <span
          className={cn(
            "block w-6 h-[3px] bg-thowel-text rounded transition-opacity duration-300",
            mobileOpen && "opacity-0",
          )}
        />
        <span
          className={cn(
            "block w-6 h-[3px] bg-thowel-text rounded transition-transform duration-300",
            mobileOpen && "-rotate-45 -translate-y-[9px]",
          )}
        />
      </button>

      {/* Menu */}
      <ul
        className={cn(
          "md:flex md:items-center md:justify-around md:gap-6 lg:gap-10 xl:gap-16 md:static md:h-auto md:w-full md:bg-transparent md:shadow-none md:overflow-visible md:p-0 md:flex-row",
          "fixed md:relative top-[64px] md:top-auto left-0 w-full md:w-auto",
          "bg-white md:bg-transparent shadow-soft md:shadow-none",
          "flex-col overflow-y-auto",
          "transition-[transform,opacity] duration-300",
          mobileOpen
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "-translate-x-full opacity-0 pointer-events-none md:translate-x-0 md:opacity-100 md:pointer-events-auto",
          "h-[calc(100vh-64px)] md:h-auto",
        )}
      >
        <li className="md:contents w-full border-b md:border-0 border-black/5">
          <NavLink
            to="/"
            onClick={closeAll}
            className={({ isActive }) =>
              cn(
                mobileLinkClass,
                "md:inline-block md:w-auto md:text-center md:py-2 md:px-4 md:text-sm lg:text-[15px] md:font-medium",
                linkBase,
                isActive && "text-thowel-red",
              )
            }
          >
            {t("nav.home")}
          </NavLink>
        </li>

        {/* Productos dropdown */}
        <li className="md:relative w-full md:w-auto border-b md:border-0 border-black/5">
          <button
            type="button"
            className={cn(
              mobileLinkClass,
              "md:inline-block md:w-auto md:text-center md:py-2 md:px-4 md:text-sm lg:text-[15px] md:font-medium",
              linkBase,
              productsOpen && "text-thowel-red",
            )}
            onClick={(e) => {
              e.stopPropagation();
              setProductsOpen((v) => !v);
              setOpenCategory(null);
            }}
            aria-expanded={productsOpen}
          >
            {t("nav.products")}
            <span
              className={cn(
                "ml-2 text-[10px] transition-transform inline-block",
                productsOpen && "rotate-180",
              )}
            >
              ▼
            </span>
          </button>

          {/* Nivel 1: categorías */}
          <div
            className={cn(
              "md:absolute md:top-full md:left-0 md:mt-2 md:min-w-[280px]",
              "md:bg-white md:rounded-xl md:shadow-soft md:py-3 md:z-[1001]",
              "md:transition-all md:duration-200",
              productsOpen
                ? "md:opacity-100 md:visible md:translate-y-0"
                : "md:opacity-0 md:invisible md:-translate-y-2",
              "overflow-hidden md:overflow-visible",
              productsOpen ? "max-h-[3000px] md:max-h-none" : "max-h-0 md:max-h-none",
              "bg-thowel-bg-alt md:bg-white",
            )}
          >
            {navCategories.map((cat) => {
              const isOpen = openCategory === cat.slug;
              return (
                <div key={cat.slug} className="md:relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenCategory(isOpen ? null : cat.slug);
                    }}
                    className={cn(
                      "block w-full text-left px-5 py-3",
                      "text-xs uppercase text-thowel-text-soft hover:text-thowel-red hover:bg-thowel-red-soft transition-colors",
                      isOpen && "text-thowel-red bg-thowel-red-soft",
                    )}
                    aria-expanded={isOpen}
                  >
                    {t(cat.i18nKey)}
                    <span
                      className={cn(
                        "float-right text-[9px] transition-transform inline-block ml-2",
                        isOpen && "rotate-180 md:rotate-0 md:-rotate-90",
                      )}
                    >
                      <span className="md:hidden">▼</span>
                      <span className="hidden md:inline">▶</span>
                    </span>
                  </button>

                  {/* Nivel 2: productos concretos */}
                  <div
                    className={cn(
                      "md:absolute md:top-0 md:left-full md:min-w-[280px]",
                      "md:bg-white md:rounded-xl md:shadow-soft md:py-3 md:z-[1002]",
                      "md:transition-all md:duration-200",
                      isOpen
                        ? "md:opacity-100 md:visible md:translate-x-0"
                        : "md:opacity-0 md:invisible md:-translate-x-2",
                      "overflow-hidden md:overflow-visible",
                      isOpen ? "max-h-[2000px] md:max-h-none" : "max-h-0 md:max-h-none",
                      "bg-thowel-bg-mobile md:bg-white",
                    )}
                  >
                    {cat.items.map((item) => (
                      <Link
                        key={item.slug}
                        to={`/producto/${item.slug}`}
                        onClick={closeAll}
                        className="block px-7 md:px-5 py-3 text-[11px] md:text-xs uppercase text-thowel-text-soft hover:text-thowel-red hover:bg-thowel-red-soft transition-colors"
                      >
                        {t(item.i18nKey)}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </li>

        {/* Logo desktop centrado */}
        <li className="hidden md:flex md:items-center md:shrink-0">
          <Link to="/" onClick={closeAll} className="flex items-center px-3 shrink-0">
            <img
              src="/assets/logoHeader.png"
              alt="THOWEL"
              className="h-8 lg:h-9 w-auto max-w-none block"
              loading="eager"
              decoding="async"
              onError={(e) => {
                console.error("Logo failed to load:", e.currentTarget.src);
              }}
            />
          </Link>
        </li>

        <li className="md:contents w-full border-b md:border-0 border-black/5">
          <NavLink
            to="/sobre-nosotros"
            onClick={closeAll}
            className={({ isActive }) =>
              cn(
                mobileLinkClass,
                "md:inline-block md:w-auto md:text-center md:py-2 md:px-4 md:text-sm lg:text-[15px] md:font-medium",
                linkBase,
                isActive && "text-thowel-red",
              )
            }
          >
            {t("nav.about")}
          </NavLink>
        </li>

        <li className="md:contents w-full border-b md:border-0 border-black/5">
          <NavLink
            to="/contacto"
            onClick={closeAll}
            className={({ isActive }) =>
              cn(
                mobileLinkClass,
                "md:inline-block md:w-auto md:text-center md:py-2 md:px-4 md:text-sm lg:text-[15px] md:font-medium",
                linkBase,
                isActive && "text-thowel-red",
              )
            }
          >
            {t("nav.contact")}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
