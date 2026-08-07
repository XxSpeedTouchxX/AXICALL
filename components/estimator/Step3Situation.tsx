"use client";

import type { SellerSituation, MotifVente, DelaiVente } from "@/types/vehicle";
import { RadioCard } from "@/components/ui/RadioCard";

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
    <div className="flex flex-col gap-6">
      <fieldset className="border-0 p-0 m-0">
        <legend className="mb-2 text-sm font-medium text-[var(--color-navy)]">
          Pourquoi souhaitez-vous vendre votre véhicule ?
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {MOTIFS.map((m) => (
            <RadioCard
              key={m.value}
              name="motifVente"
              value={m.value}
              label={m.label}
              checked={value.motifVente === m.value}
              onChange={(v) => onChange({ motifVente: v as MotifVente })}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="border-0 p-0 m-0">
        <legend className="mb-2 text-sm font-medium text-[var(--color-navy)]">Date souhaitée de vente</legend>
        <div className="grid grid-cols-3 gap-3">
          {DELAIS.map((d) => (
            <RadioCard
              key={d.value}
              name="delaiVente"
              value={d.value}
              label={d.label}
              checked={value.delaiVente === d.value}
              onChange={(v) => onChange({ delaiVente: v as DelaiVente })}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}
