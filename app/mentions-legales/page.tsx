import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Mentions légales | MonEstimationAuto",
  description: "Mentions légales du site MonEstimationAuto, édité par Axicall.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage eyebrow="Informations légales" title="Mentions légales">
      <>
        <section>
          <h2>Éditeur du site</h2>
          <p>
            Le site {COMPANY.publicName} est édité par {COMPANY.ownerName}, exerçant sous le nom
            commercial {COMPANY.legalName}, {COMPANY.legalForm}.
          </p>
          <p>Adresse : {COMPANY.address}</p>
          <p>SIRET : {COMPANY.siret}</p>
          <p>{COMPANY.vatNotice}</p>
          <p>Téléphone : {COMPANY.phone}</p>
          <p>Email : {COMPANY.email}</p>
        </section>

        <section>
          <h2>Directeur de la publication</h2>
          <p>{COMPANY.ownerName}</p>
        </section>

        <section>
          <h2>Hébergement</h2>
          <p>
            Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
            États-Unis.
          </p>
        </section>

        <section>
          <h2>Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus présents sur ce site (textes, logos, éléments graphiques)
            est la propriété de {COMPANY.legalName}, sauf mention contraire, et ne peut être
            reproduit sans autorisation préalable.
          </p>
        </section>
      </>
    </LegalPage>
  );
}
