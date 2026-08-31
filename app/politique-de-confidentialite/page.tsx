import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { COMPANY, CONSENT_DURATION_MONTHS } from "@/lib/company";

export const metadata: Metadata = {
  title: "Politique de confidentialité | MonEstimationAuto",
  description:
    "Comment MonEstimationAuto collecte, utilise et protège vos données personnelles.",
  robots: { index: false, follow: true },
};

/** Source: "AXICALL - Politique de confidentialité v1" (branche 02 Juridique). */
const DATA_ROWS = [
  {
    data: "Marque, modèle, année, kilométrage, état du véhicule",
    purpose: "Calculer une estimation indicative",
    basis: "Exécution d'une demande à l'initiative de l'utilisateur",
  },
  {
    data: "Délai et motif de vente déclarés",
    purpose: "Qualifier la demande et préparer l'appel",
    basis: "Intérêt légitime encadré par le consentement à l'appel",
  },
  {
    data: "Prénom, nom, téléphone, e-mail, ville et code postal",
    purpose: "Recontacter l'utilisateur au sujet de sa demande",
    basis: "Consentement explicite (case à cocher)",
  },
  {
    data: "Horodatage et texte de consentement affiché",
    purpose: "Prouver la validité du consentement en cas de contrôle",
    basis: "Obligation légale (loi n° 2025-594)",
  },
];

const RETENTION_ROWS = [
  { type: "Données du lead (véhicule, coordonnées)", duration: "3 ans à compter du dernier contact" },
  { type: "Preuve de consentement (horodatage, texte affiché)", duration: "3 ans, conformément au décret n° 2026-662" },
  { type: "Registre des oppositions", duration: "3 ans, à des fins de preuve de non-sollicitation" },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPage
      eyebrow="Vos données"
      title="Politique de confidentialité"
      subtitle="Traitement des données personnelles collectées via le simulateur d'estimation."
    >
      <>
        <section>
          <h2>1. Responsable du traitement</h2>
          <p>
            {COMPANY.ownerName}, exerçant sous le nom commercial {COMPANY.legalName} (
            {COMPANY.legalForm}, SIRET {COMPANY.siret}), éditeur du présent site, est responsable du
            traitement des données personnelles collectées via le simulateur d&apos;estimation.
          </p>
          <p>Contact : {COMPANY.dpoEmail}</p>
        </section>

        <section>
          <h2>2. Données collectées</h2>
          <p>
            Le tableau ci-dessous détaille, pour chaque catégorie de données, la finalité poursuivie
            et la base légale du traitement.
          </p>
          <ul>
            {DATA_ROWS.map((row) => (
              <li key={row.data}>
                <strong>{row.data}</strong> — {row.purpose}. Base légale : {row.basis.toLowerCase()}.
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>3. Destinataires des données</h2>
          <ul>
            <li>{COMPANY.legalName}, pour le traitement de la demande et l&apos;appel téléphonique.</li>
            <li>
              L&apos;agence de dépôt-vente partenaire du secteur géographique de l&apos;utilisateur,
              uniquement si le rendez-vous est confirmé.
            </li>
          </ul>
          <p>
            Aucune donnée n&apos;est vendue, louée ni transmise à un tiers en dehors de ce cadre.
          </p>
        </section>

        <section>
          <h2>4. Durée de conservation</h2>
          <ul>
            {RETENTION_ROWS.map((row) => (
              <li key={row.type}>
                <strong>{row.type}</strong> — {row.duration}.
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>5. Vos droits</h2>
          <p>
            Conformément au RGPD (règlement UE 2016/679) et à la loi Informatique et Libertés, toute
            personne dispose d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
            limitation, d&apos;opposition et de portabilité de ses données. Ces droits
            s&apos;exercent par écrit auprès de {COMPANY.dpoEmail}. Une réponse est apportée sous 30
            jours.
          </p>
        </section>

        <section>
          <h2>6. Retrait du consentement téléphonique</h2>
          <p>
            Le consentement à être contacté par téléphone est valable {CONSENT_DURATION_MONTHS} mois
            au maximum. Vous pouvez le retirer à tout moment, par n&apos;importe quel canal : par
            simple demande orale pendant un appel, ou par écrit à {COMPANY.email}.
          </p>
          <p>
            Le retrait est immédiat et définitif, aucune justification n&apos;est exigée. Toute
            demande écrite, même informelle (« stop », « ne plus être appelé »), vaut opposition et
            est traitée sous 24 heures, avec accusé de réception.
          </p>
        </section>

        <section>
          <h2>7. Sécurité</h2>
          <p>
            Les données sont hébergées en France ou dans l&apos;Union européenne, chez un prestataire
            soumis à un accord de sous-traitance (DPA). Des mesures techniques et organisationnelles
            sont mises en œuvre pour empêcher tout accès non autorisé.
          </p>
        </section>

        <section>
          <h2>8. Cookies</h2>
          <p>
            Ce site utilise le stockage local de votre navigateur (sessionStorage) pour conserver
            temporairement la progression de votre estimation, sans finalité publicitaire. Aucun
            cookie tiers de traçage n&apos;est déposé à ce jour.
          </p>
        </section>

        <section>
          <h2>9. Réclamation</h2>
          <p>
            En cas de désaccord persistant, vous pouvez adresser une réclamation à la CNIL —{" "}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
              www.cnil.fr
            </a>
            .
          </p>
        </section>
      </>
    </LegalPage>
  );
}
