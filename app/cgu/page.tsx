import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation | MonEstimationAuto",
  description: "Conditions générales d'utilisation du simulateur d'estimation MonEstimationAuto.",
  robots: { index: false, follow: true },
};

/** Source: "AXICALL - CGU simulateur v1" (branche 02 Juridique). */
export default function CGUPage() {
  return (
    <LegalPage
      eyebrow="Conditions"
      title="Conditions générales d'utilisation"
      subtitle="Simulateur d'estimation automobile en ligne."
    >
      <>
        <section>
          <h2>1. Objet</h2>
          <p>
            Les présentes conditions régissent l&apos;utilisation du simulateur d&apos;estimation
            automobile en ligne édité par {COMPANY.ownerName} ({COMPANY.legalName}). L&apos;utilisation
            du simulateur implique l&apos;acceptation pleine et entière des présentes conditions.
          </p>
        </section>

        <section>
          <h2>2. Nature du service</h2>
          <ul>
            <li>
              Le simulateur fournit une estimation indicative, fondée sur des données de marché.
            </li>
            <li>
              Cette estimation ne constitue ni une offre d&apos;achat, ni un engagement contractuel,
              ni une expertise professionnelle.
            </li>
            <li>
              Le prix réel de vente dépend de l&apos;état, de l&apos;historique et des options du
              véhicule, vérifiés lors d&apos;un rendez-vous physique.
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Gratuité</h2>
          <p>
            Le service d&apos;estimation est gratuit et sans engagement. Aucune contrepartie
            financière n&apos;est due par l&apos;utilisateur pour l&apos;obtention d&apos;une
            estimation.
          </p>
        </section>

        <section>
          <h2>4. Données saisies</h2>
          <p>
            L&apos;utilisateur garantit l&apos;exactitude des informations saisies. Le traitement des
            données personnelles est décrit dans la Politique de confidentialité, document distinct
            et consultable avant toute saisie.
          </p>
        </section>

        <section>
          <h2>5. Responsabilité</h2>
          <ul>
            <li>{COMPANY.legalName} ne garantit pas l&apos;exactitude absolue de l&apos;estimation fournie.</li>
            <li>{COMPANY.legalName} ne garantit pas la vente du véhicule ni un délai de vente.</li>
            <li>
              La mise en relation avec une agence partenaire ne constitue pas un mandat : le mandat
              est signé directement entre l&apos;utilisateur et l&apos;agence.
            </li>
          </ul>
        </section>

        <section>
          <h2>6. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des éléments du simulateur (textes, structure, logique de calcul) est la
            propriété de {COMPANY.legalName} et ne peut être reproduit sans autorisation.
          </p>
        </section>

        <section>
          <h2>7. Droit applicable</h2>
          <p>
            Les présentes conditions générales d&apos;utilisation sont soumises au droit français.
            Tout litige relève des tribunaux compétents du siège de {COMPANY.legalName}.
          </p>
        </section>

        <section>
          <h2>8. Contact</h2>
          <p>
            Pour toute question relative aux présentes conditions, contactez-nous à {COMPANY.email}{" "}
            ou au {COMPANY.phone}.
          </p>
        </section>
      </>
    </LegalPage>
  );
}
