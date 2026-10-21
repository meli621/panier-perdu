import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { LEGAL } from "@/lib/legal";
import { GUARANTEE_DAYS, PRICE_EUROS, REFUND_DELAY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions générales de vente — Panier Perdu",
  robots: { index: false },
};

export default function Cgv() {
  return (
    <LegalPage titre="Conditions générales de vente">
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions régissent la vente de l’abonnement à Panier
        Perdu, un service de relance par e-mail des paniers abandonnés pour les
        boutiques en ligne, proposé par {LEGAL.nom} ({LEGAL.siret}).
      </p>
      <p>
        Le service est réservé aux professionnels qui exploitent une boutique
        en ligne. En souscrivant, tu déclares agir pour les besoins de ton
        activité professionnelle.
      </p>

      <h2>2. Service</h2>
      <p>
        Panier Perdu lit les paniers abandonnés d’une boutique connectée et
        envoie une séquence de deux relances par e-mail, avec un code de
        réduction facultatif sur la seconde. Un compteur indique le chiffre
        d’affaires récupéré. Le service est fourni pour une boutique par
        abonnement.
      </p>
      <p>
        Le résultat dépend de la boutique, de ses produits et de ses clients.
        Aucun montant de chiffre d’affaires récupéré n’est garanti.
      </p>

      <h2>3. Prix et paiement</h2>
      <p>
        Le prix est de {PRICE_EUROS} € par mois et par boutique. {LEGAL.tva}, le
        prix indiqué est donc le prix payé. Le paiement est
        prélevé chaque mois par carte bancaire via Stripe, à partir de la date
        de souscription. Les relances sont illimitées.
      </p>

      <h2>4. Durée et résiliation</h2>
      <p>
        L’abonnement est mensuel et sans engagement. Tu peux le résilier à tout
        moment en écrivant à {LEGAL.email}. La résiliation prend effet à la fin
        de la période déjà payée, et aucun nouveau prélèvement n’a lieu ensuite.
      </p>

      <h2>5. Garantie satisfait ou remboursé</h2>
      <p>
        Tu disposes de {GUARANTEE_DAYS} jours à compter de ton premier paiement
        pour demander le remboursement, sans avoir à te justifier. Pour cela,
        écris à {LEGAL.email} en indiquant l’adresse e-mail utilisée lors du
        paiement. Le remboursement du premier paiement est effectué sous{" "}
        {REFUND_DELAY} sur le moyen de paiement utilisé.
      </p>

      <h2>6. Mise en route du service</h2>
      <p>
        Après ton paiement, nous mettons le service en route pour ta boutique
        sous 72 heures et te prévenons par e-mail. La garantie de l’article 5
        s’applique dès ton premier paiement, que le service soit déjà en route
        ou non.
      </p>

      <h2>7. Données personnelles</h2>
      <p>
        Le traitement des données est décrit dans la{" "}
        <a href="/confidentialite" className="underline underline-offset-4">
          politique de confidentialité
        </a>
        .
      </p>

      <h2>8. Droit applicable et litiges</h2>
      <p>
        Les présentes conditions sont soumises au droit français. En cas de
        litige, une solution amiable sera recherchée avant toute action. À
        défaut d’accord, les tribunaux compétents sont ceux du ressort du
        siège de l’éditeur.
      </p>
    </LegalPage>
  );
}
