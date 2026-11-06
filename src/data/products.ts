export const PHONE = "573214976785";
export const PHONE_LABEL = "321 497 6785";
export const SOCIAL = {
  instagram: "https://www.instagram.com/caferiodeloros/",
  facebook: "https://www.facebook.com/caferiodeloros/",
  whatsapp: `https://wa.me/${PHONE}`,
} as const;

export type Layer = { s: string; x: number; y: number; w: number; r: number; d: number; b?: number; o?: number; f?: 1 };

export type Slide = {
  key: string;
  label: string;
  tint: string;
  tintO: number;
  glow: string;
  word: string;
  product: { src: string; ph: number; pm?: number; pb?: string; cap?: string; alt: string };
  pile: { src: string; w: number };
  eyebrow: string;
  title: [string, string];
  copy: string;
  notes: string[];
  facts: [string, string][];
  layers: Layer[];
};

const BAG_PB = "calc(max(3vh,16px) + 289px)";
const BAG_CAP = "calc(100svh - 390px)";

export const SLIDES: Slide[] = [
  {
    key: "500", label: "500 g", tint: "#1f8a85", tintO: 0.92, glow: "rgba(120,235,220,.20)",
    word: "MISTRATÓ",
    product: { src: "bag500", ph: 66, pm: 0.8, pb: BAG_PB, cap: BAG_CAP, alt: "Bolsa de café Río de Loros semi-lavado de 500 gramos" },
    pile: { src: "pile_beans", w: 78 },
    eyebrow: "500 g · 17,6 oz", title: ["Fluye", "el aroma"],
    copy: "Semi-lavado de Mistrató, cultivado a 1.750 metros sobre el nivel del mar. La bolsa para compartir en casa.",
    notes: ["Chocolate", "Caramelo", "Caña de azúcar"],
    facts: [["Origen", "Mistrató, Risaralda"], ["Variedad", "Castillo · Caturra"], ["Proceso", "Semi-lavado"]],
    layers: [
      { s: "leaf2", x: 8, y: 13, w: 12, r: -30, d: 12, b: 2.5, o: 0.8 },
      { s: "leaf1", x: 88, y: 31, w: 10, r: 25, d: 14, b: 2.5, o: 0.9 },
      { s: "leaf6", x: 71, y: 12, w: 12, r: -10, d: 10, b: 3.5, o: 0.75 },
      { s: "bean_d1", x: 34, y: 20, w: 4.2, r: 25, d: 16 },
      { s: "bean_d3", x: 63, y: 27, w: 3.6, r: -40, d: 18 },
      { s: "bean_d5", x: 46, y: 10, w: 3, r: 10, d: 20, b: 1.5 },
      { s: "bean_d2", x: 5, y: 80, w: 11, r: -25, d: 44, b: 4.5, f: 1 },
      { s: "bean_d4", x: 95, y: 75, w: 10, r: 35, d: 40, b: 4.5, f: 1 },
      { s: "cherry1", x: 36, y: 62, w: 6.5, r: -20, d: 28, f: 1 },
      { s: "cherry3", x: 66, y: 58, w: 7, r: 15, d: 30, f: 1 },
      { s: "bean_d1", x: 72, y: 79, w: 5, r: 140, d: 34, b: 2, f: 1 },
    ],
  },
  {
    key: "250", label: "250 g", tint: "#b9482c", tintO: 0.9, glow: "rgba(255,170,120,.22)",
    word: "CASTILLO",
    product: { src: "bag250", ph: 58, pm: 0.8, pb: BAG_PB, cap: BAG_CAP, alt: "Bolsa de café Río de Loros semi-lavado de 250 gramos" },
    pile: { src: "pile_beans", w: 78 },
    eyebrow: "250 g · 8,8 oz", title: ["Canta", "el sabor"],
    copy: "El mismo café de origen en tamaño de prueba. 100 % arábica, en grano o molido.",
    notes: ["Mandarina", "Naranja", "Nuez"],
    facts: [["Origen", "Mistrató, Risaralda"], ["Altura", "1.750 m s. n. m."], ["Proceso", "Semi-lavado"]],
    layers: [
      { s: "leaf4", x: 9, y: 14, w: 8, r: -20, d: 12, b: 2.5, o: 0.8 },
      { s: "leaf5", x: 87, y: 27, w: 15, r: 20, d: 14, b: 2, o: 0.9 },
      { s: "leaf3", x: 73, y: 10, w: 9, r: 15, d: 10, b: 3.5, o: 0.75 },
      { s: "bean_m1", x: 33, y: 17, w: 6, r: 15, d: 16 },
      { s: "bean_m3", x: 66, y: 24, w: 6, r: -10, d: 18 },
      { s: "bean_m5", x: 46, y: 9, w: 3.6, r: 30, d: 20, b: 1.5 },
      { s: "bean_m2", x: 6, y: 78, w: 9, r: -20, d: 44, b: 4.5, f: 1 },
      { s: "bean_m4", x: 94, y: 78, w: 10, r: 25, d: 40, b: 4.5, f: 1 },
      { s: "bean_m1", x: 71, y: 78, w: 6.5, r: -30, d: 30, f: 1 },
      { s: "bean_m5", x: 37, y: 66, w: 5, r: 40, d: 30, f: 1 },
      { s: "leaf6", x: 17, y: 91, w: 16, r: 10, d: 42, b: 4, f: 1, o: 0.95 },
    ],
  },
  {
    key: "sobre", label: "Sobre 10 g", tint: "", tintO: 0, glow: "rgba(255,230,190,.18)",
    word: "CATURRA",
    product: { src: "sobre", ph: 46, alt: "Sobre individual de café molido Río de Loros de 10 gramos" },
    pile: { src: "pile_ground", w: 58 },
    eyebrow: "Sobre · 10 g", title: ["Un río", "en tu taza"],
    copy: "Una porción de café molido, lista para preparar: 10 g de café para 150 ml de agua.",
    notes: ["Chocolate", "Naranja", "Nuez"],
    facts: [["Origen", "Mistrató, Risaralda"], ["Variedad", "Castillo · Caturra"], ["Preparación", "10 g café · 150 ml agua"]],
    layers: [
      { s: "leaf6", x: 9, y: 13, w: 12, r: -15, d: 12, b: 2.5, o: 0.8 },
      { s: "leaf3", x: 88, y: 29, w: 9, r: 30, d: 14, b: 2.5, o: 0.9 },
      { s: "leaf1", x: 72, y: 11, w: 8, r: -25, d: 10, b: 3.5, o: 0.7 },
      { s: "bean_l1", x: 32, y: 16, w: 4.2, r: 20, d: 16 },
      { s: "bean_l3", x: 66, y: 22, w: 3.8, r: -30, d: 18 },
      { s: "bean_l5", x: 47, y: 8, w: 3, r: 15, d: 20, b: 1.5 },
      { s: "bean_l2", x: 6, y: 80, w: 9, r: -20, d: 44, b: 4.5, f: 1 },
      { s: "bean_l4", x: 95, y: 76, w: 9, r: 30, d: 40, b: 4.5, f: 1 },
      { s: "cherry2", x: 38, y: 64, w: 7, r: -15, d: 28, f: 1 },
      { s: "cherry4", x: 65, y: 60, w: 7.5, r: 20, d: 30, f: 1 },
      { s: "bean_l1", x: 73, y: 80, w: 5, r: 120, d: 34, b: 2, f: 1 },
    ],
  },
];

export type Form = "Grano" | "Molido";
export type OrderProduct = { key: string; name: string; pic: string; title: string; sub: string; forms: Form[] };

export const ORDER_PRODUCTS: OrderProduct[] = [
  { key: "500", name: "Bolsa 500 g", pic: "/assets/bag500.webp", title: "500 g", sub: "Bolsa · 17,6 oz", forms: ["Grano", "Molido"] },
  { key: "250", name: "Bolsa 250 g", pic: "/assets/bag250.webp", title: "250 g", sub: "Bolsa · 8,8 oz", forms: ["Grano", "Molido"] },
  { key: "sobre", name: "Sobre 10 g", pic: "/assets/sobre.webp", title: "Sobre 10 g", sub: "Molido · 0,35 oz", forms: ["Molido"] },
];
