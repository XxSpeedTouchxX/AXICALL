import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation | MonEstimationAuto",
  description: "Conditions générales d'utilisation du site MonEstimationAuto.",
};

export default function CGUPage() {
  return (
    <LegalPage eyebrow="Conditions" title="Conditions générales d'utilisation">
      <>
        <section>
          <h2>Objet</h2>
          <p>
            Les présentes conditions générales d&apos;utilisation régissent l&apos;accès et
            l&apos;utilisation du site {COMPANY.publicName}, édité par {COMPANY.ownerName}
            {" "}({COMPANY.legalName}).
          </p>
        </section>

        <section>
          <h2>Service proposé</h2>
          <p>
            {COMPANY.publicName} propose un service gratuit d&apos;estimation de véhicules
            d&apos;occasion et de mise en relation avec des professionnels de l&apos;automobile.
            L&apos;estimation fournie via le simulateur est indicative et ne constitue pas une
            offre de rachat ferme.
          </p>
        </section>

        <section>
          <h2>
            Absence d&apos;engagement
          </h2>
          <p>
            L&apos;utilisation du simulateur d&apos;estimation ou du formulaire de contact
            n&apos;engage à aucune obligation de vente. Vous restez libre d&apos;accepter ou de
            refuser toute proposition qui vous serait faite suite à votre demande.
          </p>
        </section>

        <section>
          <h2>Responsabilité</h2>
          <p>
            {COMPANY.legalName} s&apos;efforce d&apos;assurer l&apos;exactitude des informations
            diffusées sur le site, sans garantir l&apos;absence d&apos;erreur. {COMPANY.legalName}
            {" "}ne saurait être tenu responsable des conséquences d&apos;une utilisation du site
            non conforme aux présentes conditions.
          </p>
        </section>

        <section>
          <h2>Modification des CGU</h2>
          <p>
            {COMPANY.legalName} se réserve le droit de modifier les présentes conditions générales
            d&apos;utilisation à tout moment. Les utilisateurs sont invités à les consulter
            régulièrement.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Pour toute question relative aux présentes CGU, contactez-nous à {COMPANY.email} ou au{" "}
            {COMPANY.phone}.
          </p>
        </section>
      </>
    </LegalPage>
  );
}
