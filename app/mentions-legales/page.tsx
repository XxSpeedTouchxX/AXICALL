import type { Metadata } from "next";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Mentions légales | MonEstimationAuto",
  description: "Mentions légales du site MonEstimationAuto, édité par Axicall.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-[var(--color-gray-600)]">
      <h1 className="mb-8 text-3xl font-bold text-[var(--color-navy)]">Mentions légales</h1>

      <div className="flex flex-col gap-6">
        <section>
          <h2 className="mb-2 font-semibold text-[var(--color-navy)]">Éditeur du site</h2>
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
          <h2 className="mb-2 font-semibold text-[var(--color-navy)]">Directeur de la publication</h2>
          <p>{COMPANY.ownerName}</p>
        </section>

        <section>
          <h2 className="mb-2 font-semibold text-[var(--color-navy)]">Hébergement</h2>
          <p>
            Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
            États-Unis.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-semibold text-[var(--color-navy)]">Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus présents sur ce site (textes, logos, éléments graphiques)
            est la propriété de {COMPANY.legalName}, sauf mention contraire, et ne peut être
            reproduit sans autorisation préalable.
          </p>
        </section>
      </div>
    </main>
  );
}
