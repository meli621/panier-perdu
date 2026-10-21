import Stripe from "stripe";

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("La variable STRIPE_SECRET_KEY est manquante.");
  }
  return new Stripe(key);
}
