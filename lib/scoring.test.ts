import { describe, it, expect } from "vitest";
import { scoreLead } from "./scoring";
import type { EstimationFormData } from "@/types/vehicle";

const currentYear = new Date().getFullYear();

function buildForm(overrides: Partial<EstimationFormData> = {}): EstimationFormData {
  return {
    vehicle: {
      marque: "Renault",
      modele: "Clio",
      annee: currentYear - 3,
      version: "Zen",
      kilometrage: 50000,
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
      delaiVente: "urgent",
    },
    contact: {
      nom: "Dupont",
      prenom: "Marie",
      telephone: "0612345678",
      email: "marie@example.com",
      ville: "Lyon",
      codePostal: "69000",
      consentement: true,
    },
    ...overrides,
  };
}

describe("scoreLead", () => {
  it("scores a strong lead as chaud", () => {
    const result = scoreLead(buildForm());
    expect(result.urgence).toBe("chaud");
    expect(result.score).toBeGreaterThanOrEqual(60);
  });

  it("scores a weak lead as froid", () => {
    const form = buildForm({
      vehicle: {
        marque: "Renault",
        modele: "Clio",
        annee: currentYear - 15,
        version: "Zen",
        kilometrage: 220000,
        carburant: "diesel",
        boite: "manuelle",
        puissanceFiscale: 5,
        nombrePortes: 5,
      },
      condition: {
        etatGeneral: "a_prevoir",
        accident: true,
        controleTechnique: "expire",
        nombreProprietaires: 4,
        carnetEntretien: false,
      },
      situation: {
        motifVente: "autre",
        delaiVente: "plus_tard",
      },
    });
    const result = scoreLead(form);
    expect(result.urgence).toBe("froid");
    expect(result.score).toBeLessThan(30);
  });

  it("gives partial credit when only one of year/mileage qualifies", () => {
    const recentButHighMileage = buildForm({
      vehicle: {
        marque: "Renault",
        modele: "Clio",
        annee: currentYear - 2,
        version: "Zen",
        kilometrage: 200000,
        carburant: "diesel",
        boite: "manuelle",
        puissanceFiscale: 5,
        nombrePortes: 5,
      },
      situation: { motifVente: "autre", delaiVente: "plus_tard" },
    });
    const result = scoreLead(recentButHighMileage);
    expect(result.score).toBeGreaterThan(0);
    expect(result.score).toBeLessThan(60);
  });

  it("caps score at 100", () => {
    const result = scoreLead(buildForm());
    expect(result.score).toBeLessThanOrEqual(100);
  });
});
