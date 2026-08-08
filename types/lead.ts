import type { VehicleInfo } from "./vehicle";

export type LeadStatus =
  | "nouveau"
  | "a_rappeler"
  | "contacte"
  | "rendez_vous_pris"
  | "vendu"
  | "perdu";

export type Urgence = "chaud" | "tiede" | "froid";

interface LeadBase {
  id: string;
  createdAt: string;
  statut: LeadStatus;
}

export interface EstimationLead extends LeadBase {
  type: "estimation";
  vehicule: Pick<VehicleInfo, "marque" | "modele" | "annee" | "kilometrage" | "carburant">;
  prospect: {
    nom: string;
    prenom: string;
    telephone: string;
    email: string;
    ville: string;
  };
  score: number;
  urgence: Urgence;
  /**
   * Proof of consent for phone prospecting (AXICALL_Pilotage_Consentements.pdf):
   * verbatim text agreed to, and its 12-month expiration computed at save time.
   */
  consentement: {
    texte: string;
    dateExpiration: string;
  };
}

export interface ContactLead extends LeadBase {
  type: "contact";
  prospect: {
    nom: string;
    email: string;
    telephone: string;
    message: string;
  };
}

export type Lead = EstimationLead | ContactLead;
