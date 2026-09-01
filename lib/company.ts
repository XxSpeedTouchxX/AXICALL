/**
 * Official phone-consent wording, reproduced verbatim from the marketing
 * source "AXICALL - Texte de consentement v1" (legal basis: loi n° 2025-594,
 * art. L. 223-1 code conso, décret n° 2026-662, RGPD art. 6 & 7). That
 * document requires the text be used word for word, so do not paraphrase it.
 * It is stored with every estimation lead as proof of consent.
 */
export const CONSENT_TEXT =
  "J'accepte d'être contacté(e) par téléphone par Axicall, ainsi que par l'agence de " +
  "dépôt-vente automobile partenaire de mon secteur, au sujet de la vente du véhicule que " +
  "je viens d'estimer. Je peux retirer ce consentement à tout moment.";

/**
 * Acceptance of the simulator's terms. The consent document mandates a second,
 * separate checkbox — phone consent must never be bundled with the CGU.
 */
export const CGU_ACCEPTANCE_TEXT =
  "J'ai lu et j'accepte les conditions générales d'utilisation du simulateur.";

/** Maximum regulatory validity of the phone consent, in months. */
export const CONSENT_DURATION_MONTHS = 12;

/**
 * Single source of truth for the publisher identity shown across the site
 * (mentions légales, CGU, politique de confidentialité, footer, emails).
 *
 * These values must match the legally registered entity: French law (LCEN,
 * art. 6-III) requires the site to identify its publisher accurately.
 *
 * SWITCHING TO THE SARL — when Axicall SARL is registered, replace the block
 * below with the values from its Kbis. Nothing else in the codebase needs to
 * change. A SARL is a new legal entity, so it gets its **own** SIRET: do not
 * reuse the sole-trader number here.
 *
 *   legalName: "Axicall",
 *   legalForm: "SARL au capital de [montant] €",
 *   siret:     "[SIRET de la SARL]",
 *   address:   "[adresse du siège social]",
 *   ownerName: "[nom du gérant]",
 *   vatNotice: "[n° TVA intracommunautaire]",
 */
export const COMPANY = {
  publicName: "Estimer Mon Auto",
  legalName: "Axicall",
  ownerName: "Zoheir Saoudi",
  legalForm: "Micro-entreprise",
  siret: "912 662 813 00014",
  address: "2 rue du 8 mai 1945, 64000 Pau",
  vatNotice: "TVA non applicable, article 293 B du CGI",
  phone: "06 64 01 25 87",
  phoneHref: "tel:0664012587",
  email: "contact@axicall.fr",
  /** Data-protection contact. Point this at a dpo@ address on the site's own
   *  domain once the mailbox exists — see "AXICALL - Mentions légales v1". */
  dpoEmail: "contact@axicall.fr",
  hours: "Lun-Ven 9h-18h",
} as const;
