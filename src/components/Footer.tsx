import { PHONE_LABEL, SOCIAL } from "@/data/products";
import { FbIcon, IgIcon, WaIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-grid">
        <div>
          <b className="fb">Café Río de Loros</b>
          <p>Café de origen, 100 % arábica. Mistrató, Risaralda, Colombia.</p>
        </div>
        <nav className="soc-l" aria-label="Redes y contacto">
          <a href={SOCIAL.instagram} target="_blank" rel="noopener"><IgIcon />Instagram · @caferiodeloros</a>
          <a href={SOCIAL.facebook} target="_blank" rel="noopener"><FbIcon />Facebook · Café Río de Loros</a>
          <a href={SOCIAL.whatsapp} target="_blank" rel="noopener"><WaIcon />WhatsApp · {PHONE_LABEL}</a>
        </nav>
        <p className="legal">Fabricado y empacado por Café Salma · Calle 16B # 9A-71 local 1, Dosquebradas, Risaralda · Notificación sanitaria No. NAS-0935-2025</p>
      </div>
    </footer>
  );
}
