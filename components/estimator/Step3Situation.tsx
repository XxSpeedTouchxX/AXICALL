"use client";

import type { SellerSituation, MotifVente, DelaiVente } from "@/types/vehicle";
import { RadioGroupField } from "@/components/ui/RadioGroupField";

const MOTIFS: { value: MotifVente; label: string }[] = [
  { value: "nouveau_vehicule", label: "Acheter un nouveau véhicule" },
  { value: "besoin_argent", label: "Besoin d'argent" },
  { value: "changement_vehicule", label: "Changement de véhicule" },
  { value: "succession", label: "Succession" },
  { value: "autre", label: "Autre" },
];

const DELAIS: { value: DelaiVente; label: string }[] = [
  { value: "urgent", label: "Urgent" },
  { value: "sous_1_mois", label: "Sous 1 mois" },
  { value: "plus_tard", label: "Plus tard" },
];

interface Step3Props {
  value: Partial<SellerSituation>;
  onChange: (patch: Partial<SellerSituation>) => void;
}

export function Step3Situation({ value, onChange }: Step3Props) {
  return (
    <div className="flex flex-col gap-7">
      <RadioGroupField
        legend="Pourquoi souhaitez-vous vendre votre véhicule ?"
        name="motifVente"
        options={MOTIFS}
        value={value.motifVente}
        onChange={(motifVente) => onChange({ motifVente })}
        columns="grid-cols-1 sm:grid-cols-2"
        hint="Cela nous aide à vous orienter vers la bonne solution."
      />

      <RadioGroupField
        legend="Date souhaitée de vente"
        name="delaiVente"
        options={DELAIS}
        value={value.delaiVente}
        onChange={(delaiVente) => onChange({ delaiVente })}
        columns="grid-cols-3"
        hint="Aucun engagement — vous restez libre de changer d'avis."
      />
    </div>
  );
}
