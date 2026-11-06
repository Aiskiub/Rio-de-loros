import type { Metadata, Viewport } from "next";
import "@fontsource-variable/oswald";
import "@fontsource-variable/lora";
import "./globals.css";

export const metadata: Metadata = {
  title: "Café Río de Loros · Café de origen de Mistrató, Risaralda",
  description:
    "Café semi-lavado 100 % arábica cultivado a 1.750 m s. n. m. en Mistrató, Risaralda. Elige tu bolsa o sobre y haz tu pedido por WhatsApp.",
  openGraph: { title: "Café Río de Loros", description: "Café de origen de Mistrató, Risaralda. Pide por WhatsApp.", locale: "es_CO", type: "website" },
};

export const viewport: Viewport = { viewportFit: "cover", themeColor: "#120a07" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
