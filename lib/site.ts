export const SITE_NAME = "Panier Perdu";
export const PRICE_EUROS = 29;
export const GUARANTEE_DAYS = 14;
export const REFUND_DELAY = "5 jours ouvrés";

export const SITE_TITLE = "Panier Perdu — Récupère les paniers abandonnés de ta boutique";
export const SITE_DESCRIPTION =
  "Panier Perdu relance par e-mail les paniers abandonnés des petites boutiques Shopify et WooCommerce. 29 € par mois, relances illimitées, satisfait ou remboursé 14 jours.";

export function siteUrl(): URL {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return new URL(host ? `https://${host}` : "http://localhost:3000");
}
