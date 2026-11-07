"use client";

import { memo, useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { SLIDES, SOCIAL, type Slide } from "@/data/products";
import { useOrder } from "./OrderContext";
import { ArrowDown, ArrowL, ArrowR, FbIcon, IgIcon } from "./icons";

const A = (n: string) => `/assets/${n}.webp`;
type Vars = CSSProperties & Record<`--${string}`, string | number>;

const SlideScene = memo(function SlideScene({ s, i, onPick }: { s: Slide; i: number; onPick: (i: number) => void }) {
  const p = s.product;
  const productVars: Vars = { "--ph": p.ph };
  if (p.pm) { productVars["--pm"] = p.pm; productVars["--pb"] = p.pb!; productVars["--cap"] = p.cap!; }
  return (
    <section className={`slide${i === 0 ? " on" : ""}`} data-i={i} aria-label={s.label}>
      <div className="bg" data-d="6">
        <img alt="" src={A("bg")} />
        <div className="tint" style={{ "--tint": s.tint || "transparent", "--tint-o": s.tintO } as Vars} />
      </div>
      <div className="glow" style={{ "--glow": s.glow } as Vars} />
      <div className="word" data-d="16"><span className="in">{s.word}</span></div>
      {s.layers.map((l, k) => (
        <div key={k} className={`layer ${l.f ? "z-front" : "z-back"}`} data-d={l.d} style={{ left: `${l.x}%`, top: `${l.y}%` }}>
          <span className="in">
            <img className="fl" data-r={l.r} alt="" src={A(l.s)} style={{ "--w": l.w, "--b": `${l.b ?? 0}px`, "--o": l.o ?? 1 } as Vars} />
          </span>
        </div>
      ))}
      <div className="product" data-d="8" style={productVars}>
        <div className="in"><span className="shadow" /><img className="fl" alt={p.alt} src={A(p.src)} /></div>
      </div>
      <div className="front-pile" data-d="22">
        <span className="in"><img alt="" src={A(s.pile.src)} style={{ "--pw": s.pile.w } as Vars} /></span>
      </div>
      <div className="bottomfade" />
      <div className="col col-l">
        <span className="mask t"><span className="eyebrow">{s.eyebrow}</span></span>
        <span className="zig t" />
        <h2>{s.title.map((t) => <span key={t} className="mask"><span>{t}</span></span>)}</h2>
        <p className="copy t">{s.copy}</p>
        <button type="button" className="cta t" onClick={() => onPick(i)}>Armar mi pedido<ArrowDown /></button>
      </div>
      <div className="col col-r">
        <span className="label t">Perfil de taza</span>
        <ul className="notes t">{s.notes.map((n) => <li key={n}>{n}</li>)}</ul>
        <dl className="facts t">{s.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </div>
    </section>
  );
});

type Parallax = HTMLElement & { _qx?: (v: number) => void; _qy?: (v: number) => void };

export default function Hero() {
  const stageRef = useRef<HTMLElement>(null);
  const { pick } = useOrder();

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const slides = Array.from(stage.querySelectorAll<HTMLElement>(".slide"));
    const navBtns = Array.from(stage.querySelectorAll<HTMLButtonElement>(".switch button"));
    const looped: Record<number, boolean> = {};
    let cur = 0, busy = false, busyTimer: number | undefined, sx: number | null = null;
    const timers: number[] = [];

    const ctx = gsap.context(() => {
      slides.forEach((sl) => sl.querySelectorAll<HTMLElement>(".layer img.fl").forEach((im) => {
        gsap.set(im, { rotation: parseFloat(im.dataset.r ?? "0") || 0 });
      }));

      const setNav = (n: number) => navBtns.forEach((b, i) => { if (i === n) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current"); });

      const startLoops = (sl: HTMLElement, idx: number) => {
        if (reduce || looped[idx]) return;
        looped[idx] = true;
        sl.querySelectorAll<HTMLElement>(".layer img.fl").forEach((im) => {
          const big = im.closest(".layer")!.classList.contains("z-front");
          gsap.to(im, {
            y: gsap.utils.random(big ? -22 : -14, big ? 22 : 14),
            rotation: `+=${gsap.utils.random(-9, 9)}`,
            duration: gsap.utils.random(2.6, 4.8), ease: "sine.inOut", repeat: -1, yoyo: true, delay: gsap.utils.random(0, 1.6),
          });
        });
        gsap.to(sl.querySelector(".product img.fl"), { y: -12, rotation: 0.7, duration: 3.4, ease: "sine.inOut", repeat: -1, yoyo: true });
        gsap.to(sl.querySelector(".shadow"), { scaleX: 0.9, opacity: 0.8, duration: 3.4, ease: "sine.inOut", repeat: -1, yoyo: true });
      };

      const enter = (sl: HTMLElement, idx: number, dir: number) => {
        sl.classList.add("on");
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.timeScale(reduce ? 4 : 1);
        tl.from(sl.querySelector(".bg"), { opacity: 0, scale: 1.1, duration: 1.5, ease: "power2.out" }, 0)
          .from(sl.querySelector(".glow"), { opacity: 0, duration: 1.4 }, 0)
          .from(sl.querySelector(".word .in"), { opacity: 0, y: 70, duration: 1.3 }, 0.1)
          .from(sl.querySelectorAll(".z-back .in"), { opacity: 0, scale: 0.4, x: dir * 140, rotation: dir * 50, duration: 1.2, stagger: 0.07 }, 0.15)
          .from(sl.querySelector(".product .in"), { opacity: 0, y: 160, scale: 0.9, rotation: dir * -4, duration: 1.2, ease: "power4.out" }, 0.25)
          .from(sl.querySelector(".shadow"), { opacity: 0, scaleX: 0.2, duration: 1.1 }, 0.5)
          .from(sl.querySelector(".front-pile .in"), { opacity: 0, y: 260, duration: 1.1 }, 0.3)
          .from(sl.querySelectorAll(".z-front .in"), { opacity: 0, x: dir * 340, rotation: dir * 120, scale: 0.6, duration: 1.3, stagger: 0.08 }, 0.4)
          .from(sl.querySelectorAll(".mask > span"), { yPercent: 115, duration: 1, stagger: 0.09 }, 0.55)
          .from(sl.querySelectorAll(".t:not(.mask)"), { opacity: 0, y: 22, duration: 0.9, stagger: 0.08 }, 0.8)
          .from(sl.querySelectorAll("h2"), { opacity: 0, duration: 0.1 }, 0.55);
        startLoops(sl, idx);
      };

      const exit = (sl: HTMLElement, dir: number) => {
        const tl = gsap.timeline({
          onComplete: () => {
            sl.classList.remove("on");
            gsap.set(sl.querySelectorAll(".in, .bg, .glow, .mask > span, .t, h2"), { clearProps: "opacity,x,y,scale,rotation,yPercent,transform" });
          },
        });
        tl.timeScale(reduce ? 4 : 1);
        tl.to(sl.querySelectorAll(".z-front .in"), { opacity: 0, x: -dir * 260, rotation: -dir * 80, duration: 0.7, ease: "power2.in", stagger: 0.03 }, 0)
          .to(sl.querySelectorAll(".z-back .in"), { opacity: 0, x: -dir * 100, scale: 0.7, duration: 0.7, ease: "power2.in", stagger: 0.03 }, 0)
          .to(sl.querySelector(".product .in"), { opacity: 0, y: -60, scale: 0.95, duration: 0.7, ease: "power2.in" }, 0)
          .to(sl.querySelector(".front-pile .in"), { opacity: 0, y: 160, duration: 0.7, ease: "power2.in" }, 0)
          .to(sl.querySelector(".word .in"), { opacity: 0, y: -40, duration: 0.6 }, 0)
          .to(sl.querySelectorAll(".mask > span"), { yPercent: -115, duration: 0.6, ease: "power2.in", stagger: 0.04 }, 0)
          .to(sl.querySelectorAll(".t:not(.mask)"), { opacity: 0, y: -14, duration: 0.5 }, 0)
          .to(sl.querySelector(".bg"), { opacity: 0, duration: 0.9 }, 0.1)
          .to(sl.querySelector(".glow"), { opacity: 0, duration: 0.9 }, 0.1);
      };

      const go = (target: number, dirIn?: number) => {
        const n = (target + slides.length) % slides.length;
        if (busy || n === cur) return;
        const dir = dirIn ?? (n > cur ? 1 : -1);
        busy = true;
        const out = slides[cur], inn = slides[n];
        out.style.zIndex = "1"; inn.style.zIndex = "2";
        setNav(n);
        exit(out, dir);
        enter(inn, n, dir);
        cur = n;
        busyTimer = window.setTimeout(() => { busy = false; }, reduce ? 300 : 1250);
      };

      const on = (t: Window | HTMLElement, ev: string, fn: (e: never) => void) => {
        t.addEventListener(ev, fn as EventListener);
        cleanups.push(() => t.removeEventListener(ev, fn as EventListener));
      };
      const cleanups: (() => void)[] = [];

      navBtns.forEach((b, i) => on(b, "click", () => go(i)));
      on(stage.querySelector<HTMLElement>(".arrow.next")!, "click", () => go(cur + 1, 1));
      on(stage.querySelector<HTMLElement>(".arrow.prev")!, "click", () => go(cur - 1, -1));
      on(window, "keydown", (e: KeyboardEvent) => {
        if (/^(INPUT|TEXTAREA|SELECT)$/.test((e.target as HTMLElement | null)?.tagName ?? "")) return;
        if (e.key === "ArrowRight") go(cur + 1, 1);
        if (e.key === "ArrowLeft") go(cur - 1, -1);
      });
      on(stage, "pointerdown", (e: PointerEvent) => { if (e.pointerType !== "mouse") sx = e.clientX; });
      on(stage, "pointerup", (e: PointerEvent) => {
        if (sx === null) return;
        const dx = e.clientX - sx; sx = null;
        if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
      });

      // pointer parallax: each layer drifts by its own depth
      if (!reduce) {
        on(stage, "mousemove", (e: MouseEvent) => {
          const nx = (e.clientX / window.innerWidth - 0.5) * 2;
          const ny = (e.clientY / window.innerHeight - 0.5) * 2;
          slides[cur].querySelectorAll<Parallax>("[data-d]").forEach((el) => {
            const d = parseFloat(el.dataset.d ?? "0");
            if (!el._qx) {
              el._qx = gsap.quickTo(el, "x", { duration: 1.3, ease: "power3.out" }) as (v: number) => void;
              el._qy = gsap.quickTo(el, "y", { duration: 1.3, ease: "power3.out" }) as (v: number) => void;
            }
            el._qx(-nx * d); el._qy!(-ny * d * 0.6);
          });
        });
      }

      // stop the hero loops while it is scrolled out of view
      const io = new IntersectionObserver((en) => { gsap.globalTimeline.paused(!en[0].isIntersecting); }, { threshold: 0 });
      io.observe(stage);
      cleanups.push(() => { io.disconnect(); gsap.globalTimeline.paused(false); });

      setNav(0);
      // first entrance waits for the first slide's images so nothing pops in
      const imgs = Array.from(slides[0].querySelectorAll("img"));
      let pending = imgs.filter((im) => !im.complete).length, fired = false;
      const first = () => { if (!fired) { fired = true; enter(slides[0], 0, 1); } };
      if (!pending) first();
      else {
        const settle = () => { if (--pending <= 0) first(); };
        imgs.forEach((im) => { if (!im.complete) { im.addEventListener("load", settle, { once: true }); im.addEventListener("error", settle, { once: true }); } });
        timers.push(window.setTimeout(first, 2500));
      }

      return () => cleanups.forEach((f) => f());
    }, stage);

    return () => {
      ctx.revert();
      clearTimeout(busyTimer);
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <main className="stage" id="stage" ref={stageRef} aria-label="Productos de Café Río de Loros">
      {SLIDES.map((s, i) => <SlideScene key={s.key} s={s} i={i} onPick={pick} />)}
      <header className="top">
        <div className="brand"><b>Café Río de Loros</b><i>Mistrató · Risaralda</i></div>
        <div className="top-r">
          <p>Café de especialidad · Colombia</p>
          <div className="soc">
            <a href={SOCIAL.instagram} target="_blank" rel="noopener" aria-label="Instagram de Café Río de Loros"><IgIcon /></a>
            <a href={SOCIAL.facebook} target="_blank" rel="noopener" aria-label="Facebook de Café Río de Loros"><FbIcon /></a>
          </div>
        </div>
      </header>
      <button type="button" className="arrow prev" aria-label="Producto anterior"><ArrowL /></button>
      <button type="button" className="arrow next" aria-label="Producto siguiente"><ArrowR /></button>
      <nav className="switch" aria-label="Elegir producto">
        {SLIDES.map((s, i) => <button key={s.key} type="button" data-go={i}>{s.label}</button>)}
      </nav>
      <p className="hint">Fluye el aroma, canta el sabor</p>
    </main>
  );
}
