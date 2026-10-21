import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Panier Perdu",
  robots: { index: false },
};

export default function Confidentialite() {
  return (
    <LegalPage titre="Politique de confidentialité">
      <h2>Qui est responsable de tes données</h2>
      <p>
        {LEGAL.nom} ({LEGAL.siret}), joignable à {LEGAL.email}.
      </p>

      <h2>Ce que nous collectons</h2>
      <ul>
        <li>
          À l’abonnement : ton e-mail, ton nom, l’adresse de ta boutique et les
          informations de paiement (gérées par Stripe, nous ne voyons jamais ton
          numéro de carte).
        </li>
        <li>
          Pendant le service : les paniers abandonnés de ta boutique, avec
          l’e-mail de tes clients et les produits concernés, afin d’envoyer les
          relances.
        </li>
        <li>
          Sur le site : des statistiques de visite anonymes, sans cookie de
          suivi publicitaire.
        </li>
      </ul>

      <h2>Pourquoi, et sur quelle base légale</h2>
      <ul>
        <li>Fournir le service que tu as acheté (exécution du contrat).</li>
        <li>Respecter nos obligations comptables et légales.</li>
        <li>Mesurer l’audience du site, de façon anonyme (intérêt légitime).</li>
      </ul>

      <h2>Les clients de ta boutique</h2>
      <p>
        Pour les relances, tu restes responsable du traitement des données de
        tes clients, et nous agissons comme ton sous-traitant. Il t’appartient
        de disposer d’une base légale pour les relancer et d’en informer tes
        clients dans ta propre politique de confidentialité. Chaque relance
        contient un lien de désinscription, et un client désinscrit n’est plus
        relancé.
      </p>

      <h2>Qui reçoit les données</h2>
      <p>
        Vercel (hébergement), Stripe (paiement), et nos prestataires de base de
        données et d’envoi d’e-mails, dès qu’ils sont en service. Ils sont
        soumis à des garanties de protection adaptées lorsque les données
        quittent l’Union européenne.
      </p>

      <h2>Combien de temps</h2>
      <p>
        Tes données de compte sont conservées pendant la durée de
        l’abonnement, puis supprimées au plus tard 12 mois après sa fin, sauf
        obligation légale de conservation (documents comptables : 10 ans).
      </p>

      <h2>Tes droits</h2>
      <p>
        Tu peux demander l’accès, la rectification, l’effacement, la limitation
        ou la portabilité de tes données, et t’opposer à leur traitement, en
        écrivant à {LEGAL.email}. Tu peux aussi saisir la CNIL (cnil.fr).
      </p>
    </LegalPage>
  );
}
