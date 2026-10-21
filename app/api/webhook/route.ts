import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

// Stripe appelle cette adresse après chaque événement de paiement.
// La signature est vérifiée : sans elle, la requête est refusée.
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("STRIPE_WEBHOOK_SECRET manquante.");
    return NextResponse.json({ error: "Configuration manquante." }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Signature absente." }, { status: 400 });
  }

  const body = await req.text();

  let event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, secret);
  } catch {
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("[paiement confirmé]", {
        session: session.id,
        client: session.customer,
        abonnement: session.subscription,
        email: session.customer_details?.email,
        statut: session.payment_status,
      });
      break;
    }
    case "invoice.paid": {
      console.log("[facture payée]", event.data.object.id);
      break;
    }
    case "invoice.payment_failed": {
      console.log("[paiement échoué]", event.data.object.id);
      break;
    }
    case "customer.subscription.deleted": {
      console.log("[abonnement résilié]", event.data.object.id);
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
