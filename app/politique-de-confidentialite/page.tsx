import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Politique de confidentialité | MonEstimationAuto",
  description:
    "Comment MonEstimationAuto collecte, utilise et protège vos données personnelles.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPage
      eyebrow="Vos données"
      title="Politique de confidentialité"
      subtitle="Comment nous collectons, utilisons et protégeons vos données personnelles."
    >
      <>
        <section>
          <h2>
            Responsable du traitement
          </h2>
          <p>
            Le responsable du traitement des données collectées sur ce site est {COMPANY.ownerName}
            {" "}({COMPANY.legalName}, SIRET {COMPANY.siret}), joignable à {COMPANY.email}.
          </p>
        </section>

        <section>
          <h2>Données collectées</h2>
          <p>
            Lorsque vous utilisez le simulateur d&apos;estimation ou le formulaire de contact, nous
            collectons : nom, prénom, téléphone, email, ville, code postal, ainsi que les
            informations relatives à votre véhicule (marque, modèle, année, kilométrage, état) et à
            votre projet de vente.
          </p>
        </section>

        <section>
          <h2>Finalité du traitement</h2>
          <p>
            Ces données sont utilisées exclusivement pour vous recontacter au sujet de votre
            estimation, évaluer votre projet de vente, et le cas échéant vous mettre en relation
            avec un professionnel de notre réseau. Elles ne sont jamais utilisées à des fins de
            prospection commerciale non liée à votre demande sans votre consentement explicite.
          </p>
        </section>

        <section>
          <h2>Durée de conservation</h2>
          <p>
            Vos données sont conservées le temps nécessaire au traitement de votre demande, puis
            archivées ou supprimées conformément à la réglementation en vigueur.
          </p>
        </section>

        <section>
          <h2>Vos droits</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez
            d&apos;un droit d&apos;accès, de rectification, de suppression et d&apos;opposition sur
            vos données personnelles. Pour exercer ces droits, contactez-nous à {COMPANY.email}.
          </p>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>
            Ce site utilise le stockage local de votre navigateur (sessionStorage) pour conserver
            temporairement la progression de votre estimation, sans finalité publicitaire. Aucun
            cookie tiers de traçage n&apos;est déposé à ce jour.
          </p>
        </section>
      </>
    </LegalPage>
  );
}
