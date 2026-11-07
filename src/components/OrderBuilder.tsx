"use client";

import { useEffect, useRef, useState } from "react";
import { LINES, ORDER_PRODUCTS, PHONE_LABEL, type Form } from "@/data/products";
import { buildMessage, whatsappUrl } from "@/lib/whatsapp";
import { useOrder } from "./OrderContext";
import { WaIcon } from "./icons";

const TIP = "Primero elige un producto y pulsa «Agregar al pedido».";
const FORMS: Form[] = ["Grano", "Molido"];

export default function OrderBuilder() {
  const o = useOrder();
  const { sel, form, qty, cart, customer } = o;
  const allowed = ORDER_PRODUCTS[sel].forms;
  const line = ORDER_PRODUCTS[sel].line;
  const message = buildMessage(cart, customer);
  const hasItems = cart.length > 0;

  const [tip, setTip] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copiar mensaje");
  const addRef = useRef<HTMLButtonElement>(null);
  const previewRef = useRef<HTMLPreElement>(null);
  const timers = useRef<{ tip?: number; scroll?: number; nudge?: number; copy?: number }>({});

  useEffect(() => { if (hasItems) setTip(false); }, [hasItems]);
  useEffect(() => () => { Object.values(timers.current).forEach((t) => clearTimeout(t)); }, []);

  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = () => window.matchMedia("(hover: hover)").matches;

  function nudgeAdd() {
    setNudge(false);
    requestAnimationFrame(() => {
      setNudge(true);
      clearTimeout(timers.current.nudge);
      timers.current.nudge = window.setTimeout(() => setNudge(false), 1600);
    });
  }

  function showTip(withNudge: boolean) {
    setTip(true);
    clearTimeout(timers.current.tip);
    timers.current.tip = window.setTimeout(() => setTip(false), 4200);
    if (!withNudge) return;
    const add = addRef.current;
    if (!add) return;
    const r = add.getBoundingClientRect();
    clearTimeout(timers.current.scroll);
    if (r.bottom < 0 || r.top > window.innerHeight) {
      // phone: the add button is a screen above; let the notice be read, then take the person to it
      timers.current.scroll = window.setTimeout(() => {
        add.scrollIntoView({ behavior: reduce() ? "auto" : "smooth", block: "center" });
        window.setTimeout(nudgeAdd, reduce() ? 0 : 550);
      }, 1500);
    } else nudgeAdd();
  }

  function copy() {
    if (!hasItems) { showTip(true); return; }
    const done = (t: string) => {
      setCopyLabel(t);
      clearTimeout(timers.current.copy);
      timers.current.copy = window.setTimeout(() => setCopyLabel("Copiar mensaje"), 1800);
    };
    const fallback = () => {
      try {
        const el = previewRef.current;
        if (!el) throw new Error("no preview");
        const r = document.createRange(); r.selectNodeContents(el);
        const s = window.getSelection(); s?.removeAllRanges(); s?.addRange(r);
        done("Selecciona y copia el texto");
      } catch { done("No se pudo copiar"); }
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(message).then(() => done("Copiado"), fallback);
    else fallback();
  }

  return (
    <section className="paper" id="pedido" aria-labelledby="pedido-t">
      <div className="wrap">
        <p className="eyebrow">Pedidos por WhatsApp</p>
        <h2 id="pedido-t">Arma tu pedido</h2>
        <p className="lede">Elige el proceso, el tamaño, si lo quieres en grano o molido y la cantidad. Al final se abre WhatsApp con el mensaje ya escrito, listo para enviar.</p>
        <div className="order">
          <div className="builder">
            <fieldset className="grp">
              <legend><span>1</span>Proceso</legend>
              <div className="seg">
                {LINES.map((l) => (
                  <button key={l.key} type="button" aria-pressed={l.key === line} onClick={() => o.selectLine(l.key)}>{l.label}</button>
                ))}
              </div>
            </fieldset>
            <fieldset className="grp">
              <legend><span>2</span>Producto</legend>
              <div className="choices">
                {ORDER_PRODUCTS.map((p, i) => p.line !== line ? null : (
                  <button key={p.key} type="button" className="choice" aria-pressed={i === sel} disabled={p.soon} onClick={() => o.selectProduct(i)}>
                    <span className="pic">{p.pic ? <img alt="" src={p.pic} /> : <em className="soon">Pronto</em>}</span><b>{p.title}</b><i>{p.sub}</i>
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset className="grp">
              <legend><span>3</span>Presentación</legend>
              <div className="seg">
                {FORMS.map((f) => (
                  <button key={f} type="button" aria-pressed={f === form} disabled={!allowed.includes(f)} onClick={() => o.setForm(f)}>{f}</button>
                ))}
              </div>
              <p className="hintp">{allowed.length === 1 ? "El Drip solo viene molido." : ""}</p>
            </fieldset>
            <fieldset className="grp">
              <legend><span>4</span>Cantidad</legend>
              <div className="stepper">
                <button type="button" aria-label="Una unidad menos" onClick={() => o.setQty((n) => n - 1)}>−</button>
                <output aria-live="polite">{qty}</output>
                <button type="button" aria-label="Una unidad más" onClick={() => o.setQty((n) => n + 1)}>+</button>
              </div>
            </fieldset>
            <button ref={addRef} type="button" className={`btn${nudge ? " nudge" : ""}`} onClick={o.add}>Agregar al pedido</button>
          </div>

          <aside className="ticket" aria-label="Tu pedido">
            <h3>Tu pedido</h3>
            <ul className="lines" aria-live="polite">
              {!hasItems && <li className="empty-lines">Todavía no hay productos. Elige uno a la izquierda y pulsa «Agregar al pedido».</li>}
              {cart.map((c, k) => {
                const p = ORDER_PRODUCTS[c.i];
                return (
                  <li key={`${c.i}-${c.f}`}>
                    <span className="nm">{p.name}<small>{p.process} · {c.f}</small></span>
                    <span className="mini">
                      <button type="button" aria-label={`Quitar una unidad de ${p.name}`} onClick={() => o.change(k, -1)}>−</button>
                      <span>{c.n}</span>
                      <button type="button" aria-label={`Agregar una unidad de ${p.name}`} onClick={() => o.change(k, 1)}>+</button>
                    </span>
                    <button type="button" className="rm" aria-label={`Quitar ${p.name} del pedido`} onClick={() => o.remove(k)}>×</button>
                  </li>
                );
              })}
            </ul>
            <div className="cust">
              <label htmlFor="c-name">Tu nombre</label>
              <input id="c-name" type="text" autoComplete="name" placeholder="Ej. María" value={customer.name} onChange={(e) => o.setCustomer({ name: e.target.value })} />
              <label htmlFor="c-city">Ciudad y barrio</label>
              <input id="c-city" type="text" autoComplete="address-level2" placeholder="Ej. Pereira, Cuba" value={customer.city} onChange={(e) => o.setCustomer({ city: e.target.value })} />
              <label htmlFor="c-notes">Notas</label>
              <textarea id="c-notes" rows={2} placeholder="Ej. Molido para cafetera de filtro" value={customer.notes} onChange={(e) => o.setCustomer({ notes: e.target.value })} />
            </div>
            <div className="preview"><span className="label">Así llegará tu mensaje</span><pre ref={previewRef}>{message}</pre></div>
            <div className="sendwrap">
              <span className={`tip${tip ? " show" : ""}`} role="status">{tip ? TIP : ""}</span>
              <a
                className="send" target="_blank" rel="noopener"
                href={hasItems ? whatsappUrl(message) : "#"}
                aria-disabled={!hasItems}
                onClick={(e) => { if (!hasItems) { e.preventDefault(); showTip(true); } }}
                onMouseEnter={() => { if (canHover() && !hasItems) showTip(false); }}
                onMouseLeave={() => { if (canHover()) setTip(false); }}
                onFocus={() => { if (!hasItems) showTip(false); }}
                onBlur={() => setTip(false)}
              >
                <WaIcon />Enviar por WhatsApp
              </a>
            </div>
            <button type="button" className="copy-btn" onClick={copy}>{copyLabel}</button>
            <p className="num">WhatsApp {PHONE_LABEL}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
