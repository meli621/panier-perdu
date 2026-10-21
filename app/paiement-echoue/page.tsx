import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paiement non abouti — Panier Perdu",
  robots: { index: false },
};

export default async function PaiementEchoue({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  const { erreur } = await searchParams;

  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-5 py-12">
      <p className="font-serif text-xl font-bold">Panier Perdu</p>
      <h1 className="mt-8 font-serif text-4xl leading-tight font-bold">
        Le paiement n’a pas abouti.
      </h1>
      <p className="mt-5 text-lg leading-relaxed">
        {erreur
          ? "Un problème technique nous a empêchés d’ouvrir le paiement. Rien n’a été débité."
          : "Tu as quitté le paiement avant la fin, ou ta banque l’a refusé. Rien n’a été débité."}
      </p>
      <p className="mt-4 text-lg leading-relaxed">
        Tu peux réessayer dans un instant. Si le problème continue, essaie avec
        une autre carte.
      </p>
      <a
        href="/#offre"
        className="mt-10 inline-flex min-h-14 items-center justify-center rounded-sm bg-braise px-6 text-lg font-bold text-white"
      >
        Réessayer
      </a>
      <a href="/" className="mt-4 text-center text-sm underline underline-offset-4">
        Retour à l’accueil
      </a>
    </main>
  );
}
