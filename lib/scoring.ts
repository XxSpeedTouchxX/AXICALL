import type { EstimationFormData } from "@/types/vehicle";
import type { Urgence } from "@/types/lead";
import { isValidInternationalPhone } from "./phone";

export interface ScoreResult {
  score: number;
  urgence: Urgence;
}

export function scoreLead(form: EstimationFormData): ScoreResult {
  let score = 0;
  const currentYear = new Date().getFullYear();

  if (form.situation.delaiVente === "urgent") {
    score += 30;
  } else if (form.situation.delaiVente === "sous_1_mois") {
    score += 15;
  }

  const isRecent = form.vehicle.annee >= currentYear - 8;
  const isLowMileage = form.vehicle.kilometrage < 120000;
  if (isRecent && isLowMileage) {
    score += 20;
  } else if (isRecent || isLowMileage) {
    score += 10;
  }

  if (isValidInternationalPhone(form.contact.telephone)) {
    score += 15;
  }

  const goodCondition =
    (form.condition.etatGeneral === "excellent" || form.condition.etatGeneral === "tres_bon") &&
    form.condition.controleTechnique === "valide";
  if (goodCondition) {
    score += 15;
  }

  if (!form.condition.accident) {
    score += 5;
  }

  score = Math.min(score, 100);

  const urgence: Urgence = score >= 60 ? "chaud" : score >= 30 ? "tiede" : "froid";

  return { score, urgence };
}
