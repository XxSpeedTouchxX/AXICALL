import { describe, it, expect } from "vitest";
import {
  vehicleInfoSchema,
  vehicleConditionSchema,
  sellerSituationSchema,
  contactInfoSchema,
  estimationFormSchema,
  contactFormSchema,
} from "./validation";

describe("vehicleInfoSchema", () => {
  it("accepts a valid vehicle", () => {
    const result = vehicleInfoSchema.safeParse({
      marque: "Renault",
      modele: "Clio",
      annee: 2019,
      version: "Zen",
      kilometrage: 45000,
      carburant: "diesel",
      boite: "manuelle",
      puissanceFiscale: 5,
      nombrePortes: 5,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a future year", () => {
    const result = vehicleInfoSchema.safeParse({
      marque: "Renault",
      modele: "Clio",
      annee: 2099,
      version: "Zen",
      kilometrage: 45000,
      carburant: "diesel",
      boite: "manuelle",
      puissanceFiscale: 5,
      nombrePortes: 5,
    });
    expect(result.success).toBe(false);
  });

  it("rejects negative kilometrage", () => {
    const result = vehicleInfoSchema.safeParse({
      marque: "Renault",
      modele: "Clio",
      annee: 2019,
      version: "Zen",
      kilometrage: -10,
      carburant: "diesel",
      boite: "manuelle",
      puissanceFiscale: 5,
      nombrePortes: 5,
    });
    expect(result.success).toBe(false);
  });
});

describe("contactInfoSchema", () => {
  it("accepts a valid French phone number", () => {
    const result = contactInfoSchema.safeParse({
      nom: "Dupont",
      prenom: "Marie",
      telephone: "06 12 34 56 78",
      email: "marie@example.com",
      ville: "Lyon",
      codePostal: "69000",
      consentement: true,
      cguAcceptees: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid phone number", () => {
    const result = contactInfoSchema.safeParse({
      nom: "Dupont",
      prenom: "Marie",
      telephone: "123",
      email: "marie@example.com",
      ville: "Lyon",
      codePostal: "69000",
      consentement: true,
      cguAcceptees: true,
    });
    expect(result.success).toBe(false);
  });

  it("accepts a phone number with irregular spacing", () => {
    const result = contactInfoSchema.safeParse({
      nom: "Dupont",
      prenom: "Marie",
      telephone: "06 123 45678",
      email: "marie@example.com",
      ville: "Lyon",
      codePostal: "69000",
      consentement: true,
      cguAcceptees: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects when consentement is false", () => {
    const result = contactInfoSchema.safeParse({
      nom: "Dupont",
      prenom: "Marie",
      telephone: "0612345678",
      email: "marie@example.com",
      ville: "Lyon",
      codePostal: "69000",
      consentement: false,
      cguAcceptees: true,
    });
    expect(result.success).toBe(false);
  });

  // The consent specification requires phone consent and acceptance of the
  // terms to be two separate, independently required choices.
  it("rejects when the CGU are not accepted, even with phone consent given", () => {
    const result = contactInfoSchema.safeParse({
      nom: "Dupont",
      prenom: "Marie",
      telephone: "0612345678",
      email: "marie@example.com",
      ville: "Lyon",
      codePostal: "69000",
      consentement: true,
      cguAcceptees: false,
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = contactInfoSchema.safeParse({
      nom: "Dupont",
      prenom: "Marie",
      telephone: "0612345678",
      email: "not-an-email",
      ville: "Lyon",
      codePostal: "69000",
      consentement: true,
      cguAcceptees: true,
    });
    expect(result.success).toBe(false);
  });
});

describe("vehicleConditionSchema", () => {
  it("accepts a valid condition", () => {
    const result = vehicleConditionSchema.safeParse({
      etatGeneral: "tres_bon",
      accident: false,
      controleTechnique: "valide",
      nombreProprietaires: 1,
      carnetEntretien: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid etatGeneral value", () => {
    const result = vehicleConditionSchema.safeParse({
      etatGeneral: "impeccable",
      accident: false,
      controleTechnique: "valide",
      nombreProprietaires: 1,
      carnetEntretien: true,
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid controleTechnique value", () => {
    const result = vehicleConditionSchema.safeParse({
      etatGeneral: "tres_bon",
      accident: false,
      controleTechnique: "inconnu",
      nombreProprietaires: 1,
      carnetEntretien: true,
    });
    expect(result.success).toBe(false);
  });
});

describe("sellerSituationSchema", () => {
  it("accepts a valid situation", () => {
    const result = sellerSituationSchema.safeParse({
      motifVente: "changement_vehicule",
      delaiVente: "sous_1_mois",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid motifVente value", () => {
    const result = sellerSituationSchema.safeParse({
      motifVente: "autre_raison",
      delaiVente: "sous_1_mois",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid delaiVente value", () => {
    const result = sellerSituationSchema.safeParse({
      motifVente: "changement_vehicule",
      delaiVente: "quand_possible",
    });
    expect(result.success).toBe(false);
  });
});

describe("estimationFormSchema", () => {
  it("composes all four step schemas", () => {
    const result = estimationFormSchema.safeParse({
      vehicle: {
        marque: "Renault",
        modele: "Clio",
        annee: 2019,
        version: "Zen",
        kilometrage: 45000,
        carburant: "diesel",
        boite: "manuelle",
        puissanceFiscale: 5,
        nombrePortes: 5,
      },
      condition: {
        etatGeneral: "tres_bon",
        accident: false,
        controleTechnique: "valide",
        nombreProprietaires: 1,
        carnetEntretien: true,
      },
      situation: {
        motifVente: "changement_vehicule",
        delaiVente: "sous_1_mois",
      },
      contact: {
        nom: "Dupont",
        prenom: "Marie",
        telephone: "0612345678",
        email: "marie@example.com",
        ville: "Lyon",
        codePostal: "69000",
        consentement: true,
        cguAcceptees: true,
      },
    });
    expect(result.success).toBe(true);
  });
});

describe("contactFormSchema", () => {
  it("accepts a valid contact message", () => {
    const result = contactFormSchema.safeParse({
      nom: "Martin",
      email: "martin@example.com",
      telephone: "0612345678",
      message: "J'ai une question sur l'estimation.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an empty message", () => {
    const result = contactFormSchema.safeParse({
      nom: "Martin",
      email: "martin@example.com",
      telephone: "0612345678",
      message: "",
    });
    expect(result.success).toBe(false);
  });
});
