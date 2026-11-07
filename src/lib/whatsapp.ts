import { ORDER_PRODUCTS, PHONE, type Form } from "@/data/products";

export type CartLine = { i: number; f: Form; n: number };
export type Customer = { name: string; city: string; notes: string };

export function buildMessage(cart: CartLine[], c: Customer): string {
  const L = ["Hola, quiero hacer un pedido de Café Río de Loros:", ""];
  if (!cart.length) L.push("(Agrega productos para armar tu pedido)");
  cart.forEach((l) => L.push(`• ${l.n} × ${ORDER_PRODUCTS[l.i].name} · ${ORDER_PRODUCTS[l.i].process} · ${l.f}`));
  const nm = c.name.trim(), ci = c.city.trim(), no = c.notes.trim();
  if (nm || ci || no) L.push("");
  if (nm) L.push(`Nombre: ${nm}`);
  if (ci) L.push(`Ciudad y barrio: ${ci}`);
  if (no) L.push(`Notas: ${no}`);
  if (cart.length) L.push("", "Gracias.");
  return L.join("\n");
}

export const whatsappUrl = (message: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
