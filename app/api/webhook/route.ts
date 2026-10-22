import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

// Lecture défensive : selon la version de l'API Stripe, l'identifiant de
// l'abonnement n'est pas au même endroit dans une facture.
function abonnementDeFacture(invoice: Stripe.Invoice): string | null {
  const brut = invoice as unknown as Record<string, unknown>;
  const direct = brut["subscription"];
  if (typeof direct === "string") return direct;
  if (direct && typeof direct === "object" && "id" in direct) {
    return String((direct as { id: unknown }).id);
  }
  const parent = brut["parent"] as
    | { subscription_details?: { subscription?: unknown } }
    | undefined;
  const sub = parent?.subscription_details?.subscription;
  if (typeof sub === "string") return sub;
  if (sub && typeof sub === "object" && "id" in sub) {
    return String((sub as { id: unknown }).id);
  }
  return null;
}

function finDePeriode(invoice: Stripe.Invoice): string | null {
  const fin = invoice.lines?.data?.[0]?.period?.end;
  return fin ? new Date(fin * 1000).toISOString() : null;
}

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

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, secret);
  } catch {
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  const db = createAdminClient();
  const maintenant = new Date().toISOString();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const subscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id;
        const customerId =
          typeof session.customer === "string"
            ? session.customer
            : session.customer?.id;

        if (!subscriptionId) break;

        const { error } = await db.from("abonnements").upsert(
          {
            stripe_subscription_id: subscriptionId,
            stripe_customer_id: customerId ?? null,
            email: session.customer_details?.email?.toLowerCase() ?? null,
            statut: session.payment_status === "paid" ? "active" : "incomplete",
            maj_le: maintenant,
          },
          { onConflict: "stripe_subscription_id" },
        );
        if (error) throw error;
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object;
        const subscriptionId = abonnementDeFacture(invoice);
        if (!subscriptionId) break;

        const { error } = await db
          .from("abonnements")
          .update({
            statut: "active",
            periode_fin: finDePeriode(invoice),
            maj_le: maintenant,
          })
          .eq("stripe_subscription_id", subscriptionId);
        if (error) throw error;
        break;
      }

      case "invoice.payment_failed": {
        const subscriptionId = abonnementDeFacture(event.data.object);
        if (!subscriptionId) break;

        const { error } = await db
          .from("abonnements")
          .update({ statut: "past_due", maj_le: maintenant })
          .eq("stripe_subscription_id", subscriptionId);
        if (error) throw error;
        break;
      }

      case "customer.subscription.deleted": {
        const { error } = await db
          .from("abonnements")
          .update({ statut: "canceled", maj_le: maintenant })
          .eq("stripe_subscription_id", event.data.object.id);
        if (error) throw error;
        break;
      }

      default:
        break;
    }
  } catch (error) {
    // Stripe réessaiera automatiquement : on répond en erreur pour ne rien perdre.
    console.error("Traitement du webhook impossible :", event.type, error);
    return NextResponse.json({ error: "Traitement impossible." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
