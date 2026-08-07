"use client";

import type { VehicleCondition, EtatGeneral, ControleTechnique } from "@/types/vehicle";
import { Input } from "@/components/ui/Input";
import { RadioCard } from "@/components/ui/RadioCard";

const ETATS: { value: EtatGeneral; label: string }[] = [
  { value: "excellent", label: "Excellent" },
  { value: "tres_bon", label: "Très bon" },
  { value: "correct", label: "Correct" },
  { value: "a_prevoir", label: "À prévoir" },
];

const CONTROLES: { value: ControleTechnique; label: string }[] = [
  { value: "valide", label: "Valide" },
  { value: "expire", label: "Expiré" },
  { value: "non_effectue", label: "Non effectué" },
];

interface Step2Props {
  value: Partial<VehicleCondition>;
  onChange: (patch: Partial<VehicleCondition>) => void;
}

export function Step2Condition({ value, onChange }: Step2Props) {
  return (
    <div className="flex flex-col gap-6">
      <fieldset className="border-0 p-0 m-0">
        <legend className="mb-2 text-sm font-medium text-[var(--color-navy)]">État général</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ETATS.map((e) => (
            <RadioCard
              key={e.value}
              name="etatGeneral"
              value={e.value}
              label={e.label}
              checked={value.etatGeneral === e.value}
              onChange={(v) => onChange({ etatGeneral: v as EtatGeneral })}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="border-0 p-0 m-0">
        <legend className="mb-2 text-sm font-medium text-[var(--color-navy)]">Accident</legend>
        <div className="grid grid-cols-2 gap-3">
          <RadioCard
            name="accident"
            value="oui"
            label="Oui"
            checked={value.accident === true}
            onChange={() => onChange({ accident: true })}
          />
          <RadioCard
            name="accident"
            value="non"
            label="Non"
            checked={value.accident === false}
            onChange={() => onChange({ accident: false })}
          />
        </div>
      </fieldset>

      <fieldset className="border-0 p-0 m-0">
        <legend className="mb-2 text-sm font-medium text-[var(--color-navy)]">Contrôle technique</legend>
        <div className="grid grid-cols-3 gap-3">
          {CONTROLES.map((c) => (
            <RadioCard
              key={c.value}
              name="controleTechnique"
              value={c.value}
              label={c.label}
              checked={value.controleTechnique === c.value}
              onChange={(v) => onChange({ controleTechnique: v as ControleTechnique })}
            />
          ))}
        </div>
      </fieldset>

      <Input
        label="Nombre de propriétaires"
        name="nombreProprietaires"
        type="number"
        value={value.nombreProprietaires ?? ""}
        onChange={(e) => onChange({ nombreProprietaires: Number(e.target.value) })}
      />

      <fieldset className="border-0 p-0 m-0">
        <legend className="mb-2 text-sm font-medium text-[var(--color-navy)]">
          Carnet d&apos;entretien disponible
        </legend>
        <div className="grid grid-cols-2 gap-3">
          <RadioCard
            name="carnetEntretien"
            value="oui"
            label="Oui"
            checked={value.carnetEntretien === true}
            onChange={() => onChange({ carnetEntretien: true })}
          />
          <RadioCard
            name="carnetEntretien"
            value="non"
            label="Non"
            checked={value.carnetEntretien === false}
            onChange={() => onChange({ carnetEntretien: false })}
          />
        </div>
      </fieldset>
    </div>
  );
}
