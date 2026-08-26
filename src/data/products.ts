export type Technology = "SMOOTH" | "TOUCH" | "ESTÁNDAR";
export type ProductCategory =
  | "cajones"
  | "bisagras"
  | "guias"
  | "tiradores";

export type StickyImage = {
  src: string;
  alt: string;
  dataSection: string;
};

export type IconBadge = {
  src: string;
  alt: string;
};

export type ProductTitle = {
  bold: string;
  accent?: string;
  accentTech: Technology | null;
};

export type ProductDescription = {
  /** Párrafos con HTML permitido (<strong>) */
  paragraphs: string[];
  diagramImage: string | null;
};

export type SpecGroup = {
  icons: string[];   // íconos del modelo (típicamente 4-5)
  plano?: string;    // imagen del plano/codo del modelo
};

export type ProductSpecs = {
  intro: string | null;
  specTableImage: string | null;
  icons: IconBadge[];
  extraImages: string[];
  /** Si existe, renderiza grupos intercalados (íconos + plano) en vez de extraImages */
  extraGroups?: SpecGroup[];
};

export type ProductDetails = {
  images: string[];
};

export type SubProduct = {
  id: string;
  title: string;
  description: string | null;
  heroImage: string;
  specTableImage: string | null;
  icons: IconBadge[];
};

export type Product = {
  slug: string;
  fileSlug: string;
  category: ProductCategory;
  nameKey: string;
  title: ProductTitle;
  techBadgeImage: string | null;
  /** Imagen usada en el carrusel "Productos Similares". Si no está, fallback a stickyImages[0]. */
  carouselImage?: string;
  stickyImages: StickyImage[];
  descripcion: ProductDescription;
  especificaciones: ProductSpecs | null;
  detalles: ProductDetails | null;
  subProducts: SubProduct[] | null;
};

// URL de la portada usada en el carrusel de similares
export function productHero(product: Product): string {
  return product.carouselImage ?? product.stickyImages[0]?.src ?? "";
}

export const products: Product[] = [
  // ============================================================
  // CAJONES
  // ============================================================
  {
    slug: "thowel-box-cristal",
    fileSlug: "ThowelBoxCristal",
    category: "cajones",
    nameKey: "products.thowelBoxCristal",
    title: { bold: "THOWELBOX CRISTAL", accent: "", accentTech: "SMOOTH" },
    techBadgeImage: "/assets/TecnologiaSmooth.png",
    stickyImages: [
      { src: "/assets/thowel box cristal/THOWELBOXCRISTAL.png", alt: "ThoweBox Cristal", dataSection: "descripcion" },
      { src: "/assets/thowel box cristal/cristalambiente.JPG", alt: "Ambiente ThoweBox Cristal", dataSection: "especificaciones" },
      { src: "/assets/thowel box cristal/ThowelBoxCristalAmbiente.png", alt: "Detalles ThoweBox Cristal", dataSection: "detalles" },
    ],
    descripcion: {
      paragraphs: [
        "<strong>THOWELBOX CRISTAL</strong> es el herraje perfecto para amoblamientos contemporáneos, fusionando <strong>diseño y practicidad.</strong> Este conjunto, más sofisticado y elegante, destaca por sus <strong>laterales de vidrio esmerilado en 10mm de espesor,</strong> brindando un aspecto moderno y refinado.",
      ],
      diagramImage: "/assets/thowel box cristal/THOWELBOX CRISTAL-18.png",
    },
    especificaciones: {
      intro: "Se vende como un conjunto completo, <strong>incluyendo todas las partes del cajón.</strong>",
      specTableImage: "/assets/thowel box cristal/THOWELBOX CRISTAL-23.png",
      icons: [
        { src: "/assets/thowel box cristal/THOWELBOX CRISTAL-20.png", alt: "30 kg/par" },
        { src: "/assets/thowel box cristal/THOWELBOX CRISTAL-21.png", alt: "1 set / master 6 set" },
        { src: "/assets/thowel box cristal/THOWELBOX CRISTAL-22.png", alt: "80.000 Ciclos de uso" },
      ],
      extraImages: [],
    },
    detalles: {
      images: [
        "/assets/thowel box cristal/THOWELBOX CRISTAL-19.png",
        "/assets/thowel box cristal/THOWELBOX CRISTAL-24.png",
      ],
    },
    subProducts: null,
  },
  {
    slug: "thowel-box-plus",
    fileSlug: "thowelBoxPlus",
    category: "cajones",
    nameKey: "products.thowelBoxPlus",
    title: { bold: "THOWELBOX PLUS", accent: "", accentTech: "SMOOTH" },
    techBadgeImage: "/assets/TecnologiaSmooth.png",
    stickyImages: [
      { src: "/assets/thowel box plus/THOWELBOXPLUS.png", alt: "ThowelBox Plus", dataSection: "descripcion" },
      { src: "/assets/thowel box plus/ambientethowelboxplus.JPG", alt: "Ambiente ThowelBox Plus", dataSection: "especificaciones" },
      { src: "/assets/thowel box/Escena 39.png", alt: "Detalles ThowelBox Plus", dataSection: "detalles" },
    ],
    descripcion: {
      paragraphs: [
        "<strong>THOWELBOX PLUS</strong> incluye <strong>olleros</strong> de alta resistencia, fáciles de montar, para ajustar la altura de los cajones a <strong>119 mm o 183 mm</strong>",
      ],
      diagramImage: "/assets/thowel box plus/THOWEL BOX PLUS-18.png",
    },
    especificaciones: {
      intro: "Es importante destacar que THOWELBOX PLUS se refiere exclusivamente al modelo con olleros, los cuales se colocan de <strong>manera individual a cada lado</strong> del cajón, y deben ser <strong>añadidos al sistema THOWELBOX.</strong>",
      specTableImage: "/assets/thowel box plus/THOWEL BOX PLUS-23.png",
      icons: [
        { src: "/assets/thowel box plus/THOWEL BOX PLUS-20.png", alt: "30 kg/par" },
        { src: "/assets/thowel box plus/THOWEL BOX PLUS-21.png", alt: "1 set / master 6 set" },
        { src: "/assets/thowel box plus/THOWEL BOX PLUS-22.png", alt: "80.000 Ciclos de uso" },
      ],
      extraImages: [],
    },
    detalles: {
      images: [
        "/assets/thowel box plus/THOWEL BOX PLUS-19.png",
        "/assets/thowel box plus/THOWEL BOX PLUS-24.png",
      ],
    },
    subProducts: null,
  },
  {
    slug: "thowel-box",
    fileSlug: "thowelBox",
    category: "cajones",
    nameKey: "products.thowelBox",
    title: { bold: "THOWELBOX", accent: "", accentTech: "SMOOTH" },
    techBadgeImage: "/assets/TecnologiaSmooth.png",
    stickyImages: [
      { src: "/assets/thowel box/THOWELBOX.JPG", alt: "ThowelBox", dataSection: "descripcion" },
      { src: "/assets/thowel box/ambienteThowelbox.JPG", alt: "Ambiente ThowelBox", dataSection: "especificaciones" },
      { src: "/assets/thowel box plus/ThowelBoxPlus (1).png", alt: "Detalles ThowelBox", dataSection: "detalles" },
    ],
    descripcion: {
      paragraphs: [
        "Cumple con las más diversas exigencias de diseño de amoblamientos. Ofrece un deslizamiento ultraligero, excelente calidad y una estética elegante.",
        "Gracias a nuestra tecnología <strong>SMOOTH</strong>, los cajones se cierran de forma <strong>amortiguada y silenciosa</strong>, brindando una experiencia de uso suave, confortable y duradera.",
      ],
      diagramImage: "/assets/thowel box/THOWELBOX-18.png",
    },
    especificaciones: {
      intro: "Fabricado con materiales de <strong>alta resistencia</strong> y herrajes de acero premium, ofreciendo una <strong>solución robusta, versátil y moderna</strong> para todo tipo de proyectos profesionales.",
      specTableImage: "/assets/thowel box/thowelboxcuadro.png",
      icons: [
        { src: "/assets/thowel box/THOWELBOX-20.png", alt: "30 kg/par" },
        { src: "/assets/thowel box/THOWELBOX-21.png", alt: "1 set / master 6 set" },
        { src: "/assets/thowel box/THOWELBOX-22.png", alt: "80.000 Ciclos de uso" },
      ],
      extraImages: [],
    },
    detalles: {
      images: ["/assets/thowel box/ThowelBoxDesign.png"],
    },
    subProducts: null,
  },
  {
    slug: "lateral-cajon-metalico",
    fileSlug: "lateralCajonMetalico",
    category: "cajones",
    nameKey: "products.lateralCajonMetalico",
    title: { bold: "LATERAL CAJÓN", accent: "METÁLICO", accentTech: "ESTÁNDAR" },
    techBadgeImage: "/assets/estandar.png",
    stickyImages: [
      { src: "/assets/lateral-metalico/LATERAL METALICO.JPG", alt: "Lateral Cajón Metálico", dataSection: "descripcion" },
      { src: "/assets/lateral-metalico/LATERAL METALICO (1).JPG", alt: "Lateral Cajón Metálico Ambiente", dataSection: "especificaciones" },
      { src: "/assets/lateral-metalico/LATERAL METALICO.JPG", alt: "Detalles Lateral Cajón Metálico", dataSection: "detalles" },
    ],
    descripcion: {
      paragraphs: [
        "Optimizá el montaje con nuestros cajones de <strong>LATERALES METÁLICOS</strong>, diseñados con pocos componentes para una instalación rápida y eficiente.",
        "Ofrecen gran estabilidad y se adaptan a múltiples aplicaciones, gracias a su variedad de anchos, alturas y largos.",
      ],
      diagramImage: "/assets/lateral-metalico/LATERAL METALICO-21.png",
    },
    especificaciones: {
      intro: "Fabricado con materiales de <strong>alta resistencia</strong>, ofreciendo una <strong>solución robusta y versátil</strong> para todo tipo de proyectos profesionales.",
      specTableImage: null,
      icons: [
        { src: "/assets/lateral-metalico/LATERAL METALICO-22.png", alt: "20 kg/par" },
        { src: "/assets/lateral-metalico/LATERAL METALICO-23.png", alt: "10 Set" },
        { src: "/assets/lateral-metalico/LATERAL METALICO-24.png", alt: "20.000 Ciclos de uso" },
      ],
      extraImages: [],
      extraGroups: [
        { icons: [], plano: "/assets/lateral-metalico/_CAMBIAR_ LATERAL METALICO-18.png" },
        { icons: [], plano: "/assets/lateral-metalico/_CAMBIAR_ LATERAL METALICO-19.png" },
        { icons: [], plano: "/assets/lateral-metalico/_CAMBIAR_ LATERAL METALICO-20.png" },
        { icons: [], plano: "/assets/lateral-metalico/LATERAL METALICO-25.png" },
      ],
    },
    detalles: null,
    subProducts: null,
  },

  // ============================================================
  // BISAGRAS
  // ============================================================
  {
    slug: "bisagra-clip-3d",
    fileSlug: "bisagraClip3D",
    category: "bisagras",
    nameKey: "products.hingeClip3d",
    title: { bold: "BISAGRA CLIP 3D", accent: "SOFT CLOSING", accentTech: "SMOOTH" },
    techBadgeImage: "/assets/TecnologiaSmooth.png",
    stickyImages: [
      { src: "/assets/bisagra clip 3D/BC3D.png", alt: "Bisagra Clip 3D", dataSection: "descripcion" },
      { src: "/assets/bisagra clip 3D/ambienteClip3D.JPG", alt: "Ambiente", dataSection: "especificaciones" },
      { src: "/assets/bisagra clip 3D/BISAGRACLIP.png", alt: "Bisagra instalada", dataSection: "codazos" },
    ],
    descripcion: {
      paragraphs: [
        "Cuentan con una tecnología <strong>SMOOTH</strong>, que permite cierres amortiguados y silenciosos, mejorando notablemente la funcionalidad y la experiencia de uso, sumando valor estético y práctico a cualquier amoblamiento.",
      ],
      diagramImage: "/assets/bisagra clip 3D/DiagramaBC3D.png",
    },
    especificaciones: {
      intro: "Además, incorporan una <strong>cobertor integral de tornillos para brazos y caja de bisagras,</strong> que proporciona una terminación prolija y estética, elevando la calidad visual del interior del amoblamiento.",
      specTableImage: "/assets/bisagra clip 3D/TablaBC3D.png",
      icons: [],
      extraImages: [
        "/assets/bisagra clip 3D/CATALOGO BISAGRAS-22.png",
        "/assets/bisagra clip 3D/CATALOGO BISAGRAS-23.png",
        "/assets/bisagra clip 3D/CATALOGO BISAGRAS-24.png",
        "/assets/bisagra clip 3D/CATALOGO BISAGRAS-25.png",
      ],
    },
    detalles: {
      images: [
        "/assets/bisagra clip 3D/codo0HorizontalClip3D.png",
        "/assets/bisagra clip 3D/CodoHorizontal9Clip3D.png",
        "/assets/bisagra clip 3D/codoHorizontal15Clip3D.png",
      ],
    },
    subProducts: null,
  },
  {
    slug: "bisagra-soft-closing",
    fileSlug: "bisagraSoftClosing",
    category: "bisagras",
    nameKey: "products.hingeSoftClosing",
    title: { bold: "BISAGRA", accent: "SOFT CLOSING", accentTech: "SMOOTH" },
    techBadgeImage: "/assets/TecnologiaSmooth.png",
    stickyImages: [
      { src: "/assets/bisagra soft closing/BisagraSoftClosing1.png", alt: "Bisagra Soft Closing", dataSection: "descripcion" },
      { src: "/assets/ambiente.png", alt: "Ambiente", dataSection: "especificaciones" },
      { src: "/assets/bisagra soft closing/BisagraSoftClosing2.png", alt: "Bisagra instalada", dataSection: "codazos" },
    ],
    descripcion: {
      paragraphs: [
        "La tecnología <strong>SMOOTH</strong> garantiza un cierre suave y sin ruido, aportando confort y funcionalidad a los muebles, mejorando la calidad percibida del amoblamiento.",
      ],
      diagramImage: "/assets/bisagra cazoleta estandar/AnguloAperturaBCE.png",
    },
    especificaciones: {
      intro: "Además su base fija las convierte en una de las opciones más prácticas y <strong>competitivas del mercado.</strong>",
      specTableImage: "/assets/bisagra soft closing/TablaSoftClosing.png",
      icons: [],
      extraImages: [
        "/assets/bisagra soft closing/BISAGRAS SOFT CLOSING-21.png",
        "/assets/bisagra soft closing/BISAGRAS SOFT CLOSING-22.png",
        "/assets/bisagra soft closing/BISAGRAS SOFT CLOSING-23.png",
        "/assets/bisagra soft closing/BISAGRAS SOFT CLOSING-24.png",
      ],
    },
    detalles: {
      images: [
        "/assets/bisagra soft closing/CodoHorizontal0SoftClosing.png",
        "/assets/bisagra soft closing/CodoHorizontal9SoftClosing.png",
      ],
    },
    subProducts: null,
  },
  {
    slug: "bisagra-cazoleta-estandar",
    fileSlug: "bisagraCazoletaEstandar",
    category: "bisagras",
    nameKey: "products.hingeCup",
    title: { bold: "BISAGRA CAZOLETA", accent: "ESTÁNDAR", accentTech: "ESTÁNDAR" },
    techBadgeImage: "/assets/estandar.png",
    stickyImages: [
      { src: "/assets/bisagra cazoleta estandar/BISAGRACAZOLETAESTANDAR.png", alt: "Bisagra Cazoleta Estándar", dataSection: "descripcion" },
      { src: "/assets/ambiente.png", alt: "Ambiente", dataSection: "especificaciones" },
      { src: "/assets/bisagra cazoleta estandar/BCE.png", alt: "Bisagra instalada", dataSection: "codazos" },
    ],
    descripcion: {
      paragraphs: [
        "Desarrolladas bajo nuestra tecnología <strong>ESTÁNDAR</strong>, aseguran un excelente rendimiento y resistencia en el uso diario.",
      ],
      diagramImage: "/assets/bisagra cazoleta estandar/AnguloAperturaBCE.png",
    },
    especificaciones: {
      intro: "Son ampliamente utilizadas en la industria del mueble, <strong>destacándose por su fiabilidad y facilidad de instalación</strong>. Fabricadas en acero de alta calidad, cumpliendo con estrictos estándares de producción, ofrecen una solución duradera y eficiente para todo tipo de amoblamientos.",
      specTableImage: "/assets/bisagra cazoleta estandar/tabla.png",
      icons: [],
      extraImages: [
        "/assets/bisagra cazoleta estandar/_CAMBIAR_ B. CAZOELTA-24.png",
        "/assets/bisagra cazoleta estandar/BISAGRA CAZOLETA-21.png",
        "/assets/bisagra cazoleta estandar/BISAGRA CAZOLETA-22.png",
        "/assets/bisagra cazoleta estandar/BISAGRA CAZOLETA-23.png",
        "/assets/bisagra cazoleta estandar/BISAGRA CAZOLETA-26.png",
        "/assets/bisagra cazoleta estandar/_CAMBIAR_ B. CAZOELTA-23.png",
        "/assets/bisagra cazoleta estandar/BISAGRA CAZOLETA-28.png",
        "/assets/bisagra cazoleta estandar/BISAGRA CAZOLETA-30.png",
        "/assets/bisagra cazoleta estandar/BISAGRA CAZOLETA-31.png",
      ],
    },
    detalles: {
      images: [
        "/assets/bisagra cazoleta estandar/codo0.png",
        "/assets/bisagra cazoleta estandar/codo9.png",
        "/assets/bisagra cazoleta estandar/codo15.png",
      ],
    },
    subProducts: null,
  },
  {
    slug: "bisagra-push-open",
    fileSlug: "bisagraPushOpen",
    category: "bisagras",
    nameKey: "products.hingePushOpen",
    title: { bold: "BISAGRA", accent: "PUSH OPEN", accentTech: "TOUCH" },
    techBadgeImage: "/assets/tecnologiaTouch.png",
    stickyImages: [
      { src: "/assets/bisagra push open/BISAGRAPUSHOPEN.png", alt: "Bisagra Push Open", dataSection: "descripcion" },
      { src: "/assets/bisagra push open/ambientePO.JPG", alt: "Ambiente Push Open", dataSection: "especificaciones" },
      { src: "/assets/bisagra push open/BISAGRAPUSHOPEN2.png", alt: "Bisagra instalada", dataSection: "codazos" },
    ],
    descripcion: {
      paragraphs: [
        "Gracias a la tecnología <strong>TOUCH</strong> el cual es un sistema de apertura de mecánica por presión, esta bisagra permite abrir puertas <strong>sin necesidad de tiradores ni manijas,</strong> logrando un diseño limpio y moderno.",
      ],
      diagramImage: "/assets/bisagra push open/DiagramaBPO.png",
    },
    especificaciones: {
      intro: "Es ideal para muebles que priorizan líneas puras y superficies libres de elementos visibles.",
      specTableImage: "/assets/bisagra push open/_CAMBIAR_ B.PUSH OPEN-19.png",
      icons: [],
      extraImages: [
        "/assets/bisagra push open/BISAGRA PUSH OPEN-20.png",
        "/assets/bisagra push open/BISAGRA PUSH OPEN-21.png",
        "/assets/bisagra push open/BISAGRA PUSH OPEN-22.png",
        "/assets/bisagra push open/BISAGRA PUSH OPEN-23.png",
      ],
    },
    detalles: {
      images: [
        "/assets/bisagra push open/_CAMBIAR_ B.PUSH OPEN-21.png",
        "/assets/bisagra push open/_CAMBIAR_ B.PUSH OPEN-20.png",
      ],
    },
    subProducts: null,
  },
  {
    slug: "bisagra-cazoleta-155",
    fileSlug: "bisagraCazoleta155",
    category: "bisagras",
    nameKey: "products.hingeCup155",
    title: { bold: "BISAGRA ÁNGULOS", accent: "ESPECIALES", accentTech: "ESTÁNDAR" },
    techBadgeImage: "/assets/estandar.png",
    stickyImages: [
      { src: "/assets/bisagra angulos especiales/BisagraCazoleta155Lejos.png", alt: "Bisagra Ángulos Especiales 135°", dataSection: "descripcion" },
      { src: "/assets/bisagra angulos especiales/angulosespecialesambiente.JPG", alt: "Ambiente", dataSection: "especificaciones" },
      { src: "/assets/bisagra angulos especiales/BisagraCazoleta175Lejos.png", alt: "Bisagra Ángulos Especiales 175°", dataSection: "codazos" },
    ],
    descripcion: {
      paragraphs: [
        "Diseñadas bajo nuestra tecnología <strong>ESTÁNDAR</strong>, garantizan un funcionamiento eficiente y una resistencia prolongada en el tiempo.",
        "Las bisagras especiales de <strong>135° y 175°</strong> son la solución ideal para sistemas de <strong>puertas esquineras</strong>, ya que optimizan el espacio y permiten un acceso cómodo en muebles donde las bisagras convencionales no son viables.",
      ],
      diagramImage: "/assets/bisagra angulos especiales/B. angulos especiales-19.png",
    },
    especificaciones: {
      intro: null,
      specTableImage: null,
      icons: [],
      extraImages: [],
      extraGroups: [
        {
          icons: [
            "/assets/bisagra angulos especiales/ANGULOS ESPECIALES-135 (2).png",
            "/assets/bisagra angulos especiales/ANGULOS ESPECIALES-135 (3).png",
            "/assets/bisagra angulos especiales/ANGULOS ESPECIALES-135 (4).png",
            "/assets/bisagra angulos especiales/_CAMBIAR_ ANGULOS ESPECIALES-135.png",
          ],
          plano: "/assets/bisagra angulos especiales/CodoAnguloEspecial135.png",
        },
        {
          icons: [
            "/assets/bisagra angulos especiales/ANGULOS ESPECIALES-175 (2).png",
            "/assets/bisagra angulos especiales/ANGULOS ESPECIALES-175 (3).png",
            "/assets/bisagra angulos especiales/ANGULOS ESPECIALES-175 (4).png",
            "/assets/bisagra angulos especiales/_CAMBIAR_ANGULOS ESPECIALES-175.png",
          ],
          plano: "/assets/bisagra angulos especiales/CodoAngulosEspeciales175.png",
        },
      ],
    },
    detalles: null,
    subProducts: null,
  },
  {
    slug: "reten-expulsor",
    fileSlug: "retenExpulsor",
    category: "bisagras",
    nameKey: "products.retainerExpeller",
    title: { bold: "RETÉN EXPULSOR", accent: "PUSH OPEN", accentTech: "TOUCH" },
    techBadgeImage: "/assets/tecnologiaTouch.png",
    stickyImages: [
      { src: "/assets/reten expulsor/RetenExp.png", alt: "Retén Expulsor", dataSection: "descripcion" },
      { src: "/assets/reten expulsor/RETEN EXPULSOR.JPG", alt: "Retén instalado", dataSection: "especificaciones" },
      { src: "/assets/reten expulsor/RetenesExpulsor.png", alt: "Retén detalle", dataSection: "codigos" },
    ],
    descripcion: {
      paragraphs: [
        "Este dispositivo asegura el <strong>cierre perfecto</strong> de puertas sin elementos visibles, ideal para diseños que buscan un acabado limpio y sin herrajes, garantizando un cierre correcto y seguro.",
        "El accesorio retén expulsor está diseñado para mantener la <strong>puerta cerrada, evitando su apertura no deseada.</strong> Mediante un mecanismo de presión, se libera el sistema de retención y permite la expulsión de la puerta.",
      ],
      diagramImage: null,
    },
    especificaciones: {
      intro: null,
      specTableImage: null,
      icons: [],
      extraImages: [
        "/assets/reten expulsor/RETEN-20.png",
        "/assets/reten expulsor/RETEN-21.png",
        "/assets/reten expulsor/RETEN-22.png",
      ],
      extraGroups: [
        { icons: [], plano: "/assets/reten expulsor/_CAMBIAR_ RETEN EXPULSOR-19.png" },
        { icons: [], plano: "/assets/reten expulsor/_CAMBIAR_ RETEN EXPULSOR-20.png" },
        { icons: [], plano: "/assets/reten expulsor/_CAMBIAR_ RETEN EXPULSOR-21.png" },
      ],
    },
    detalles: null,
    subProducts: null,
  },
  {
    slug: "piston-a-gas",
    fileSlug: "PistonAGAS",
    category: "bisagras",
    nameKey: "products.gasPiston",
    title: { bold: "PISTÓN A GAS", accent: "PARA PUERTA", accentTech: "ESTÁNDAR" },
    techBadgeImage: "/assets/estandar.png",
    stickyImages: [
      { src: "/assets/piston a gas/PISTONAGAS.png", alt: "Pistón a Gas", dataSection: "descripcion" },
      { src: "/assets/piston a gas/ambientePistonGas.png", alt: "Ambiente", dataSection: "especificaciones" },
      { src: "/assets/piston a gas/PISTON A GAS (2).JPG", alt: "Pistón a Gas", dataSection: "codazos" },
    ],
    descripcion: {
      paragraphs: [
        "Se destacan por la facilidad de montaje, que <strong>no requiere seguros y se realiza con un solo clic</strong>. Esta característica agiliza los tiempos de instalación, ofreciendo al mismo tiempo una alta durabilidad y calidad.",
      ],
      diagramImage: null,
    },
    especificaciones: {
      intro: null,
      specTableImage: null,
      icons: [],
      extraImages: [],
      extraGroups: [
        { icons: [], plano: "/assets/piston a gas/PISTON ESTANDAR (5).png" },
        { icons: [], plano: "/assets/piston a gas/PISTON SMOOTH (5).png" },
      ],
    },
    detalles: {
      images: [
        "/assets/piston a gas/CodoPistonGas80mm.png",
        "/assets/piston a gas/CodoPistonGas100mm.png",
      ],
    },
    subProducts: null,
  },

  // ============================================================
  // GUÍAS Y CORREDERAS
  // ============================================================
  {
    slug: "guia-oculta-3d-soft-closing",
    fileSlug: "guiaOculta3DSoftClosing",
    category: "guias",
    nameKey: "products.hiddenSlide3d",
    title: { bold: "GUÍA OCULTA 3D", accent: "SOFT CLOSING", accentTech: "SMOOTH" },
    techBadgeImage: "/assets/TecnologiaSmooth.png",
    carouselImage: "/assets/Guia oculta push Open/GUIA OCULTA.JPG",
    stickyImages: [
      { src: "/assets/Guia oculta push Open/GUIA OCULTA.JPG", alt: "Guía Oculta 3D Soft Closing", dataSection: "descripcion" },
      { src: "/assets/Guia oculta push Open/GUIA OCULTA (2).JPG", alt: "Guía Oculta 3D Soft Closing detalle", dataSection: "especificaciones" },
      { src: "/assets/Guia oculta push Open/GUIA OCULTA (3).JPG", alt: "Guía Oculta 3D ambiente", dataSection: "detalles" },
    ],
    descripcion: {
      paragraphs: [
        "Nuestra línea <strong>SMOOTH</strong> está pensada para los más exigentes. Consigue cajones en los que el sistema de deslizamiento quede completamente oculto, brindando un funcionamiento de alto rendimiento, cómodo y suave.",
      ],
      diagramImage: "/assets/Guia oculta 3D soft closing/dibujo del plano.png",
    },
    especificaciones: {
      intro: null,
      specTableImage: "/assets/Guia oculta 3D soft closing/tabla.png",
      icons: [
        { src: "/assets/Guia oculta 3D soft closing/peso.png", alt: "30 kg/par" },
        { src: "/assets/Guia oculta 3D soft closing/acero.png", alt: "Acero" },
        { src: "/assets/Guia oculta 3D soft closing/10 unidades.png", alt: "10 Pares" },
        { src: "/assets/Guia oculta 3D soft closing/80mil ciclos de uso .png", alt: "80.000 Ciclos de uso" },
      ],
      extraImages: [],
    },
    detalles: {
      images: [
        "/assets/Guia oculta 3D soft closing/iamgen real produ.png",
      ],
    },
    subProducts: null,
  },
  {
    slug: "guia-oculta-push-open",
    fileSlug: "guiaOcultaPushOpen",
    category: "guias",
    nameKey: "products.hiddenSlidePush",
    title: { bold: "GUÍA OCULTA 3D", accent: "PUSH OPEN", accentTech: "TOUCH" },
    techBadgeImage: "/assets/tecnologiaTouch.png",
    carouselImage: "/assets/Guia oculta push Open/GUIA OCULTA (2).JPG",
    stickyImages: [
      { src: "/assets/Guia oculta push Open/GUIA OCULTA.JPG", alt: "Guía Oculta Push Open", dataSection: "descripcion" },
      { src: "/assets/Guia oculta push Open/GUIA OCULTA (2).JPG", alt: "Guía Oculta Push Open detalle", dataSection: "especificaciones" },
      { src: "/assets/Guia oculta push Open/GUIA OCULTA (3).JPG", alt: "Guía Oculta Push Open ambiente", dataSection: "detalles" },
    ],
    descripcion: {
      paragraphs: [
        "Diseñada para quienes valoran el diseño y la funcionalidad. La línea <strong>TOUCH</strong> permite cajones de deslizamiento invisible, con apertura suave y <strong>permite abrirlos con solo presionar el frente, sin necesidad de tiradores.</strong>",
      ],
      diagramImage: "/assets/Guia oculta push Open/dibujo de plano.png",
    },
    especificaciones: {
      intro: null,
      specTableImage: "/assets/Guia oculta push Open/tabla.png",
      icons: [
        { src: "/assets/Guia oculta push Open/peso.png", alt: "30 kg/par" },
        { src: "/assets/Guia oculta push Open/acero.png", alt: "Acero" },
        { src: "/assets/Guia oculta push Open/10 unidades.png", alt: "10 Pares" },
        { src: "/assets/Guia oculta push Open/80 miul cilcos de uso .png", alt: "80.000 Ciclos de uso" },
      ],
      extraImages: [],
    },
    detalles: null,
    subProducts: null,
  },
  {
    slug: "corredera-telescopica-soft-closing",
    fileSlug: "correderaTelescopicaSoftClosing",
    category: "guias",
    nameKey: "products.telescopicSlideSoft",
    title: { bold: "CORREDERAS TELESCÓPICAS", accent: "SOFT CLOSING", accentTech: "SMOOTH" },
    techBadgeImage: "/assets/TecnologiaSmooth.png",
    carouselImage: "/assets/corredera telescopica estandar H35/CORREDERA TELESCOPICA ESTANDAR H35 (2).JPG",
    stickyImages: [
      { src: "/assets/corredera telescopica estandar H45/CORREDERA TELESCOPICA ESTANDAR H45.JPG", alt: "Corredera Telescópica Soft Closing", dataSection: "descripcion" },
      { src: "/assets/corredera telescopica estandar H45/CORREDERA TELESCOPICA ESTANDAR H45 (2).JPG", alt: "Corredera Telescópica Soft Closing detalle", dataSection: "especificaciones" },
      { src: "/assets/corredera telescopica estandar H35/CORREDERA TELESCOPICA ESTANDAR H35.JPG", alt: "Corredera Telescópica ambiente", dataSection: "detalles" },
    ],
    descripcion: {
      paragraphs: [
        "Impulsadas por nuestra tecnología <strong>SMOOTH</strong>, transforman la experiencia cotidiana de uso, ofreciendo un <strong>deslizamiento progresivo y un cierre final controlado</strong>. Ideales para equipamientos modernos, aportan precisión y confort, evitando golpes y ruidos al cerrar los cajones, elevando tanto la funcionalidad como la estética del mueble.",
      ],
      diagramImage: "/assets/corredera telescopica estandar H35/dibujo de plano.png",
    },
    especificaciones: {
      intro: null,
      specTableImage: null,
      icons: [
        { src: "/assets/Corredera telescopica soft closing/peso.png", alt: "25 kg/par" },
        { src: "/assets/Corredera telescopica soft closing/acero.png", alt: "Acero" },
        { src: "/assets/Corredera telescopica soft closing/15 unidades.png", alt: "15 Pares" },
        { src: "/assets/Corredera telescopica soft closing/50mil ciclos de uso.png", alt: "50.000 Ciclos de uso" },
      ],
      extraImages: [],
      extraGroups: [
        { icons: [], plano: "/assets/Corredera telescopica soft closing/tabla.png" },
        { icons: [], plano: "/assets/Corredera telescopica soft closing/tabla 2.png" },
      ],
    },
    detalles: null,
    subProducts: null,
  },
  {
    slug: "corredera-telescopica-push-open",
    fileSlug: "correderaTelescopicaPushOpen",
    category: "guias",
    nameKey: "products.telescopicSlidePush",
    title: { bold: "CORREDERAS TELESCÓPICAS", accent: "PUSH OPEN", accentTech: "TOUCH" },
    techBadgeImage: "/assets/tecnologiaTouch.png",
    carouselImage: "/assets/corredera telescopica estandar H45/CORREDERA TELESCOPICA ESTANDAR H45 (2).JPG",
    stickyImages: [
      { src: "/assets/corredera telescopica estandar H45/CORREDERA TELESCOPICA ESTANDAR H45.JPG", alt: "Corredera Telescópica Push Open", dataSection: "descripcion" },
      { src: "/assets/corredera telescopica estandar H45/CORREDERA TELESCOPICA ESTANDAR H45 (2).JPG", alt: "Corredera Telescópica Push Open detalle", dataSection: "especificaciones" },
      { src: "/assets/corredera telescopica estandar H35/CORREDERA TELESCOPICA ESTANDAR H35.JPG", alt: "Corredera Telescópica ambiente", dataSection: "detalles" },
    ],
    descripcion: {
      paragraphs: [
        "Nuestra tecnología <strong>TOUCH</strong>, con una <strong>leve presión</strong> es suficiente para abrir el cajón, sin necesidad de tiradores. Son ideales para proyectos de diseño minimalista, y que además de su estética limpia, estas correderas ofrecen una apertura <strong>firme y confiable</strong>, incluso con cajones de gran tamaño o carga.",
      ],
      diagramImage: "/assets/corredera telescopica push Open/dibujo del plano.png",
    },
    especificaciones: {
      intro: null,
      specTableImage: null,
      icons: [
        { src: "/assets/corredera telescopica push Open/peso.png", alt: "25 kg/par" },
        { src: "/assets/corredera telescopica push Open/acero.png", alt: "Acero" },
        { src: "/assets/corredera telescopica push Open/15 unidades.png", alt: "15 Pares" },
        { src: "/assets/corredera telescopica push Open/50mil ciclos .png", alt: "50.000 Ciclos de uso" },
      ],
      extraImages: [],
      extraGroups: [
        { icons: [], plano: "/assets/corredera telescopica push Open/tabla.png" },
        { icons: [], plano: "/assets/corredera telescopica push Open/tabla 2.png" },
      ],
    },
    detalles: null,
    subProducts: null,
  },
  {
    slug: "corredera-telescopica-h45",
    fileSlug: "correderaTelescopicaEstandarH45",
    category: "guias",
    nameKey: "products.telescopicSlideH45",
    title: { bold: "CORREDERAS TELESCÓPICAS", accent: "ESTÁNDAR H45", accentTech: "ESTÁNDAR" },
    techBadgeImage: "/assets/estandar.png",
    carouselImage: "/assets/corredera telescopica estandar H45/CORREDERA TELESCOPICA ESTANDAR H45.JPG",
    stickyImages: [
      { src: "/assets/corredera telescopica estandar H45/CORREDERA TELESCOPICA ESTANDAR H45.JPG", alt: "Corredera Telescópica Estándar H45", dataSection: "descripcion" },
      { src: "/assets/corredera telescopica estandar H45/CORREDERA TELESCOPICA ESTANDAR H45 (2).JPG", alt: "Corredera Telescópica Estándar H45 detalle", dataSection: "especificaciones" },
      { src: "/assets/corredera telescopica estandar H35/CORREDERA TELESCOPICA ESTANDAR H35.JPG", alt: "Corredera Telescópica ambiente", dataSection: "detalles" },
    ],
    descripcion: {
      paragraphs: [
        "Forman parte de nuestra línea <strong>ESTÁNDAR</strong>, con <strong>45 mm</strong> de ancho, pensada para ofrecer rendimiento confiable y durabilidad en el uso diario. Su sistema de <strong>triple balinera</strong>, con tres cuerpos y rodamientos de acero, permite una apertura total del cajón con deslizamiento fluido y resistente.",
      ],
      diagramImage: "/assets/corredera telescopica estandar H35/dibujo de plano.png",
    },
    especificaciones: {
      intro: null,
      specTableImage: null,
      icons: [
        { src: "/assets/corredera telescopica estandar H45/peso.png", alt: "30 kg/par" },
        { src: "/assets/corredera telescopica estandar H45/acero.png", alt: "Acero" },
        { src: "/assets/corredera telescopica estandar H45/15 unidades.png", alt: "15 Pares" },
        { src: "/assets/corredera telescopica estandar H45/80mil colos .png", alt: "80.000 Ciclos de uso" },
      ],
      extraImages: [],
      extraGroups: [
        { icons: [], plano: "/assets/corredera telescopica estandar H45/tabla.png" },
        { icons: [], plano: "/assets/corredera telescopica estandar H45/tabla 2.png" },
      ],
    },
    detalles: null,
    subProducts: null,
  },
  {
    slug: "corredera-telescopica-h35",
    fileSlug: "correderaTelescopicaEstandarH35",
    category: "guias",
    nameKey: "products.telescopicSlideH35",
    title: { bold: "CORREDERAS TELESCÓPICAS", accent: "ESTÁNDAR H35", accentTech: "ESTÁNDAR" },
    techBadgeImage: "/assets/estandar.png",
    carouselImage: "/assets/corredera telescopica estandar H35/CORREDERA TELESCOPICA ESTANDAR H35.JPG",
    stickyImages: [
      { src: "/assets/corredera telescopica estandar H35/CORREDERA TELESCOPICA ESTANDAR H35.JPG", alt: "Corredera Telescópica Estándar H35", dataSection: "descripcion" },
      { src: "/assets/corredera telescopica estandar H35/CORREDERA TELESCOPICA ESTANDAR H35 (2).JPG", alt: "Corredera Telescópica Estándar H35 detalle", dataSection: "especificaciones" },
      { src: "/assets/corredera telescopica estandar H45/CORREDERA TELESCOPICA ESTANDAR H45.JPG", alt: "Corredera Telescópica ambiente", dataSection: "detalles" },
    ],
    descripcion: {
      paragraphs: [
        "Están diseñadas bajo el diseño de tecnología <strong>ESTÁNDAR</strong>, que asegura una excelente relación entre calidad, resistencia y funcionalidad. Gracias a su estructura de <strong>triple balinera y 35 mm de ancho</strong>, ofrecen una apertura total del cajón y un desplazamiento firme y uniforme, incluso con uso frecuente.",
      ],
      diagramImage: "/assets/corredera telescopica estandar H35/dibujo de plano.png",
    },
    especificaciones: {
      intro: null,
      specTableImage: null,
      icons: [
        { src: "/assets/corredera telescopica estandar H35/peso.png", alt: "20 kg/par" },
        { src: "/assets/corredera telescopica estandar H35/acero.png", alt: "Acero" },
        { src: "/assets/corredera telescopica estandar H35/20 unnidades.png", alt: "20 Pares" },
        { src: "/assets/corredera telescopica estandar H35/80mil ciclos de uso.png", alt: "80.000 Ciclos de uso" },
      ],
      extraImages: [],
      extraGroups: [
        { icons: [], plano: "/assets/corredera telescopica estandar H35/tabla.png" },
        { icons: [], plano: "/assets/corredera telescopica estandar H35/tabla 2.png" },
      ],
    },
    detalles: null,
    subProducts: null,
  },
  {
    slug: "corredera-z",
    fileSlug: "correderaZ",
    category: "guias",
    nameKey: "products.slideZ",
    title: { bold: "CORREDERAS", accent: '"Z"', accentTech: "ESTÁNDAR" },
    techBadgeImage: "/assets/estandar.png",
    carouselImage: "/assets/corredera Z/CORREDERA Z.JPG",
    stickyImages: [
      { src: "/assets/corredera Z/CORREDERA Z.JPG", alt: "Corredera Z", dataSection: "descripcion" },
      { src: "/assets/corredera Z/CORREDERA Z (2).JPG", alt: "Corredera Z Detalle", dataSection: "especificaciones" },
      { src: "/assets/corredera Z/CORREDERA Z.JPG", alt: "Corredera Z ambiente", dataSection: "detalles" },
    ],
    descripcion: {
      paragraphs: [
        "El sistema tradicional de correderas tiene una larga trayectoria como opción funcional y accesible para amoblamientos de uso general. Desarrolladas bajo la tecnología <strong>ESTÁNDAR</strong>, ofrecen una solución <strong>práctica y económica</strong>, con un buen desempeño para aplicaciones que no requieren sistemas de <strong>alta carga o complejidad.</strong>",
      ],
      diagramImage: "/assets/corredera Z/drive-download-20260412T230209Z-3-001/CORREDERA Z-27.png",
    },
    especificaciones: {
      intro: null,
      specTableImage: null,
      icons: [
        { src: "/assets/corredera Z/drive-download-20260412T230209Z-3-001/CORREDERA Z-23.png", alt: "15 kg/par" },
        { src: "/assets/corredera Z/drive-download-20260412T230209Z-3-001/CORREDERA Z-24.png", alt: "Acero" },
        { src: "/assets/corredera Z/drive-download-20260412T230209Z-3-001/CORREDERA Z-25.png", alt: "25 Pares" },
        { src: "/assets/corredera Z/drive-download-20260412T230209Z-3-001/CORREDERA Z-26.png", alt: "20.000 Ciclos de uso" },
      ],
      extraImages: [],
      extraGroups: [
        { icons: [], plano: "/assets/corredera Z/drive-download-20260412T230209Z-3-001/CORREDERA Z-21.png" },
        { icons: [], plano: "/assets/corredera Z/drive-download-20260412T230209Z-3-001/CORREDERA Z-22.png" },
      ],
    },
    detalles: null,
    subProducts: null,
  },

  // ============================================================
  // TIRADORES, MANIJAS Y SISTEMAS DE APOYO
  // ============================================================
  {
    slug: "manijas",
    fileSlug: "manijas",
    category: "tiradores",
    nameKey: "products.handles",
    title: { bold: "TIRADORES Y MANIJAS", accent: "", accentTech: null },
    techBadgeImage: null,
    carouselImage: "/assets/manija barral/MANIJA BARRAL.JPG",
    stickyImages: [
      { src: "/assets/manijas y tiradores amb/IMG_1380.JPG", alt: "Tiradores y Manijas", dataSection: "descripcion" },
      { src: "/assets/manija barral/MANIJA BARRAL.JPG", alt: "Manija Barral", dataSection: "especificaciones" },
      { src: "/assets/manija oval/MANIJA OVAL.JPG", alt: "Manija Oval", dataSection: "detalles" },
    ],
    descripcion: {
      paragraphs: [
        "Están diseñados con materiales de <strong>alta calidad</strong>, asegurando no solo una estética elegante y moderna, sino también una <strong>durabilidad excepcional</strong>. Gracias a su acabado impecable y resistente, garantizan un funcionamiento suave y preciso durante muchos años.",
      ],
      diagramImage: null,
    },
    especificaciones: null,
    detalles: null,
    subProducts: [
      {
        id: "boton",
        title: "TIRADOR BOTÓN",
        description: null,
        heroImage: "/assets/manija boton/MANIJA BOTON.JPG",
        specTableImage: "/assets/manija boton/tabla.png",
        icons: [
          { src: "/assets/manija boton/acero.png", alt: "Acero Níquel" },
          { src: "/assets/manija boton/5o unidades.png", alt: "50 Unid. / master 500 Unid." },
        ],
      },
      {
        id: "barral",
        title: "MANIJA BARRAL",
        description: null,
        heroImage: "/assets/manija barral/MANIJA BARRAL.JPG",
        specTableImage: "/assets/manija barral/tabla.png",
        icons: [],
      },
      {
        id: "oval",
        title: "MANIJA OVAL",
        description: null,
        heroImage: "/assets/manija oval/MANIJA OVAL.JPG",
        specTableImage: "/assets/manija oval/tabla.png",
        icons: [
          { src: "/assets/manija oval/acero.png", alt: "Acero Cromo Mate" },
          { src: "/assets/manija oval/50 unidades.png", alt: "25 Unid. / master 100 Unid." },
        ],
      },
    ],
  },
  {
    slug: "sistemas-de-apoyo",
    fileSlug: "sistemasApoyo",
    category: "tiradores",
    nameKey: "products.supportSystems",
    title: { bold: "SISTEMAS DE APOYO", accent: "", accentTech: null },
    techBadgeImage: null,
    stickyImages: [
      { src: "/assets/rueda nylon/RUEDA NYLON.JPG", alt: "Rueda Nylon", dataSection: "descripcion" },
      { src: "/assets/pata plastica/PATA PLASTICA.JPG", alt: "Pata Plástica", dataSection: "especificaciones" },
      { src: "/assets/pata plastica/PATA PLASTICA.JPG", alt: "Sistemas de Apoyo", dataSection: "detalles" },
    ],
    descripcion: {
      paragraphs: [
        "Aportan <strong>estabilidad y practicidad</strong> en cada aplicación. Fabricados con materiales durables, resisten el uso constante sin comprometer su desempeño. Su diseño compacto y funcional se adapta a distintas superficies, garantizando un apoyo <strong>seguro y eficiente en el tiempo</strong>.",
      ],
      diagramImage: null,
    },
    especificaciones: null,
    detalles: null,
    subProducts: [
      {
        id: "rueda-nylon",
        title: "RUEDA NYLON",
        description: "Sin freno",
        heroImage: "/assets/rueda nylon/RUEDA NYLON.JPG",
        specTableImage: "/assets/rueda nylon/tabla.png",
        icons: [
          { src: "/assets/rueda nylon/acero.png", alt: "Nylon + Acero" },
          { src: "/assets/rueda nylon/peso.png", alt: "40 kg/par" },
          { src: "/assets/rueda nylon/200 unidases .png", alt: "200 Unid." },
          { src: "/assets/rueda nylon/negro.png", alt: "Negro" },
        ],
      },
      {
        id: "pata-plastica",
        title: "PATA PLÁSTICA AJUSTABLE",
        description: "Incluye clip de instalación para zócalo de madera",
        heroImage: "/assets/pata plastica/PATA PLASTICA.JPG",
        specTableImage: "/assets/pata plastica/tabla.png",
        icons: [
          { src: "/assets/pata plastica/plastico.png", alt: "Plástico" },
          { src: "/assets/pata plastica/peso.png", alt: "100 kg/par" },
          { src: "/assets/pata plastica/4 a 200 unidades.png", alt: "200 Unid." },
          { src: "/assets/pata plastica/negro.png", alt: "Negro" },
        ],
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getSimilarProducts(product: Product, limit = 6): Product[] {
  // Primero los de la misma categoría
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  // Si faltan, completar con productos de OTRAS categorías (sin repetir)
  const otherCategories = products.filter(
    (p) => p.category !== product.category && p.slug !== product.slug,
  );
  return [...sameCategory, ...otherCategories].slice(0, limit);
}

export function categoryToNavKey(cat: ProductCategory): string {
  switch (cat) {
    case "cajones":
      return "drawers";
    case "bisagras":
      return "hinges";
    case "guias":
      return "slides";
    case "tiradores":
      return "handles";
  }
}
