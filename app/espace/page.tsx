import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Mon espace — Panier Perdu",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

async function seDeconnecter() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export default async function Espace() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/connexion");

  const { data: abonnement } = await supabase
    .from("abonnements")
    .select("statut, periode_fin")
    .order("cree_le", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { count: nbBoutiques } = await supabase
    .from("boutiques")
    .select("id", { count: "exact", head: true });

  const actif = abonnement?.statut === "active";
  const impaye = abonnement?.statut === "past_due";

  return (
    <>
      <header className="mx-auto flex max-w-2xl items-center justify-between px-5 pt-5">
        <a href="/" className="font-serif text-xl font-bold">
          Panier Perdu
        </a>
        <form action={seDeconnecter}>
          <button
            type="submit"
            className="min-h-11 text-sm font-bold underline underline-offset-4"
          >
            Se déconnecter
          </button>
        </form>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-10">
        <h1 className="font-serif text-4xl leading-tight font-bold">
          Mon espace
        </h1>
        <p className="mt-2 text-sourdine">{auth.user.email}</p>

        {actif ? (
          <section className="mt-8 border-l-4 border-braise bg-white/40 p-4">
            <p className="font-bold">Ton abonnement est actif.</p>
            <p className="mt-1 leading-relaxed">
              Nous mettons Panier Perdu en route pour ta boutique et te
              prévenons par e-mail sous 72 heures.
            </p>
          </section>
        ) : impaye ? (
          <section
            role="alert"
            className="mt-8 border-l-4 border-braise bg-white/40 p-4"
          >
            <p className="font-bold">Ton dernier paiement n’a pas abouti.</p>
            <p className="mt-1 leading-relaxed">
              Mets à jour ta carte bancaire en nous écrivant, pour que les
              relances continuent.
            </p>
          </section>
        ) : (
          <section className="mt-8 border border-filet bg-white/40 p-5">
            <p className="font-bold">Aucun abonnement trouvé pour cet e-mail.</p>
            <p className="mt-1 leading-relaxed">
              Si tu as payé avec une autre adresse, connecte-toi avec celle-ci.
              Sinon, tu peux t’abonner en une minute.
            </p>
            <a
              href="/#offre"
              className="mt-4 inline-flex min-h-14 w-full items-center justify-center rounded-sm bg-braise px-6 text-lg font-bold text-white"
            >
              Voir l’offre
            </a>
          </section>
        )}

        <section className="mt-10">
          <h2 className="font-serif text-2xl font-bold">Ma boutique</h2>
          {nbBoutiques ? (
            <p className="mt-3">
              {nbBoutiques} boutique{nbBoutiques > 1 ? "s" : ""} connectée
              {nbBoutiques > 1 ? "s" : ""}.
            </p>
          ) : (
            <div className="mt-3 border border-dashed border-sourdine p-5">
              <p className="font-bold">Pas encore de boutique connectée.</p>
              <p className="mt-1 leading-relaxed text-sourdine">
                Une fois ton abonnement actif, nous relions ta boutique Shopify
                ou WooCommerce. Tes paniers abandonnés apparaîtront ici, avec le
                chiffre d’affaires récupéré en euros.
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
