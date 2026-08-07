export type Carburant = "essence" | "diesel" | "hybride" | "electrique";
export type Boite = "manuelle" | "automatique";
export type EtatGeneral = "excellent" | "tres_bon" | "correct" | "a_prevoir";
export type ControleTechnique = "valide" | "expire" | "non_effectue";
export type MotifVente =
  | "nouveau_vehicule"
  | "besoin_argent"
  | "changement_vehicule"
  | "succession"
  | "autre";
export type DelaiVente = "urgent" | "sous_1_mois" | "plus_tard";

export interface VehicleInfo {
  marque: string;
  modele: string;
  annee: number;
  version: string;
  kilometrage: number;
  carburant: Carburant;
  boite: Boite;
  puissanceFiscale: number;
  nombrePortes: number;
}

export interface VehicleCondition {
  etatGeneral: EtatGeneral;
  accident: boolean;
  controleTechnique: ControleTechnique;
  nombreProprietaires: number;
  carnetEntretien: boolean;
}

export interface SellerSituation {
  motifVente: MotifVente;
  delaiVente: DelaiVente;
}

export interface ContactInfo {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  ville: string;
  codePostal: string;
  consentement: boolean;
}

export interface EstimationFormData {
  vehicle: VehicleInfo;
  condition: VehicleCondition;
  situation: SellerSituation;
  contact: ContactInfo;
}
