import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getProductBySlug } from "@/data/products";
import { ScrollytellDual } from "@/components/shared/ScrollytellDual";
import type { ScrollytellSection } from "@/components/shared/ScrollytellDual";
import { SimilarProducts } from "@/components/product/SimilarProducts";
import { assetUrl } from "@/lib/asset";
import type { Product } from "@/data/products";

function Html({ html, className }: { html: string; className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

const TECH_CLASS: Record<string, string> = {
  SMOOTH: "text-thowel-blue",
  TOUCH: "text-thowel-red",
  ESTÁNDAR: "text-thowel-text-soft",
};

const TITLE_H1_CLASS =
  "uppercase font-bold leading-[1.05] tracking-tight text-thowel-text text-[clamp(1.4rem,2.4vw,2.1rem)]";
const TITLE_H2_CLASS =
  "uppercase font-bold leading-[1.1] tracking-tight text-thowel-text text-[clamp(1.35rem,1.9vw,1.75rem)]";
const BODY_TEXT_CLASS =
  "text-thowel-text-soft leading-[1.75] text-[15px] md:text-base";
const ICON_IMG_CLASS = "spec-extra-img";
const CONTENT_WIDTH = "w-full max-w-xl";
const IMAGE_LARGE_WIDTH = "spec-main-image";

function ProductTitle({ product, centered = false }: { product: Product; centered?: boolean }) {
  const { title, techBadgeImage } = product;
  const accentClass = title.accentTech ? TECH_CLASS[title.accentTech] : "text-thowel-text-soft";
  const badge = techBadgeImage ? (
    <img
      src={assetUrl(techBadgeImage)}
      alt="Tecnología Thowel"
      className="shrink-0 h-[0.85em] w-auto object-contain"
      loading="lazy"
      decoding="async"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
  ) : null;
  const bothLines = title.bold && title.accent;
  const justify = centered ? "justify-center" : "";
  return (
    <h1 className={TITLE_H1_CLASS}>
      <span className={`flex items-center gap-x-3 font-black whitespace-nowrap ${justify}`}>
        <span>{title.bold}</span>
        {!bothLines && badge}
      </span>
      {title.accent && (
        <span className={`flex items-center gap-x-3 font-bold whitespace-nowrap ${accentClass} ${justify}`}>
          <span>{title.accent}</span>
          {badge}
        </span>
      )}
    </h1>
  );
}

function DescripcionContent({ product }: { product: Product }) {
  return (
    <div className={`${CONTENT_WIDTH} space-y-10`}>
      <ProductTitle product={product} />
      <div className={`space-y-5 ${BODY_TEXT_CLASS}`}>
        {product.descripcion.paragraphs.map((p, i) => (
          <p key={i}>
            <Html html={p} />
          </p>
        ))}
      </div>
      {product.descripcion.diagramImage && (
        <div className={`${IMAGE_LARGE_WIDTH} mx-auto`}>
          <img
            src={assetUrl(product.descripcion.diagramImage!)}
            alt="Diagrama técnico"
            className="w-full h-auto object-contain"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}
    </div>
  );
}

function EspecificacionesContent({ product }: { product: Product }) {
  const specs = product.especificaciones!;
  return (
    <div className={`${CONTENT_WIDTH} space-y-10`}>
      <h2 className={TITLE_H2_CLASS}>Especificaciones</h2>
      {specs.intro && (
        <p className={BODY_TEXT_CLASS}>
          <Html html={specs.intro} />
        </p>
      )}
      {specs.specTableImage && (
        <div className={`${IMAGE_LARGE_WIDTH} mx-auto !mt-4 mb-14 md:mb-20`}>
          <img
            src={assetUrl(specs.specTableImage!)}
            alt="Especificaciones técnicas"
            className="w-full h-auto object-contain"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}
      {specs.icons.length > 0 && (
        <ul className="flex flex-nowrap items-center justify-around gap-2 sm:gap-3 md:gap-4 w-full">
          {specs.icons.map((icon, i) => (
            <li key={i} className="flex-1 flex items-center justify-center">
              <img
                src={assetUrl(icon.src)}
                alt={icon.alt}
                className={ICON_IMG_CLASS}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.visibility =
                    "hidden";
                }}
              />
            </li>
          ))}
        </ul>
      )}
      {specs.extraGroups && specs.extraGroups.length > 0 && (() => {
        const groups = specs.extraGroups!;
        const allPlanosOnly = groups.every((g) => (g.icons?.length ?? 0) === 0 && !!g.plano);
        const containerClass = allPlanosOnly
          ? "flex flex-wrap items-start justify-center gap-4 md:gap-6 w-full mt-10 md:mt-14"
          : "space-y-8 md:space-y-10 w-full mt-10 md:mt-14";
        return (
        <div className={containerClass}>
          {groups.map((group, gi) => (
            <div key={gi} className={allPlanosOnly ? "" : "space-y-14 md:space-y-20"}>
              {(group.icons?.length ?? 0) > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 md:gap-x-6">
                  {(group.icons ?? []).map((src, i) => (
                    <img
                      key={i}
                      src={assetUrl(src)}
                      alt={`Ícono ${gi + 1}.${i + 1}`}
                      className="spec-extra-img"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ))}
                </div>
              )}
              {group.plano && (
                <div className="spec-plano-large">
                  <img
                    src={assetUrl(group.plano)}
                    alt={`Plano ${gi + 1}`}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        );
      })()}
      {specs.extraImages.length > 0 && (() => {
        // Con > 5 imágenes las dividimos en 2 filas centradas (para agrupar por modelo)
        if (specs.extraImages.length > 5) {
          const half = Math.ceil(specs.extraImages.length / 2);
          const rows = [specs.extraImages.slice(0, half), specs.extraImages.slice(half)];
          return (
            <div className="space-y-4 md:space-y-10 w-full mt-6 md:mt-8">
              {rows.map((row, r) => (
                <div key={r} className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 md:gap-x-6">
                  {row.map((src, i) => (
                    <img
                      key={i}
                      src={assetUrl(src)}
                      alt={`Detalle ${r * half + i + 1}`}
                      className="spec-extra-img"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          );
        }
        return (
          <div className="flex flex-wrap items-center justify-around gap-3 md:gap-4 w-full mt-6 md:mt-8">
            {specs.extraImages.map((src, i) => (
              <img
                key={i}
                src={assetUrl(src)}
                alt={`Detalle ${i + 1}`}
                className="spec-extra-img"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            ))}
          </div>
        );
      })()}
    </div>
  );
}

function DetallesContent({ product }: { product: Product }) {
  return (
    <div className="w-full">
      <h2 className={`${TITLE_H2_CLASS} mb-3`}>Detalles</h2>
      {/* En mobile ocupa todo el ancho, en desktop se achica y centra */}
      <div className="space-y-3 w-full max-w-[300px] md:max-w-[360px] mx-auto">
        {product.detalles!.images.map((src, i) => (
          <img
            key={i}
            src={assetUrl(src)}
            alt={`Detalle ${i + 1}`}
            className="w-full h-auto object-contain rounded"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ))}
      </div>
    </div>
  );
}

function SubProductsSection({ product }: { product: Product }) {
  return (
    <section className="bg-white py-16 md:py-0 px-0">
      <div className="mx-auto space-y-16 md:space-y-0">
        {product.subProducts!.map((sub, idx) => (
          <article
            key={sub.id}
            className={`grid md:grid-cols-2 items-stretch ${
              idx % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
            }`}
          >
            {/* Imagen full-width en su mitad (sin fondo, sin border-radius) */}
            <div className="w-full h-[300px] md:h-[500px] lg:h-[600px] overflow-hidden">
              <img
                src={assetUrl(sub.heroImage)}
                alt={sub.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            {/* Contenido centrado en su mitad */}
            <div className="flex flex-col items-center justify-center text-center space-y-8 px-6 md:px-10 py-12 md:py-16">
              <h3 className={TITLE_H2_CLASS}>{sub.title}</h3>
              {sub.description && (
                <p className={BODY_TEXT_CLASS}>{sub.description}</p>
              )}
              {sub.icons.length > 0 && (
                <ul className="flex items-center justify-center gap-6 md:gap-8">
                  {sub.icons.map((icon, i) => (
                    <li key={i} className="flex items-center justify-center">
                      <img
                        src={assetUrl(icon.src)}
                        alt={icon.alt}
                        className={ICON_IMG_CLASS}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.visibility =
                            "hidden";
                        }}
                      />
                    </li>
                  ))}
                </ul>
              )}
              {sub.specTableImage && (
                <div className="bg-thowel-bg rounded-xl p-4 md:p-6">
                  <img
                    src={assetUrl(sub.specTableImage)}
                    alt={`Tabla ${sub.title}`}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const product = slug ? getProductBySlug(slug) : undefined;

  useEffect(() => {
    if (!slug) return;
    const KEY = "productPage:lastSlug";
    const lastSlug = sessionStorage.getItem(KEY);
    if (lastSlug !== slug) {
      window.scrollTo({ top: 0, behavior: "instant" });
      sessionStorage.setItem(KEY, slug);
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center pt-24">
        <div>
          <h1 className="text-3xl font-bold uppercase text-thowel-text">
            Producto no encontrado
          </h1>
          <Link
            to="/"
            className="mt-4 inline-block text-thowel-red hover:underline"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const sections: ScrollytellSection[] = [];

  sections.push({
    key: "descripcion",
    image:
      product.stickyImages[0] ??
      { src: "", alt: product.title.bold },
    content: <DescripcionContent product={product} />,
  });

  if (product.especificaciones) {
    sections.push({
      key: "especificaciones",
      image:
        product.stickyImages[1] ??
        product.stickyImages[0] ?? { src: "", alt: "" },
      content: <EspecificacionesContent product={product} />,
    });
  }

  if (product.detalles) {
    sections.push({
      key: "detalles",
      image:
        product.stickyImages[2] ??
        product.stickyImages[0] ?? { src: "", alt: "" },
      content: <DetallesContent product={product} />,
    });
  }

  // Productos "colección" (ej. manijas, sistemas de apoyo): solo tienen
  // subProducts, sin especificaciones ni detalles → usar layout tipo banner
  // hero + descripción + subproductos, en vez del scrollytell dual.
  const isCollection = !!product.subProducts && product.subProducts.length > 0
    && !product.especificaciones && !product.detalles;

  if (isCollection) {
    return (
      <>
        {/* Hero banner full-width */}
        <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-thowel-bg-alt">
          <img
            src={assetUrl(product.stickyImages[0]?.src ?? "")}
            alt={product.title.bold}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </section>

        {/* Título + descripción */}
        <section className="bg-thowel-bg py-14 md:py-20 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <ProductTitle product={product} centered />
            <div className={`space-y-5 ${BODY_TEXT_CLASS} mx-auto`}>
              {product.descripcion.paragraphs.map((p, i) => (
                <p key={i}>
                  <Html html={p} />
                </p>
              ))}
            </div>
          </div>
        </section>

        <SubProductsSection product={product} />
        <SimilarProducts product={product} />
        <span className="sr-only">{t("productPage.similarProducts")}</span>
      </>
    );
  }

  return (
    <>
      <ScrollytellDual sections={sections} />

      {product.subProducts && product.subProducts.length > 0 && (
        <SubProductsSection product={product} />
      )}

      <SimilarProducts product={product} />

      {/* Trigger para que el i18n de t esté siempre en scope si se agrega breadcrumb */}
      <span className="sr-only">{t("productPage.similarProducts")}</span>
    </>
  );
}
