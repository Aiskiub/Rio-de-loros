# Café Río de Loros

Sitio de producto con efecto de capas (parallax 2.5D) y pedidos por WhatsApp.

**Stack:** Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · GSAP

## Correr

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # producción
```

## Dónde cambiar cosas

| Qué | Archivo |
|---|---|
| Teléfono de WhatsApp, redes, productos del hero (textos, capas, posiciones) | `src/data/products.ts` |
| Animaciones, parallax y navegación del hero | `src/components/Hero.tsx` |
| Constructor de pedido, tooltip, copiar mensaje | `src/components/OrderBuilder.tsx` |
| Texto del mensaje de WhatsApp | `src/lib/whatsapp.ts` |
| Sección Nosotros / fotos | `src/components/About.tsx` |
| Colores y tipografías (tokens Tailwind) | `src/app/globals.css` (`@theme`) |
| Estilos del hero / de las secciones | `src/app/hero.css`, `src/app/sections.css` |
| Imágenes (webp con fondo transparente) | `public/assets/` |

Los precios aún no están; cuando existan se agregan en `ORDER_PRODUCTS` y se incluyen en `buildMessage`.
