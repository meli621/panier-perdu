import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merci — Panier Perdu",
  robots: { index: false },
};

export default function Merci() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-5 py-12">
      <p className="font-serif text-xl font-bold">Panier Perdu</p>
      <h1 className="mt-8 font-serif text-4xl leading-tight font-bold">
        Merci, c’est reçu.
      </h1>
      <p className="mt-5 text-lg leading-relaxed">
        Ton paiement est en cours de confirmation. Stripe t’envoie un e-mail de
        reçu dans quelques minutes.
      </p>
      <p className="mt-4 text-lg leading-relaxed">
        Nous préparons la mise en route de ta boutique et revenons vers toi par
        e-mail sous 72 heures.
      </p>
      <a
        href="/"
        className="mt-10 inline-flex min-h-14 items-center justify-center rounded-sm border-2 border-encre px-6 text-lg font-bold"
      >
        Retour à l’accueil
      </a>
    </main>
  );
}
