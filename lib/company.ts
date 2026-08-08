/**
 * Consent text shown on the estimation form's checkbox and stored verbatim
 * with every estimation lead as proof of consent (see AXICALL_Pilotage_
 * Consentements.pdf / AXICALL_Grille_Tarifaire_Formulaire.pdf "Modèle B" —
 * names AXICALL explicitly, states the 12-month duration, the right to
 * withdraw at any time, and that proof of consent is available on request).
 */
export const CONSENT_TEXT =
  "J'accepte qu'AXICALL me contacte par téléphone au sujet de la vente de mon véhicule, " +
  "pendant une durée de 12 mois. Je peux retirer mon accord à tout moment. Preuve de " +
  "consentement disponible gratuitement sur demande.";

export const COMPANY = {
  publicName: "MonEstimationAuto",
  legalName: "Axicall",
  ownerName: "Zoheir Saoudi",
  legalForm: "Micro-entreprise",
  siret: "912 662 813 00014",
  address: "2 rue du 8 mai 1945, 64000 Pau",
  vatNotice: "TVA non applicable, article 293 B du CGI",
  phone: "06 64 01 25 87",
  phoneHref: "tel:0664012587",
  email: "contact@axicall.fr",
  hours: "Lun-Ven 9h-18h",
} as const;
