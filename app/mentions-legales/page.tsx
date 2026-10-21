import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Mentions légales — Panier Perdu",
  robots: { index: false },
};

export default function MentionsLegales() {
  return (
    <LegalPage titre="Mentions légales">
      <h2>Éditeur du site</h2>
      <ul>
        <li>Nom ou raison sociale : {LEGAL.nom}</li>
        <li>Statut : {LEGAL.forme}</li>
        <li>SIRET : {LEGAL.siret}</li>
        <li>Adresse : {LEGAL.adresse}</li>
        <li>E-mail : {LEGAL.email}</li>
        <li>TVA : {LEGAL.tva}</li>
        <li>Directeur de la publication : {LEGAL.directeurPublication}</li>
      </ul>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina,
        CA 91723, États-Unis (vercel.com).
      </p>

      <h2>Paiements</h2>
      <p>
        Les paiements sont traités par Stripe Payments Europe, Ltd., 1 Grand
        Canal Street Lower, Dublin 2, Irlande. Les données de carte bancaire ne
        passent jamais par nos serveurs.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes, la marque et la mise en page du site sont la propriété de
        l’éditeur. Toute reproduction sans autorisation écrite est interdite.
      </p>

      <h2>Contact</h2>
      <p>Pour toute question : {LEGAL.email}.</p>
    </LegalPage>
  );
}
