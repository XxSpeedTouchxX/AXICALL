"use client";

import type { VehicleInfo, Carburant, Boite } from "@/types/vehicle";
import { Input } from "@/components/ui/Input";
import { RadioCard } from "@/components/ui/RadioCard";

const CARBURANTS: { value: Carburant; label: string }[] = [
  { value: "essence", label: "Essence" },
  { value: "diesel", label: "Diesel" },
  { value: "hybride", label: "Hybride" },
  { value: "electrique", label: "Electrique" },
];

const BOITES: { value: Boite; label: string }[] = [
  { value: "manuelle", label: "Manuelle" },
  { value: "automatique", label: "Automatique" },
];

interface Step1Props {
  value: Partial<VehicleInfo>;
  onChange: (patch: Partial<VehicleInfo>) => void;
}

export function Step1Vehicle({ value, onChange }: Step1Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Marque"
          name="marque"
          value={value.marque ?? ""}
          onChange={(e) => onChange({ marque: e.target.value })}
        />
        <Input
          label="Modèle"
          name="modele"
          value={value.modele ?? ""}
          onChange={(e) => onChange({ modele: e.target.value })}
        />
        <Input
          label="Année"
          name="annee"
          type="number"
          value={value.annee ?? ""}
          onChange={(e) => onChange({ annee: Number(e.target.value) })}
        />
        <Input
          label="Version / finition"
          name="version"
          value={value.version ?? ""}
          onChange={(e) => onChange({ version: e.target.value })}
        />
        <Input
          label="Kilométrage"
          name="kilometrage"
          type="number"
          value={value.kilometrage ?? ""}
          onChange={(e) => onChange({ kilometrage: Number(e.target.value) })}
        />
        <Input
          label="Puissance fiscale"
          name="puissanceFiscale"
          type="number"
          value={value.puissanceFiscale ?? ""}
          onChange={(e) => onChange({ puissanceFiscale: Number(e.target.value) })}
        />
        <Input
          label="Nombre de portes"
          name="nombrePortes"
          type="number"
          value={value.nombrePortes ?? ""}
          onChange={(e) => onChange({ nombrePortes: Number(e.target.value) })}
        />
      </div>

      <fieldset className="border-0 p-0 m-0">
        <legend className="mb-2 text-sm font-medium text-[var(--color-navy)]">Carburant</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CARBURANTS.map((c) => (
            <RadioCard
              key={c.value}
              name="carburant"
              value={c.value}
              label={c.label}
              checked={value.carburant === c.value}
              onChange={(v) => onChange({ carburant: v as Carburant })}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="border-0 p-0 m-0">
        <legend className="mb-2 text-sm font-medium text-[var(--color-navy)]">Boîte</legend>
        <div className="grid grid-cols-2 gap-3">
          {BOITES.map((b) => (
            <RadioCard
              key={b.value}
              name="boite"
              value={b.value}
              label={b.label}
              checked={value.boite === b.value}
              onChange={(v) => onChange({ boite: v as Boite })}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}
