"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { ORDER_PRODUCTS, type Form } from "@/data/products";
import type { CartLine, Customer } from "@/lib/whatsapp";

type Ctx = {
  sel: number; form: Form; qty: number; cart: CartLine[]; customer: Customer;
  selectProduct: (i: number) => void;
  setForm: (f: Form) => void;
  setQty: (fn: (n: number) => number) => void;
  setCustomer: (patch: Partial<Customer>) => void;
  add: () => void;
  change: (k: number, delta: number) => void;
  remove: (k: number) => void;
  pick: (i: number) => void;
};

const OrderCtx = createContext<Ctx | null>(null);

export const useOrder = () => {
  const c = useContext(OrderCtx);
  if (!c) throw new Error("useOrder must be used inside <OrderProvider>");
  return c;
};

const clamp = (n: number) => Math.min(99, n);

function withLine(cart: CartLine[], i: number, f: Form, n: number): CartLine[] {
  const k = cart.findIndex((l) => l.i === i && l.f === f);
  if (k < 0) return [...cart, { i, f, n: clamp(n) }];
  return cart.map((l, j) => (j === k ? { ...l, n: clamp(l.n + n) } : l));
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [sel, setSel] = useState(0);
  const [form, setFormState] = useState<Form>("Grano");
  const [qty, setQtyState] = useState(1);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [customer, setCust] = useState<Customer>({ name: "", city: "", notes: "" });

  const selectProduct = useCallback((i: number) => {
    setSel(i);
    setFormState((f) => (ORDER_PRODUCTS[i].forms.includes(f) ? f : ORDER_PRODUCTS[i].forms[0]));
  }, []);

  const value = useMemo<Ctx>(() => ({
    sel, form, qty, cart, customer,
    selectProduct,
    setForm: setFormState,
    setQty: (fn) => setQtyState((n) => Math.max(1, Math.min(99, fn(n)))),
    setCustomer: (patch) => setCust((c) => ({ ...c, ...patch })),
    add: () => { setCart((c) => withLine(c, sel, form, qty)); setQtyState(1); },
    change: (k, delta) => setCart((c) => c.flatMap((l, j) => {
      if (j !== k) return [l];
      const n = clamp(l.n + delta);
      return n < 1 ? [] : [{ ...l, n }];
    })),
    remove: (k) => setCart((c) => c.filter((_, j) => j !== k)),
    // "Armar mi pedido" in the hero: adds the product on screen and scrolls to the builder
    pick: (i) => {
      const f = ORDER_PRODUCTS[i].forms[0];
      setSel(i); setFormState(f);
      setCart((c) => withLine(c, i, f, 1));
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("pedido")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    },
  }), [sel, form, qty, cart, customer, selectProduct]);

  return <OrderCtx.Provider value={value}>{children}</OrderCtx.Provider>;
}
