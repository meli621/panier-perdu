import { Footer } from "@/components/Footer";
import { GUARANTEE_DAYS, PRICE_EUROS, REFUND_DELAY } from "@/lib/site";

const boutonPrincipal =
  "inline-flex min-h-14 w-full items-center justify-center rounded-sm bg-braise px-6 text-lg font-bold text-white transition-colors hover:bg-[#9a3412] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre";

const benefices = [
  {
    titre: "Deux relances, au bon moment",
    texte:
      "Un premier rappel quelques heures après l’abandon, un second le lendemain. Chaque e-mail reprend le nom du client et les produits qu’il avait choisis.",
  },
  {
    titre: "Un code de réduction, si tu veux",
    texte:
      "Sur la seconde relance seulement, tu peux offrir un code pour décider les hésitants. C’est facultatif : tu l’actives ou non.",
  },
  {
    titre: "Un prix fixe, des relances illimitées",
    texte:
      "29 € par mois et par boutique, quel que soit le nombre de paniers. Tu vois en euros ce que Panier Perdu te fait récupérer.",
  },
];

export default function Accueil() {
  return (
    <div className="pb-28 md:pb-0">
      <header className="mx-auto flex max-w-2xl items-center justify-between px-5 pt-5">
        <span className="font-serif text-xl font-bold">Panier Perdu</span>
        <nav className="flex items-center gap-5 text-sm font-bold">
          <a
            href="#offre"
            className="hidden min-h-11 items-center underline underline-offset-4 md:inline-flex"
          >
            Voir l’offre
          </a>
          <a
            href="/connexion"
            className="inline-flex min-h-11 items-center underline underline-offset-4"
          >
            Connexion
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-2xl px-5">
        <section className="pt-10 pb-12">
          <h1 className="font-serif text-4xl leading-[1.1] font-bold md:text-5xl">
            Récupère les paniers que tes clients abandonnent.
          </h1>
          <p className="mt-5 text-lg leading-relaxed">
            Panier Perdu relance par e-mail les paniers oubliés de ta boutique
            Shopify ou WooCommerce. Pensé pour les boutiques qui font quelques
            dizaines de commandes par mois.
          </p>
          <div className="mt-8">
            <a href="#offre" className={boutonPrincipal}>
              Commencer
            </a>
            <p className="mt-3 text-center text-sm text-sourdine">
              Sans engagement · Satisfait ou remboursé {GUARANTEE_DAYS} jours
            </p>
          </div>
        </section>

        <section
          aria-labelledby="douleur"
          className="border-t border-filet py-12"
        >
          <h2 id="douleur" className="sr-only">
            Ce que coûtent les paniers abandonnés
          </h2>
          <p className="font-serif text-6xl leading-none font-bold text-braise">
            7 sur 10
          </p>
          <p className="mt-3 text-lg leading-relaxed">
            C’est la part des paniers remplis puis abandonnés avant le paiement
            dans les boutiques en ligne (moyenne mesurée par le{" "}
            <a
              href="https://baymard.com/lists/cart-abandonment-rate"
              className="underline underline-offset-4"
              rel="noopener noreferrer"
            >
              Baymard Institute
            </a>
            ).
          </p>

          <div className="mt-8 border border-filet bg-white/40 p-5">
            <p className="text-sm font-bold tracking-wide uppercase text-sourdine">
              Exemple : 30 commandes par mois, panier moyen de 60 €
            </p>
            <dl className="mt-4 space-y-4">
              <div className="flex items-baseline justify-between gap-4 border-b border-filet pb-4">
                <dt>Paniers abandonnés chaque mois</dt>
                <dd className="font-serif text-2xl font-bold">≈ 70</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-filet pb-4">
                <dt>Chiffre d’affaires laissé de côté</dt>
                <dd className="font-serif text-2xl font-bold">≈ 4 200 €</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt>Si 1 panier sur 10 revient</dt>
                <dd className="font-serif text-2xl font-bold text-braise">
                  ≈ 420 €
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-sourdine">
              Calcul indicatif, fondé sur une hypothèse de 1 panier récupéré sur
              10. Le résultat réel dépend de ta boutique. 420 € représentent
              plus de 14 fois le prix de l’abonnement.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="benefices"
          className="border-t border-filet py-12"
        >
          <h2 id="benefices" className="font-serif text-3xl leading-tight font-bold">
            Trois choses, et rien de superflu.
          </h2>
          <ol className="mt-8 space-y-8">
            {benefices.map((b, i) => (
              <li key={b.titre} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="font-serif text-3xl leading-none font-bold text-braise"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold">{b.titre}</h3>
                  <p className="mt-1 leading-relaxed">{b.texte}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="offre"
          aria-labelledby="offre-titre"
          className="scroll-mt-4 border-t border-filet py-12"
        >
          <h2 id="offre-titre" className="font-serif text-3xl leading-tight font-bold">
            Une seule formule.
          </h2>
          <p className="mt-6 flex items-baseline gap-2">
            <span className="font-serif text-6xl leading-none font-bold">
              {PRICE_EUROS} €
            </span>
            <span className="text-lg">par mois et par boutique</span>
          </p>
          <p className="mt-2 text-sourdine">
            Soit moins de 1 € par jour. Relances illimitées.
          </p>

          <div className="mt-6 border-l-4 border-braise bg-white/40 p-4">
            <p className="font-bold">
              Satisfait ou remboursé pendant {GUARANTEE_DAYS} jours.
            </p>
            <p className="mt-1 leading-relaxed">
              Si Panier Perdu ne te convient pas, écris-nous par e-mail dans les{" "}
              {GUARANTEE_DAYS} jours qui suivent ton paiement. Tu es remboursé
              sous {REFUND_DELAY}, sans avoir à te justifier.
            </p>
          </div>

          <form action="/api/checkout" method="post" className="mt-6">
            <button type="submit" className={boutonPrincipal}>
              Commencer, {PRICE_EUROS} € par mois
            </button>
            <p className="mt-3 text-center text-sm text-sourdine">
              Sans engagement, résiliable à tout moment.
            </p>
          </form>
        </section>
      </main>

      <Footer />

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-filet bg-papier/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
        <a href="#offre" className={boutonPrincipal}>
          Commencer
        </a>
      </div>
    </div>
  );
}
