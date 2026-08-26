export type NavLink = { i18nKey: string; slug: string };

export type NavCategory = {
  i18nKey: string;
  slug: string;
  items: NavLink[];
};

export const navCategories: NavCategory[] = [
  {
    i18nKey: "nav.drawers",
    slug: "cajones",
    items: [
      { i18nKey: "products.thowelBoxCristal", slug: "thowel-box-cristal" },
      { i18nKey: "products.thowelBoxPlus", slug: "thowel-box-plus" },
      { i18nKey: "products.thowelBox", slug: "thowel-box" },
      { i18nKey: "products.lateralCajonMetalico", slug: "lateral-cajon-metalico" },
    ],
  },
  {
    i18nKey: "nav.hinges",
    slug: "bisagras",
    items: [
      { i18nKey: "products.hingeClip3d", slug: "bisagra-clip-3d" },
      { i18nKey: "products.hingeSoftClosing", slug: "bisagra-soft-closing" },
      { i18nKey: "products.hingeCup", slug: "bisagra-cazoleta-estandar" },
      { i18nKey: "products.hingePushOpen", slug: "bisagra-push-open" },
      { i18nKey: "products.hingeCup155", slug: "bisagra-cazoleta-155" },
      { i18nKey: "products.retainerExpeller", slug: "reten-expulsor" },
      { i18nKey: "products.gasPiston", slug: "piston-a-gas" },
    ],
  },
  {
    i18nKey: "nav.slides",
    slug: "guias",
    items: [
      { i18nKey: "products.hiddenSlide3d", slug: "guia-oculta-3d-soft-closing" },
      { i18nKey: "products.hiddenSlidePush", slug: "guia-oculta-push-open" },
      { i18nKey: "products.telescopicSlideSoft", slug: "corredera-telescopica-soft-closing" },
      { i18nKey: "products.telescopicSlidePush", slug: "corredera-telescopica-push-open" },
      { i18nKey: "products.telescopicSlideH45", slug: "corredera-telescopica-h45" },
      { i18nKey: "products.telescopicSlideH35", slug: "corredera-telescopica-h35" },
      { i18nKey: "products.slideZ", slug: "corredera-z" },
    ],
  },
  {
    i18nKey: "nav.handles",
    slug: "tiradores",
    items: [
      { i18nKey: "products.handles", slug: "manijas" },
      { i18nKey: "products.supportSystems", slug: "sistemas-de-apoyo" },
    ],
  },
];
