import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Mentions légales | MonEstimationAuto",
  description: "Mentions légales du site MonEstimationAuto, édité par Axicall.",
  robots: { index: false, follow: true },
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
          <h2>Protection des données personnelles</h2>
          <p>
            Pour toute question relative aux données personnelles, écrivez à {COMPANY.dpoEmail}. Le
            détail des traitements, des durées de conservation et de vos droits figure dans la{" "}
            <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
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

        <section>
          <h2>Limitation de responsabilité</h2>
          <p>
            {COMPANY.legalName} s&apos;efforce d&apos;assurer l&apos;exactitude des informations
            diffusées sur ce site, sans garantie d&apos;exhaustivité. L&apos;estimation fournie par
            le simulateur est indicative — voir les{" "}
            <Link href="/cgu">conditions générales d&apos;utilisation</Link>.
          </p>
        </section>

        <section>
          <h2>Droit applicable et litiges</h2>
          <p>
            Le présent site est soumis au droit français. En cas de litige, une solution amiable
            sera recherchée avant toute action judiciaire.
          </p>
        </section>
      </>
    </LegalPage>
  );
}
