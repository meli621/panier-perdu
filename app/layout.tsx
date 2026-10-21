import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Panier Perdu — Récupère les paniers abandonnés",
  description:
    "Relance automatique des paniers abandonnés pour les petites boutiques Shopify et WooCommerce. 29 €/mois, relances illimitées.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
