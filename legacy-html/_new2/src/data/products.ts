export const PHONE = "573214976785";
export const PHONE_LABEL = "321 497 6785";
export const SOCIAL = {
  instagram: "https://www.instagram.com/caferiodeloros/",
  facebook: "https://www.facebook.com/caferiodeloros/",
  whatsapp: `https://wa.me/${PHONE}`,
} as const;

export type Layer = { s: string; x: number; y: number; w: number; r: number; d: number; b?: number; o?: number; f?: 1 };

export type Line = "semi" | "natural";
export const LINES: { key: Line; label: string }[] = [
  { key: "semi", label: "Semi-lavado" },
  { key: "natural", label: "Natural" },
];

export type Slide = {
  key: string;
  line: Line;
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
  notes?: string[]; // empty until the tasting notes of the line are confirmed
  facts: [string, string][];
  layers: Layer[];
};

// --lt: extra room the phone layout reserves for the line selector (0 on desktop)
const BAG_PB = "calc(max(3vh,16px) + 289px + var(--lt,0px))";
const BAG_CAP = "calc(100svh - 390px - var(--lt,0px))";

export const SLIDES: Slide[] = [
  {
    key: "semi-500", line: "semi", label: "500 g", tint: "#1f8a85", tintO: 0.92, glow: "rgba(120,235,220,.20)",
    word: "MISTRATÓ",
    product: { src: "bag500", ph: 66, pm: 0.8, pb: BAG_PB, cap: BAG_CAP, alt: "Bolsa de café Río de Loros semi-lavado de 500 gramos" },
    pile: { src: "pile_beans", w: 78 },
    eyebrow: "Semi-lavado · 500 g", title: ["Fluye", "el aroma"],
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
    key: "semi-250", line: "semi", label: "250 g", tint: "#b9482c", tintO: 0.9, glow: "rgba(255,170,120,.22)",
    word: "CASTILLO",
    product: { src: "bag250", ph: 58, pm: 0.8, pb: BAG_PB, cap: BAG_CAP, alt: "Bolsa de café Río de Loros semi-lavado de 250 gramos" },
    pile: { src: "pile_beans", w: 78 },
    eyebrow: "Semi-lavado · 250 g", title: ["Canta", "el sabor"],
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
    key: "semi-drip", line: "semi", label: "Drip 10 g", tint: "#1f6f6a", tintO: 0.85, glow: "rgba(255,230,190,.18)",
    word: "CATURRA",
    product: { src: "drip", ph: 46, alt: "Drip individual de café molido Río de Loros semi-lavado de 10 gramos" },
    pile: { src: "pile_ground", w: 58 },
    eyebrow: "Semi-lavado · Drip 10 g", title: ["Un río", "en tu taza"],
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

// Natural line. Tasting notes are still to be confirmed by the producer, so none are shown yet.
const NATURAL_COPY = "Café natural de Mistrató: la cereza se seca entera junto con su grano, para una taza más dulce y frutal.";
const NATURAL_NOTE = "Grano o molido";
SLIDES.push(
  {
    key: "natural-500", line: "natural", label: "500 g", tint: "#b27a22", tintO: 0.9, glow: "rgba(255,200,120,.22)",
    word: "NATURAL",
    product: { src: "nat500", ph: 66, pm: 0.8, pb: BAG_PB, cap: BAG_CAP, alt: "Bolsa de café Río de Loros natural de 500 gramos" },
    pile: { src: "pile_beans", w: 78 },
    eyebrow: "Natural · 500 g", title: ["Fluye", "el aroma"],
    copy: NATURAL_COPY + " La bolsa para compartir en casa.",
    facts: [["Origen", "Mistrató, Risaralda"], ["Proceso", "Natural"], ["Presentación", NATURAL_NOTE]],
    layers: SLIDES[1].layers,
  },
  {
    key: "natural-250", line: "natural", label: "250 g", tint: "#7f2c35", tintO: 0.88, glow: "rgba(255,150,130,.22)",
    word: "NATURAL",
    product: { src: "nat250", ph: 58, pm: 0.8, pb: BAG_PB, cap: BAG_CAP, alt: "Bolsa de café Río de Loros natural de 250 gramos" },
    pile: { src: "pile_beans", w: 78 },
    eyebrow: "Natural · 250 g", title: ["Canta", "el sabor"],
    copy: NATURAL_COPY + " El tamaño ideal para probarlo.",
    facts: [["Origen", "Mistrató, Risaralda"], ["Proceso", "Natural"], ["Presentación", NATURAL_NOTE]],
    layers: SLIDES[0].layers,
  },
);

export type Form = "Grano" | "Molido";
export type OrderProduct = {
  key: string; line: Line; process: string; name: string; pic: string; title: string; sub: string; forms: Form[];
  soon?: boolean; // announced but not on sale yet
};

// Index 0..4 match SLIDES (the hero's "Armar mi pedido" passes the slide index).
export const ORDER_PRODUCTS: OrderProduct[] = [
  { key: "semi-500", line: "semi", process: "Semi-lavado", name: "Bolsa 500 g", pic: "/assets/bag500.webp", title: "500 g", sub: "Bolsa · 17,6 oz", forms: ["Grano", "Molido"] },
  { key: "semi-250", line: "semi", process: "Semi-lavado", name: "Bolsa 250 g", pic: "/assets/bag250.webp", title: "250 g", sub: "Bolsa · 8,8 oz", forms: ["Grano", "Molido"] },
  { key: "semi-drip", line: "semi", process: "Semi-lavado", name: "Drip 10 g", pic: "/assets/drip.webp", title: "Drip 10 g", sub: "Molido · 0,35 oz", forms: ["Molido"] },
  { key: "natural-500", line: "natural", process: "Natural", name: "Bolsa 500 g", pic: "/assets/nat500.webp", title: "500 g", sub: "Bolsa · 17,6 oz", forms: ["Grano", "Molido"] },
  { key: "natural-250", line: "natural", process: "Natural", name: "Bolsa 250 g", pic: "/assets/nat250.webp", title: "250 g", sub: "Bolsa · 8,8 oz", forms: ["Grano", "Molido"] },
  { key: "natural-drip", line: "natural", process: "Natural", name: "Drip 10 g", pic: "", title: "Drip 10 g", sub: "Próximamente", forms: ["Molido"], soon: true },
];
