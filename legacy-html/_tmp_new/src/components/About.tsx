import Image from "next/image";

const PHOTOS = [
  { cls: "ph-a", src: "/assets/fotos/jhonattan.webp", alt: "Jhonattan López sonriendo mientras sostiene una prensa francesa con café", cap: "Jhonattan López · Productor", w: 900 },
  { cls: "ph-b", src: "/assets/fotos/finca-1.webp", alt: "Casa de la Finca La Floresta con columnas naranjas y flores, rodeada de vegetación", cap: "Finca La Floresta, Mistrató", w: 640 },
  { cls: "ph-c", src: "/assets/fotos/finca-2.webp", alt: "Ramas de cafeto cargadas de cerezas rojas y verdes", cap: "Del cafetal a la taza", w: 640 },
];

const FACTS: [string, string][] = [
  ["Productor", "Jhonattan López"], ["Finca", "La Floresta"], ["Origen", "Mistrató, Risaralda"],
  ["Variedad", "Castillo · Caturra"], ["Proceso", "Semi-lavado"],
  ["Perfil de taza", "Chocolate, caramelo, caña de azúcar, mandarina, naranja, nuez"],
];

export default function About() {
  return (
    <section className="about" id="nosotros" aria-labelledby="nos-t">
      <div className="wrap about-grid">
        <div className="about-text">
          <p className="eyebrow">Nosotros</p>
          <h2 id="nos-t">Del Río de Loros a tu taza</h2>
          <p className="story">Mistrató, nombre de origen Emberá Chamí que significa «Río de Loros», inspira un café nacido entre las montañas de la cordillera Occidental colombiana, a 1.750 m s. n. m.</p>
          <p className="story">Una expresión auténtica de origen, cultura y biodiversidad, transformada en una experiencia de sabor que honra la esencia de nuestra tierra.</p>
          <dl className="facts2">
            {FACTS.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
          </dl>
        </div>
        <div className="photos">
          {PHOTOS.map((p) => (
            <figure key={p.cls} className={`ph ${p.cls} has`}>
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 860px) 90vw, 560px" />
              <figcaption>{p.cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
