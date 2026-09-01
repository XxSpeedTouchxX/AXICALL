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
   * Proof of consent for phone prospecting. "AXICALL - Politique de
   * confidentialité v1" requires the timestamp, the IP address and the exact
   * wording displayed to be retained for 3 years (décret n° 2026-662), so the
   * consent can be evidenced in an inspection.
   */
  consentement: {
    texte: string;
    dateExpiration: string;
    /** When consent was given — distinct from createdAt, which may drift if a lead is edited. */
    horodatage: string;
    /** Caller IP, from the proxy headers. Null when it cannot be determined. */
    adresseIp: string | null;
    /** Whether the terms checkbox was also ticked (a separate, required consent). */
    cguAcceptees: boolean;
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
