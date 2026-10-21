import { NextResponse, type NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { PRICE_EUROS } from "@/lib/site";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const origin = req.nextUrl.origin;

  try {
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      locale: "fr",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: PRICE_EUROS * 100,
            recurring: { interval: "month" },
            product_data: {
              name: "Panier Perdu : abonnement mensuel",
              description:
                "Relances de paniers abandonnés illimitées pour une boutique. Sans engagement.",
            },
          },
        },
      ],
      custom_fields: [
        {
          key: "boutique",
          label: { type: "custom", custom: "Adresse de ta boutique" },
          type: "text",
        },
      ],
      success_url: `${origin}/merci`,
      cancel_url: `${origin}/paiement-echoue`,
    });

    if (!session.url) {
      return NextResponse.redirect(`${origin}/paiement-echoue`, 303);
    }
    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error("Création du paiement impossible :", error);
    return NextResponse.redirect(`${origin}/paiement-echoue?erreur=1`, 303);
  }
}
