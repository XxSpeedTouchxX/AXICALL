import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Retrait de consentement | Estimer Mon Auto",
  description:
    "Comment retirer à tout moment votre consentement à être contacté par téléphone par Axicall.",
  robots: { index: false, follow: true },
};

/** Source: "AXICALL - Procédure d'opposition v1" (branche 02 Juridique). */
export default function RetraitConsentementPage() {
  return (
    <LegalPage
      eyebrow="Vos droits"
      title="Retrait de consentement"
      subtitle="Vous pouvez demander à ne plus être contacté à tout moment, sans avoir à vous justifier."
    >
      <>
        <section>
          <h2>Principe</h2>
          <p>
            Toute personne peut retirer son consentement à tout moment, par n&apos;importe quel
            canal. Le retrait est <strong>immédiat et définitif</strong>. Aucune justification
            n&apos;est exigée.
          </p>
        </section>

        <section>
          <h2>Comment nous le demander</h2>
          <ul>
            <li>
              <strong>Par e-mail</strong> — écrivez à {COMPANY.email}. Toute demande, même
              informelle (« stop », « ne plus être appelé »), vaut opposition.
            </li>
            <li>
              <strong>Par téléphone</strong> — dites-le simplement lors d&apos;un appel, ou
              appelez-nous au {COMPANY.phone} ({COMPANY.hours}).
            </li>
            <li>
              <strong>Depuis le formulaire de contact</strong> —{" "}
              <Link href="/contact">envoyez-nous un message</Link> en précisant votre numéro.
            </li>
          </ul>
        </section>

        <section>
          <h2>Délai de traitement</h2>
          <p>
            Toute demande écrite est traitée sous <strong>24 heures maximum</strong>, avec un accusé
            de réception qui vous est envoyé. Pendant un appel, l&apos;opposition est enregistrée
            dans les minutes qui suivent.
          </p>
        </section>

        <section>
          <h2>Ce que cela implique</h2>
          <p>
            Votre numéro est inscrit dans notre registre des oppositions. Nous ne vous rappelons
            plus, quelle qu&apos;en soit la raison — nouvelle demande, autre campagne ou erreur
            supposée. Ce registre est conservé 3 ans à des fins de preuve de non-sollicitation.
          </p>
        </section>

        <section>
          <h2>Autres droits</h2>
          <p>
            Le retrait du consentement téléphonique est distinct de vos droits d&apos;accès, de
            rectification et d&apos;effacement de vos données, décrits dans la{" "}
            <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
          </p>
        </section>
      </>
    </LegalPage>
  );
}
