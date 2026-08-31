import { z } from "zod";
import { isValidInternationalPhone } from "./phone";

const currentYear = new Date().getFullYear();

export const vehicleInfoSchema = z.object({
  marque: z.string().min(1, "Marque requise"),
  modele: z.string().min(1, "Modèle requis"),
  annee: z
    .number()
    .int()
    .min(1980, "Année invalide")
    .max(currentYear, "L'année ne peut pas être dans le futur"),
  version: z.string().optional(),
  kilometrage: z.number().int().min(0, "Le kilométrage ne peut pas être négatif"),
  carburant: z.enum(["essence", "diesel", "hybride", "electrique"]),
  boite: z.enum(["manuelle", "automatique"]),
  puissanceFiscale: z.number().int().min(1, "Puissance fiscale invalide").optional(),
  nombrePortes: z
    .number()
    .int()
    .min(2, "Nombre de portes invalide")
    .max(5, "Nombre de portes invalide"),
});

export const vehicleConditionSchema = z.object({
  etatGeneral: z.enum(["excellent", "tres_bon", "correct", "a_prevoir"]),
  accident: z.boolean(),
  controleTechnique: z.enum(["valide", "expire", "non_effectue"]),
  nombreProprietaires: z.number().int().min(1, "Nombre de propriétaires invalide"),
  carnetEntretien: z.boolean(),
});

export const sellerSituationSchema = z.object({
  motifVente: z.enum([
    "nouveau_vehicule",
    "besoin_argent",
    "changement_vehicule",
    "succession",
    "autre",
  ]),
  delaiVente: z.enum(["urgent", "sous_1_mois", "plus_tard"]),
});

export const contactInfoSchema = z.object({
  nom: z.string().min(1, "Nom requis"),
  prenom: z.string().min(1, "Prénom requis"),
  telephone: z
    .string()
    .refine(isValidInternationalPhone, "Numéro de téléphone invalide"),
  email: z.string().email("Email invalide"),
  ville: z.string().min(1, "Ville requise"),
  codePostal: z.string().regex(/^\d{5}$/, "Code postal invalide"),
  consentement: z.literal(true, {
    errorMap: () => ({ message: "Le consentement est obligatoire" }),
  }),
  // Kept separate from `consentement` on purpose: the consent specification
  // forbids bundling phone consent with acceptance of the terms.
  cguAcceptees: z.literal(true, {
    errorMap: () => ({ message: "L'acceptation des CGU est obligatoire" }),
  }),
});

export const estimationFormSchema = z.object({
  vehicle: vehicleInfoSchema,
  condition: vehicleConditionSchema,
  situation: sellerSituationSchema,
  contact: contactInfoSchema,
});

export const contactFormSchema = z.object({
  nom: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"),
  telephone: z
    .string()
    .refine(isValidInternationalPhone, "Numéro de téléphone invalide"),
  message: z.string().min(1, "Message requis"),
});

export type EstimationFormInput = z.infer<typeof estimationFormSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
